import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, BarChart2, BookOpen, Brain, Award } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user data
  const user = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    joinedDate: 'January 15, 2025',
    streak: 7,
    questionsAttempted: 342,
    questionsCorrect: 278,
    accuracy: 81.3,
    lastSession: '2 hours ago',
    recentTopics: [
      { id: 1, name: 'Cell Structure and Function', score: 85, subject: 'BIOLOGY' },
      { id: 2, name: 'Laws of Motion', score: 70, subject: 'PHYSICS' },
      { id: 3, name: 'Chemical Bonding', score: 90, subject: 'CHEMISTRY' }
    ],
    weakAreas: [
      { id: 1, name: 'Thermodynamics', score: 45, subject: 'PHYSICS' },
      { id: 2, name: 'Organic Chemistry Reactions', score: 52, subject: 'CHEMISTRY' },
      { id: 3, name: 'Human Physiology', score: 60, subject: 'BIOLOGY' }
    ],
    upcomingTests: [
      { id: 1, name: 'Daily Practice Paper', date: 'Today', time: '5:00 PM' },
      { id: 2, name: 'Physics Mock Test', date: 'Tomorrow', time: '10:00 AM' },
      { id: 3, name: 'Full NEET Mock', date: 'Sunday', time: '9:00 AM' }
    ]
  };
  
  // Mock activity data
  const activityData = [
    { date: 'Today', papers: 1, questions: 25, timeSpent: '45 min' },
    { date: 'Yesterday', papers: 2, questions: 50, timeSpent: '1h 30min' },
    { date: 'May 15', papers: 1, questions: 30, timeSpent: '1h' },
    { date: 'May 14', papers: 2, questions: 45, timeSpent: '1h 15min' },
    { date: 'May 13', papers: 1, questions: 25, timeSpent: '50 min' }
  ];
  
  // Mock performance data
  const performanceData = {
    subjects: {
      'Physics': { score: 75, total: 120, correct: 90 },
      'Chemistry': { score: 82, total: 150, correct: 123 },
      'Biology': { score: 88, total: 180, correct: 158 }
    },
    recent: [
      { id: 1, name: 'Daily Practice - May 16', score: 85, total: 25 },
      { id: 2, name: 'Physics Mock Test', score: 70, total: 30 },
      { id: 3, name: 'Chemistry Chapter Test', score: 90, total: 20 },
      { id: 4, name: 'Biology Previous Year', score: 80, total: 25 },
      { id: 5, name: 'Full Mock Test', score: 78, total: 180 }
    ]
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-1">Let's continue your NEET preparation journey</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Calendar className="h-5 w-5 text-teal-700 mr-2" />
              <span className="text-gray-600">Today: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-3 mr-4">
                <Calendar className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Daily Streak</p>
                <p className="text-2xl font-bold text-gray-900">{user.streak} days</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Questions Attempted</p>
                <p className="text-2xl font-bold text-gray-900">{user.questionsAttempted}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <BarChart2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{user.accuracy}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Session</p>
                <p className="text-2xl font-bold text-gray-900">{user.lastSession}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="border-b">
                <nav className="flex -mb-px">
                  <button
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-indigo-500 text-teal-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'activity'
                        ? 'border-indigo-500 text-teal-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('activity')}
                  >
                    Activity
                  </button>
                  <button
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'performance'
                        ? 'border-indigo-500 text-teal-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('performance')}
                  >
                    Performance
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Subject Performance</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-600">Physics</span>
                            <span className="text-sm font-medium text-gray-900">{performanceData.subjects.Physics.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${performanceData.subjects.Physics.score}%` }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-600">Chemistry</span>
                            <span className="text-sm font-medium text-gray-900">{performanceData.subjects.Chemistry.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green -600 h-2.5 rounded-full" style={{ width: `${performanceData.subjects.Chemistry.score}%` }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-600">Biology</span>
                            <span className="text-sm font-medium text-gray-900">{performanceData.subjects.Biology.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${performanceData.subjects.Biology.score}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Topics</h3>
                        <div className="space-y-3">
                          {user.recentTopics.map(topic => (
                            <div key={topic.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">{topic.name}</p>
                                  <p className="text-xs text-gray-500">{topic.subject}</p>
                                </div>
                                <div className={`text-sm font-medium ${
                                  topic.score >= 80 ? 'text-green-600' : 
                                  topic.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {topic.score}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Areas to Improve</h3>
                        <div className="space-y-3">
                          {user.weakAreas.map(area => (
                            <div key={area.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-gray-900">{area.name}</p>
                                  <p className="text-xs text-gray-500">{area.subject}</p>
                                </div>
                                <div className="text-sm font-medium text-red-600">
                                  {area.score}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'activity' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Papers
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Questions
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Time Spent
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {activityData.map((activity, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {activity.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {activity.papers}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {activity.questions}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {activity.timeSpent}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Study Habits</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Based on your activity, you study best in the evenings. Your average session length is 45 minutes.
                        </p>
                        <p className="text-sm text-gray-600">
                          Recommendation: Try to maintain consistent daily practice sessions of 45-60 minutes, with short breaks in between.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'performance' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Test Performance</h2>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Tests</h3>
                      <div className="space-y-3">
                        {performanceData.recent.map(test => (
                          <div key={test.id} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-gray-900">{test.name}</p>
                              <p className={`text-sm font-medium ${
                                (test.score / test.total * 100) >= 80 ? 'text-green-600' : 
                                (test.score / test.total * 100) >= 60 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {test.score}/{test.total} ({(test.score / test.total * 100).toFixed(1)}%)
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Performance Insights</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Your performance is strongest in Biology (88%) and needs improvement in Physics (75%).
                        </p>
                        <p className="text-sm text-gray-600">
                          Focus areas: Thermodynamics, Mechanics, and Organic Chemistry reactions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Tests</h2>
              <div className="space-y-4">
                {user.upcomingTests.map(test => (
                  <div key={test.id} className="flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2 mr-3">
                      <Calendar className="h-5 w-5 text-teal-700" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{test.name}</p>
                      <p className="text-sm text-gray-500">{test.date} at {test.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/daily-practice" className="text-teal-700 hover:text-indigo-800 text-sm font-medium">
                  View all scheduled tests →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/daily-practice" className="flex items-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Calendar className="h-5 w-5 text-teal-700 mr-3" />
                  <span className="text-gray-900">Start Daily Practice</span>
                </Link>
                
                <Link to="/previous-years" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-900">Previous Year Questions</span>
                </Link>
                
                <Link to="/book-questions" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <BookOpen className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-900">Book Questions</span>
                </Link>
                
                <Link to="/ai-assistant" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Brain className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-900">Ask AI Assistant</span>
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 mr-2" />
                <h2 className="text-lg font-medium">Pro Tip</h2>
              </div>
              <p className="text-indigo-100 mb-4">
                Consistent daily practice is key to NEET success. Try to solve at least 25 questions every day across all subjects.
              </p>
              <Link to="/daily-practice" className="inline-block bg-white text-teal-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors">
                Start Practice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;