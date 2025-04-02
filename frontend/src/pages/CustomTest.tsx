import React, { useState, useEffect } from 'react';
import { Subject, Difficulty } from '../types';

interface TopicOption {
  id: string;
  name: string;
  subject: Subject;
  _count: {
    questions: number;
  };
}

const CustomTest = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    // Fetch initial options
    fetchOptions();
  }, []);

  useEffect(() => {
    // Fetch topics when subjects change
    if (selectedSubjects.length > 0) {
      fetchTopics();
    }
  }, [selectedSubjects]);

  const fetchOptions = async () => {
    try {
      const response = await fetch('/api/custom-test/options');
      const data = await response.json();
      if (data.success) {
        setSubjects(data.data.subjects);
        setDifficulties(data.data.difficulties);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchTopics = async () => {
    try {
      const topicsPromises = selectedSubjects.map(subject =>
        fetch(`/api/topics/${subject}`).then(res => res.json())
      );
      const topicsResults = await Promise.all(topicsPromises);
      const allTopics = topicsResults.flatMap(result => result.topics);
      setTopics(allTopics);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleGenerateTest = async () => {
    try {
      const response = await fetch('/api/custom-test/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjects: selectedSubjects,
          topics: selectedTopics,
          difficulty: selectedDifficulties,
          questionCount,
          title
        }),
      });
      
      const data = await response.json();
      if (data.success) {
        // Navigate to the test
        // history.push(`/test/${data.test.id}`);
      }
    } catch (error) {
      console.error('Error generating test:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Generate Custom Test</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Test Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter test title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Subjects</label>
          <div className="grid grid-cols-3 gap-2">
            {subjects.map(subject => (
              <label key={subject} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => {
                    setSelectedSubjects(prev =>
                      prev.includes(subject)
                        ? prev.filter(s => s !== subject)
                        : [...prev, subject]
                    );
                  }}
                  className="mr-2"
                />
                {subject}
              </label>
            ))}
          </div>
        </div>

        {/* Similar sections for topics and difficulties */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Questions per Subject
          </label>
          <input
            type="number"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            min="1"
            max="50"
            className="w-32 p-2 border rounded"
          />
        </div>

        <button
          onClick={handleGenerateTest}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Test
        </button>
      </div>
    </div>
  );
};

export default CustomTest; 