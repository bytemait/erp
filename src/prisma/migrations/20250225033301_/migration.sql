/*
  Warnings:

  - You are about to drop the column `facultyId` on the `facultydetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[facultyDetailsId]` on the table `Faculty` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `facultydetails` DROP FOREIGN KEY `FacultyDetails_facultyId_fkey`;

-- DropIndex
DROP INDEX `FacultyDetails_facultyId_key` ON `facultydetails`;

-- AlterTable
ALTER TABLE `faculty` ADD COLUMN `facultyDetailsId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `facultydetails` DROP COLUMN `facultyId`;

-- CreateIndex
CREATE UNIQUE INDEX `Faculty_facultyDetailsId_key` ON `Faculty`(`facultyDetailsId`);

-- AddForeignKey
ALTER TABLE `Faculty` ADD CONSTRAINT `Faculty_facultyDetailsId_fkey` FOREIGN KEY (`facultyDetailsId`) REFERENCES `FacultyDetails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
