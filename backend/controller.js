import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//controllers

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
        Topic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return topics?.Topic || [];
  } catch (error) {
    console.error("Error fetching topics:", error);
    throw error;
  }
};

// to replace the topic name with the topic id in the question array
async function TopicToId(subjectid, testQuestionArray) {
  const topics = await getTopics(subjectid);

  // Use map() to transform array
  const updatedQuestions = testQuestionArray.map((question) => {
    const foundTopic = topics.find((topic) => topic.name === question.topicId);

    if (!foundTopic) {
      console.warn(`Topic '${question.topicId}' not found in database!`);
      return question; // Keep original if no match found
    }

    return {
      ...question,
      topicId: foundTopic.id, // Replace topic name with ID
    };
  });

  return updatedQuestions;
}

export { getAllSubjectsTopics, getTopics, TopicToId };
