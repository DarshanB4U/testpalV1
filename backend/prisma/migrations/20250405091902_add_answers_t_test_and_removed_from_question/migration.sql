/*
  Warnings:

  - You are about to drop the column `uanswers` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "uanswers";

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "uanswers" JSONB NOT NULL DEFAULT '[]';
