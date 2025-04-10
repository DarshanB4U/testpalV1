import { useEffect, useState } from "react";
import LoadingPopup from "../components/LoadingPopup";
import { Link } from "react-router-dom";
import { Calendar, Clock, CheckCircle, BarChart2 } from "lucide-react";
import { authService } from "../services/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({
    questionsAttempted: 0,
    accuracy: 0,
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

  useEffect(() => {
    console.log("Dashboard mounted ✅");
    const name = localStorage.getItem("username");
    
    const fetchtests = async () => {
     
      const tests = await authService.getAllTests();
      // Sort tests by creation date in descending order
      const sortedTests = tests.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPastTests(sortedTests);
      const totalschore = function getscore(testarray: any) {
        let numberofquestions = 0;
        let score = 0;

        for (let i = 0; i < testarray.length; i++) {
          score += testarray[i].score;
          numberofquestions += testarray[i].questions.length;
        }
        const marks = [score, numberofquestions];
        return marks;
      };
      const score = totalschore(tests);

      function percentage(partialValue: number, totalValue: number) {
        return Math.floor((100 * partialValue) / totalValue);
      }
      const accuracy = percentage(score[0], score[1]);

      setUserData({
        questionsAttempted: score[1],
        accuracy: accuracy,
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
                  <p className="text-sm text-gray-500">Daily Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{} days</p>
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
                  <p className="text-sm text-gray-500">Last Session</p>
                  <p className="text-2xl font-bold text-gray-900">Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                {pastTests.map((test) => (
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
