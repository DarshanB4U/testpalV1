import React from 'react';

const TestHeader = ({ currentQuestion, totalQuestions, title, timeLeft }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Time: {formatTime(timeLeft)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TestHeader;