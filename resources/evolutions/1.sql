-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ssi-business
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ssi-business`;

-- -----------------------------------------------------
-- Schema ssi-business
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ssi-business`
  DEFAULT CHARACTER SET utf8;
SHOW WARNINGS;
USE `ssi-business`;

-- -----------------------------------------------------
-- Table `ssi-business`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`users`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`users` (
  `id`       INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` CHAR(60)     NOT NULL,
  `active`   TINYINT(1)   NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`user_roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`user_roles`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`user_roles` (
  `user_id` INT UNSIGNED              NOT NULL,
  `role`    ENUM('ADMIN', 'EMPLOYEE') NOT NULL,
  `active`  TINYINT(1)                NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`, `role`),
  CONSTRAINT `user_roles__users__fk`
  FOREIGN KEY (`user_id`)
  REFERENCES `ssi-business`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`user_tokens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`user_tokens`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`user_tokens` (
  `user_id` INT UNSIGNED NOT NULL,
  `token`   CHAR(36)     NOT NULL,
  `expires` DATETIME     NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  CONSTRAINT `user_tokens__users__fk`
  FOREIGN KEY (`user_id`)
  REFERENCES `ssi-business`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shops`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shops`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shops` (
  `id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`salespeople`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`salespeople`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`salespeople` (
  `id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`customers`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`customers` (
  `id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`contacts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`contacts`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`contacts` (
  `id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20)  NULL,
  `fax`   VARCHAR(20)  NULL,
  `email` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`jobs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`jobs`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`jobs` (
  `id`             INT UNSIGNED                                                  NOT NULL AUTO_INCREMENT,
  `prefix`         ENUM('B', 'F', 'FC', 'FE', 'FR', 'FS', 'M', 'MF', 'MT', 'RG') NOT NULL,
  `year`           YEAR                                                          NOT NULL,
  `label`          VARCHAR(20)                                                   NOT NULL,
  `status`         ENUM('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'DELETED')  NOT NULL DEFAULT 'DRAFT',
  `description`    TEXT                                                          NULL,
  `contract_price` DECIMAL                                                       NULL,
  `start_date`     DATE                                                          NULL,
  `due_date`       DATE                                                          NULL,
  `shop_id`        INT UNSIGNED                                                  NULL,
  `salesperson_id` INT UNSIGNED                                                  NULL,
  `customer_id`    INT UNSIGNED                                                  NULL,
  `contact_id`     INT UNSIGNED                                                  NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQUE_JOB_NUMBER_AND_REVISION` (`year` ASC, `label` ASC, `prefix` ASC),
  INDEX `jobs__shops__fk_idx` (`shop_id` ASC),
  INDEX `jobs__salespeople__fk_idx` (`salesperson_id` ASC),
  INDEX `jobs__customers__fk_idx` (`customer_id` ASC),
  INDEX `jobs__contacts__fk_idx` (`contact_id` ASC),
  CONSTRAINT `jobs__shops__fk`
  FOREIGN KEY (`shop_id`)
  REFERENCES `ssi-business`.`shops` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `jobs__salespeople__fk`
  FOREIGN KEY (`salesperson_id`)
  REFERENCES `ssi-business`.`salespeople` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `jobs__customers__fk`
  FOREIGN KEY (`customer_id`)
  REFERENCES `ssi-business`.`customers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `jobs__contacts__fk`
  FOREIGN KEY (`contact_id`)
  REFERENCES `ssi-business`.`contacts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`schedules`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`schedules`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`schedules` (
  `id`            INT UNSIGNED                                                                NOT NULL AUTO_INCREMENT,
  `job_id`        INT UNSIGNED                                                                NOT NULL,
  `schedule_type` ENUM('ENGINEERING', 'MECHANICAL', 'ELECTRICAL', 'SHIPPING', 'INSTALLATION') NOT NULL,
  `start_date`    DATE                                                                        NULL,
  `complete_date` DATE                                                                        NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQUE_JOB_SCHEDULE_TYPE` (`job_id` ASC, `schedule_type` ASC),
  CONSTRAINT `job_schedules__jobs__fk`
  FOREIGN KEY (`job_id`)
  REFERENCES `ssi-business`.`jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`addresses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`addresses`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`addresses` (
  `id`              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `lines`           TEXT         NULL,
  `city`            VARCHAR(100) NULL,
  `stateOrProvince` VARCHAR(100) NULL,
  `postal_code`     VARCHAR(20)  NULL,
  `country`         VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`job_addresses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`job_addresses`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`job_addresses` (
  `id`           INT UNSIGNED                  NOT NULL AUTO_INCREMENT,
  `job_id`       INT UNSIGNED                  NOT NULL,
  `address_type` ENUM('SHIPPING', 'INVOICING') NOT NULL,
  `address_id`   INT UNSIGNED                  NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `job_addresses__addresses__fk_idx` (`address_id` ASC),
  UNIQUE INDEX `UNIQUE_JOB_ADDRESS_TYPE` (`job_id` ASC, `address_type` ASC),
  CONSTRAINT `job_addresses__jobs__fk`
  FOREIGN KEY (`job_id`)
  REFERENCES `ssi-business`.`jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `job_addresses__addresses__fk`
  FOREIGN KEY (`address_id`)
  REFERENCES `ssi-business`.`addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`addenda`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`addenda`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`addenda` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`      INT UNSIGNED NOT NULL,
  `label`       VARCHAR(50)  NOT NULL,
  `description` TEXT         NOT NULL,
  `created`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQUE_REVISION_LABEL` (`job_id` ASC, `label` ASC),
  CONSTRAINT `addenda__jobs__fk`
  FOREIGN KEY (`job_id`)
  REFERENCES `ssi-business`.`jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`drawings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`drawings`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`drawings` (
  `id`            INT UNSIGNED             NOT NULL AUTO_INCREMENT,
  `job_id`        INT UNSIGNED             NOT NULL,
  `label`         VARCHAR(100)             NOT NULL,
  `drawing_type`  ENUM('DETAIL', 'LAYOUT') NOT NULL,
  `title`         TEXT                     NULL,
  `shop_id`       INT UNSIGNED             NULL,
  `revision`      VARCHAR(20)              NULL,
  `revision_date` DATE                     NULL,
  `start_date`    DATE                     NULL,
  `shop_date`     DATE                     NULL,
  `field_date`    DATE                     NULL,
  INDEX `drawings__jobs__fk_idx` (`job_id` ASC),
  UNIQUE INDEX `UNIQUE_JOB_DRAWING_LABEL` (`job_id` ASC, `label` ASC),
  PRIMARY KEY (`id`),
  INDEX `drawings__shops__fk_idx` (`shop_id` ASC),
  CONSTRAINT `drawings__jobs__fk`
  FOREIGN KEY (`job_id`)
  REFERENCES `ssi-business`.`jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `drawings__shops__fk`
  FOREIGN KEY (`shop_id`)
  REFERENCES `ssi-business`.`shops` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipping_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipping_items`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipping_items` (
  `id`        INT UNSIGNED                                                                                                                           NOT NULL AUTO_INCREMENT,
  `status`    ENUM('FAB', 'PREFAB', 'SHPD', 'RTA', 'RTS', 'MACH', 'MOO', 'NS', 'PAINT', 'SIP', 'WP', 'SAMPLE', 'MEM', 'FTS', 'VOID', 'NEXT', 'HOLD') NOT NULL,
  `requested` INT UNSIGNED                                                                                                                           NOT NULL DEFAULT 0,
  `completed` INT UNSIGNED                                                                                                                           NOT NULL DEFAULT 0,
  `shop_id`   INT UNSIGNED                                                                                                                           NULL,
  `remarks`   TEXT                                                                                                                                   NULL,
  PRIMARY KEY (`id`),
  INDEX `shipping_items__shops__fk_idx` (`shop_id` ASC),
  CONSTRAINT `shipping_items__shops__fk`
  FOREIGN KEY (`shop_id`)
  REFERENCES `ssi-business`.`shops` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`marks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`marks`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`marks` (
  `id`               INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  `drawing_id`       INT UNSIGNED   NOT NULL,
  `label`            VARCHAR(100)   NOT NULL,
  `tag_type`         ENUM('S', 'W') NOT NULL,
  `shipping_item_id` INT UNSIGNED   NULL,
  PRIMARY KEY (`id`),
  INDEX `marks__drawings__fk_idx` (`drawing_id` ASC),
  UNIQUE INDEX `UNIQUE_DRAWING_MARK` (`drawing_id` ASC, `label` ASC),
  INDEX `marks__shipping_items__fk_idx` (`shipping_item_id` ASC),
  CONSTRAINT `marks__drawings__fk`
  FOREIGN KEY (`drawing_id`)
  REFERENCES `ssi-business`.`drawings` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `marks__shipping_items__fk`
  FOREIGN KEY (`shipping_item_id`)
  REFERENCES `ssi-business`.`shipping_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`parts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`parts`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`parts` (
  `id`          INT UNSIGNED         NOT NULL AUTO_INCREMENT,
  `type`        ENUM('MECH', 'ELEC') NOT NULL,
  `number`      VARCHAR(200)         NOT NULL,
  `description` TEXT                 NULL,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`manufacturers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`manufacturers`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`manufacturers` (
  `id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`vendors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`vendors`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`vendors` (
  `id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`part_orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`part_orders`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`part_orders` (
  `id`                 INT UNSIGNED                                        NOT NULL AUTO_INCREMENT,
  `job_id`             INT UNSIGNED                                        NOT NULL,
  `drawing_id`         INT UNSIGNED                                        NULL,
  `status`             ENUM('ACTIVE', 'COMPLETED', 'CANCELLED', 'DELETED') NOT NULL,
  `part_id`            INT UNSIGNED                                        NULL,
  `manufacturer_id`    INT UNSIGNED                                        NULL,
  `vendor_id`          INT UNSIGNED                                        NULL,
  `po`                 VARCHAR(100)                                        NULL,
  `requested_quantity` INT UNSIGNED                                        NOT NULL DEFAULT 0,
  `stock_quantity`     INT UNSIGNED                                        NOT NULL DEFAULT 0,
  `purchase_quantity`  INT UNSIGNED                                        NOT NULL DEFAULT 0,
  `request_date`       DATE                                                NULL,
  `purchase_date`      DATE                                                NULL,
  `release_date`       DATE                                                NULL,
  `released_by`        VARCHAR(100)                                        NULL,
  PRIMARY KEY (`id`),
  INDEX `purchase_orders__drawings__fk_idx` (`drawing_id` ASC),
  INDEX `purchase_orders__parts__fk_idx` (`part_id` ASC),
  INDEX `purchase_orders__manufacturers__fk_idx` (`manufacturer_id` ASC),
  INDEX `purchase_orders__vendors__fk_idx` (`vendor_id` ASC),
  CONSTRAINT `purchase_orders__drawings__fk`
  FOREIGN KEY (`drawing_id`)
  REFERENCES `ssi-business`.`drawings` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `purchase_orders__jobs__fk`
  FOREIGN KEY (`job_id`)
  REFERENCES `ssi-business`.`jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `purchase_orders__parts__fk`
  FOREIGN KEY (`part_id`)
  REFERENCES `ssi-business`.`parts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `purchase_orders__manufacturers__fk`
  FOREIGN KEY (`manufacturer_id`)
  REFERENCES `ssi-business`.`manufacturers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `purchase_orders__vendors__fk`
  FOREIGN KEY (`vendor_id`)
  REFERENCES `ssi-business`.`vendors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`zones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`zones`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`zones` (
  `id`         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`     INT UNSIGNED NOT NULL,
  `number`     INT UNSIGNED NOT NULL DEFAULT 1,
  `field_date` DATE         NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQUE_JOB_ZONE_NUMBER` (`job_id` ASC, `number` ASC),
  CONSTRAINT `zones__jobs__fk`
  FOREIGN KEY (`job_id`)
  REFERENCES `ssi-business`.`jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipping_item_zones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipping_item_zones`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipping_item_zones` (
  `id`               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shipping_item_id` INT UNSIGNED NOT NULL,
  `zone_id`          INT UNSIGNED NOT NULL,
  `quantity`         INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `zones__shipping_items__fk_idx` (`shipping_item_id` ASC),
  UNIQUE INDEX `UNIQUE_SHIPPING_ITEM_ZONE` (`shipping_item_id` ASC, `zone_id` ASC),
  INDEX `shipping_item_zones__zones__fk_idx` (`zone_id` ASC),
  CONSTRAINT `shipping_item_zones__shipping_items__fk`
  FOREIGN KEY (`shipping_item_id`)
  REFERENCES `ssi-business`.`shipping_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipping_item_zones__zones__fk`
  FOREIGN KEY (`zone_id`)
  REFERENCES `ssi-business`.`zones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipping_groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipping_groups`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipping_groups` (
  `id`      INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id`  INT UNSIGNED NOT NULL,
  `label`   VARCHAR(100) NOT NULL,
  `rush`    TINYINT(1)   NOT NULL DEFAULT 0,
  `shop_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `shipping_groups__jobs__fk_idx` (`job_id` ASC),
  UNIQUE INDEX `UNIQUE_JOB_SHIPPING_GROUP_LABEL` (`job_id` ASC, `label` ASC),
  INDEX `shipping_groups__shops__fk_idx` (`shop_id` ASC),
  CONSTRAINT `shipping_groups__jobs__fk`
  FOREIGN KEY (`job_id`)
  REFERENCES `ssi-business`.`jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipping_groups__shops__fk`
  FOREIGN KEY (`shop_id`)
  REFERENCES `ssi-business`.`shops` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipping_group_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipping_group_items`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipping_group_items` (
  `id`                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shipping_group_id` INT UNSIGNED NOT NULL,
  `shipping_item_id`  INT UNSIGNED NOT NULL,
  `label`             VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQUE_GROUP_ITEM` (`shipping_group_id` ASC, `shipping_item_id` ASC),
  INDEX `shipping_group_items_idx` (`shipping_group_id` ASC),
  INDEX `shipping_groupt_items__shipping_items__fk_idx` (`shipping_item_id` ASC),
  UNIQUE INDEX `UNIQUE_GROUP_ITEM_LABEL` (`shipping_group_id` ASC, `label` ASC),
  CONSTRAINT `shipping_group_items__shipping_groups__fk`
  FOREIGN KEY (`shipping_group_id`)
  REFERENCES `ssi-business`.`shipping_groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipping_groupt_items__shipping_items__fk`
  FOREIGN KEY (`shipping_item_id`)
  REFERENCES `ssi-business`.`shipping_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`carriers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`carriers`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`carriers` (
  `id`    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `label_UNIQUE` (`label` ASC)
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipments`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipments` (
  `id`             INT UNSIGNED                                        NOT NULL AUTO_INCREMENT,
  `job_id`         INT UNSIGNED                                        NOT NULL,
  `number`         INT UNSIGNED                                        NOT NULL DEFAULT 1,
  `status`         ENUM('ACTIVE', 'COMPLETED', 'CANCELLED', 'DELETED') NOT NULL,
  `shop_id`        INT UNSIGNED                                        NOT NULL,
  `carrier_id`     INT UNSIGNED                                        NOT NULL,
  `weight`         INT UNSIGNED                                        NOT NULL DEFAULT 0,
  `bill_of_lading` VARCHAR(100)                                        NULL,
  `ship_date`      DATE                                                NULL,
  `contact_id`     INT UNSIGNED                                        NULL,
  `address_id`     INT UNSIGNED                                        NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQUE_JOB_SHIPMENT` (`job_id` ASC, `number` ASC),
  INDEX `shipments__shops__fk_idx` (`shop_id` ASC),
  INDEX `shipments__carriers__fk_idx` (`carrier_id` ASC),
  INDEX `shipments__contacts__fk_idx` (`contact_id` ASC),
  INDEX `shipments__addresses__fk_idx` (`address_id` ASC),
  CONSTRAINT `shipments__jobs__fk`
  FOREIGN KEY (`job_id`)
  REFERENCES `ssi-business`.`jobs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipments__shops__fk`
  FOREIGN KEY (`shop_id`)
  REFERENCES `ssi-business`.`shops` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipments__carriers__fk`
  FOREIGN KEY (`carrier_id`)
  REFERENCES `ssi-business`.`carriers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipments__contacts__fk`
  FOREIGN KEY (`contact_id`)
  REFERENCES `ssi-business`.`contacts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipments__addresses__fk`
  FOREIGN KEY (`address_id`)
  REFERENCES `ssi-business`.`addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipment_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipment_items`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipment_items` (
  `id`               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `shipment_id`      INT UNSIGNED NOT NULL,
  `shipping_item_id` INT UNSIGNED NOT NULL,
  `quantity`         INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UNIQUE_SHIPMENT_SHIPPING_ITEM` (`shipment_id` ASC, `shipping_item_id` ASC),
  INDEX `shipment_shipping_items__shipping_items__fk_idx` (`shipping_item_id` ASC),
  CONSTRAINT `shipment_items__shipments__fk`
  FOREIGN KEY (`shipment_id`)
  REFERENCES `ssi-business`.`shipments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shipment_items__shipping_items__fk`
  FOREIGN KEY (`shipping_item_id`)
  REFERENCES `ssi-business`.`shipping_items` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`rev_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`rev_info`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`rev_info` (
  `id`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `author_user_id` INT UNSIGNED NOT NULL,
  `timestamp`      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `rev_info__users__fk_idx` (`author_user_id` ASC),
  CONSTRAINT `rev_info__users__fk`
  FOREIGN KEY (`author_user_id`)
  REFERENCES `ssi-business`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`jobs_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`jobs_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`jobs_audit` (
  `id`             INT UNSIGNED                                                  NOT NULL,
  `rev_id`         INT UNSIGNED                                                  NOT NULL,
  `prefix`         ENUM('B', 'F', 'FC', 'FE', 'FR', 'FS', 'M', 'MF', 'MT', 'RG') NULL,
  `year`           YEAR                                                          NULL,
  `label`          VARCHAR(20)                                                   NULL,
  `status`         ENUM('DRAFT', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'DELETED')  NULL,
  `description`    TEXT                                                          NULL,
  `contract_price` DECIMAL                                                       NULL,
  `start_date`     DATE                                                          NULL,
  `due_date`       DATE                                                          NULL,
  `shop_id`        INT UNSIGNED                                                  NULL,
  `salesperson_id` INT UNSIGNED                                                  NULL,
  `customer_id`    INT UNSIGNED                                                  NULL,
  `contact_id`     INT UNSIGNED                                                  NULL,
  `rev_type`       ENUM('CREATE', 'UPDATE', 'DELETE')                            NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `jobs_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `jobs_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`schedules_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`schedules_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`schedules_audit` (
  `id`            INT UNSIGNED                                                                NOT NULL,
  `rev_id`        INT UNSIGNED                                                                NOT NULL,
  `job_id`        INT UNSIGNED                                                                NULL,
  `schedule_type` ENUM('ENGINEERING', 'MECHANICAL', 'ELECTRICAL', 'SHIPPING', 'INSTALLATION') NULL,
  `start_date`    DATE                                                                        NULL,
  `complete_date` DATE                                                                        NULL,
  `rev_type`      ENUM('CREATE', 'UPDATE', 'DELETE')                                          NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `schedules_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `schedules_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`addresses_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`addresses_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`addresses_audit` (
  `id`              INT UNSIGNED                       NOT NULL,
  `rev_id`          INT UNSIGNED                       NOT NULL,
  `lines`           TEXT                               NULL,
  `city`            VARCHAR(100)                       NULL,
  `stateOrProvince` VARCHAR(100)                       NULL,
  `postal_code`     VARCHAR(20)                        NULL,
  `country`         VARCHAR(100)                       NULL,
  `rev_type`        ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `addresses_audit__rev_info_idx` (`rev_id` ASC),
  CONSTRAINT `addresses_audit__rev_info`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`part_orders_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`part_orders_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`part_orders_audit` (
  `id`                 INT UNSIGNED                                        NOT NULL,
  `rev_id`             INT UNSIGNED                                        NOT NULL,
  `job_id`             INT UNSIGNED                                        NULL,
  `drawing_label`      VARCHAR(100)                                        NULL,
  `status`             ENUM('ACTIVE', 'COMPLETED', 'CANCELLED', 'DELETED') NULL,
  `part_id`            INT UNSIGNED                                        NULL,
  `manufacturer_id`    INT UNSIGNED                                        NULL,
  `vendor_id`          INT UNSIGNED                                        NULL,
  `po`                 VARCHAR(100)                                        NULL,
  `requested_quantity` INT UNSIGNED                                        NULL,
  `stock_quantity`     INT UNSIGNED                                        NULL,
  `purchase_quantity`  INT UNSIGNED                                        NULL,
  `request_date`       DATE                                                NULL,
  `purchase_date`      DATE                                                NULL,
  `release_date`       DATE                                                NULL,
  `released_by`        VARCHAR(100)                                        NULL,
  `rev_type`           ENUM('CREATE', 'UPDATE', 'DELETE')                  NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `part_orders_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `part_orders_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`addenda_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`addenda_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`addenda_audit` (
  `id`          INT UNSIGNED                       NOT NULL,
  `rev_id`      INT UNSIGNED                       NOT NULL,
  `job_id`      INT UNSIGNED                       NULL,
  `label`       VARCHAR(50)                        NULL,
  `description` TEXT                               NULL,
  `created`     TIMESTAMP                          NULL,
  `rev_type`    ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  UNIQUE INDEX `UNIQUE_REVISION_LABEL` (`job_id` ASC, `label` ASC),
  INDEX `addenda_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `addenda_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`carriers_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`carriers_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`carriers_audit` (
  `id`       INT UNSIGNED                       NOT NULL,
  `rev_id`   INT UNSIGNED                       NOT NULL,
  `label`    VARCHAR(100)                       NULL,
  `rev_type` ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `carriers_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `carriers_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`contacts_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`contacts_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`contacts_audit` (
  `id`       INT UNSIGNED                       NOT NULL,
  `rev_id`   INT UNSIGNED                       NOT NULL,
  `label`    VARCHAR(100)                       NULL,
  `phone`    VARCHAR(20)                        NULL,
  `fax`      VARCHAR(20)                        NULL,
  `email`    VARCHAR(100)                       NULL,
  `rev_type` ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `contacts_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `contacts_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`customers_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`customers_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`customers_audit` (
  `id`       INT UNSIGNED                       NOT NULL,
  `rev_id`   INT UNSIGNED                       NOT NULL,
  `label`    VARCHAR(100)                       NULL,
  `rev_type` ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `customers_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `customers_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`drawings_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`drawings_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`drawings_audit` (
  `id`            INT UNSIGNED                       NOT NULL AUTO_INCREMENT,
  `rev_id`        INT UNSIGNED                       NOT NULL,
  `job_id`        INT UNSIGNED                       NULL,
  `label`         VARCHAR(100)                       NULL,
  `drawing_type`  ENUM('DETAIL', 'LAYOUT')           NULL,
  `title`         TEXT                               NULL,
  `shop_id`       INT UNSIGNED                       NULL,
  `revision`      VARCHAR(20)                        NULL,
  `revision_date` DATE                               NULL,
  `start_date`    DATE                               NULL,
  `shop_date`     DATE                               NULL,
  `field_date`    DATE                               NULL,
  `rev_type`      ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `drawings_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `drawings_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`job_addresses_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`job_addresses_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`job_addresses_audit` (
  `id`           INT UNSIGNED                       NOT NULL,
  `rev_id`       INT UNSIGNED                       NOT NULL,
  `job_id`       INT UNSIGNED                       NULL,
  `address_type` ENUM('SHIPPING', 'INVOICING')      NULL,
  `address_id`   INT UNSIGNED                       NULL,
  `rev_type`     ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `job_addresses_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `job_addresses_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`manufacturers_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`manufacturers_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`manufacturers_audit` (
  `id`       INT UNSIGNED                       NOT NULL,
  `rev_id`   INT UNSIGNED                       NOT NULL,
  `label`    VARCHAR(100)                       NULL,
  `rev_type` ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `manufacturers_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `manufacturers_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`marks_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`marks_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`marks_audit` (
  `id`               INT UNSIGNED                       NOT NULL,
  `rev_id`           INT UNSIGNED                       NOT NULL,
  `drawing_id`       INT UNSIGNED                       NULL,
  `label`            VARCHAR(100)                       NULL,
  `tag_type`         ENUM('S', 'W')                     NULL,
  `shipping_item_id` INT UNSIGNED                       NULL,
  `rev_type`         ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `marks_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `marks_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`parts_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`parts_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`parts_audit` (
  `id`          INT UNSIGNED                       NOT NULL,
  `rev_id`      INT UNSIGNED                       NOT NULL,
  `type`        ENUM('MECH', 'ELEC')               NULL,
  `number`      VARCHAR(200)                       NULL,
  `description` TEXT                               NULL,
  `rev_type`    ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `parts_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `parts_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`salespeople_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`salespeople_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`salespeople_audit` (
  `id`       INT UNSIGNED                       NOT NULL AUTO_INCREMENT,
  `rev_id`   INT UNSIGNED                       NOT NULL,
  `label`    VARCHAR(100)                       NULL,
  `rev_type` ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `salespeople_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `salespeople_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipment_items_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipment_items_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipment_items_audit` (
  `id`               INT UNSIGNED                       NOT NULL,
  `rev_id`           INT UNSIGNED                       NOT NULL,
  `shipment_id`      INT UNSIGNED                       NULL,
  `shipping_item_id` INT UNSIGNED                       NULL,
  `quantity`         INT UNSIGNED                       NULL,
  `rev_type`         ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `shipment_items_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `shipment_items_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipments_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipments_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipments_audit` (
  `id`             INT UNSIGNED                                        NOT NULL,
  `rev_id`         INT UNSIGNED                                        NOT NULL,
  `job_id`         INT UNSIGNED                                        NULL,
  `number`         INT UNSIGNED                                        NULL DEFAULT 1,
  `status`         ENUM('ACTIVE', 'COMPLETED', 'CANCELLED', 'DELETED') NULL,
  `shop_id`        INT UNSIGNED                                        NULL,
  `carrier_id`     INT UNSIGNED                                        NULL,
  `weight`         INT UNSIGNED                                        NULL,
  `bill_of_lading` VARCHAR(100)                                        NULL,
  `ship_date`      DATE                                                NULL,
  `contact_id`     INT UNSIGNED                                        NULL,
  `address_id`     INT UNSIGNED                                        NULL,
  `rev_type`       ENUM('CREATE', 'UPDATE', 'DELETE')                  NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `shipments_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `shipments_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipping_group_items_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipping_group_items_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipping_group_items_audit` (
  `id`                INT UNSIGNED                       NOT NULL,
  `rev_id`            INT UNSIGNED                       NOT NULL,
  `shipping_group_id` INT UNSIGNED                       NULL,
  `shipping_item_id`  INT UNSIGNED                       NULL,
  `label`             VARCHAR(100)                       NULL,
  `rev_type`          ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `shipping_group_items_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `shipping_group_items_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipping_groups_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipping_groups_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipping_groups_audit` (
  `id`       INT UNSIGNED                       NOT NULL,
  `rev_id`   INT UNSIGNED                       NOT NULL,
  `job_id`   INT UNSIGNED                       NULL,
  `label`    VARCHAR(100)                       NULL,
  `rush`     TINYINT(1)                         NULL,
  `shop_id`  INT UNSIGNED                       NULL,
  `rev_type` ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `shipping_groups_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `shipping_groups_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipping_items_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipping_items_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipping_items_audit` (
  `id`               INT UNSIGNED                                                                                                                           NOT NULL,
  `rev_id`           INT UNSIGNED                                                                                                                           NOT NULL,
  `status`           ENUM('FAB', 'PREFAB', 'SHPD', 'RTA', 'RTS', 'MACH', 'MOO', 'NS', 'PAINT', 'SIP', 'WP', 'SAMPLE', 'MEM', 'FTS', 'VOID', 'NEXT', 'HOLD') NULL,
  `requested`        INT UNSIGNED                                                                                                                           NULL,
  `completed`        INT UNSIGNED                                                                                                                           NULL,
  `assigned_shop_id` INT UNSIGNED                                                                                                                           NULL,
  `remarks`          TEXT                                                                                                                                   NULL,
  `rev_type`         ENUM('CREATE', 'UPDATE', 'DELETE')                                                                                                     NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `shipping_items_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `shipping_items_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shops_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shops_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shops_audit` (
  `id`       INT UNSIGNED                       NOT NULL,
  `rev_id`   INT UNSIGNED                       NOT NULL,
  `label`    VARCHAR(100)                       NULL,
  `rev_type` ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `shops_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `shops_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`vendors_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`vendors_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`vendors_audit` (
  `id`       INT UNSIGNED                       NOT NULL,
  `rev_id`   INT UNSIGNED                       NOT NULL,
  `label`    VARCHAR(100)                       NULL,
  `rev_type` ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `vendors_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `vendors_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`zones_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`zones_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`zones_audit` (
  `id`         INT UNSIGNED                       NOT NULL,
  `rev_id`     INT UNSIGNED                       NOT NULL,
  `job_id`     INT UNSIGNED                       NULL,
  `number`     INT UNSIGNED                       NULL,
  `field_date` DATE                               NULL,
  `rev_type`   ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `zones_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `zones_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ssi-business`.`shipping_item_zones_audit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ssi-business`.`shipping_item_zones_audit`;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ssi-business`.`shipping_item_zones_audit` (
  `id`               INT UNSIGNED                       NOT NULL,
  `rev_id`           INT UNSIGNED                       NOT NULL,
  `shipping_item_id` INT UNSIGNED                       NULL,
  `zone_id`          INT UNSIGNED                       NULL,
  `quantity`         INT UNSIGNED                       NULL,
  `rev_type`         ENUM('CREATE', 'UPDATE', 'DELETE') NOT NULL,
  PRIMARY KEY (`id`, `rev_id`),
  INDEX `shipping_item_zones_audit__rev_info__fk_idx` (`rev_id` ASC),
  CONSTRAINT `shipping_item_zones_audit__rev_info__fk`
  FOREIGN KEY (`rev_id`)
  REFERENCES `ssi-business`.`rev_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
  ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;