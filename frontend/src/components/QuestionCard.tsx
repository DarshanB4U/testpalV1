import React from 'react';

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Question {question.number}</h2>
      <p className="text-gray-700 mb-6">{question.text}</p>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border ${
              selectedAnswer === index 
                ? 'bg-blue-50 border-blue-500' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;