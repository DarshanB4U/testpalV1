import React, { useState } from 'react';
import { FileText, Filter, ChevronDown, Search } from 'lucide-react';

// Mock data for previous year questions
const mockPreviousYearQuestions = [
  {
    id: '1',
    text: 'The angle of minimum deviation for a prism is equal to the angle of the prism. The refractive index of the material of the prism is:',
    options: [
      '√2',
      '2',
      '1.5',
      '1.414'
    ],
    correctOption: 0,
    explanation: 'When the angle of minimum deviation (δ) equals the angle of the prism (A), the refractive index (μ) is given by μ = sin[(A+δ)/2]/sin(A/2). Substituting δ = A, we get μ = sin(A)/sin(A/2) = 2sin(A/2)cos(A/2)/sin(A/2) = 2cos(A/2). For this to equal √2, cos(A/2) = 1/√2, which means A/2 = 45° or A = 90°.',
    subject: 'PHYSICS',
    year: 2022,
    difficulty: 'MEDIUM'
  },
  {
    id: '2',
    text: 'Which of the following statements is incorrect about the catalytic converter used in automobiles?',
    options: [
      'It has expensive metals like platinum-palladium and rhodium.',
      'It converts unburnt hydrocarbons into carbon dioxide and water.',
      'It reduces the release of carbon monoxide and nitrogen oxides.',
      'It converts carbon monoxide and nitrogen oxides into nitrogen gas.'
    ],
    correctOption: 3,
    explanation: 'A catalytic converter does convert carbon monoxide to carbon dioxide and reduces nitrogen oxides, but it converts nitrogen oxides to nitrogen gas and oxygen, not carbon monoxide to nitrogen gas. The correct statement would be that it converts carbon monoxide to carbon dioxide and nitrogen oxides to nitrogen gas.',
    subject: 'CHEMISTRY',
    year: 2022,
    difficulty: 'EASY'
  },
  {
    id: '3',
    text: 'Which of the following is not a stem modification?',
    options: [
      'Rhizome',
      'Tuber',
      'Bulb',
      'Tap root'
    ],
    correctOption: 3,
    explanation: 'Tap root is a root modification, not a stem modification. Rhizomes (ginger), tubers (potato), and bulbs (onion) are all modified stems that serve various functions like food storage and vegetative propagation.',
    subject: 'BIOLOGY',
    year: 2021,
    difficulty: 'EASY'
  },
  {
    id: '4',
    text: 'The half-life of a radioactive isotope is 20 days. The time taken for 7/8th of the isotope to decay is:',
    options: [
      '40 days',
      '60 days',
      '80 days',
      '100 days'
    ],
    correctOption: 1,
    explanation: 'Using the formula N = N₀(1/2)^(t/t₁/₂), where N is the remaining amount, N₀ is the initial amount, t is the time, and t₁/₂ is the half-life. For 7/8th decay, the remaining fraction is 1/8. So, 1/8 = (1/2)^(t/20). Taking log on both sides: log(1/8) = t/20 × log(1/2). Solving for t gives t = 60 days.',
    subject: 'PHYSICS',
    year: 2021,
    difficulty: 'MEDIUM'
  },
  {
    id: '5',
    text: 'Which of the following statements about enzymes is incorrect?',
    options: [
      'Enzymes are highly specific in their action.',
      'Enzymes are denatured at high temperatures.',
      'Enzyme action is independent of pH.',
      'Enzymes are biocatalysts.'
    ],
    correctOption: 2,
    explanation: 'Enzyme action is highly dependent on pH. Each enzyme has an optimal pH range in which it functions most efficiently. Outside this range, the enzyme activity decreases due to changes in the ionic state of the enzyme or substrate, affecting the enzyme\'s three-dimensional structure.',
    subject: 'BIOLOGY',
    year: 2020,
    difficulty: 'MEDIUM'
  },
  {
    id: '6',
    text: 'The hybridization of carbon in diamond, graphite and fullerene respectively are:',
    options: [
      'sp³, sp², sp²',
      'sp³, sp², sp',
      'sp², sp³, sp',
      'sp², sp, sp³'
    ],
    correctOption: 0,
    explanation: 'In diamond, each carbon atom is bonded to four other carbon atoms in a tetrahedral arrangement, resulting in sp³ hybridization. In graphite, each carbon atom is bonded to three other carbon atoms in a planar arrangement, resulting in sp² hybridization. In fullerene (C₆₀), carbon atoms are also arranged in a combination of pentagons and hexagons with sp² hybridization.',
    subject: 'CHEMISTRY',
    year: 2020,
    difficulty: 'HARD'
  },
  {
    id: '7',
    text: 'A particle is moving with a velocity v = 4t³i + 3t²j where t is time. The magnitude of acceleration of the particle at t = 2 s is:',
    options: [
      '12 m/s²',
      '24 m/s²',
      '36 m/s²',
      '48 m/s²'
    ],
    correctOption: 2,
    explanation: 'The velocity is v = 4t³i + 3t²j. The acceleration is a = dv/dt = 12t²i + 6tj. At t = 2s, a = 12(2)²i + 6(2)j = 48i + 12j. The magnitude of acceleration is |a| = √(48² + 12²) = √(2304 + 144) = √2448 = 36√2 m/s².',
    subject: 'PHYSICS',
    year: 2019,
    difficulty: 'HARD'
  },
  {
    id: '8',
    text: 'Which of the following hormones is not secreted by the anterior pituitary gland?',
    options: [
      'Growth Hormone (GH)',
      'Prolactin',
      'Follicle Stimulating Hormone (FSH)',
      'Oxytocin'
    ],
    correctOption: 3,
    explanation: 'Oxytocin is secreted by the posterior pituitary gland, not the anterior pituitary. The anterior pituitary secretes Growth Hormone (GH), Prolactin, Follicle Stimulating Hormone (FSH), Luteinizing Hormone (LH), Thyroid Stimulating Hormone (TSH), and Adrenocorticotropic Hormone (ACTH).',
    subject: 'BIOLOGY',
    year: 2019,
    difficulty: 'MEDIUM'
  }
];

const PreviousYears = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  
  // Filter questions based on selected filters
  const filteredQuestions = mockPreviousYearQuestions.filter(question => {
    return (
      (!selectedSubject || question.subject === selectedSubject) &&
      (!selectedYear || question.year === selectedYear) &&
      (!selectedDifficulty || question.difficulty === selectedDifficulty) &&
      (!searchQuery || 
        question.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.options.some(option => option.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  });
  
  // Get unique years for filter
  const years = Array.from(new Set(mockPreviousYearQuestions.map(q => q.year))).sort((a, b) => b - a);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-teal-700">Previous Year Questions</h1>
          <p className="text-gray-600 mt-2">
            Practice with actual questions from past NEET examinations
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 relative">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <div className="pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              className="py-2 px-3 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-teal-700 mr-2" />
          <h2 className="text-lg font-medium">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <div className="relative">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 pl-3 pr-10 text-base"
                value={selectedSubject || ''}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
              >
                <option value="">All Subjects</option>
                <option value="PHYSICS">Physics</option>
                <option value="CHEMISTRY">Chemistry</option>
                <option value="BIOLOGY">Biology</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <div className="relative">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 pl-3 pr-10 text-base"
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <div className="relative">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 pl-3 pr-10 text-base"
                value={selectedDifficulty || ''}
                onChange={(e) => setSelectedDifficulty(e.target.value || null)}
              >
                <option value="">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(question => (
            <div key={question.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FileText className="h-5 w-5 text-teal-700" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {question.subject}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {question.year}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          question.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                          question.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      {question.options.map((option, index) => (
                        <div 
                          key={index}
                          className={`p-3 border rounded-lg ${
                            expandedQuestion === question.id && index === question.correctOption
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="mr-3">
                              <div className={`h-6 w-6 flex items-center justify-center rounded-full border ${
                                expandedQuestion === question.id && index === question.correctOption
                                  ? 'border-green-500 text-green-500'
                                  : 'border-gray-400 text-gray-500'
                              }`}>
                                {String.fromCharCode(65 + index)}
                              </div>
                            </div>
                            <div className="flex-1">{option}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                        className="text-teal-700 hover:text-indigo-800 text-sm font-medium"
                      >
                        {expandedQuestion === question.id ? 'Hide Explanation' : 'Show Explanation'}
                      </button>
                    </div>
                    
                    {expandedQuestion === question.id && (
                      <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-medium text-indigo-800 mb-2">Explanation:</h4>
                        <p className="text-gray-700">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No questions match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousYears;