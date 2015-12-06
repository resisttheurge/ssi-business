CREATE DATABASE `ssi-business` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `job_revision_address_lines` (
  `job_revision_address_line_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_revision_address_line_number` int(10) unsigned NOT NULL,
  `job_revision_address_line_text` text,
  `job_revision_address_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`job_revision_address_line_id`),
  UNIQUE KEY `address_id__line_number__unique` (`job_revision_address_id`,`job_revision_address_line_number`),
  CONSTRAINT `job_revision_address_lines__job_revision_addresses__fk` FOREIGN KEY (`job_revision_address_id`) REFERENCES `job_revision_addresses` (`job_revision_address_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `job_revision_addresses` (
  `job_revision_address_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_revision_address_type` enum('SHIPPING','INVOICING') NOT NULL DEFAULT 'SHIPPING',
  `job_revision_address_city` varchar(50) DEFAULT NULL,
  `job_revision_address_state` varchar(30) DEFAULT NULL,
  `job_revision_address_zip` varchar(20) DEFAULT NULL,
  `job_revision_address_country` varchar(50) DEFAULT NULL,
  `job_revision_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`job_revision_address_id`),
  UNIQUE KEY `job_id__address_type__unique` (`job_revision_id`,`job_revision_address_type`),
  CONSTRAINT `job_revision_addresses__job_revisions__fk` FOREIGN KEY (`job_revision_id`) REFERENCES `job_revisions` (`job_revision_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `job_revision_schedules` (
  `job_revision_schedule_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_revision_schedule_type` enum('ENGINEERING','MECHANICAL','ELECTRICAL','SHIPPING','INSTALLATION') NOT NULL,
  `job_revision_schedule_start_date` date DEFAULT NULL,
  `job_revision_schedule_end_date` date DEFAULT NULL,
  `job_revision_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`job_revision_schedule_id`),
  UNIQUE KEY `job_id__schedule_type__unique` (`job_revision_id`,`job_revision_schedule_type`),
  CONSTRAINT `job_revision_schedules__job_revisions__fk` FOREIGN KEY (`job_revision_id`) REFERENCES `job_revisions` (`job_revision_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `job_revision_system_types` (
  `job_revision_system_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_revision_id` int(10) unsigned NOT NULL,
  `system_type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`job_revision_system_type_id`),
  UNIQUE KEY `job_id__system_type_id__unique` (`job_revision_id`,`system_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `job_revisions` (
  `job_revision_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `job_revision_enabled` bit(1) NOT NULL DEFAULT b'1',
  `job_revision_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `job_revision_notes` text CHARACTER SET big5,
  `job_revision_label` varchar(20) DEFAULT NULL,
  `job_id` int(10) unsigned NOT NULL,
  `job_status` enum('DRAFT','ACTIVE','COMPLETED','CANCELLED','DELETED') NOT NULL DEFAULT 'DRAFT',
  `job_description` text,
  `job_start_date` date DEFAULT NULL,
  `job_due_date` date DEFAULT NULL,
  `job_shop_id` int(10) unsigned DEFAULT NULL,
  `job_salesperson_id` int(10) unsigned DEFAULT NULL,
  `job_contract_price` decimal(10,0) DEFAULT NULL,
  `job_customer` varchar(100) DEFAULT NULL,
  `job_contact` varchar(100) DEFAULT NULL,
  `job_phone` varchar(20) DEFAULT NULL,
  `job_fax` varchar(20) DEFAULT NULL,
  `job_email` varchar(100) DEFAULT NULL,
  `job_po` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`job_revision_id`,`job_id`),
  UNIQUE KEY `job_id__revision_label__unique` (`job_id`,`job_revision_label`),
  KEY `job_revisions__salespeople__fk_idx` (`job_salesperson_id`),
  KEY `job_revisions__shops__fk_idx` (`job_shop_id`),
  CONSTRAINT `job_revisions__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `job_revisions__salespeople__fk` FOREIGN KEY (`job_salesperson_id`) REFERENCES `salespeople` (`salesperson_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `job_revisions__shops__fk` FOREIGN KEY (`job_shop_id`) REFERENCES `shops` (`shop_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `jobs` (
  `job_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_type` enum('B','F','FC','FE','FR','FS','M','MF','MT','RG') NOT NULL,
  `job_year` year(4) NOT NULL,
  `job_label` varchar(20) NOT NULL,
  PRIMARY KEY (`job_id`),
  UNIQUE KEY `UNIQUE_JOB` (`job_type`,`job_year`,`job_label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `roles` (
  `role_id` int(11) unsigned NOT NULL,
  `role_label` varchar(150) NOT NULL,
  `role_enabled` bit(1) NOT NULL DEFAULT b'1',
  `role_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `name_UNIQUE` (`role_label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `salespeople` (
  `salesperson_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `salesperson_name` varchar(150) NOT NULL,
  PRIMARY KEY (`salesperson_id`),
  UNIQUE KEY `salesperson_name_UNIQUE` (`salesperson_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `shops` (
  `shop_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shop_label` varchar(150) NOT NULL,
  PRIMARY KEY (`shop_id`),
  UNIQUE KEY `shop_label_UNIQUE` (`shop_label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `system_types` (
  `system_type_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `system_type_label` varchar(150) NOT NULL,
  `system_type_description` text,
  PRIMARY KEY (`system_type_id`),
  UNIQUE KEY `system_type_label_UNIQUE` (`system_type_label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tokens` (
  `user_id` int(11) unsigned NOT NULL,
  `token_uuid` char(36) NOT NULL,
  `token_enabled` bit(1) NOT NULL DEFAULT b'1',
  `token_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uuid_UNIQUE` (`token_uuid`),
  CONSTRAINT `tokens__users__fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user_roles` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_role_type` enum('DEV','ADMIN','EMPLOYEE','GUEST') NOT NULL DEFAULT 'GUEST',
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`user_role_id`),
  UNIQUE KEY `user_id__user_role_type__unique` (`user_id`,`user_role_type`),
  KEY `user_roles__users__fk_idx` (`user_id`),
  CONSTRAINT `user_roles__users__fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_username` varchar(100) NOT NULL,
  `user_password` char(60) NOT NULL,
  `user_enabled` bit(1) NOT NULL DEFAULT b'1',
  `user_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`user_username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
