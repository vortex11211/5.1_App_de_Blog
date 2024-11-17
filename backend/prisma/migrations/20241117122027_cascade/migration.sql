-- DropForeignKey
ALTER TABLE `favorite` DROP FOREIGN KEY `favorite_publicationId_fkey`;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_publicationId_fkey` FOREIGN KEY (`publicationId`) REFERENCES `Publication`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
