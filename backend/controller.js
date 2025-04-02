import {  PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const getSubjectsTopics = async function(){
    
  const subjectsWithTopics = await prisma.subject.findMany({
    include: {
      topics: true,
    },
  });
return subjectsWithTopics
}




export {getSubjectsTopics}