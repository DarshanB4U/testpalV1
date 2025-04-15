# TestPal - AI-Powered NEET Preparation Platform

TestPal is an intelligent learning platform designed specifically for NEET (National Eligibility cum Entrance Test) aspirants. It combines AI technology with comprehensive test preparation features to provide a personalized learning experience.

## Features

- **AI-Generated Practice Tests**: Automatically generates subject-specific questions tailored to your level
- **Daily Practice Papers**: Get fresh practice papers every day
- **Previous Year Questions**: Practice with actual NEET exam questions
- **Real-time Progress Tracking**: Monitor your performance and improvement
- **Smart Scoring System**: Detailed analysis of your answers with explanations
- **Adaptive Difficulty**: Questions adjust based on your performance
- **Time Management**: Built-in timer for exam-like experience

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Google Gemini AI API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Google Gemini API Key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/testpal.git
cd testpal
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install     
```

3. Install Backend Dependencies     
```bash
cd backend
npm install

4. Set up environment variables
``` DATABASE_URL="postgresql://username:password@localhost:5432/testpal"
GEMINI_API_KEY="your_gemini_api_key"
JWT_SECRET="your_jwt_secret"
```
Frontend .env :

``` VITE_API_URL="``` VITE_API_URL="URL_ADDRESS:3000"


5.Initialize Database
```bash 
cd backend
npx prisma migrate dev
npm run seed
```

6.Start the application
```bash
cd frontend
npm run dev 
```
backend
```bash
cd backend
node index.js
```


This README provides a comprehensive overview of your project, including:
- Project description
- Key features
- Technology stack
- Installation instructions
- Project structure
- Contributing guidelines
- License information
- Contact details

Remember to:
1. Replace placeholder values (yourusername, your_jwt_secret, etc.)
2. Add any specific configuration requirements
3. Update the contact information
4. Add any additional sections relevant to your project