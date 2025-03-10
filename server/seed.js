import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mock data for seeding the database
const seedData = async () => {
  try {
    // Create mock questions
    const physicsQuestions = [
      {
        text: 'A particle moves in a circle of radius 5 cm with constant speed and completes the circle in 0.2π seconds. The acceleration of the particle is:',
        options: ['5 m/s²', '25 m/s²', '0.5 m/s²', '2.5 m/s²'],
        correctOption: 1,
        explanation: 'For circular motion, acceleration a = v²/r. The speed v = 2πr/T where T is the time period. Substituting r = 0.05 m and T = 0.2π s, we get v = 0.5 m/s. Therefore, a = (0.5)²/0.05 = 5 m/s².',
        subject: 'PHYSICS',
        chapter: 'Circular Motion',
        difficulty: 'MEDIUM',
        source: 'NCERT Physics Class 11'
      },
      {
        text: 'The angle of minimum deviation for a prism is equal to the angle of the prism. The refractive index of the material of the prism is:',
        options: ['√2', '2', '1.5', '1.414'],
        correctOption: 0,
        explanation: 'When the angle of minimum deviation (δ) equals the angle of the prism (A), the refractive index (μ) is given by μ = sin[(A+δ)/2]/sin(A/2). Substituting δ = A, we get μ = sin(A)/sin(A/2) = 2sin(A/2)cos(A/2)/sin(A/2) = 2cos(A/2). For this to equal √2, cos(A/2) = 1/√2, which means A/2 = 45° or A = 90°.',
        subject: 'PHYSICS',
        chapter: 'Ray Optics',
        difficulty: 'MEDIUM',
        source: 'Previous Year',
        year: 2022
      },
      {
        text: 'A force of 5 N acts on a body of mass 2 kg for 3 seconds. The change in momentum of the body is:',
        options: ['10 kg m/s', '15 kg m/s', '30 kg m/s', '6 kg m/s'],
        correctOption: 1,
        explanation: 'Change in momentum = Force × Time = 5 N × 3 s = 15 kg m/s. This follows from the impulse-momentum theorem, which states that the impulse (force × time) equals the change in momentum.',
        subject: 'PHYSICS',
        chapter: 'Laws of Motion',
        difficulty: 'MEDIUM',
        source: 'HC Verma - Concepts of Physics Vol 1'
      }
    ];

    const chemistryQuestions = [
      {
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
        chapter: 'Environmental Chemistry',
        difficulty: 'EASY',
        source: 'Previous Year',
        year: 2022
      },
      {
        text: 'Which of the following molecules has a linear shape?',
        options: ['H₂O', 'NH₃', 'CO₂', 'CH₄'],
        correctOption: 2,
        explanation: 'CO₂ (carbon dioxide) has a linear shape. The carbon atom forms double bonds with each oxygen atom, resulting in a linear arrangement with a bond angle of 180°. H₂O has a bent shape, NH₃ has a pyramidal shape, and CH₄ has a tetrahedral shape.',
        subject: 'CHEMISTRY',
        chapter: 'Chemical Bonding and Molecular Structure',
        difficulty: 'EASY',
        source: 'NCERT Chemistry Class 11'
      },
      {
        text: 'The hybridization of carbon in ethyne (C₂H₂) is:',
        options: ['sp', 'sp²', 'sp³', 'sp³d'],
        correctOption: 0,
        explanation: 'In ethyne (C₂H₂), each carbon atom is bonded to one hydrogen atom and the other carbon atom with a triple bond. The carbon atoms undergo sp hybridization, forming one sigma bond with hydrogen and one sigma bond with the other carbon atom. The remaining two p orbitals form two pi bonds between the carbon atoms.',
        subject: 'CHEMISTRY',
        chapter: 'Chemical Bonding and Molecular Structure',
        difficulty: 'MEDIUM',
        source: 'OP Tandon - Organic Chemistry'
      }
    ];

    const biologyQuestions = [
      {
        text: 'Which of the following is not a stem modification?',
        options: ['Rhizome', 'Tuber', 'Bulb', 'Tap root'],
        correctOption: 3,
        explanation: 'Tap root is a root modification, not a stem modification. Rhizomes (ginger), tubers (potato), and bulbs (onion) are all modified stems that serve various functions like food storage and vegetative propagation.',
        subject: 'BIOLOGY',
        chapter: 'Morphology of Flowering Plants',
        difficulty: 'EASY',
        source: 'Previous Year',
        year: 2021
      },
      {
        text: 'Which of the following organelles is not enclosed by a membrane?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
        correctOption: 2,
        explanation: 'Ribosomes are not enclosed by a membrane. They are composed of RNA and proteins and are responsible for protein synthesis. The nucleus, mitochondria, and Golgi apparatus are all membrane-bound organelles.',
        subject: 'BIOLOGY',
        chapter: 'Cell Structure and Function',
        difficulty: 'EASY',
        source: 'NCERT Biology Class 11'
      },
      {
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
        chapter: 'Biomolecules',
        difficulty: 'MEDIUM',
        source: 'Previous Year',
        year: 2020
      }
    ];

    // Combine all questions
    const allQuestions = [...physicsQuestions, ...chemistryQuestions, ...biologyQuestions];

    // Insert questions into database
    for (const question of allQuestions) {
      await prisma.question.create({
        data: question
      });
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();