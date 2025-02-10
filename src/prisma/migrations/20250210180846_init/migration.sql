-- CreateTable
CREATE TABLE `Designation` (
    `designation` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`designation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `department` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`department`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Batch` (
    `batch` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`batch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `branch` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`branch`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `group` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`group`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaffType` (
    `staffType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`staffType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RequestLog` (
    `id` VARCHAR(191) NOT NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `endpoint` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `RequestLog_ipAddress_idx`(`ipAddress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BanList` (
    `id` VARCHAR(191) NOT NULL,
    `ipAddress` VARCHAR(191) NOT NULL,
    `bannedUntil` DATETIME(3) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BanList_ipAddress_key`(`ipAddress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'FACULTY', 'STAFF', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    `userId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `mobile` VARCHAR(10) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `enrollmentNo` VARCHAR(11) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `isLateralEntry` BOOLEAN NOT NULL DEFAULT false,
    `isAlumni` BOOLEAN NOT NULL DEFAULT false,
    `batchId` VARCHAR(191) NOT NULL,
    `branchId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,
    `studentDetailsId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Student_enrollmentNo_key`(`enrollmentNo`),
    UNIQUE INDEX `Student_email_key`(`email`),
    UNIQUE INDEX `Student_studentDetailsId_key`(`studentDetailsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentDetails` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `ipuRegistrationNumber` VARCHAR(12) NOT NULL,
    `dob` DATETIME(3) NULL,
    `fullAddress` VARCHAR(191) NULL,
    `mobile` VARCHAR(10) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NOT NULL,
    `category` ENUM('SC', 'ST', 'OBC', 'GEN', 'EWS', 'PH', 'DEFENCE', 'J_AND_K_MIGRANT') NOT NULL,
    `region` ENUM('DELHI', 'OUTSIDE_DELHI') NOT NULL,
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

    UNIQUE INDEX `StudentDetails_studentId_key`(`studentId`),
    UNIQUE INDEX `StudentDetails_ipuRegistrationNumber_key`(`ipuRegistrationNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faculty` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NULL,
    `designationId` VARCHAR(191) NOT NULL,
    `departmentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Faculty_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FacultyDetails` (
    `id` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `employeeCode` VARCHAR(10) NOT NULL,
    `dob` DATETIME(3) NULL,
    `fullAddress` VARCHAR(150) NULL,
    `mobile` VARCHAR(10) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NOT NULL,
    `bloodgroup` ENUM('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE') NOT NULL,
    `emergencyName` VARCHAR(75) NULL,
    `emergencyMobile` VARCHAR(10) NULL,
    `passportPhotograph` VARCHAR(191) NULL,
    `aadhar` VARCHAR(191) NULL,
    `pancard` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FacultyDetails_facultyId_key`(`facultyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` VARCHAR(191) NOT NULL,
    `staffId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Staff_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `Batch`(`batch`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`branch`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`group`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentDetails` ADD CONSTRAINT `StudentDetails_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faculty` ADD CONSTRAINT `Faculty_designationId_fkey` FOREIGN KEY (`designationId`) REFERENCES `Designation`(`designation`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faculty` ADD CONSTRAINT `Faculty_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`department`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacultyDetails` ADD CONSTRAINT `FacultyDetails_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `StaffType`(`staffType`) ON DELETE RESTRICT ON UPDATE CASCADE;
