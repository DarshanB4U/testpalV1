import React, { useState, useEffect } from 'react';
import TestHeader from '../components/TestHeader';
import QuestionCard from '../components/QuestionCard';
import { questionService } from '../services/api';
import FetchingTestLoading from '../components/FetchingTestLoading';

function Submit() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testData, setTestData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [formattedAnswers, setFormattedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await questionService.getRecentTest();
        console.log(response);
        
        setTestData(response.test);
        const questionCount = response.test.questions.length;
        
        // Set dynamic time based on question count
        let minutes = 25;
        if (questionCount > 10 && questionCount <= 20) minutes = 35;
        if (questionCount > 20) minutes = 50;
        
        setTimeLeft(minutes * 60); // Convert minutes to seconds
        setUserAnswers(new Array(response.test.questions.length).fill(null));
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isSubmitted]);

  const calculateScore = () => {
    let correctCount = 0;
    const wrong = [];

    userAnswers.forEach((answerIndex, questionIndex) => {
      const question = testData.questions[questionIndex];
      const userAnswer = answerIndex !== null ? String.fromCharCode(65 + answerIndex) : null;
      
      if (userAnswer === question.answer) {
        correctCount++;
      } else {
        wrong.push({
          questionNumber: questionIndex + 1,
          question: question.question,
          userAnswer: userAnswer ? question.options[answerIndex] : 'Not answered',
          correctAnswer: question.options[question.answer.charCodeAt(0) - 65],
          explanation: question.explanation
        });
      }
    });

    return { score: (correctCount / testData.questions.length) * 100, wrongAnswers: wrong };
  };

  const handleSubmit = () => {
    const formatted = userAnswers.map((answerIndex, questionIndex) => {
      if (answerIndex === null) return "Not answered";
      return testData.questions[questionIndex].options[answerIndex];
    });

    const result = calculateScore();
    setScore(result.score);
    setWrongAnswers(result.wrongAnswers);
    setFormattedAnswers(formatted);
    setIsSubmitted(true);
    console.log("this is formatted answers ,",formatted);
    console.log("this is score",result.score);
    console.log(testData.id);
    const tesID = testData.id;
    const score= result.score;
    const answresArray = formatted;
  async function submittest(){
   const response = await  questionService.submitTest(tesID,answresArray,score);
   console.log(response);
    
    
  }
   submittest();
   


  };

  const handleAnswerSelect = (answerIndex) => {
    if (isSubmitted) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    }
  };

//   const handleSubmit = () => {
//     setIsSubmitted(true);
//     // Add API call to submit test
//   };

  if (!testData) {
    return <div ><FetchingTestLoading></FetchingTestLoading></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <TestHeader
          currentQuestion={currentQuestion + 1}
          totalQuestions={testData.questions.length}
          title={testData.title}
          timeLeft={timeLeft}
        />

        <QuestionCard
          question={{
            number: currentQuestion + 1,
            text: testData.questions[currentQuestion].question,
            options: testData.questions[currentQuestion].options
          }}
          selectedAnswer={userAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
          isSubmitted={isSubmitted}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || isSubmitted}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion === testData.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitted}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={isSubmitted}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          )}
        </div>

        {isSubmitted && (
          <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Submitted!</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xl font-semibold text-blue-800">
                  Your Score: {score.toFixed(2)}%
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Questions Review:</h3>
                {wrongAnswers.length > 0 ? (
                  wrongAnswers.map((wrong, index) => (
                    <div key={index} className="bg-red-50 p-4 rounded-lg mb-4">
                      <p className="font-medium">Question {wrong.questionNumber}: {wrong.question}</p>
                      <p className="text-red-600">Your Answer: {wrong.userAnswer}</p>
                      <p className="text-green-600">Correct Answer: {wrong.correctAnswer}</p>
                      <div className="mt-2 p-3 bg-white rounded">
                        <p className="font-medium">Explanation:</p>
                        <p className="text-gray-700">{wrong.explanation}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-green-600 font-medium">Perfect score! All answers are correct.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Submit;