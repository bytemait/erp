/*
  Warnings:

  - You are about to drop the column `isglobal` on the `announcement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `announcement` DROP COLUMN `isglobal`,
    ADD COLUMN `isGlobal` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `studentdetails` MODIFY `yearOf12th` VARCHAR(191) NULL,
    MODIFY `rollno12th` VARCHAR(191) NULL,
    MODIFY `aggregate12th` VARCHAR(191) NULL,
    MODIFY `yearOf10th` VARCHAR(191) NULL,
    MODIFY `rollno10th` VARCHAR(191) NULL,
    MODIFY `aggregate10th` VARCHAR(191) NULL,
    MODIFY `jeeRank` VARCHAR(191) NULL,
    MODIFY `jeePercentile` VARCHAR(191) NULL;
