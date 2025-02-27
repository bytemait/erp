/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `facultydetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interviewschedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `studentdetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `interviewschedule` DROP FOREIGN KEY `InterviewSchedule_jobListingId_fkey`;

-- DropForeignKey
ALTER TABLE `staff` DROP FOREIGN KEY `Staff_staffId_fkey`;

-- DropIndex
DROP INDEX `InterviewSlot_interviewScheduleId_fkey` ON `InterviewSlot`;

-- DropIndex
DROP INDEX `JobListing_companyId_fkey` ON `JobListing`;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `announcement`;

-- DropTable
DROP TABLE `company`;

-- DropTable
DROP TABLE `facultydetails`;

-- DropTable
DROP TABLE `interviewschedule`;

-- DropTable
DROP TABLE `notification`;

-- DropTable
DROP TABLE `staff`;

-- DropTable
DROP TABLE `studentdetails`;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `filter` JSON NULL,
    `role` ENUM('STUDENT', 'FACULTY', 'STAFF', 'ADMIN') NOT NULL,
    `issuer` VARCHAR(191) NOT NULL DEFAULT 'error',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `industry` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterviewSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `jobListingId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` DATETIME(3) NULL,
    `endTime` DATETIME(3) NULL,
    `slotLength` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentDetails` (
    `id` VARCHAR(191) NOT NULL,
    `ipuRegistrationNumber` VARCHAR(12) NULL,
    `dob` DATETIME(3) NULL,
    `fullAddress` VARCHAR(191) NULL,
    `mobile` VARCHAR(10) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NULL,
    `category` ENUM('SC', 'ST', 'OBC', 'GEN', 'EWS', 'PH', 'DEFENCE', 'J_AND_K_MIGRANT') NULL,
    `region` ENUM('DELHI', 'OUTSIDE_DELHI') NULL,
    `fatherName` VARCHAR(191) NULL,
    `motherName` VARCHAR(191) NULL,
    `fatherQualification` VARCHAR(191) NULL,
    `motherQualification` VARCHAR(191) NULL,
    `fatherOccupation` VARCHAR(191) NULL,
    `motherOccupation` VARCHAR(191) NULL,
    `fatherJobDesignation` VARCHAR(191) NULL,
    `motherJobDesignation` VARCHAR(191) NULL,
    `fatherBusinessType` VARCHAR(191) NULL,
    `motherBusinessType` VARCHAR(191) NULL,
    `fatherMobile` VARCHAR(191) NULL,
    `motherMobile` VARCHAR(191) NULL,
    `fatherOfficeAddress` VARCHAR(191) NULL,
    `motherOfficeAddress` VARCHAR(191) NULL,
    `guardianName` VARCHAR(191) NULL,
    `board12th` VARCHAR(191) NULL,
    `yearOf12th` INTEGER NULL,
    `rollno12th` BIGINT NULL,
    `school12th` VARCHAR(191) NULL,
    `aggregate12th` DECIMAL(5, 2) NULL,
    `board10th` VARCHAR(191) NULL,
    `yearOf10th` INTEGER NULL,
    `rollno10th` BIGINT NULL,
    `school10th` VARCHAR(191) NULL,
    `aggregate10th` DECIMAL(5, 2) NULL,
    `jeeRank` INTEGER NULL,
    `jeePercentile` DECIMAL(15, 11) NULL,
    `jeeRollno` VARCHAR(12) NULL,
    `specialAchievements` VARCHAR(191) NULL,
    `passportPhotograph` VARCHAR(191) NULL,
    `marksheet10th` VARCHAR(191) NULL,
    `marksheet12th` VARCHAR(191) NULL,
    `aadhar` VARCHAR(191) NULL,
    `pancard` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `StudentDetails_ipuRegistrationNumber_key`(`ipuRegistrationNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacultyDetails` (
    `id` VARCHAR(191) NOT NULL,
    `employeeCode` VARCHAR(10) NULL,
    `dob` DATETIME(3) NULL,
    `fullAddress` VARCHAR(150) NULL,
    `mobile` VARCHAR(10) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NULL,
    `bloodgroup` ENUM('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE') NULL,
    `emergencyName` VARCHAR(75) NULL,
    `emergencyMobile` VARCHAR(10) NULL,
    `passportPhotograph` VARCHAR(191) NULL,
    `aadhar` VARCHAR(191) NULL,
    `pancard` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Staff_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobListing` ADD CONSTRAINT `JobListing_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewSchedule` ADD CONSTRAINT `InterviewSchedule_jobListingId_fkey` FOREIGN KEY (`jobListingId`) REFERENCES `JobListing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewSlot` ADD CONSTRAINT `InterviewSlot_interviewScheduleId_fkey` FOREIGN KEY (`interviewScheduleId`) REFERENCES `InterviewSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_studentDetailsId_fkey` FOREIGN KEY (`studentDetailsId`) REFERENCES `StudentDetails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faculty` ADD CONSTRAINT `Faculty_facultyDetailsId_fkey` FOREIGN KEY (`facultyDetailsId`) REFERENCES `FacultyDetails`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `StaffType`(`staffType`) ON DELETE RESTRICT ON UPDATE CASCADE;
