-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `industry` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobListing` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `batchId` VARCHAR(191) NOT NULL,
    `branchId` VARCHAR(191) NOT NULL,
    `cutoffCriteria` DOUBLE NULL,
    `additionalReq` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobProfile` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `salary` DOUBLE NULL,
    `jobListingId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `jobListingId` VARCHAR(191) NOT NULL,
    `resumeUrl` VARCHAR(191) NOT NULL,
    `coverLetter` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterviewSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `jobListingId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `minTime` DATETIME(3) NOT NULL,
    `maxTime` DATETIME(3) NOT NULL,
    `slotLength` INTEGER NOT NULL,
    `externalLink` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterviewSlot` (
    `id` VARCHAR(191) NOT NULL,
    `interviewScheduleId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NULL,
    `confirmed` BOOLEAN NOT NULL DEFAULT false,
    `joinLink` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobListing` ADD CONSTRAINT `JobListing_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobProfile` ADD CONSTRAINT `JobProfile_jobListingId_fkey` FOREIGN KEY (`jobListingId`) REFERENCES `JobListing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobListingId_fkey` FOREIGN KEY (`jobListingId`) REFERENCES `JobListing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewSchedule` ADD CONSTRAINT `InterviewSchedule_jobListingId_fkey` FOREIGN KEY (`jobListingId`) REFERENCES `JobListing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewSlot` ADD CONSTRAINT `InterviewSlot_interviewScheduleId_fkey` FOREIGN KEY (`interviewScheduleId`) REFERENCES `InterviewSchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewSlot` ADD CONSTRAINT `InterviewSlot_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
