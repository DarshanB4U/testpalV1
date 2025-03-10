import React, { useState } from 'react';
import { Send, Brain, Loader2 } from 'lucide-react';

// Mock AI responses
const mockResponses: Record<string, string> = {
  "What is photosynthesis?": "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars. This process occurs in the chloroplasts of plant cells, specifically in the grana where chlorophyll is present. The basic equation for photosynthesis is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process is essential for life on Earth as it produces oxygen and serves as the primary source of energy for most ecosystems.",
  
  "Explain Newton's laws of motion": "Newton's laws of motion are three fundamental principles that describe the relationship between the motion of an object and the forces acting on it:\n\n1. First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.\n\n2. Second Law: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Mathematically, F = ma, where F is the net force, m is the mass, and a is the acceleration.\n\n3. Third Law: For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first object.",
  
  "What is the difference between mitosis and meiosis?": "Mitosis and meiosis are both processes of cell division, but they serve different purposes and have key differences:\n\nMitosis:\n- Produces two genetically identical daughter cells\n- Maintains the chromosome number (diploid to diploid)\n- Occurs in somatic (body) cells\n- Used for growth, repair, and asexual reproduction\n- Consists of one division cycle\n\nMeiosis:\n- Produces four genetically diverse haploid cells\n- Reduces the chromosome number by half (diploid to haploid)\n- Occurs in germ cells to produce gametes (eggs or sperm)\n- Essential for sexual reproduction\n- Involves two division cycles (meiosis I and meiosis II)\n- Includes crossing over, which increases genetic diversity",
  
  "How do I solve pH problems in chemistry?": "To solve pH problems in chemistry, follow these steps:\n\n1. Identify what you're working with: strong acid/base, weak acid/base, or a buffer solution.\n\n2. For strong acids/bases:\n   - pH = -log[H⁺] for acids\n   - pH = 14 - (-log[OH⁻]) for bases\n   - Remember that [H⁺] = molarity for strong acids\n\n3. For weak acids:\n   - Use the Ka (acid dissociation constant) and ICE table (Initial, Change, Equilibrium)\n   - Set up the equilibrium expression: Ka = [H⁺][A⁻]/[HA]\n   - Solve for [H⁺], then calculate pH\n\n4. For weak bases:\n   - Use Kb (base dissociation constant) and ICE table\n   - Set up the equilibrium expression: Kb = [BH⁺][OH⁻]/[B]\n   - Solve for [OH⁻], calculate pOH, then pH = 14 - pOH\n\n5. For buffers, use the Henderson-Hasselbalch equation:\n   - pH = pKa + log([A⁻]/[HA])\n\nExample: For 0.1M HCl (strong acid), [H⁺] = 0.1M, so pH = -log(0.1) = 1",
  
  "Explain the Krebs cycle": "The Krebs cycle (also known as the citric acid cycle or TCA cycle) is a series of chemical reactions that occurs in the mitochondria and is a key part of cellular respiration. Here's a simplified explanation:\n\n1. The cycle begins when acetyl-CoA (derived from pyruvate after glycolysis) combines with oxaloacetate to form citrate.\n\n2. Through a series of reactions, citrate is transformed through various intermediates (isocitrate, α-ketoglutarate, succinyl-CoA, succinate, fumarate, malate), eventually regenerating oxaloacetate.\n\n3. During these transformations, the cycle:\n   - Releases CO₂ (decarboxylation)\n   - Reduces NAD⁺ to NADH (3 molecules per cycle)\n   - Reduces FAD to FADH₂ (1 molecule per cycle)\n   - Produces GTP (which is converted to ATP)\n\n4. The NADH and FADH₂ produced carry electrons to the electron transport chain, where they drive ATP production through oxidative phosphorylation.\n\nFor each glucose molecule that enters glycolysis, the Krebs cycle runs twice (once for each pyruvate molecule), producing a total of 6 NADH, 2 FADH₂, and 2 ATP/GTP molecules."
};

// Function to get a mock response
const getMockResponse = (question: string): string => {
  // Check for exact matches
  if (mockResponses[question]) {
    return mockResponses[question];
  }
  
  // Check for partial matches
  const lowerQuestion = question.toLowerCase();
  if (lowerQuestion.includes("photosynthesis")) {
    return mockResponses["What is photosynthesis?"];
  } else if (lowerQuestion.includes("newton") || lowerQuestion.includes("motion")) {
    return mockResponses["Explain Newton's laws of motion"];
  } else if (lowerQuestion.includes("mitosis") || lowerQuestion.includes("meiosis")) {
    return mockResponses["What is the difference between mitosis and meiosis?"];
  } else if (lowerQuestion.includes("ph") || lowerQuestion.includes("acid") || lowerQuestion.includes("base")) {
    return mockResponses["How do I solve pH problems in chemistry?"];
  } else if (lowerQuestion.includes("krebs") || lowerQuestion.includes("citric") || lowerQuestion.includes("tca")) {
    return mockResponses["Explain the Krebs cycle"];
  }
  
  // Default response
  return "I don't have specific information on that topic yet. Please try asking about photosynthesis, Newton's laws of motion, mitosis vs meiosis, pH problems, or the Krebs cycle for demonstration purposes.";
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your NEET AI assistant. Ask me any question about Physics, Chemistry, or Biology to help with your NEET preparation.",
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(input),
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Suggested questions
  const suggestedQuestions = [
    "What is photosynthesis?",
    "Explain Newton's laws of motion",
    "What is the difference between mitosis and meiosis?",
    "How do I solve pH problems in chemistry?",
    "Explain the Krebs cycle"
  ];
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[80vh]">
        <div className="bg-teal-700 text-white p-4">
          <div className="flex items-center">
            <Brain className="h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold">NEET AI Assistant</h1>
          </div>
          <p className="text-indigo-100 text-sm mt-1">
            Ask any question related to Physics, Chemistry, or Biology
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-teal-700 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 flex items-center">
                <Loader2 className="h-5 w-5 text-teal-700 animate-spin mr-2" />
                <span className="text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
        </div>
        
        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm py-1 px-3 rounded-full"
                  onClick={() => {
                    setInput(question);
                    // Focus the input after setting the value
                    const inputElement = document.getElementById('message-input');
                    if (inputElement) {
                      inputElement.focus();
                    }
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="border-t p-4">
          <div className="flex items-end">
            <textarea
              id="message-input"
              className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Type your question here..."
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="ml-2 bg-teal-700 text-white rounded-full p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={handleSend}
              disabled={isLoading || input.trim() === ''}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for a new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;