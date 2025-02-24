/*
  Warnings:

  - You are about to drop the column `studentId` on the `studentdetails` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `studentdetails` DROP FOREIGN KEY `StudentDetails_studentId_fkey`;

-- DropIndex
DROP INDEX `StudentDetails_studentId_key` ON `studentdetails`;

-- AlterTable
ALTER TABLE `studentdetails` DROP COLUMN `studentId`;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_studentDetailsId_fkey` FOREIGN KEY (`studentDetailsId`) REFERENCES `StudentDetails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
