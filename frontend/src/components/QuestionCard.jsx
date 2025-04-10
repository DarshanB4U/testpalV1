const QuestionCard = ({ question, selectedAnswer, onAnswerSelect, isSubmitted }) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Question {question.number}</h2>
      <p className="text-gray-700 mb-6">{question.text}</p>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            disabled={isSubmitted}
            className={`w-full text-left p-4 rounded-lg border 
              ${selectedAnswer === index 
                ? 'bg-blue-50 border-blue-500' 
                : 'border-gray-200 hover:bg-gray-50'
              }
              ${isSubmitted ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;