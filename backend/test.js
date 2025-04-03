import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { getSubjectNameById, getUserIdByEmail, TopicToId } from "./controller.js";
import { generateQuestions } from "./gemini.js";
const prisma = new PrismaClient();

async function main() {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcnNoYW5ib25kcmZkc2ZkZmxvbGUwQGdtYWlsLmNvbSIsImlhdCI6MTc0MzUzODk1Nn0.8aWOjSOjktBJOwLFTbRQt-RRa4_kZ1-umvsO3XYIwiQ";

  //   const decoded =  jwt.decode(token);

  // console.log(decoded)

  const subjectsWithTopics = await prisma.subject.findMany({
    include: {
      topics: true,
    },
  });

  console.log(subjectsWithTopics);
  console.log(subjectsWithTopics[1].topics[1]);
}
// main();

// const a = await getSubjectsTopics()
// console.log(a)

// const test = [
//   {
//     content:
//       "Which of the following statements correctly describes the function of the Golgi apparatus in a eukaryotic cell?",
//     options: [
//       "A) It is the site of protein synthesis.",
//       "B) It modifies, sorts, and packages proteins and lipids.",
//       "C) It is responsible for cellular respiration.",
//       "D) It synthesizes ATP, the energy currency of the cell.",
//     ],
//     correctAnswer: "B",
//     explanation:
//       "The Golgi apparatus is a membrane-bound organelle that functions as a processing and packaging center for proteins and lipids. It receives proteins and lipids from the endoplasmic reticulum, modifies them, and sorts them into vesicles for transport to their final destinations within or outside the cell. Option A is incorrect as protein synthesis occurs on ribosomes. Option C is incorrect as cellular respiration takes place in mitochondria. Option D is incorrect as ATP synthesis is primarily carried out by mitochondria.",
//     subject: "Biology",
//     topic: "1",
//     difficulty: "Medium",
//   },
//   {
//     content:
//       "A patient presents with difficulty breathing and a persistent cough. A medical examination reveals inflammation of the bronchioles and excessive mucus production. Which of the following respiratory structures is most likely affected in this case?",
//     options: ["A) Alveoli", "B) Bronchi", "C) Trachea", "D) Larynx"],
//     correctAnswer: "B",
//     explanation:
//       "The bronchioles are the smallest airways in the lungs. Inflammation and excessive mucus production in the bronchioles, as described in the scenario, is characteristic of conditions like bronchitis. The alveoli are the tiny air sacs where gas exchange occurs. The trachea is the windpipe, and the larynx is the voice box. While these structures can also be affected by respiratory illnesses, the symptoms presented in the question point specifically towards bronchiole involvement.",
//     subject: "1",
//     topic: "1",
//     difficulty: "2",
//   },
//   {
//     content:
//       "A person experiences a sudden loss of sensation and motor control in their left leg. This symptom could indicate damage to which of the following structures?",
//     options: [
//       "A) Right cerebral hemisphere",
//       "B) Left cerebral hemisphere",
//       "C) Spinal cord",
//       "D) Peripheral nerves",
//     ],
//     correctAnswer: "C",
//     explanation:
//       "The spinal cord is responsible for transmitting signals between the brain and the rest of the body. Damage to a specific region of the spinal cord can lead to loss of sensation and motor control in the corresponding body part. In this case, damage to the left side of the spinal cord would affect the right side of the body due to the crossing over of nerve fibers. Option A is incorrect because the right cerebral hemisphere controls the left side of the body, and damage would primarily affect the left side. Option B is incorrect because the left cerebral hemisphere controls the right side of the body, and damage would primarily affect the right side. Option D is incorrect because while peripheral nerves can be damaged, the symptom description points to a more central nervous system involvement.",
//     subject: "1",
//     topic: "1",
//     difficulty: "Medium",
//   },
// ];

// const userId = 9;
// const subjectId = 1;

async function createTestForUser(userId, subjectId, questionsData,testTitle) {
  console.log(
    `Creating test for user ID: ${userId} and subject ID: ${subjectId}`
  );

  try {
    // Step 1: Create a new Test for the user
    const newTest = await prisma.test.create({
      data: {
        userId,
        subjectId,
        title: `${testTitle}`,
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

    console.log("Test created successfully:", newTest);
    return newTest;
  } catch (error) {
    console.error("Error creating test:", error);
    throw new Error("Failed to create test"); // Rethrow error for further handling if needed
  }
}

// const res = await createTestForUser(userId, subjectId, test);
// console.log(res);

const data = [
  {
    content:
      "A car accelerates uniformly from rest to a speed of 20 m/s in 10 seconds. What is the distance traveled by the car during this time?",
    options: ["A) 100 m", "B) 200 m", "C) 150 m", "D) 50 m"],
    correctAnswer: "A",
    explanation:
      "Using the equation of motion, s = ut + (1/2)at^2, where s is the distance, u is the initial velocity (0 m/s), a is the acceleration (2 m/s^2 calculated from a = (v-u)/t), and t is the time (10 s), we get s = (1/2) * 2 * 10^2 = 100 m.",
    subject: "Physics",
    topic: "KINEMATICS",
    difficulty: "Medium",
  },
  {
    content: `A ball is thrown vertically upwards with an initial velocity of 20 m/s. What is the maximum height reached by the ball? (Take 
    acceleration due to gravity, g = 10 m/s^2)`,
    options: ["A) 10 m", "B) 20 m", "C) 40 m", "D) 80 m"],
    correctAnswer: "B",
    explanation:
      "At the maximum height, the final velocity (v) of the ball is 0 m/s. Using the equation v^2 = u^2 + 2as, where u is the initial velocity (20 m/s), a is the acceleration due to gravity (-10 m/s^2, negative as it acts downwards), and s is the maximum height, we get 0 = 20^2 + 2*(-10)*s. Solving for s, we get s = 20 m.",
    subject: "Physics",
    topic: "KINEMATICS",
    difficulty: "Medium",
  },
  {
    content:
      "A particle starts from rest and moves with a constant acceleration of 5 m/s². What is the distance travelled by the particle in the 3rd second of its motion?",
    options: ["A) 10 m", "B) 12.5 m", "C) 15 m", "D) 20 m"],
    correctAnswer: "B",
    explanation:
      "The distance travelled in the nth second is given by: Sn = u + (a/2)(2n-1). Here, u = 0 (starts from rest), a = 5 m/s², and n = 3. Substituting these values, we get S3 = (5/2)(2*3-1) = 12.5 m.",
    subject: "Physics",
    topic: "KINEMATICS",
    difficulty: "Medium",
  },
];

const testparam = {
  "subject": 1,
  "topics": ["PHYSICS AND MEASUREMENT","KINEMATICS"],
  "difficulty": "Medium",
  "count": 3,
  "additionalContext": ""
}

const testTitle="my new test "

async function generateAndStoreTest(userID,testparams,testTitle) {
  console.log(`creatating test for ${userID} of subject id ${testparams.subjects} `)
  const subjectId = testparams.subject

const subjectName = await  getSubjectNameById(subjectId)
console.log(`subject  is ${subjectName}`)
testparams.subject = subjectName



 const test = await generateQuestions(testparams)
 
  console.log(test)
  console.log("this is genrated questions ___________________________________________________")
  
  const testData = await TopicToId(1, test);

  console.log(testData);
  console.log("this is changeed topic ___________________________________________________")

const createdTest  = createTestForUser(userID,subjectId,testData,testTitle)
  
}




//  generateAndStoreTest(9,testparam,testTitle)


// const email = "abcd@gmail.com"

// const userID = await getUserIdByEmail(email)
// console.log(userID)