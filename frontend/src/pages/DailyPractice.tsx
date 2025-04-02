import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';

// Mock data for daily practice paper
const mockQuestions = [
  {
    id: '1',
    text: 'Which of the following is NOT a function of the cell membrane?',
    options: [
      'Regulating the movement of materials into and out of the cell',
      'Providing structural support to the cell',
      'Synthesizing proteins for cellular functions',
      'Facilitating cell-to-cell communication'
    ],
    correctOption: 2,
    explanation: 'The cell membrane regulates movement of materials, provides structural support, and facilitates cell communication. Protein synthesis occurs in ribosomes, not in the cell membrane.',
    subject: 'BIOLOGY',
    chapter: 'Cell Structure and Function'
  },
  {
    id: '2',
    text: 'Calculate the wavelength of a photon with energy 3.0 eV.',
    options: [
      '414 nm',
      '620 nm',
      '310 nm',
      '248 nm'
    ],
    correctOption: 0,
    explanation: 'Using the formula E = hc/λ, where E is energy, h is Planck\'s constant, c is speed of light, and λ is wavelength. Converting 3.0 eV to joules and solving for λ gives approximately 414 nm.',
    subject: 'PHYSICS',
    chapter: 'Dual Nature of Matter and Radiation'
  },
  {
    id: '3',
    text: 'Which of the following compounds will give a positive Tollens\' test?',
    options: [
      'Benzaldehyde',
      'Acetone',
      'Benzophenone',
      'Benzoic acid'
    ],
    correctOption: 0,
    explanation: 'Tollens\' reagent (silver nitrate in aqueous ammonia) reacts with aldehydes to form a silver mirror. Benzaldehyde is an aldehyde and will give a positive test, while acetone (a ketone), benzophenone (a ketone), and benzoic acid (a carboxylic acid) will not.',
    subject: 'CHEMISTRY',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids'
  },
  {
    id: '4',
    text: 'Which of the following is the correct sequence of events in the cardiac cycle?',
    options: [
      'Atrial systole → Ventricular systole → Cardiac diastole',
      'Ventricular systole → Atrial systole → Cardiac diastole',
      'Cardiac diastole → Atrial systole → Ventricular systole',
      'Atrial systole → Cardiac diastole → Ventricular systole'
    ],
    correctOption: 2,
    explanation: 'The cardiac cycle begins with a cardiac diastole (relaxation of both atria and ventricles), followed by atrial systole (contraction of atria), and then ventricular systole (contraction of ventricles).',
    subject: 'BIOLOGY',
    chapter: 'Body Fluids and Circulation'
  },
  {
    id: '5',
    text: 'A particle moves in a circle of radius 5 cm with constant speed and completes the circle in 0.2π seconds. The acceleration of the particle is:',
    options: [
      '5 m/s²',
      '25 m/s²',
      '0.5 m/s²',
      '2.5 m/s²'
    ],
    correctOption: 1,
    explanation: 'For circular motion, acceleration a = v²/r. The speed v = 2πr/T where T is the time period. Substituting r = 0.05 m and T = 0.2π s, we get v = 0.5 m/s. Therefore, a = (0.5)²/0.05 = 5 m/s².',
    subject: 'PHYSICS',
    chapter: 'Circular Motion'
  },
  {
    id: '6',
    text: 'A particle moves in a circle of radius 5 cm with constant speed and completes the circle in 0.2π seconds. The acceleration of the particle is:',
    options: [
      '5 m/s²',
      '25 m/s²',
      '0.5 m/s²',
      '2.5 m/s²'
    ],
    correctOption: 1,
    explanation: 'For circular motion, acceleration a = v²/r. The speed v = 2πr/T where T is the time period. Substituting r = 0.05 m and T = 0.2π s, we get v = 0.5 m/s. Therefore, a = (0.5)²/0.05 = 5 m/s².',
    subject: 'PHYSICS',
    chapter: 'Circular Motion'
  }
];

const DailyPractice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(mockQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer effect
  React.useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      setIsCompleted(true);
    }
  }, [timeLeft, isCompleted]);

  const handleOptionSelect = (optionIndex: number) => {
    if (!showExplanation && !isCompleted) {
      setSelectedOption(optionIndex);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = optionIndex;
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
      setShowExplanation(false);
    } else if (!isCompleted) {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === mockQuestions[index].correctOption) {
        score++;
      }
    });
    return score;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isCompleted) {
    const score = calculateScore();
    const percentage = (score / mockQuestions.length) * 100;
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-teal-700 mb-8">Daily Practice Results</h1>
          
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-indigo-700">{score}/{mockQuestions.length}</div>
            <div className="text-xl mt-2">{percentage.toFixed(1)}%</div>
            <div className="mt-4 text-gray-600">
              {percentage >= 80 ? 'Excellent! Keep up the good work!' : 
               percentage >= 60 ? 'Good job! Room for improvement.' : 
               'You need more practice. Don\'t give up!'}
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Question Review:</h2>
            <div className="space-y-4">
              {mockQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {answers[index] === question.correctOption ? 
                        <CheckCircle className="text-green-500 h-5 w-5" /> : 
                        <XCircle className="text-red-500 h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium">{index + 1}. {question.text}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Your answer: {answers[index] !== null ? question.options[answers[index]] : 'Not answered'}</p>
                        <p className="text-green-600">Correct answer: {question.options[question.correctOption]}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        <p className="font-medium">Explanation:</p>
                        <p>{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button 
              className="px-6 py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Another Practice Paper
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-teal-700">Daily Practice Paper</h1>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span className={`font-medium ${timeLeft < 60 ? 'text-red-500' : ''}`}>
              Time left: {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        <div className="mb-4 flex justify-between text-sm text-gray-500">
          <span>Question {currentQuestion + 1} of {mockQuestions.length}</span>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
            {mockQuestions[currentQuestion].subject}
          </span>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-4">{mockQuestions[currentQuestion].text}</h2>
          
          <div className="space-y-3">
            {mockQuestions[currentQuestion].options.map((option, index) => (
              <div 
                key={index}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedOption === index 
                    ? showExplanation 
                      ? index === mockQuestions[currentQuestion].correctOption 
                        ? 'bg-green-100 border-green-300' 
                        : 'bg-red-100 border-red-300'
                      : 'bg-indigo-100 border-indigo-300' 
                    : showExplanation && index === mockQuestions[currentQuestion].correctOption
                      ? 'bg-green-100 border-green-300'
                      : 'hover:bg-gray-50'
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-start">
                  <div className="mr-3">
                    <div className={`h-6 w-6 flex items-center justify-center rounded-full border ${
                      selectedOption === index 
                        ? showExplanation 
                          ? index === mockQuestions[currentQuestion].correctOption 
                            ? 'border-green-500 text-green-500' 
                            : 'border-red-500 text-red-500'
                          : 'border-indigo-500 text-indigo-500' 
                        : showExplanation && index === mockQuestions[currentQuestion].correctOption
                          ? 'border-green-500 text-green-500'
                          : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                  </div>
                  <div className="flex-1">{option}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showExplanation && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Explanation:</h3>
            <p className="text-gray-700">{mockQuestions[currentQuestion].explanation}</p>
          </div>
        )}
        
        <div className="flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentQuestion === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
            }`}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </button>
          
          <div className="flex space-x-3">
            {!showExplanation && selectedOption !== null && (
              <button 
                onClick={() => setShowExplanation(true)}
                className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-indigo-700"
              >
                Check Answer
              </button>
            )}
            
            <button 
              onClick={handleNext}
              className="flex items-center px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-indigo-700"
            >
              {currentQuestion === mockQuestions.length - 1 ? 'Finish' : 'Next'}
              {currentQuestion < mockQuestions.length - 1 && <ArrowRight className="h-4 w-4 ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPractice;