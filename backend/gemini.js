import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function generate(prompt) {
  // console.log(prompt);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
  const result = await model.generateContent(prompt);
  return result;
}

async function generateQuestions(params) {
  return generateQuestionsWithContext({ ...params, additionalContext: "" });
}

async function generateQuestionsWithContext(params) {
  const { subject, topics, difficulty, count, additionalContext } = params;
  const prompt = buildPromptWithContext(
    subject,
    topics,
    difficulty,
    count,
    additionalContext || ""
  );

  try {
    const result = await generate(prompt);
    const text = result.response.text();
    return parseGeminiResponse(text);
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}

function buildPromptWithContext(
  subject,
  topics,
  difficulty,
  count,
  additionalContext
) {
  return `
Generate ${count} number of  ${difficulty}-level multiple-choice questions specifically for NEET (National Eligibility cum Entrance Test) exam preparation on ${subject} covering these topics: ${topics.join(
    ", "
  )}.
${additionalContext ? `Additional context: ${additionalContext}` : ""}

Important NEET-specific guidelines:
- Questions should match the exact NEET exam pattern and difficulty level
- Focus on conceptual understanding rather than rote memorization
- Include questions that test application of concepts in theoretical scenarios
- Ensure content aligns with NCERT syllabus for ${subject}
- Use terminology and framing consistent with actual NEET questions
- DO NOT include questions that require diagrams, graphs, images, or any visual elements
- AVOID questions about visual identification, microscopic observations, or anatomical structures that would typically require visual aids
- Focus ONLY on concepts that can be fully expressed and tested through text

Each question must follow this exact JSON structure:
{
  "content": "Clear, concise text-only question following NEET patterns",
  "options": ["A) Option text", "B) Option text", "C) Option text", "D) Option text"],
  "correctAnswer": "A, B, C, or D",
  "explanation": "Detailed explanation with scientific reasoning and relevant NCERT concepts",
  "subject": "${subject}",
  "topic": "Specific topic from the list provided",
  "difficulty": "${difficulty}"
}
 use Use Backticks (Template Literals) to avoid any error caused by string and line breaks
Provide the output as a well-formatted JSON array of question objects, ensuring all questions are factually accurate, text-only, and relevant to NEET preparation. dont make mistake in json structure`;
}

function parseGeminiResponse(text) {
  try {
    const jsonMatch = text.match(/\[\s*\{[\s\S]*?\}\s*\]/);
    if (!jsonMatch) throw new Error("Failed to parse questions");
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    return extractQuestionsFromText(text);
  }
}

function extractQuestionsFromText(text) {
  const questions = [];
  const regex = /\{[\s\S]*?\}/g;
  const matches = text.match(regex);

  if (matches) {
    for (const match of matches) {
      try {
        const questionObj = JSON.parse(match);
        if (questionObj.content && questionObj.correctAnswer) {
          questions.push({
            content: questionObj.content,
            options: questionObj.options || null,
            correctAnswer: questionObj.correctAnswer,
            explanation: questionObj.explanation || "No explanation provided",
          });
        }
      } catch (e) {
        continue;
      }
    }
  }
  return questions;
}

// const testParams = {
//   subject: "mBiology",
//   topics: ["cell", "living world"],
//   difficulty: "medium",
//   count: 1,
//   additionalContext: "Focus on real-life applications of concepts.",
// };

async function test() {
  try {
    const questions = await generateQuestions(testParams);
    // console.log(questions);

    console.log(JSON.stringify(questions, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

export { generateQuestions, generateQuestionsWithContext };

// // const { GoogleGenerativeAI } = require("@google/generative-ai");
// // import GoogleGenerativeAI from "@google/genai"

