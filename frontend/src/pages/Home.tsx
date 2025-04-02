import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, BookOpen, Brain } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Ace Your NEET Exam</span>
                <span className="  text-teal-800">with AI-Powered Practice</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500">
                TestPal provides personalized daily practice papers, previous year questions, and AI assistance to help you prepare effectively for NEET.
              </p>
              <div className="mt-10 flex space-x-4">
                <Link to="/register" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-800 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Get Started
                </Link>
                <Link to="/daily-practice" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                  Try Demo
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <img
                className="rounded-lg shadow-xl"
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Student studying with books"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features Designed for NEET Success
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Everything you need to prepare effectively for the NEET examination.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Daily Practice Papers</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get a new set of questions every day tailored to your progress and areas that need improvement.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Previous Year Questions</h3>
                <p className="mt-2 text-base text-gray-500">
                  Practice with actual questions from past NEET examinations to understand the pattern and difficulty level.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Book Questions</h3>
                <p className="mt-2 text-base text-gray-500">
                  Access questions from recommended NEET books organized by chapters and topics.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">AI Assistant</h3>
                <p className="mt-2 text-base text-gray-500">
                  Get instant help with concepts, explanations, and personalized study recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Hear from students who improved their NEET scores with TestPal.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Testimonial avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Priya Sharma</h4>
                  <p className="text-teal-700">NEET 2024 - 650/720</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The daily practice papers helped me stay consistent with my preparation. The AI assistant was like having a personal tutor available 24/7. I improved my score by 120 points!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Testimonial avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Rahul Patel</h4>
                  <p className="text-teal-700">NEET 2024 - 680/720</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Practicing with previous year questions gave me confidence. The explanations provided by the AI were clear and helped me understand complex concepts easily."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Testimonial avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Ananya Gupta</h4>
                  <p className="text-teal-700">NEET 2024 - 695/720</p>
                </div>
              </div>
              <p className="text-gray-600">
                "TestPal's book questions section helped me cover all important topics systematically. The personalized feedback on my weak areas was invaluable for my preparation."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Boost Your NEET Preparation?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto">
              Join thousands of students who are preparing smarter with TestPal.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/register" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10">
                Get Started for Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;