/*
  Warnings:

  - You are about to drop the column `isglobal` on the `announcement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `announcement` DROP COLUMN `isglobal`,
    ADD COLUMN `isGlobal` BOOLEAN NOT NULL DEFAULT false;
