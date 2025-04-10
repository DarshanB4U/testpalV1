import { useState, useEffect } from "react";
import axios from "axios";
import { questionService } from "../services/api";
import { useNavigate } from "react-router-dom";
import TestGenerationLoader from "../components/loading";
import { Brain } from "lucide-react";

const subjectsData = {
  "1": [
    "Physics and Measurement",
    "Kinematics",
    "Laws of Motion",
    "Work, Energy, and Power",
    "Rotational Motion",
    "Gravitation",
    "Properties of Solids and Liquids",
    "Thermodynamics",
    "Kinetic Theory of Gases",
    "Oscillations and Waves",
    "Electrostatics",
    "Current Electricity",
    "Magnetic Effects of Current and Magnetism",
    "Electromagnetic Induction and Alternating Currents",
    "Electromagnetic Waves",
    "Optics",
    "Dual Nature of Matter and Radiation",
    "Atoms and Nuclei",
    "Electronic Devices",
    "Experimental Skills",
  ],
  "2": [
    "Some Basic Concepts in Chemistry",
    "Atomic Structure",
    "Chemical Bonding and Molecular Structure",
    "Chemical Thermodynamics",
    "Solutions",
    "Redox Reactions and Electrochemistry",
    "Chemical Kinetics",
    "Classification of Elements and Periodicity in Properties",
    "P-Block Elements",
    "d- and f-Block Elements",
    "Co-ordination Compounds",
    "Purification and Characterisation of Organic Compounds",
    "Some Basic Principles of Organic Chemistry",
    "Hydrocarbons",
    "Organic Compounds Containing Halogens",
    "Organic Compounds Containing Oxygen",
    "Organic Compounds Containing Nitrogen",
    "Biomolecules",
    "Principles Related to Practical Chemistry",
  ],
  "3": [
    "Diversity in Living World",
    "Structural Organisation in Animals and Plants",
    "Cell Structure and Function",
    "Plant Physiology",
    "Human Physiology",
    "Reproduction",
    "Genetics and Evolution",
    "Biology and Human Welfare",
    "Biotechnology and Its Applications",
    "Ecology and Environment",
  ],
};

const GeneratePaper = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [count, setCount] = useState(10);
  const [title, setTitle] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState(null);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  useEffect(() => {
    if (subject) {
      setAvailableTopics(
        subjectsData[subject as keyof typeof subjectsData] || []
      );
      setSelectedTopics([]);
    }
  }, [subject]);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      }
      // Check if adding a new topic would exceed the question count
      if (prev.length >= count) {
        return prev;
      }
      return [...prev, topic];
    });
  };

  const handleGenerate = async () => {
    if (!subject || !difficulty || selectedTopics.length === 0 || !title)
      return;

    setLoading(true);

    const testpayload = {
      subject: subject,
      topics: selectedTopics,
      count,
      difficulty,
    };
    try {
      const response = await questionService.genrateTest(title, testpayload);
      navigate("/submit-test");
    } catch (error) {
      console.error("Error generating paper:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <TestGenerationLoader></TestGenerationLoader>
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl flex  font-bold text-teal-800 mb-6">
        <span className="flex items-center">
            <Brain className="h-6 w-6 mr-1" />
          </span>
          Generate Paper {"  "}
          
        </h1>

        <div className="space-y-6">
          {/* Add title field before the grid */}
          <div>
            <label className="block text-md font-medium text-gray-700 mb-2">
              Paper Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter paper title"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                <option value="1">Physics</option>
                <option value="2">Chemistry</option>
                <option value="3">Biology</option>
              </select>
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">Select Difficulty</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">
                Questions
              </label>
              <input
                type="number"
                min="1"
                max="50"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
              />
            </div>
          </div>

          {subject && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topics
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-3 border rounded-md">
                {availableTopics.map((topic) => (
                  <div key={topic} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleTopicToggle(topic)}
                      disabled={
                        !selectedTopics.includes(topic) &&
                        selectedTopics.length >= count
                      }
                      className={`flex-1 p-2 text-left text-sm rounded-md transition-colors ${
                        selectedTopics.includes(topic)
                          ? "bg-teal-100 text-teal-800 hover:bg-teal-200"
                          : selectedTopics.length >= count
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {topic}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setSubject("");
                setDifficulty("");
                setCount(10);
                setTitle("");
                setSelectedTopics([]);
                setPaper(null);
              }}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Reset
            </button>
            <button
              onClick={handleGenerate}
              disabled={
                loading ||
                !subject ||
                !difficulty ||
                selectedTopics.length === 0 ||
                !title
              }
              className="px-6 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Paper"}
            </button>
          </div>
        </div>

        {paper && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Generated Paper</h2>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(paper, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePaper;
