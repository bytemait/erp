/*
  Warnings:

  - Added the required column `role` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `announcement` ADD COLUMN `role` ENUM('STUDENT', 'FACULTY', 'STAFF', 'ADMIN') NOT NULL;
