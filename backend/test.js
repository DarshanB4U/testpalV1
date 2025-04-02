import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { getSubjectsTopics } from "./controller.js";
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


const test = [
  {
      "content": "Which of the following statements correctly describes the function of the Golgi apparatus in a eukaryotic cell?",
      "options": [
          "A) It is the site of protein synthesis.",
          "B) It modifies, sorts, and packages proteins and lipids.",
          "C) It is responsible for cellular respiration.",
          "D) It synthesizes ATP, the energy currency of the cell."
      ],
      "correctAnswer": "B",
      "explanation": "The Golgi apparatus is a membrane-bound organelle that functions as a processing and packaging center for proteins and lipids. It receives proteins and lipids from the endoplasmic reticulum, modifies them, and sorts them into vesicles for transport to their final destinations within or outside the cell. Option A is incorrect as protein synthesis occurs on ribosomes. Option C is incorrect as cellular respiration takes place in mitochondria. Option D is incorrect as ATP synthesis is primarily carried out by mitochondria.",
      "subject": "Biology",
      "topic": "Cell",
      "difficulty": "Medium"
  },
  {
      "content": "A patient presents with difficulty breathing and a persistent cough. A medical examination reveals inflammation of the bronchioles and excessive mucus production. Which of the following respiratory structures is most likely affected in this case?",
      "options": [
          "A) Alveoli",
          "B) Bronchi",
          "C) Trachea",
          "D) Larynx"
      ],
      "correctAnswer": "B",
      "explanation": "The bronchioles are the smallest airways in the lungs. Inflammation and excessive mucus production in the bronchioles, as described in the scenario, is characteristic of conditions like bronchitis. The alveoli are the tiny air sacs where gas exchange occurs. The trachea is the windpipe, and the larynx is the voice box. While these structures can also be affected by respiratory illnesses, the symptoms presented in the question point specifically towards bronchiole involvement.",
      "subject": "Biology",
      "topic": "Anatomy",
      "difficulty": "Medium"
  },
  {
      "content": "A person experiences a sudden loss of sensation and motor control in their left leg. This symptom could indicate damage to which of the following structures?",
      "options": [
          "A) Right cerebral hemisphere",
          "B) Left cerebral hemisphere",
          "C) Spinal cord",
          "D) Peripheral nerves"
      ],
      "correctAnswer": "C",
      "explanation": "The spinal cord is responsible for transmitting signals between the brain and the rest of the body. Damage to a specific region of the spinal cord can lead to loss of sensation and motor control in the corresponding body part. In this case, damage to the left side of the spinal cord would affect the right side of the body due to the crossing over of nerve fibers. Option A is incorrect because the right cerebral hemisphere controls the left side of the body, and damage would primarily affect the left side. Option B is incorrect because the left cerebral hemisphere controls the right side of the body, and damage would primarily affect the right side. Option D is incorrect because while peripheral nerves can be damaged, the symptom description points to a more central nervous system involvement.",
      "subject": "Biology",
      "topic": "Anatomy",
      "difficulty": "Medium"
  }
]

 function pushtest (){

  
 }