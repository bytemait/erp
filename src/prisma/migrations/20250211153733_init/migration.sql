-- DropIndex
DROP INDEX `Faculty_departmentId_fkey` ON `faculty`;

-- DropIndex
DROP INDEX `Faculty_designationId_fkey` ON `faculty`;

-- DropIndex
DROP INDEX `Staff_staffId_fkey` ON `staff`;

-- DropIndex
DROP INDEX `Student_batchId_fkey` ON `student`;

-- DropIndex
DROP INDEX `Student_branchId_fkey` ON `student`;

-- DropIndex
DROP INDEX `Student_groupId_fkey` ON `student`;

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
