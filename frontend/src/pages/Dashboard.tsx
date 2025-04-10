import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  CheckCircle,
  BarChart2,
  BookOpen,
  Brain,
  Award,
} from "lucide-react";
import { authService } from "../services/api";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({
    questionsAttempted: 0,
    accuracy: 0,
  });

  useEffect(() => {
    console.log("Dashboard mounted ✅");

    const name = localStorage.getItem("username");

    const fetchtests = async () => {
      const tests = await authService.getAllTests();
      console.log(tests);
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

    // You can add API call here to fetch user stats
  }, []);

  return (
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
    </div>
  );
};

export default Dashboard;
