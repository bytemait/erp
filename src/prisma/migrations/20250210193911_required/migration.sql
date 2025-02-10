/*
  Warnings:

  - Made the column `email` on table `admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `staff` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `faculty` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `designationId` VARCHAR(191) NULL,
    MODIFY `departmentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `facultydetails` MODIFY `employeeCode` VARCHAR(10) NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NULL,
    MODIFY `bloodgroup` ENUM('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE') NULL;

-- AlterTable
ALTER TABLE `staff` MODIFY `staffId` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `batchId` VARCHAR(191) NULL,
    MODIFY `branchId` VARCHAR(191) NULL,
    MODIFY `groupId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `studentdetails` MODIFY `ipuRegistrationNumber` VARCHAR(12) NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHERS') NULL,
    MODIFY `category` ENUM('SC', 'ST', 'OBC', 'GEN', 'EWS', 'PH', 'DEFENCE', 'J_AND_K_MIGRANT') NULL,
    MODIFY `region` ENUM('DELHI', 'OUTSIDE_DELHI') NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(191) NOT NULL;
