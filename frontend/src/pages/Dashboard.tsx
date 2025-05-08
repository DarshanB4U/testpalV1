import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, BarChart2, Clock } from 'lucide-react';
import { authService, questionService } from '../services/api';
import LoadingPopup from '../components/LoadingPopup';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({
    questionsAttempted: 0,
    accuracy: 0,
    testAttempted: 0,
    streak:0
  });
  const [pastTests, setPastTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const getSubjectName = (subjectId) => {
    switch (subjectId) {
      case 1:
        return "Physics";
      case 2:
        return "Chemistry";
      case 3:
        return "Biology";
      default:
        return "Unknown";
    }
  };

  const handleTestClick = async (testId) => {
    try {
      setLoading(true);
      const response = await authService.getTestById(testId);
      setSelectedTest(response.test);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching test details:", error);
    }
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    console.log("Dashboard mounted ✅");
    const name = localStorage.getItem("username");
    
    const fetchtests = async () => {
      const tests = await authService.getAllTests();
      // Sort tests by creation date in descending order
      const sortedTests = tests.sort(
        (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPastTests(sortedTests);

      // Calculate total questions and accuracy
      let totalQuestions = 0;
      let totalCorrect = 0;

      // Group tests by subject
      const physicsTests = sortedTests.filter(test => test.subjectId === 1);
      const chemistryTests = sortedTests.filter(test => test.subjectId === 2);
      const biologyTests = sortedTests.filter(test => test.subjectId === 3);
    

      const totalTetsNo=tests.length
      console.log(totalTetsNo)

      function calculateStreak(tests) {
        const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
        console.log()
        const datesSet = new Set(
          tests.map(test => new Date(test.createdAt).toISOString().slice(0, 10))
        );
      
        let streak = 0;
        let currentDate = new Date(today);
      
        while (datesSet.has(currentDate.toISOString().slice(0, 10))) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        }
      
        return streak;
      }
      // Calculate streak
      const streak = calculateStreak(tests);
      // console.log("streak",streak)     
       

      function getAccuracy(tests){
        let score=0;
        let testAttempted=0
        
        for(let i = 0; i < tests.length; i++) {
          const test = tests[i]
         
          if (test.score) {
            testAttempted+=1;
            score+=test.score
            
            
          }
        }
        let allTestScore=testAttempted*100

        let accuracy = testAttempted > 0 ? Math.floor((score / allTestScore) * 100) : 0;
        return {accuracy,testAttempted}
        
        
      }
      
     const accuracy = getAccuracy(tests)
      console.log("accuracy",accuracy)
     
      // tests.forEach(test => {
      //   if (test.score) {

      //     totalCorrect += Math.floor((test.score * test.questions.length) / 100);
      //   }
      // });

      // const accuracy = totalQuestions > 0 ? Math.floor((totalCorrect / totalQuestions) * 100) : 0;
  const qNO = await questionService.attemptedQuestions()
  console.log(qNO)
      setUserData({
        questionsAttempted: qNO.questions,
        accuracy: accuracy.accuracy,
        testAttempted:accuracy.testAttempted,
        streak:streak
      }); 

      // Get last 5 tests for each subject
      const lastPhysics = physicsTests.slice(0, 5).reverse();
      const lastChemistry = chemistryTests.slice(0, 5).reverse();
      const lastBiology = biologyTests.slice(0, 5).reverse();

      // Prepare chart data with multiple datasets
      setChartData({
        labels: lastPhysics.map(test => new Date(test.createdAt).toLocaleDateString()),
        datasets: [
          {
            label: 'Physics',
            data: lastPhysics.map(test => test.score),
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
            tension: 0.4
          },
          {
            label: 'Chemistry',
            data: lastChemistry.map(test => test.score),
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            tension: 0.4
          },
          {
            label: 'Biology',
            data: lastBiology.map(test => test.score),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.4
          }
        ]
      });
    };

    fetchtests();
    
    if (name) {
      setUsername(name);
    }
  }, []);

  return (
    <>
      <LoadingPopup isLoading={loading} />

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {username}!
                </h1>
                <p className="text-gray-600 mt-1">
                  Let's continue your NEET preparation journey
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <Calendar className="h-5 w-5 text-teal-700 mr-2" />
                <span className="text-gray-600">
                  Today:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
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
                  <p className="text-sm text-gray-500">Total Test</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.testAttempted} Attempted </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {userData.questionsAttempted}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {userData.accuracy}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.streak} Days</p>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Performance Trend</h2>
            <div className="h-[300px]">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Score (%)'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Test Date'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        usePointStyle: true,
                        padding: 20
                      }
                    },
                    title: {
                      display: true,
                      text: 'Recent Test Performance by Subject'
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Past Tests section */}
        {/* Add this new section for past tests */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Past Tests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pastTests.map((test:any) => (
                  <tr
                    key={test.id}
                    onClick={() => handleTestClick(test.id)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {test.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getSubjectName(test.subjectId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {test.score !== null ? `${test.score}%` : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          test.submitted
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {test.submitted ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(test.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedTest && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedTest.title}
                </h3>
                <button
                  onClick={() => setSelectedTest(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-lg font-semibold">
                    Score: {selectedTest.score}%
                  </p>
                  <p>Subject: {getSubjectName(selectedTest.subjectId)}</p>
                  <p>
                    Date: {new Date(selectedTest.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Questions Review:</h4>
                  {selectedTest.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`p-4 rounded ${
                        selectedTest.uanswers[index].charAt(0) ===
                        question.answer
                          ? "bg-green-50"
                          : "bg-red-50"
                      }`}
                    >
                      <p className="font-medium">
                        Q{index + 1}: {question.question}
                      </p>
                      <p className="text-gray-600">
                        Your Answer: {selectedTest.uanswers[index]}
                      </p>
                      <p className="text-green-600">
                        Correct Answer:{" "}
                        {question.options[question.answer.charCodeAt(0) - 65]}
                      </p>
                      {selectedTest.uanswers[index].charAt(0) !==
                        question.answer && (
                        <div className="mt-2 bg-white p-3 rounded">
                          <p className="font-medium">Explanation:</p>
                          <p className="text-gray-700">
                            {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
