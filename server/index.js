import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('TestPal API is running');
});

// Get daily practice paper
app.get('/api/daily-practice', async (req, res) => {
  try {
    // In a real app, this would generate a personalized paper based on user history
    const questions = await prisma.question.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Create a new paper
    const paper = await prisma.paper.create({
      data: {
        title: `Daily Practice - ${new Date().toLocaleDateString()}`,
        description: 'Daily practice paper with mixed questions',
        questions: {
          create: questions.map((question, index) => ({
            questionId: question.id,
            order: index
          }))
        }
      }
    });
    
    res.json({ success: true, paper, questions });
  } catch (error) {
    console.error('Error generating daily practice paper:', error);
    res.status(500).json({ success: false, error: 'Failed to generate daily practice paper' });
  }
});

// Get previous year questions
app.get('/api/previous-years', async (req, res) => {
  try {
    const { subject, year, difficulty } = req.query;
    
    // Build filter
    const filter = {
      source: 'Previous Year'
    };
    
    if (subject) filter.subject = subject;
    if (year) filter.year = parseInt(year);
    if (difficulty) filter.difficulty = difficulty;
    
    const questions = await prisma.question.findMany({
      where: filter,
      orderBy: {
        year: 'desc'
      }
    });
    
    res.json({ success: true, questions });
  } catch (error) {
    console.error('Error fetching previous year questions:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch previous year questions' });
  }
});

// Get book questions
app.get('/api/book-questions', async (req, res) => {
  try {
    const { subject, source, chapter } = req.query;
    
    // Build filter
    const filter = {
      NOT: {
        source: 'Previous Year'
      }
    };
    
    if (subject) filter.subject = subject;
    if (source) filter.source = source;
    if (chapter) filter.chapter = chapter;
    
    const questions = await prisma.question.findMany({
      where: filter,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.json({ success: true, questions });
  } catch (error) {
    console.error('Error fetching book questions:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch book questions' });
  }
});

// AI Assistant endpoint
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ success: false, error: 'Query is required' });
    }
    
    // Use Gemini to generate a response
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Construct prompt with RAG context
    let prompt = `You are an AI assistant for NEET (National Eligibility cum Entrance Test) students. 
    Answer the following question related to Physics, Chemistry, or Biology for NEET preparation.
    
    Provide a clear, concise, and accurate answer with explanations where necessary.
    Include relevant formulas, diagrams (described in text), and examples if applicable.
    
    Question: ${query}`;
    
    // In a real implementation, we would retrieve relevant context from a database
    // and add it to the prompt for RAG capabilities
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    res.json({ success: true, answer: text });
  } catch (error) {
    console.error('Error with AI assistant:', error);
    res.status(500).json({ success: false, error: 'Failed to generate AI response' });
  }
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }
    
    // In a real app, we would hash the password before storing
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password // In production, this should be hashed!
      }
    });
    
    // Create a session
    const session = await prisma.session.create({
      data: {
        userId: user.id
      }
    });
    
    res.json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email },
      sessionId: session.id
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, error: 'Failed to register user' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    // In a real app, we would compare hashed passwords
    if (user.password !== password) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    // Create a session
    const session = await prisma.session.create({
      data: {
        userId: user.id
      }
    });
    
    res.json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email },
      sessionId: session.id
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, error: 'Failed to log in' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});