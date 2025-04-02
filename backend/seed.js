import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const subjects = [
  {
    name: "Physics",
    topics: [
      "PHYSICS AND MEASUREMENT",
      "KINEMATICS",
      "LAWS OF MOTION",
      "WORK, ENERGY, AND POWER",
      "ROTATIONAL MOTION",
      "GRAVITATION",
      "PROPERTIES OF SOLIDS AND LIQUIDS",
      "THERMODYNAMICS",
      "KINETIC THEORY OF GASES",
      "OSCILLATIONS AND WAVES",
      "ELECTROSTATICS",
      "CURRENT ELECTRICITY",
      "MAGNETIC EFFECTS OF CURRENT AND MAGNETISM",
      "ELECTROMAGNETIC INDUCTION AND ALTERNATING CURRENTS",
      "ELECTROMAGNETIC WAVES",
      "OPTICS",
      "DUAL NATURE OF MATTER AND RADIATION",
      "ATOMS AND NUCLEI",
      "ELECTRONIC DEVICES",
      "EXPERIMENTAL SKILLS"
    ]
  },
  {
    name: "Chemistry",
    topics: [
      "SOME BASIC CONCEPTS IN CHEMISTRY",
      "ATOMIC STRUCTURE",
      "CHEMICAL BONDING AND MOLECULAR STRUCTURE",
      "CHEMICAL THERMODYNAMICS",
      "SOLUTIONS",
      "REDOX REACTIONS AND ELECTROCHEMISTRY",
      "CHEMICAL KINETICS",
      "CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES",
      "P- BLOCK ELEMENTS",
      "d - and f- BLOCK ELEMENTS",
      "CO-ORDINATION COMPOUNDS",
      "PURIFICATION AND CHARACTERISATION OF ORGANIC COMPOUNDS",
      "SOME BASIC PRINCIPLES OF ORGANIC CHEMISTRY",
      "HYDROCARBONS",
      "ORGANIC COMPOUNDS CONTAINING HALOGENS",
      "ORGANIC COMPOUNDS CONTAINING OXYGEN",
      "ORGANIC COMPOUNDS CONTAINING NITROGEN",
      "BIOMOLECULES",
      "PRINCIPLES RELATED TO PRACTICAL CHEMISTRY"
    ]
  },
  {
    name: "Biology",
    topics: [
      "Diversity in Living World",
      "Structural Organisation in Animals and Plants",
      "Cell Structure and Function",
      "Plant Physiology",
      "Human Physiology",
      "Reproduction",
      "Genetics and Evolution",
      "Biology and Human Welfare",
      "Biotechnology and Its Applications",
      "Ecology and Environment"
    ]
  }
];

async function main() {
  for (const subjectData of subjects) {
    const subject = await prisma.subject.create({
      data: {
        name: subjectData.name,
        topics: {
          create: subjectData.topics.map(topic => ({ name: topic }))
        }
      }
    });
    console.log(`Created subject: ${subject.name}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
