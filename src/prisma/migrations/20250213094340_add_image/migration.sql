/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `faculty` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `staff` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `image`;
