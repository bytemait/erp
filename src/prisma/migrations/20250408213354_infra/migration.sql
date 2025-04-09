-- CreateTable
CREATE TABLE `InfraItem` (
    `id` VARCHAR(191) NOT NULL,
    `itemCode` VARCHAR(191) NOT NULL,
    `ItemTypeId` VARCHAR(191) NULL,
    `RoomTypeId` VARCHAR(191) NULL,
    `departmentId` VARCHAR(191) NULL,
    `roomNumber` VARCHAR(191) NULL,
    `yearOfPurchase` VARCHAR(191) NULL,
    `status` ENUM('WORKING', 'BROKEN', 'LOST', 'DISPOSED') NOT NULL DEFAULT 'WORKING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `InfraItem_itemCode_key`(`itemCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemType` (
    `item` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomType` (
    `room` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`room`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InfraItem` ADD CONSTRAINT `InfraItem_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`department`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfraItem` ADD CONSTRAINT `InfraItem_ItemTypeId_fkey` FOREIGN KEY (`ItemTypeId`) REFERENCES `ItemType`(`item`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfraItem` ADD CONSTRAINT `InfraItem_RoomTypeId_fkey` FOREIGN KEY (`RoomTypeId`) REFERENCES `RoomType`(`room`) ON DELETE SET NULL ON UPDATE CASCADE;
