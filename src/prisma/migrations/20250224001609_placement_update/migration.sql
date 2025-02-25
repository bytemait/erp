/*
  Warnings:

  - You are about to drop the column `studentId` on the `application` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to drop the column `externalLink` on the `interviewschedule` table. All the data in the column will be lost.
  - You are about to drop the column `maxTime` on the `interviewschedule` table. All the data in the column will be lost.
  - You are about to drop the column `minTime` on the `interviewschedule` table. All the data in the column will be lost.
  - You are about to drop the column `additionalReq` on the `joblisting` table. All the data in the column will be lost.
  - You are about to drop the column `batchId` on the `joblisting` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `joblisting` table. All the data in the column will be lost.
  - You are about to drop the column `cutoffCriteria` on the `joblisting` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `jobprofile` table. All the data in the column will be lost.
  - You are about to drop the column `jobListingId` on the `jobprofile` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `jobprofile` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `jobprofile` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InterviewSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InterviewSlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JobListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `JobProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JobProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobListingId_fkey`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `interviewslot` DROP FOREIGN KEY `InterviewSlot_interviewScheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `joblisting` DROP FOREIGN KEY `JobListing_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `jobprofile` DROP FOREIGN KEY `JobProfile_jobListingId_fkey`;

-- DropIndex
DROP INDEX `Application_jobListingId_fkey` ON `application`;

-- DropIndex
DROP INDEX `Application_studentId_fkey` ON `application`;

-- DropIndex
DROP INDEX `InterviewSlot_interviewScheduleId_fkey` ON `interviewslot`;

-- DropIndex
DROP INDEX `JobListing_companyId_fkey` ON `joblisting`;

-- DropIndex
DROP INDEX `JobProfile_jobListingId_fkey` ON `jobprofile`;

-- AlterTable
ALTER TABLE `application` DROP COLUMN `studentId`,
    ADD COLUMN `jobProfileId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `resumeUrl` VARCHAR(191) NULL,
    MODIFY `status` ENUM('PENDING', 'REJECTED', 'SHORTLISTED', 'SELECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `company` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `logo` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `interviewschedule` DROP COLUMN `externalLink`,
    DROP COLUMN `maxTime`,
    DROP COLUMN `minTime`,
    ADD COLUMN `endTime` DATETIME(3) NULL,
    ADD COLUMN `startTime` DATETIME(3) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `interviewslot` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `joblisting` DROP COLUMN `additionalReq`,
    DROP COLUMN `batchId`,
    DROP COLUMN `branchId`,
    DROP COLUMN `cutoffCriteria`,
    ADD COLUMN `cgpaCutoff` DOUBLE NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `filters` JSON NULL,
    ADD COLUMN `requirements` VARCHAR(191) NULL,
    ADD COLUMN `role` VARCHAR(191) NULL,
    ADD COLUMN `type` ENUM('INTERNSHIP_REMOTE', 'INTERNSHIP_ONSITE', 'FULL_TIME_ONSITE', 'FULL_TIME_REMOTE', 'PART_TIME_ONSITE', 'PART_TIME_REMOTE', 'CONTRACT') NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `jobprofile` DROP COLUMN `description`,
    DROP COLUMN `jobListingId`,
    DROP COLUMN `salary`,
    DROP COLUMN `title`,
    ADD COLUMN `aboutMe` VARCHAR(191) NULL,
    ADD COLUMN `achievements` VARCHAR(191) NULL,
    ADD COLUMN `backlogCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `certifications` VARCHAR(191) NULL,
    ADD COLUMN `cgpa` DOUBLE NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `currentSalary` DOUBLE NULL,
    ADD COLUMN `expectedSalary` DOUBLE NULL,
    ADD COLUMN `githubUrl` VARCHAR(191) NULL,
    ADD COLUMN `isOpenToRelocate` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `linkedinUrl` VARCHAR(191) NULL,
    ADD COLUMN `noticePeriod` INTEGER NULL,
    ADD COLUMN `portfolioUrl` VARCHAR(191) NULL,
    ADD COLUMN `preferredJobType` ENUM('INTERNSHIP_REMOTE', 'INTERNSHIP_ONSITE', 'FULL_TIME_ONSITE', 'FULL_TIME_REMOTE', 'PART_TIME_ONSITE', 'PART_TIME_REMOTE', 'CONTRACT') NULL,
    ADD COLUMN `preferredLocation` VARCHAR(191) NULL,
    ADD COLUMN `resumeUrl` VARCHAR(191) NULL,
    ADD COLUMN `skills` VARCHAR(191) NULL,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `workExperience` JSON NULL,
    ADD COLUMN `yearsOfExperience` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `JobListing` ADD CONSTRAINT `JobListing_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobProfile` ADD CONSTRAINT `JobProfile_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobListingId_fkey` FOREIGN KEY (`jobListingId`) REFERENCES `JobListing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobProfileId_fkey` FOREIGN KEY (`jobProfileId`) REFERENCES `JobProfile`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewSlot` ADD CONSTRAINT `InterviewSlot_interviewScheduleId_fkey` FOREIGN KEY (`interviewScheduleId`) REFERENCES `InterviewSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
