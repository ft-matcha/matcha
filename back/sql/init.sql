CREATE TABLE IF NOT EXISTS `user` (
    `id` varchar(255) NOT NULL,
    `uid` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `status` varchar(255) NOT NULL DEFAULT 'ACTIVE',
    `verified` BOOLEAN NOT NULL DEFAULT FALSE,
    `profile` BOOLEAN NOT NULL DEFAULT FALSE,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `user_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `profile` (
    `profileId` INTEGER NOT NULL AUTO_INCREMENT,
    `address` JSON NOT NULL,
    `gender` varchar(255) NOT NULL,
    `phone` varchar(255) NOT NULL,
    `preferences` JSON NOT NULL,
    `biography` varchar(255) NOT NULL,
    `tag` JSON NOT NULL,
    `age` INTEGER NOT NULL,
    `image` JSON NOT NULL,
    `userId` varchar(255) NOT NULL,

    UNIQUE INDEX `profile_userId_key`(`userId`),
    PRIMARY KEY (`profileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
ALTER TABLE `profile` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `relation` (
    `relationId` INTEGER NOT NULL AUTO_INCREMENT,
    `fromId` varchar(255) NOT NULL,
    `toId` varchar(255) NOT NULL,
    `status` varchar(255) NOT NULL,

    PRIMARY KEY (`relationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `relation` ADD FOREIGN KEY (`fromId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `relation` ADD FOREIGN KEY (`toId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `alert` (
    `alertId` INTEGER NOT NULL AUTO_INCREMENT,
    `fromId` varchar(255) NOT NULL,
    `toId` varchar(255) NOT NULL,
    `type` varchar(255) NOT NULL,
    `message` varchar(255) DEFAULT NULL,
    `status` varchar(255) NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`alertId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `alert` ADD FOREIGN KEY (`fromId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `alert` ADD FOREIGN KEY (`toId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOt EXISTS `room` (
    `roomId` varchar(255) NOT NULL,
    `from` varchar(255) NOT NULL,
    `to` varchar(255) NOT NULL,

    PRIMARY KEY (`roomId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `room` ADD FOREIGN KEY (`from`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `room` ADD FOREIGN KEY (`to`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `message` (
    `messageId` INTEGER NOT NULL AUTO_INCREMENT,
    `room` varchar(255) NOT NULL,
    `from` varchar(255) NOT NULL,
    `to` varchar(255) NOT NULL,
    `content` varchar(255) NOT NULL,
    `status` varchar(255) NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `message_roomId_key`(`room`),
    PRIMARY KEY (`messageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

ALTER TABLE `message` ADD FOREIGN KEY (`room`) REFERENCES `room`(`roomId`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `message` ADD FOREIGN KEY (`from`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `message` ADD FOREIGN KEY (`to`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
