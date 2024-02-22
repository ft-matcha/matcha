CREATE TABLE IF NOT EXISTS `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `phone` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `status` varchar(255) NOT NULL,
    `verified` BOOLEAN NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender` varchar(255) NOT NULL,
    `preferences` JSON NOT NULL,
    `biography` varchar(255) NOT NULL,
    `tag` JSON NOT NULL,
    `age` INTEGER NOT NULL,
    `image` JSON NOT NULL,
    `viewList` JSON NOT NULL,
    `userId` INTEGER NOT NULL,
    
    UNIQUE INDEX `profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
ALTER TABLE `profile` ADD FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;