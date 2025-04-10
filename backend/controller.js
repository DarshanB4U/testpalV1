import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { generateQuestions } from "./gemini.js";

//controllers

async function createTestForUser(userId, subjectId, questionsData, testTitle) {
  console.log(testTitle);
  console.log(
    `Creating test for user ID: ${userId} and subject ID: ${subjectId}`
  );
  
  try {
    // Step 1: Create a new Test for the user
    const newTest = await prisma.test.create({
      data: {
        userId,
        subjectId,
        title: testTitle,
        submitted: false,
        questions: {
          create: questionsData.map((q) => ({
            question: q.content,
            options: q.options,
            answer: q.correctAnswer,
            explanation: q.explanation,
            difficulty: q.difficulty.toUpperCase() || "MEDIUM",
            topicId: Number(q.topic),
            subjectId,
          })),
        },
      },
      include: { questions: true },
    });

    console.log("Test created successfully:");
    return newTest;
  } catch (error) {
    console.error("Error creating test:", error);
    throw new Error("Failed to create test"); // Rethrow error for further handling if needed
  }
}

async function getUserIdByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true }, // Use select instead of include
    });

    return user.id;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
}

async function generateAndStoreTest(userID, testparams, testTitle) {
  console.log(
    `creatating test for ${userID} of subject id ${testparams.subject} `
  );
  const subjectId = testparams.subject;
  console.log("getting subject name by ID");
  const subjectName = await getSubjectNameById(subjectId);
  // console.log(`subject  is ${subjectName}`);
  testparams.subject = subjectName;
  // console.log("this are test params ",testparams)
  console.log("genrating test question from data usiing AI ");
  const test = await generateQuestions(testparams);

  console.log("test questions genrated");

  console.log(
    "converting Topic names into Topic id's to store data in database "
  );
  console.log("this is subject id ", subjectId);
  const testData = await TopicToId(subjectId, test);
  console.log("converted topic to ID:   DONE  sucessfully");

  // console.log(
  //   "this is changeed topic ___________________________________________________"
  // );
  // console.log(testData);
  // console.log(
  //   "this is changeed topic ___________________________________________________"
  // );
console.log("this test0012", testData)
  const createdTest = createTestForUser(userID, subjectId, testData, testTitle);

  return createdTest;
}

const getSubjectNameById = async function (subjectId) {
  const Subject = await prisma.subject.findUnique({
    where: {
      id: subjectId,
    },
  });
  const subjectName = Subject.name;
  return subjectName;
};

// get all subjects with topics
const getAllSubjectsTopics = async function () {
  const subjectsWithTopics = await prisma.subject.findMany({
    include: {
      topics: true,
    },
  });
  return subjectsWithTopics;
};

// get al topics of perticullar subject  by taking subjects id as parameter
const getTopics = async function (subjectId) {
  try {
    const topics = await prisma.subject.findUnique({
      where: {
        id: subjectId,
      },
      include: {
        topics: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return topics?.topics || [];
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};

// to replace the topic name with the topic id in the question array
async function TopicToId(subjectid, testQuestionArray) {
  try {
    console.log("these are topic sub id ", subjectid);
    const topics = await getTopics(subjectid);
    // console.log("these are topic found in db ", topics);
    // console.log(topics);

    // Use map() to transform array
    const updatedQuestions = testQuestionArray.map((question) => {
      const foundTopic = topics.find(
        (topic) => topic.name.toLowerCase() == question.topic.toLowerCase()
      );

      if (!foundTopic) {
        console.warn(`Topic '${question.topic}' not found in database!`);

        return question; // Keep original if no match found
      }

      return {
        ...question,
        topic: foundTopic.id, // Replace topic name with ID
      };
    });

    return updatedQuestions;
  } catch (error) {
    console.log("this is error from function : TopicToId ");
  }
}

const getTestByID = async (testID) => {
  const test = await prisma.test.findUnique({
    where: {
      id: testID,
    },
  });
  return test;
};
const getAllTests = async (userId) => {
  const allTests = await prisma.test.findMany({
    where: { userId: userId },
    include: { questions: false,
      uanswers:false
     },
  });

  return allTests;
};

const submitTest = async (testID, UAnswers, score) => {
  try {
    const test = await prisma.test.update({
      where: {
        id: testID,
      },
      data: { score:score, uanswers: UAnswers, submitted: true },
    });
    return test;
  } catch (error) {
    console.log("unable to submit test problem wit submitTest() function  ");
  }
};

export {
  submitTest,
  getTestByID,
  getAllSubjectsTopics,
  getTopics,
  TopicToId,
  getUserIdByEmail,
  getSubjectNameById,
  generateAndStoreTest,
  getAllTests,
};
