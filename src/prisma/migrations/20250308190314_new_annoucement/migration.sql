-- DropForeignKey
ALTER TABLE `interviewschedule` DROP FOREIGN KEY `InterviewSchedule_jobListingId_fkey`;

-- DropIndex
DROP INDEX `InterviewSchedule_jobListingId_fkey` ON `interviewschedule`;

-- AlterTable
ALTER TABLE `announcement` ADD COLUMN `isglobal` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `role` ENUM('STUDENT', 'FACULTY', 'STAFF', 'ADMIN') NULL;

-- AddForeignKey
ALTER TABLE `InterviewSchedule` ADD CONSTRAINT `InterviewSchedule_jobListingId_fkey` FOREIGN KEY (`jobListingId`) REFERENCES `JobListing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
