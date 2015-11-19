  # ### #
### ups ###
  # ### #

CREATE TABLE `role` (
  `id`     INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`   VARCHAR(45)      NOT NULL,
  `active` BIT(1)           NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

INSERT INTO `role` (`name`) VALUES ('Administrator');
INSERT INTO `role` (`name`) VALUES ('Job Manager');
INSERT INTO `role` (`name`) VALUES ('Engineer');
INSERT INTO `role` (`name`) VALUES ('Purchaser');
INSERT INTO `role` (`name`) VALUES ('Manufacturer');
INSERT INTO `role` (`name`) VALUES ('Shipper');

CREATE TABLE `user` (
  `id`       INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45)      NOT NULL,
  `password` CHAR(60)         NOT NULL,
  `active`   BIT(1)           NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

INSERT INTO `user` (`username`, `password`)
VALUES ('root', '$2a$10$y3KZaDPZKTYirV8eJRnU8eBzOWkTH9a/tL.f.dSdeLEaMOZ0NHtfm');

CREATE TABLE `user_role` (
  `user_id` INT(11) UNSIGNED NOT NULL,
  `role_id` INT(11) UNSIGNED NOT NULL,
  `active`  BIT(1)           NOT NULL DEFAULT b'1',
  PRIMARY KEY (`user_id`, `role_id`),
  KEY `user_role_role_fk_idx` (`role_id`),
  CONSTRAINT `user_role_role_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_role_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

INSERT INTO `user_role` (`user_id`, `role_id`)
VALUES ((SELECT `id`
         FROM `user`
         LIMIT 1), (SELECT `id`
                    FROM `role`
                    LIMIT 1));

CREATE TABLE `token` (
  `user_id` INT(11) UNSIGNED NOT NULL,
  `uuid`    CHAR(36)         NOT NULL,
  `active`  BIT(1)           NOT NULL DEFAULT b'1',
  `expires` DATETIME                  DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  CONSTRAINT `token_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

  # ##### #
### downs ###
  # ##### #

DROP TABLE `token`;

DROP TABLE `user_role`;

DROP TABLE `user`;

DROP TABLE `role`;