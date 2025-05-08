import React, { useState, useEffect } from 'react';
import TestHeader from '../components/TestHeader';
import QuestionCard from '../components/QuestionCard';
import { questionService } from '../services/api';
import FetchingTestLoading from '../components/FetchingTestLoading';
import TealButton from '../components/TealButton';



function Submit() {
  const [dbStored,setDbStored]= useState(false)
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
        setUserAnswers(new Array(response.test.questions.length).fill(null) as (number | null)[]);
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
    const wrong:any = [];

    userAnswers.forEach((answerIndex, questionIndex) => {
      const question = testData.questions[questionIndex];
      
      // If no answer was selected
      if (answerIndex === null) {
        wrong.push({
          questionNumber: questionIndex + 1,
          question: question.question,
          userAnswer: 'Not answered',
          correctAnswer: question.options[question.answer.charCodeAt(0) - 65],
          explanation: question.explanation
        });
        return; // Skip to next question
      }

      // Convert correct answer letter to index (0-3)
      const correctAnswerIndex = question.answer.charCodeAt(0) - 65;
      console.log("Question", questionIndex + 1, "User answer:", answerIndex, "Correct answer:", correctAnswerIndex); // Debug log

      // Compare indices directly
      if (answerIndex === correctAnswerIndex) {
        correctCount++;
      } else {
        wrong.push({
          questionNumber: questionIndex + 1,
          question: question.question,
          userAnswer: question.options[answerIndex],
          correctAnswer: question.options[correctAnswerIndex],
          explanation: question.explanation
        });
      }
    });

    // Calculate final score
    const finalScore = Math.round((correctCount / testData.questions.length) * 100);
    console.log("Total correct:", correctCount, "Total questions:", testData.questions.length, "Score:", finalScore); // Debug log
    return { score: finalScore, wrongAnswers: wrong };
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
    setDbStored(false)
   const response = await  questionService.submitTest(tesID,answresArray,score);
   console.log(response);
   setDbStored(true)
    
  }
   submittest();
 


  };

  // First, modify handleAnswerSelect to store the actual index (0-3)
  const handleAnswerSelect = (answerIndex) => {
    if (isSubmitted) return;
    const newAnswers = [...userAnswers];
    // Store the index directly (0 for A, 1 for B, etc.)
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
    console.log("Selected answer index:", answerIndex); // Debug log
  };

  // // Then, modify calculateScore to correctly compare answers
  // const calculateScore = () => {
  //   let correctCount = 0;
  //   const wrong = [];

  //   userAnswers.forEach((answerIndex, questionIndex) => {
  //     const question = testData.questions[questionIndex];
      
  //     // If no answer was selected
  //     if (answerIndex === null) {
  //       wrong.push({
  //         questionNumber: questionIndex + 1,
  //         question: question.question,
  //         userAnswer: 'Not answered',
  //         correctAnswer: question.options[question.answer.charCodeAt(0) - 65],
  //         explanation: question.explanation
  //       });
  //       return; // Skip to next question
  //     }

  //     // Convert correct answer letter to index (0-3)
  //     const correctAnswerIndex = question.answer.charCodeAt(0) - 65;
  //     console.log("Question", questionIndex + 1, "User answer:", answerIndex, "Correct answer:", correctAnswerIndex); // Debug log

  //     // Compare indices directly
  //     if (answerIndex === correctAnswerIndex) {
  //       correctCount++;
  //     } else {
  //       wrong.push({
  //         questionNumber: questionIndex + 1,
  //         question: question.question,
  //         userAnswer: question.options[answerIndex],
  //         correctAnswer: question.options[correctAnswerIndex],
  //         explanation: question.explanation
  //       });
  //     }
  //   });

  //   // Calculate final score
  //   const finalScore = Math.round((correctCount / testData.questions.length) * 100);
  //   console.log("Total correct:", correctCount, "Total questions:", testData.questions.length, "Score:", finalScore); // Debug log
  //   return { score: finalScore, wrongAnswers: wrong };
  // };

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
          {dbStored&&<TealButton text={"Go-to Dashboard"}></TealButton>}

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