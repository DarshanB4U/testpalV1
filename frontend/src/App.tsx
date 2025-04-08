// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DailyPractice from './pages/DailyPractice';
import PreviousYears from './pages/PreviousYears';
import BookQuestions from './pages/BookQuestions';
import AiAssistant from './pages/AiAssistant';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CustomTest from './pages/CustomTest';
import ProtectedRoute from './components/ProtectedRoute';
import GeneratePaper from './pages/GeneratePaper.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/daily-practice" element={
              <ProtectedRoute>
                <DailyPractice />
              </ProtectedRoute>
            } />
            <Route path="/previous-years" element={
              <ProtectedRoute>
                <PreviousYears />
              </ProtectedRoute>
            } />
            <Route path="/book-questions" element={
              <ProtectedRoute>
                <BookQuestions />
              </ProtectedRoute>
            } />
            {/* <Route path="/ai-assistant" element={
              <ProtectedRoute>
                <AiAssistant />
              </ProtectedRoute>
            } /> */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/custom-test" element={
              <ProtectedRoute>
                <CustomTest />
              </ProtectedRoute>
            } />
            
            <Route path="/generate-paper" element={
              
                <GeneratePaper />
              
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;