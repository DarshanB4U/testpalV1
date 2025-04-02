import React, { useState } from 'react';
import { BookOpen, ChevronDown, Search, Filter } from 'lucide-react';

// Mock data for book questions
const mockBooks = [
  { id: '1', title: 'NCERT Biology Class 11', subject: 'BIOLOGY' },
  { id: '2', title: 'NCERT Biology Class 12', subject: 'BIOLOGY' },
  { id: '3', title: 'NCERT Physics Class 11', subject: 'PHYSICS' },
  { id: '4', title: 'NCERT Physics Class 12', subject: 'PHYSICS' },
  { id: '5', title: 'NCERT Chemistry Class 11', subject: 'CHEMISTRY' },
  { id: '6', title: 'NCERT Chemistry Class 12', subject: 'CHEMISTRY' },
  { id: '7', title: 'HC Verma - Concepts of Physics Vol 1', subject: 'PHYSICS' },
  { id: '8', title: 'HC Verma - Concepts of Physics Vol 2', subject: 'PHYSICS' },
  { id: '9', title: 'Trueman\'s Biology Vol 1', subject: 'BIOLOGY' },
  { id: '10', title: 'Trueman\'s Biology Vol 2', subject: 'BIOLOGY' },
  { id: '11', title: 'OP Tandon - Physical Chemistry', subject: 'CHEMISTRY' },
  { id: '12', title: 'OP Tandon - Organic Chemistry', subject: 'CHEMISTRY' },
  { id: '13', title: 'OP Tandon - Inorganic Chemistry', subject: 'CHEMISTRY' }
];

const mockChapters = {
  '1': [
    { id: '1-1', title: 'The Living World' },
    { id: '1-2', title: 'Biological Classification' },
    { id: '1-3', title: 'Plant Kingdom' },
    { id: '1-4', title: 'Animal Kingdom' },
    { id: '1-5', title: 'Morphology of Flowering Plants' },
    { id: '1-6', title: 'Anatomy of Flowering Plants' },
    { id: '1-7', title: 'Structural Organisation in Animals' },
    { id: '1-8', title: 'Cell: The Unit of Life' },
    { id: '1-9', title: 'Biomolecules' },
    { id: '1-10', title: 'Cell Cycle and Cell Division' },
    { id: '1-11', title: 'Transport in Plants' },
    { id: '1-12', title: 'Mineral Nutrition' },
    { id: '1-13', title: 'Photosynthesis in Higher Plants' },
    { id: '1-14', title: 'Respiration in Plants' },
    { id: '1-15', title: 'Plant Growth and Development' },
    { id: '1-16', title: 'Digestion and Absorption' },
    { id: '1-17', title: 'Breathing and Exchange of Gases' },
    { id: '1-18', title: 'Body Fluids and Circulation' },
    { id: '1-19', title: 'Excretory Products and their Elimination' },
    { id: '1-20', title: 'Locomotion and Movement' },
    { id: '1-21', title: 'Neural Control and Coordination' },
    { id: '1-22', title: 'Chemical Coordination and Integration' }
  ],
  '3': [
    { id: '3-1', title: 'Physical World' },
    { id: '3-2', title: 'Units and Measurements' },
    { id: '3-3', title: 'Motion in a Straight Line' },
    { id: '3-4', title: 'Motion in a Plane' },
    { id: '3-5', title: 'Laws of Motion' },
    { id: '3-6', title: 'Work, Energy and Power' },
    { id: '3-7', title: 'System of Particles and Rotational Motion' },
    { id: '3-8', title: 'Gravitation' },
    { id: '3-9', title: 'Mechanical Properties of Solids' },
    { id: '3-10', title: 'Mechanical Properties of Fluids' },
    { id: '3-11', title: 'Thermal Properties of Matter' },
    { id: '3-12', title: 'Thermodynamics' },
    { id: '3-13', title: 'Kinetic Theory' },
    { id: '3-14', title: 'Oscillations' },
    { id: '3-15', title: 'Waves' }
  ],
  '5': [
    { id: '5-1', title: 'Some Basic Concepts of Chemistry' },
    { id: '5-2', title: 'Structure of Atom' },
    { id: '5-3', title: 'Classification of Elements and Periodicity in Properties' },
    { id: '5-4', title: 'Chemical Bonding and Molecular Structure' },
    { id: '5-5', title: 'States of Matter' },
    { id: '5-6', title: 'Thermodynamics' },
    { id: '5-7', title: 'Equilibrium' },
    { id: '5-8', title: 'Redox Reactions' },
    { id: '5-9', title: 'Hydrogen' },
    { id: '5-10', title: 's-Block Elements' },
    { id: '5-11', title: 'p-Block Elements' },
    { id: '5-12', title: 'Organic Chemistry - Some Basic Principles and Techniques' },
    { id: '5-13', title: 'Hydrocarbons' },
    { id: '5-14', title: 'Environmental Chemistry' }
  ]
};

// Mock questions for a specific chapter
const mockQuestionsForChapter = {
  '1-8': [
    {
      id: '1',
      text: 'Which of the following organelles is not enclosed by a membrane?',
      options: [
        'Nucleus',
        'Mitochondria',
        'Ribosome',
        'Golgi apparatus'
      ],
      correctOption: 2,
      explanation: 'Ribosomes are not enclosed by a membrane. They are composed of RNA and proteins and are responsible for protein synthesis. The nucleus, mitochondria, and Golgi apparatus are all membrane-bound organelles.',
      difficulty: 'EASY'
    },
    {
      id: '2',
      text: 'The fluid mosaic model of plasma membrane was proposed by:',
      options: [
        'Robert Hooke',
        'Singer and Nicolson',
        'Robert Brown',
        'Schleiden and Schwann'
      ],
      correctOption: 1,
      explanation: 'The fluid mosaic model of the plasma membrane was proposed by S.J. Singer and G.L. Nicolson in 1972. This model describes the cell membrane as a fluid structure with various proteins embedded in or attached to a double layer of phospholipids.',
      difficulty: 'EASY'
    },
    {
      id: '3',
      text: 'Which of the following statements about the nuclear pore is incorrect?',
      options: [
        'It allows the passage of RNA and proteins',
        'It is formed by the fusion of two nuclear membranes',
        'It is composed of proteins arranged in an octagonal manner',
        'It is impermeable to ions and small molecules'
      ],
      correctOption: 3,
      explanation: 'Nuclear pores are permeable to ions and small molecules. They allow the passage of RNA and proteins between the nucleus and cytoplasm, are formed by the fusion of the inner and outer nuclear membranes, and are composed of proteins arranged in an octagonal manner.',
      difficulty: 'MEDIUM'
    },
    {
      id: '4',
      text: 'Which of the following cell organelles is responsible for the formation of lysosomes?',
      options: [
        'Endoplasmic reticulum',
        'Golgi apparatus',
        'Mitochondria',
        'Peroxisomes'
      ],
      correctOption: 1,
      explanation: 'The Golgi apparatus is responsible for the formation of lysosomes. It packages hydrolytic enzymes into membrane-bound vesicles, which then bud off to form lysosomes. These lysosomes contain digestive enzymes that break down cellular waste products, foreign materials, and damaged organelles.',
      difficulty: 'MEDIUM'
    },
    {
      id: '5',
      text: 'The 9+2 pattern of microtubule arrangement is found in:',
      options: [
        'Centrioles',
        'Cilia and flagella',
        'Spindle fibers',
        'Bacterial flagella'
      ],
      correctOption: 1,
      explanation: 'The 9+2 pattern of microtubule arrangement is found in cilia and flagella of eukaryotic cells. This arrangement consists of nine pairs of peripheral microtubules surrounding two central microtubules. Centrioles have a 9+0 arrangement (nine triplets with no central microtubules), spindle fibers are individual microtubules, and bacterial flagella have a completely different structure made of flagellin protein.',
      difficulty: 'HARD'
    }
  ],
  '3-5': [
    {
      id: '1',
      text: 'According to Newton\'s second law of motion, the rate of change of momentum is directly proportional to:',
      options: [
        'Applied force',
        'Mass of the body',
        'Velocity of the body',
        'Acceleration of the body'
      ],
      correctOption: 0,
      explanation: 'According to Newton\'s second law of motion, the rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction of the force. Mathematically, F = dp/dt, where F is the applied force and dp/dt is the rate of change of momentum.',
      difficulty: 'EASY'
    },
    {
      id: '2',
      text: 'A force of 5 N acts on a body of mass 2 kg for 3 seconds. The change in momentum of the body is:',
      options: [
        '10 kg m/s',
        '15 kg m/s',
        '30 kg m/s',
        '6 kg m/s'
      ],
      correctOption: 1,
      explanation: 'Change in momentum = Force × Time = 5 N × 3 s = 15 kg m/s. This follows from the impulse-momentum theorem, which states that the impulse (force × time) equals the change in momentum.',
      difficulty: 'MEDIUM'
    },
    {
      id: '3',
      text: 'Two bodies of masses m and 4m are moving with equal kinetic energies. The ratio of their momenta is:',
      options: [
        '1:1',
        '1:2',
        '1:4',
        '1:√4'
      ],
      correctOption: 3,
      explanation: 'For the two bodies with masses m and 4m, let their velocities be v₁ and v₂ respectively. Given that their kinetic energies are equal: (1/2)mv₁² = (1/2)(4m)v₂². Simplifying: v₁² = 4v₂². So v₁ = 2v₂. The ratio of their momenta is p₁:p₂ = mv₁:4mv₂ = m(2v₂):4mv₂ = 2mv₂:4mv₂ = 1:2 = 1:√4.',
      difficulty: 'HARD'
    }
  ],
  '5-4': [
    {
      id: '1',
      text: 'Which of the following molecules has a linear shape?',
      options: [
        'H₂O',
        'NH₃',
        'CO₂',
        'CH₄'
      ],
      correctOption: 2,
      explanation: 'CO₂ (carbon dioxide) has a linear shape. The carbon atom forms double bonds with each oxygen atom, resulting in a linear arrangement with a bond angle of 180°. H₂O has a bent shape, NH₃ has a pyramidal shape, and CH₄ has a tetrahedral shape.',
      difficulty: 'EASY'
    },
    {
      id: '2',
      text: 'The hybridization of carbon in ethyne (C₂H₂) is:',
      options: [
        'sp',
        'sp²',
        'sp³',
        'sp³d'
      ],
      correctOption: 0,
      explanation: 'In ethyne (C₂H₂), each carbon atom is bonded to one hydrogen atom and the other carbon atom with a triple bond. The carbon atoms undergo sp hybridization, forming one sigma bond with hydrogen and one sigma bond with the other carbon atom. The remaining two p orbitals form two pi bonds between the carbon atoms.',
      difficulty: 'MEDIUM'
    },
    {
      id: '3',
      text: 'Which of the following statements about hydrogen bonding is incorrect?',
      options: [
        'It is stronger than van der Waals forces',
        'It occurs between highly electronegative atoms and hydrogen',
        'It is responsible for the high boiling point of water',
        'It is a type of covalent bond'
      ],
      correctOption: 3,
      explanation: 'Hydrogen bonding is not a type of covalent bond; it is a type of intermolecular force (dipole-dipole interaction). It occurs between a hydrogen atom bonded to a highly electronegative atom (like N, O, or F) and another electronegative atom. It is stronger than van der Waals forces and is responsible for the high boiling point of water compared to other hydrides.',
      difficulty: 'MEDIUM'
    }
  ]
};

const BookQuestions = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  
  // Filter books based on selected subject
  const filteredBooks = selectedSubject 
    ? mockBooks.filter(book => book.subject === selectedSubject)
    : mockBooks;
  
  // Get chapters for selected book
  const chapters = selectedBook ? (mockChapters[selectedBook as keyof typeof mockChapters] || []) : [];
  
  // Get questions for selected chapter
  const questions = selectedChapter 
    ? (mockQuestionsForChapter[selectedChapter as keyof typeof mockQuestionsForChapter] || [])
    : [];
  
  // Filter questions based on search query
  const filteredQuestions = searchQuery
    ? questions.filter(q => 
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
         q.options.some(option => option.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : questions;
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-teal-700">Book Questions</h1>
          <p className="text-gray-600 mt-2">
            Practice with questions from recommended NEET books
          </p>
        </div>
        
        {selectedChapter && (
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
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-teal-700 mr-2" />
          <h2 className="text-lg font-medium">Select Book and Chapter</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <div className="relative">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 pl-3 pr-10 text-base"
                value={selectedSubject || ''}
                onChange={(e) => {
                  const value = e.target.value || null;
                  setSelectedSubject(value);
                  setSelectedBook(null);
                  setSelectedChapter(null);
                }}
              >
                <option value="">Select Subject</option>
                <option value="PHYSICS">Physics</option>
                <option value="CHEMISTRY">Chemistry</option>
                <option value="BIOLOGY">Biology</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Book Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
            <div className="relative">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 pl-3 pr-10 text-base"
                value={selectedBook || ''}
                onChange={(e) => {
                  const value = e.target.value || null;
                  setSelectedBook(value);
                  setSelectedChapter(null);
                }}
                disabled={!selectedSubject}
              >
                <option value="">Select Book</option>
                {filteredBooks.map(book => (
                  <option key={book.id} value={book.id}>{book.title}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Chapter Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
            <div className="relative">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 pl-3 pr-10 text-base"
                value={selectedChapter || ''}
                onChange={(e) => setSelectedChapter(e.target.value || null)}
                disabled={!selectedBook || chapters.length === 0}
              >
                <option value="">Select Chapter</option>
                {chapters.map(chapter => (
                  <option key={chapter.id} value={chapter.id}>{chapter.title}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {selectedChapter ? (
        filteredQuestions.length > 0 ? (
          <div className="space-y-6">
            {filteredQuestions.map(question => (
              <div key={question.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <BookOpen className="h-5 w-5 text-teal-700" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
                        <div className="ml-4 flex-shrink-0">
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
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No questions found for this chapter. Try another chapter or adjust your search.</p>
          </div>
        )
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex flex-col items-center">
            <BookOpen className="h-16 w-16 text-indigo-200 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Book and Chapter</h3>
            <p className="text-gray-500">
              Choose a subject, book, and chapter from the filters above to view questions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookQuestions;