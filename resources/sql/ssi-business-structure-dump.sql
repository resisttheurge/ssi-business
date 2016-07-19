CREATE DATABASE  IF NOT EXISTS `ssi-business` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ssi-business`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: ssi-business
-- ------------------------------------------------------
-- Server version	5.6.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `lines` text,
  `city` varchar(100) DEFAULT NULL,
  `state_or_province` varchar(100) DEFAULT NULL,
  `postal_code` varchar(30) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=151979 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `addressjobtemp`
--

DROP TABLE IF EXISTS `addressjobtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addressjobtemp` (
  `addressesid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `jobid` int(10) unsigned NOT NULL,
  `type` enum('Job','Drawing','Shipments') NOT NULL,
  PRIMARY KEY (`addressesid`)
) ENGINE=InnoDB AUTO_INCREMENT=152783 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `carriers`
--

DROP TABLE IF EXISTS `carriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carriers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contactjobtemp`
--

DROP TABLE IF EXISTS `contactjobtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contactjobtemp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `jobid` int(10) unsigned NOT NULL,
  `type` enum('Job','Drawing','Shipments') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39814 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) DEFAULT NULL,
  `phone` varchar(35) DEFAULT NULL,
  `fax` varchar(35) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39708 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=2207 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `drawings`
--

DROP TABLE IF EXISTS `drawings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drawings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `label` varchar(100) NOT NULL,
  `drawing_type` enum('DETAIL','LAYOUT','VOID') NOT NULL,
  `specialty_item_id` int(10) unsigned DEFAULT NULL,
  `shipping_request_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_JOB_DRAWING_LABEL` (`job_id`,`label`),
  KEY `drawings__jobs__fk_idx` (`job_id`),
  KEY `drawings__shipping_requests__fk_idx` (`shipping_request_id`),
  KEY `drawings__specialty_items__fk_idx` (`specialty_item_id`),
  CONSTRAINT `drawings__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `drawings__shipping_requests__fk` FOREIGN KEY (`shipping_request_id`) REFERENCES `shipping_requests` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `drawings__specialty_items__fk` FOREIGN KEY (`specialty_item_id`) REFERENCES `specialty_items` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24586 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dwgshipreqlinktemp`
--

DROP TABLE IF EXISTS `dwgshipreqlinktemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dwgshipreqlinktemp` (
  `shipping_request_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dwg_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`shipping_request_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84851 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `idslinktemp`
--

DROP TABLE IF EXISTS `idslinktemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `idslinktemp` (
  `shipping_items_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `jobid` int(10) unsigned DEFAULT NULL,
  `dwgid` int(10) unsigned DEFAULT NULL,
  `mark` varchar(255) DEFAULT NULL,
  `tagid` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`shipping_items_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84969 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_addresses`
--

DROP TABLE IF EXISTS `job_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_addresses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `address_type` enum('SHIPPING','INVOICING') NOT NULL,
  `address_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_JOB_ADDRESS_TYPE` (`job_id`,`address_type`),
  KEY `job_addresses__addresses__fk_idx` (`address_id`),
  CONSTRAINT `job_addresses__addresses__fk` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `job_addresses__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45605 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `job_system_types`
--

DROP TABLE IF EXISTS `job_system_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_system_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `system_type_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_JOB_SYSTEM_TYPE` (`job_id`,`system_type_id`),
  KEY `job_system_types__jobs__fk_idx` (`job_id`),
  KEY `job_system_types__system_types__fk_idx` (`system_type_id`),
  CONSTRAINT `job_system_types__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `job_system_types__system_types__fk` FOREIGN KEY (`system_type_id`) REFERENCES `system_types` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=943 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `prefix` enum('B','F','FC','FE','FR','FS','M','MF','MT','RG','BM','LM','MM','D','G','DR','EE','ME','MS','TM') NOT NULL,
  `year` year(4) NOT NULL,
  `label` varchar(20) NOT NULL,
  `status` enum('INACTIVE','ACTIVE','COMPLETED','CANCELLED','DELETED') NOT NULL DEFAULT 'INACTIVE',
  `description` text,
  `contract_price` decimal(19,4) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `shop_id` int(10) unsigned DEFAULT NULL,
  `salesperson_id` int(10) unsigned DEFAULT NULL,
  `customer_id` int(10) unsigned DEFAULT NULL,
  `invoicing_customer_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `complete_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs__shops__fk_idx` (`shop_id`),
  KEY `jobs__salespeople__fk_idx` (`salesperson_id`),
  KEY `jobs__customers__fk_idx` (`customer_id`),
  KEY `jobs__contacts__fk_idx` (`contact_id`),
  CONSTRAINT `jobs__contacts__fk` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `jobs__customers__fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `jobs__salespeople__fk` FOREIGN KEY (`salesperson_id`) REFERENCES `salespeople` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `jobs__shops__fk` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13260 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `drawing_id` int(10) unsigned NOT NULL,
  `label` varchar(100) NOT NULL,
  `shipping_item_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_DRAWING_MARK` (`drawing_id`,`label`),
  KEY `marks__drawings__fk_idx` (`drawing_id`),
  KEY `marks__shipping_items__fk_idx` (`shipping_item_id`),
  CONSTRAINT `marks__drawings__fk` FOREIGN KEY (`drawing_id`) REFERENCES `drawings` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `marks__shipping_items__fk` FOREIGN KEY (`shipping_item_id`) REFERENCES `shipping_items` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45710 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `part_orders`
--

DROP TABLE IF EXISTS `part_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `part_orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `drawing_id` int(10) unsigned DEFAULT NULL,
  `abm_number` int(11) DEFAULT NULL,
  `status` enum('ACTIVE','COMPLETED','CANCELLED','DELETED') NOT NULL,
  `part_type` enum('MECH','ELEC') DEFAULT NULL,
  `part_number` varchar(100) DEFAULT NULL,
  `part_description` varchar(255) DEFAULT NULL,
  `manufacturer_id` int(10) unsigned DEFAULT NULL,
  `vendor_id` int(10) unsigned DEFAULT NULL,
  `po` varchar(100) DEFAULT NULL,
  `requested_quantity` int(10) unsigned NOT NULL DEFAULT '0',
  `stock_quantity` int(10) unsigned NOT NULL DEFAULT '0',
  `purchase_quantity` int(10) unsigned NOT NULL DEFAULT '0',
  `request_date` date DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `released_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `purchase_orders__drawings__fk_idx` (`drawing_id`),
  KEY `purchase_orders__manufacturers__fk_idx` (`manufacturer_id`),
  KEY `purchase_orders__vendors__fk_idx` (`vendor_id`),
  KEY `purchase_orders__jobs__fk` (`job_id`),
  CONSTRAINT `purchase_orders__drawings__fk` FOREIGN KEY (`drawing_id`) REFERENCES `drawings` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `purchase_orders__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `purchase_orders__manufacturers__fk` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `purchase_orders__vendors__fk` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `salespeople`
--

DROP TABLE IF EXISTS `salespeople`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salespeople` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedules` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `schedule_type` enum('ENGINEERING','MECHANICAL','ELECTRICAL','SHIPPING','INSTALLATION') NOT NULL,
  `start_date` date DEFAULT NULL,
  `complete_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_JOB_SCHEDULE_TYPE` (`job_id`,`schedule_type`),
  CONSTRAINT `job_schedules__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12136 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipment_items`
--

DROP TABLE IF EXISTS `shipment_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipment_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shipment_id` int(10) unsigned NOT NULL,
  `shipping_item_id` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `shipment_items__shipments__fk_idx` (`shipment_id`),
  KEY `shipment_items__shipping_items__fk_idx` (`shipping_item_id`),
  CONSTRAINT `shipment_items__shipments__fk` FOREIGN KEY (`shipment_id`) REFERENCES `shipments` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `shipment_items__shipping_items__fk` FOREIGN KEY (`shipping_item_id`) REFERENCES `shipping_items` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46748 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipments`
--

DROP TABLE IF EXISTS `shipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL DEFAULT '1',
  `status` enum('ACTIVE','POSTED','COMPLETED','CANCELLED','DELETED') NOT NULL,
  `shop_id` int(10) unsigned DEFAULT NULL,
  `carrier_id` int(10) unsigned DEFAULT NULL,
  `weight` int(10) unsigned NOT NULL DEFAULT '0',
  `bill_of_lading` varchar(100) DEFAULT NULL,
  `ship_date` date DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `address_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_JOB_SHIPMENT` (`job_id`,`number`),
  KEY `shipments__shops__fk_idx` (`shop_id`),
  KEY `shipments__carriers__fk_idx` (`carrier_id`),
  KEY `shipments__contacts__fk_idx` (`contact_id`),
  KEY `shipments__addresses__fk_idx` (`address_id`),
  CONSTRAINT `shipments__addresses__fk` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `shipments__carriers__fk` FOREIGN KEY (`carrier_id`) REFERENCES `carriers` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `shipments__contacts__fk` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `shipments__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `shipments__shops__fk` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1346 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipping_group_items`
--

DROP TABLE IF EXISTS `shipping_group_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_group_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shipping_group_id` int(10) unsigned NOT NULL,
  `shipping_item_id` int(10) unsigned NOT NULL,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_GROUP_ITEM` (`shipping_group_id`,`shipping_item_id`),
  UNIQUE KEY `UNIQUE_GROUP_ITEM_LABEL` (`shipping_group_id`,`shipping_item_id`,`label`),
  KEY `shipping_group_items_idx` (`shipping_group_id`),
  KEY `shipping_groupt_items__shipping_items__fk_idx` (`shipping_item_id`),
  CONSTRAINT `shipping_group_items__shipping_groups__fk` FOREIGN KEY (`shipping_group_id`) REFERENCES `shipping_groups` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `shipping_groupt_items__shipping_items__fk` FOREIGN KEY (`shipping_item_id`) REFERENCES `shipping_items` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11805 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipping_groups`
--

DROP TABLE IF EXISTS `shipping_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `label` varchar(100) NOT NULL,
  `rush` tinyint(1) NOT NULL DEFAULT '0',
  `shipping_request_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_JOB_SHIPPING_GROUP_LABEL` (`job_id`,`label`),
  KEY `shipping_groups__jobs__fk_idx` (`job_id`),
  KEY `shipping_groups__shipping_requests__fk_idx` (`shipping_request_id`),
  CONSTRAINT `shipping_groups__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `shipping_groups__shipping_requests__fk` FOREIGN KEY (`shipping_request_id`) REFERENCES `shipping_requests` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24589 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger rms_label_insert before insert on shipping_groups
for each row 
BEGIN
  IF (NEW.id is null) then
	SET NEW.id = (SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME='shipping_groups');
  END IF;
  SET NEW.label = if(char_length(NEW.label) = 0, concat('RMS', NEW.id), NEW.label);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger rms_label_update before update on shipping_groups
for each row 
BEGIN
  SET NEW.label = if(char_length(NEW.label) = 0, concat('RMS', NEW.id), NEW.label);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `shipping_item_zones`
--

DROP TABLE IF EXISTS `shipping_item_zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_item_zones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shipping_item_id` int(10) unsigned NOT NULL,
  `zone_id` int(10) unsigned NOT NULL,
  `quantity` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_SHIPPING_ITEM_ZONE` (`shipping_item_id`,`zone_id`),
  KEY `zones__shipping_items__fk_idx` (`shipping_item_id`),
  KEY `shipping_item_zones__zones__fk_idx` (`zone_id`),
  CONSTRAINT `shipping_item_zones__shipping_items__fk` FOREIGN KEY (`shipping_item_id`) REFERENCES `shipping_items` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `shipping_item_zones__zones__fk` FOREIGN KEY (`zone_id`) REFERENCES `zones` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=82824 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipping_items`
--

DROP TABLE IF EXISTS `shipping_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` enum('FAB','FTS','HOLD','MACH','MEM','MOO','NEXT','NS','PAINT','PREFAB','REWORK','RTA','RTP','RTS','SAMPLE','SHPD','SIP','VOID','W.O.REV.','WP') NOT NULL,
  `label` varchar(250) DEFAULT NULL,
  `requested` int(10) unsigned NOT NULL DEFAULT '0',
  `completed` int(10) unsigned NOT NULL DEFAULT '0',
  `remarks` text,
  `shop_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shipping_items__shops__fk_idx` (`shop_id`),
  CONSTRAINT `shipping_items__shops__fk` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=71765 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shipping_requests`
--

DROP TABLE IF EXISTS `shipping_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_requests` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_type` enum('S','W') DEFAULT NULL,
  `title` text,
  `revision` varchar(100) DEFAULT NULL,
  `revision_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `shop_date` date DEFAULT NULL,
  `field_date` date DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `requested_by` varchar(100) DEFAULT NULL,
  `prepared_by` varchar(100) DEFAULT NULL,
  `file_path` varchar(200) DEFAULT NULL,
  `shop_id` int(10) unsigned DEFAULT NULL,
  `carrier_id` int(10) unsigned DEFAULT NULL,
  `contact_id` int(10) unsigned DEFAULT NULL,
  `address_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shipping_requests__files__fk_idx` (`file_path`),
  KEY `shipping_requests__shops__fk_idx` (`shop_id`),
  KEY `shipping_requests__carriers__fk_idx` (`carrier_id`),
  KEY `shipping_requests__contacts__fk_idx` (`contact_id`),
  KEY `shipping_requests__addresses__fk_idx` (`address_id`),
  CONSTRAINT `shipping_requests__addresses__fk` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `shipping_requests__carriers__fk` FOREIGN KEY (`carrier_id`) REFERENCES `carriers` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `shipping_requests__contacts__fk` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `shipping_requests__shops__fk` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=71535 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shops`
--

DROP TABLE IF EXISTS `shops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shops` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `specialty_items`
--

DROP TABLE IF EXISTS `specialty_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specialty_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=381 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `system_types`
--

DROP TABLE IF EXISTS `system_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `user_id` int(10) unsigned NOT NULL,
  `role` enum('ADMIN','EMPLOYEE') NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`,`role`),
  CONSTRAINT `user_roles__users__fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` char(60) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `validshippertemp`
--

DROP TABLE IF EXISTS `validshippertemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `validshippertemp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1346 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `validtagtemp`
--

DROP TABLE IF EXISTS `validtagtemp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `validtagtemp` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19765 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `zones`
--

DROP TABLE IF EXISTS `zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `number` int(10) unsigned NOT NULL DEFAULT '1',
  `field_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_JOB_ZONE_NUMBER` (`job_id`,`number`),
  CONSTRAINT `zones__jobs__fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1465 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'ssi-business'
--
/*!50003 DROP PROCEDURE IF EXISTS `CustomerJob` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CustomerJob`(IN jobId int)
BEGIN
SELECT 
    jobId, c.label, j.prefix, j.year, j.label
FROM
    customers c
        RIGHT JOIN
    jobs j ON c.id = j.customer_id
WHERE
    j.id = jobId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `JobSearch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `JobSearch`(in instart varchar(10),
				 in inend varchar(200),
                 in inprefix varchar(200),
                 in inyear varchar(200),
                 in inlabel varchar(200),
                 in incity varchar(200),
                 in instate varchar(200),
                 in incustomer varchar(200))
BEGIN
	
	DROP TEMPORARY TABLE IF EXISTS jobstarttemp;
    

    if instart = '' then
		create temporary table jobstarttemp select id from jobs;
    else
		create temporary table jobstarttemp select id from jobs where start_date >= instart;
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS jobendtemp;
    if inend = '' then
		create temporary table jobendtemp select id from jobstarttemp;
    else
		create temporary table jobendtemp select id from jobs where start_date <= inend and id in (select id from jobstarttemp);
	end if;

	DROP TEMPORARY TABLE IF EXISTS jobprefixtemp;
    if inprefix = '' then
		create temporary table jobprefixtemp select id from jobendtemp;
    else
		create temporary table jobprefixtemp select id from jobs where prefix like concat(inprefix,'%') and id in (select id from jobendtemp);
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS jobyeartemp;
    if inyear = '' then
		create temporary table jobyeartemp select id from jobprefixtemp;
    else
		create temporary table jobyeartemp select id from jobs where year like concat('%', inyear,'%') and id in (select id from jobprefixtemp);
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS joblabeltemp;
    if inlabel = '' then
		create temporary table joblabeltemp select id from jobyeartemp;
    else
		create temporary table joblabeltemp select id from jobs where label like concat(inlabel,'%') and id in (select id from jobyeartemp);
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS addresscitytemp;
    if incity = '' then
		create temporary table addresscitytemp select id from addresses;
    else
		create temporary table addresscitytemp select id from addresses where city like concat(incity,'%');
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS customerlabeltemp;
    if incustomer = '' then
		create temporary table customerlabeltemp select id from customers;
    else
		create temporary table customerlabeltemp select id from customers where label like concat(incustomer,'%');
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS addressstatetemp;
    if instate = '' then
		create temporary table addressstatetemp select id from addresscitytemp;
    else
		create temporary table addressstatetemp select id from addresses where state_or_province like concat(instate,'%') and id in (select id from addresscitytemp);
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS validjobidtemp;
    create temporary table validjobidtemp
    select * 
    from jobs 
    where id in (select id 
                 from joblabeltemp) 
    and id in (select job_id 
			   from job_addresses 
               where address_id in (select id 
								    from addressstatetemp))
	and customer_id in (select id from customerlabeltemp);
SELECT DISTINCT
    j.prefix,
    j.year,
    j.label,
    c.label,
    a.city,
    a.state_or_province,
    a.country,
    j.description,
    j.contract_price
FROM
    jobs j
        LEFT JOIN
    customers c ON c.id = j.customer_id
        LEFT JOIN
    job_addresses ja ON j.id = ja.job_id
        LEFT JOIN
    addresses a ON ja.address_id = a.id
        LEFT JOIN
    shipments s ON s.job_id = j.id
WHERE ja.address_type = 'SHIPPING'
        AND j.id in (select id from validjobidtemp)
ORDER BY j.prefix , j.year , j.label;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `JobShipment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `JobShipment`(IN shipmentId int)
BEGIN
SELECT 
    j.prefix,
    j.year,
    j.label,
    s.number,
    s.weight,
    (SELECT 
            sh.label
        FROM
            shops sh
        WHERE
            sh.id = s.shop_id) AS shop,
    (SELECT 
            c.label
        FROM
            contacts c
        WHERE
            c.id = s.contact_id) AS contact,
    a.`lines`,
    a.city,
    a.state_or_province,
    a.postal_code,
    a.country,
    s.id,
    '' as shipVia,
    '' as billOfLading,
    '' as date
FROM
    jobs j
        INNER JOIN
    shipments s ON j.id = s.job_id
        LEFT JOIN
    addresses a ON s.address_id = a.id
WHERE
    s.id = shipmentId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `JobShipmentInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `JobShipmentInfo`(IN shipmentId int)
BEGIN
SELECT 
    (SELECT 
            m.label
        FROM
            marks m
        WHERE
            m.shipping_item_id = shi.shipping_item_id) AS mark,
    (SELECT 
            sgi.label
        FROM
            shipping_group_items sgi
        WHERE
            sgi.shipping_item_id = shi.shipping_item_id) AS shipping_group,
    (SELECT 
            si.label
        FROM
            shipping_items si
        WHERE
            si.id = shi.shipping_item_id) AS description,
    '0' AS qtyReqd,
    quantity AS qtyShpd
FROM
    shipment_items shi
WHERE
    shi.shipment_id = shipmentId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `LayoutDrawing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `LayoutDrawing`(IN jobId int)
BEGIN
SELECT 
    d.label,
    sr.revision,
    sr.title,
    s.label,
    sr.revision_date,
    sr.start_date,
    sr.shop_date,
    sr.field_date,
    d.drawing_type,
    sr.tag_type
FROM
    drawings d
        LEFT JOIN
    shipping_requests sr ON d.shipping_request_id = sr.id
        LEFT JOIN
    shops s ON sr.shop_id = s.id
WHERE
    d.job_id = jobId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ManagementReview` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ManagementReview`(in instart varchar(10),
				 in inend varchar(200),
                 in inprefix varchar(200),
                 in inyear varchar(200),
                 in inlabel varchar(200),
                 in incity varchar(200),
                 in instate varchar(200),
                 in incustomer varchar(200))
BEGIN
	
	DROP TEMPORARY TABLE IF EXISTS jobstarttemp;
    

    if instart = '' then
		create temporary table jobstarttemp select id from jobs;
    else
		create temporary table jobstarttemp select id from jobs where start_date >= instart;
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS jobendtemp;
    if inend = '' then
		create temporary table jobendtemp select id from jobstarttemp;
    else
		create temporary table jobendtemp select id from jobs where start_date <= inend and id in (select id from jobstarttemp);
	end if;

	DROP TEMPORARY TABLE IF EXISTS jobprefixtemp;
    if inprefix = '' then
		create temporary table jobprefixtemp select id from jobendtemp;
    else
		create temporary table jobprefixtemp select id from jobs where prefix like concat(inprefix,'%') and id in (select id from jobendtemp);
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS jobyeartemp;
    if inyear = '' then
		create temporary table jobyeartemp select id from jobprefixtemp;
    else
		create temporary table jobyeartemp select id from jobs where year like concat('%', inyear,'%') and id in (select id from jobprefixtemp);
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS joblabeltemp;
    if inlabel = '' then
		create temporary table joblabeltemp select id from jobyeartemp;
    else
		create temporary table joblabeltemp select id from jobs where label like concat(inlabel,'%') and id in (select id from jobyeartemp);
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS addresscitytemp;
    if incity = '' then
		create temporary table addresscitytemp select id from addresses;
    else
		create temporary table addresscitytemp select id from addresses where city like concat(incity,'%');
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS customerlabeltemp;
    if incustomer = '' then
		create temporary table customerlabeltemp select id from customers;
    else
		create temporary table customerlabeltemp select id from customers where label like concat(incustomer,'%');
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS addressstatetemp;
    if instate = '' then
		create temporary table addressstatetemp select id from addresscitytemp;
    else
		create temporary table addressstatetemp select id from addresses where state_or_province like concat(instate,'%') and id in (select id from addresscitytemp);
	end if;
    
    DROP TEMPORARY TABLE IF EXISTS validjobidtemp;
    create temporary table validjobidtemp
    select * 
    from jobs 
    where id in (select id 
                 from joblabeltemp) 
    and id in (select job_id 
			   from job_addresses 
               where address_id in (select id 
								    from addressstatetemp))
	and customer_id in (select id from customerlabeltemp);
SELECT DISTINCT
    j.prefix,
    j.year,
    j.label,
    c.label,
    a.city,
    a.state_or_province,
    j.start_date,
    j.due_date,
    j.complete_date,
    (SELECT 
            CASE WHEN j.complete_date is null or j.due_date is null
				THEN ''               
                ELSE CASE 
						WHEN j.complete_date <= j.due_date
						THEN 'ON TIME'
                        ELSE 'LATE'
					END
                END
        ) AS status,
    j.description
FROM
    jobs j
        LEFT JOIN
    customers c ON c.id = j.customer_id
        LEFT JOIN
    job_addresses ja ON j.id = ja.job_id
        LEFT JOIN
    addresses a ON ja.address_id = a.id
        LEFT JOIN
    shipments s ON s.job_id = j.id
WHERE
    j.status NOT IN ('CANCELLED' , 'DELETED', 'DRAFT')
        AND ja.address_type = 'SHIPPING'
        AND j.id in (select id from validjobidtemp)
ORDER BY j.prefix , j.year , j.label;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MaterialShipper` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MaterialShipper`(IN jobId int)
BEGIN
SELECT 
    jobId, c.label AS customer, j.prefix, j.year, j.label
FROM
    jobs j
        JOIN
    customers c ON c.id = j.customer_id
WHERE
    j.id = jobId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MaterialShipperDrawing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MaterialShipperDrawing`(IN jobId int)
BEGIN
SELECT 
    d.label AS drawing,
    sr.revision,
    sr.title AS drawingDesc,
    sr.revision_date,
    d.id AS drawingId
FROM
    drawings d
        LEFT JOIN
    shipping_requests sr ON sr.id = d.shipping_request_id
WHERE
    d.job_id = jobId
        AND d.label IN (SELECT DISTINCT
            d.label
        FROM
            drawings d
                LEFT JOIN
            marks m ON d.id = m.drawing_id
                LEFT JOIN
            shipping_items s ON m.shipping_item_id = s.id
                LEFT JOIN
            shipment_items si ON si.shipping_item_id = s.id
        WHERE
            requested != 0
                AND NOT requested <=> quantity
                AND NOT requested <=> (SELECT 
                    SUM(quantity)
                FROM
                    shipment_items
                WHERE
                    shipping_item_id = m.shipping_item_id
                GROUP BY shipping_item_id)
                AND d.job_id = jobId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MaterialShipperMark` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MaterialShipperMark`(IN drawingId int)
BEGIN
SELECT 
    *
FROM
    (SELECT DISTINCT
        m.id,
            m.label AS mark,
            shi.label AS jobDesc,
            (SELECT 
                    label
                FROM
                    shops
                WHERE
                    id = shi.shop_id) AS shop,
            shi.requested,
            (SELECT 
                    SUM(quantity)
                FROM
                    shipment_items shi
                WHERE
                    shi.shipping_item_id = m.shipping_item_id
                        AND s.status NOT IN ('CANCELLED' , 'DELETED')) AS quantity,
            shi.completed,
            shi.status
    FROM
        marks m
    LEFT JOIN shipping_items shi ON m.shipping_item_id = shi.id
    LEFT JOIN shipment_items si ON m.shipping_item_id = si.shipping_item_id
    LEFT JOIN shipments s ON s.id = si.shipment_id
    WHERE
        m.drawing_id = drawingId) AS tab
WHERE
    NOT requested <=> quantity;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MaterialShipperShippingGroup` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MaterialShipperShippingGroup`(IN jobId int)
BEGIN
SELECT DISTINCT
    sg.label AS shippingGroup,
    sr.revision,
    sr.title AS shippingGroupDesc,
    sr.revision_date,
    sg.id AS shippingGroupId
FROM
    shipping_groups sg
        LEFT JOIN
    shipping_group_items sgi ON sg.id = sgi.shipping_group_id
        LEFT JOIN
    shipping_requests sr ON sr.id = sg.shipping_request_id
        LEFT JOIN
    shipping_items s ON s.id = sgi.shipping_item_id
        LEFT JOIN
    shipment_items si ON si.shipping_item_id = sgi.shipping_item_id
WHERE
    sg.job_id = jobId AND requested != 0
        AND NOT requested <=> quantity
        AND NOT requested <=> (SELECT 
            SUM(quantity)
        FROM
            shipment_items
        WHERE
            shipping_item_id = sgi.shipping_item_id
        GROUP BY shipping_item_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MaterialShipperShippingGroupItem` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MaterialShipperShippingGroupItem`(IN shippingGroupId int)
BEGIN
SELECT 
    *
FROM
    (SELECT 
        sg.id,
            sg.label AS shippingGroup,
            shi.label AS jobDesc,
            (SELECT 
                    label
                FROM
                    shops
                WHERE
                    id = shi.shop_id) AS shop,
            shi.requested,
            (SELECT 
                    SUM(quantity)
                FROM
                    shipment_items shi
                WHERE
                    shi.shipping_item_id = sgi.shipping_item_id
                        AND s.status NOT IN ('CANCELLED' , 'DELETED')) AS quantity,
            shi.completed,
            shi.status
    FROM
        shipping_groups sg
    LEFT JOIN shipping_group_items sgi ON sgi.shipping_group_id = sg.id
    LEFT JOIN shipping_items shi ON sgi.shipping_item_id = shi.id
    LEFT JOIN shipment_items si ON sgi.shipping_item_id = si.shipping_item_id
    LEFT JOIN shipments s ON s.id = si.shipment_id
    WHERE
        sgi.shipping_group_id = shippingGroupId) AS tab
WHERE
    NOT requested <=> quantity;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MaterialShipperZone` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MaterialShipperZone`(IN markId int)
BEGIN
SELECT 
    z.number, siz.quantity
FROM
    shipping_item_zones siz
        LEFT JOIN
    zones z ON z.id = siz.zone_id
WHERE
    siz.shipping_item_id IN (SELECT 
            shipping_item_id
        FROM
            marks
        WHERE
            id = markId)
        OR siz.shipping_item_id IN (SELECT 
            shipping_item_id
        FROM
            shipping_group_items
        WHERE
            shipping_group_id = markId);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ProductionSchedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ProductionSchedule`()
BEGIN
SELECT 
    (SELECT 
            c.label
        FROM
            customers c
        WHERE
            c.id = j.customer_id) AS customer,
    j.prefix,
    j.year,
    j.label,
    j.start_date,
    j.due_date,
    (SELECT 
            sdl.start_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'ENGINEERING') AS engStart,
    (SELECT 
            sdl.complete_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'ENGINEERING') AS engComp,
    (SELECT 
            sdl.start_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'MECHANICAL') AS mechStart,
    (SELECT 
            sdl.complete_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'MECHANICAL') AS mechComp,
    (SELECT 
            sdl.start_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'ELECTRICAL') AS eleStart,
    (SELECT 
            sdl.complete_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'ELECTRICAL') AS eleComp,
    (SELECT 
            sdl.start_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'SHIPPING') AS shipStart,
    (SELECT 
            sdl.complete_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'SHIPPING') AS shipComp,
    (SELECT 
            sdl.start_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'INSTALLATION') AS instStart,
    (SELECT 
            sdl.complete_date
        FROM
            schedules sdl
        WHERE
            sdl.job_id = j.id
                AND sdl.schedule_type = 'INSTALLATION') AS instComp,
    j.description,
    (select city from addresses a inner join job_addresses ja on a.id = ja.address_id where ja.job_id = j.id) as city,
    (select state_or_province from addresses a inner join job_addresses ja on a.id = ja.address_id where ja.job_id = j.id) as state
FROM
    jobs j
WHERE
    j.status IN ('ACTIVE')
        AND j.id IN (SELECT 
            job_id
        FROM
            schedules)
        AND j.complete_date IS NULL
ORDER BY j.prefix , j.year , j.label;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Shipment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Shipment`(IN jobId int)
BEGIN
SELECT 
    s.number,
    s.ship_date,
    (SELECT 
            sh.label
        FROM
            shops sh
        WHERE
            sh.id = s.shop_id) AS shop,
    (SELECT 
            c.label
        FROM
            carriers c
        WHERE
            c.id = s.carrier_id) AS shipVia,
    s.weight,
    s.bill_of_lading,
    (SELECT 
            CASE s.status
                    WHEN 'POSTED' THEN TRUE
                    ELSE FALSE
                END
        ) AS posted
FROM
    shipments s
WHERE
    s.job_id = jobId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ShipperInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ShipperInfo`(IN shippingGroupId int)
BEGIN
SELECT 
    sgi.label,
    si.requested,
    si.label,
    si.completed,
    si.remarks
FROM
    shipping_group_items sgi
        INNER JOIN
    shipping_items si ON sgi.shipping_item_id = si.id
WHERE
    shipping_group_id = shippingGroupId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ShippingGroupShipper` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ShippingGroupShipper`(IN jobId int, IN shippingGroupId varchar(100))
BEGIN
SELECT 
    (SELECT 
            c.label
        FROM
            contacts c
        WHERE
            c.id = sr.contact_id) AS contact,
    (SELECT 
            a.`lines`
        FROM
            addresses a
        WHERE
            a.id = sr.address_id) AS address,
    (SELECT 
            a.city
        FROM
            addresses a
        WHERE
            a.id = sr.address_id) AS city,
    (SELECT 
            a.state_or_province
        FROM
            addresses a
        WHERE
            a.id = sr.address_id) AS state,
    (SELECT 
            a.postal_code
        FROM
            addresses a
        WHERE
            a.id = sr.address_id) AS zip,
    (SELECT 
            a.country
        FROM
            addresses a
        WHERE
            a.id = sr.address_id) AS country,
    j.prefix,
    j.year,
    j.label,
    sr.request_date,
    sg.label,
    (SELECT 
            c.label
        FROM
            carriers c
        WHERE
            c.id = sr.carrier_id) AS carrier,
    j.id,
    sg.id,
    (SELECT 
            bill_of_lading
        FROM
            shipments
        WHERE
            id IN (SELECT DISTINCT
                    shipment_id
                FROM
                    shipment_items
                WHERE
                    shipping_item_id IN (SELECT 
                            shipping_item_id
                        FROM
                            shipping_group_items
                        WHERE
                            shipping_group_id = sg.id))) AS billOfLading,
	(SELECT 
            ship_date
        FROM
            shipments
        WHERE
            id IN (SELECT DISTINCT
                    shipment_id
                FROM
                    shipment_items
                WHERE
                    shipping_item_id IN (SELECT 
                            shipping_item_id
                        FROM
                            shipping_group_items
                        WHERE
                            shipping_group_id = sg.id))) AS dateShipped,
    '' as proNo,
    (SELECT label from shops where id = sr.shop_id) as shopId,
    sr.requested_by,
    sr.prepared_by
FROM
    jobs j
        INNER JOIN
    shipping_groups sg ON j.id = sg.job_id
        INNER JOIN
    shipping_requests sr ON sr.id = sg.shipping_request_id
WHERE
    j.id = jobId
        AND sg.id = shippingGroupId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SpecialtyItemsByJob` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpecialtyItemsByJob`(IN jobId int)
BEGIN
SELECT 
    d.label AS drawing, sr.title, si.label AS specialtyItem
FROM
    drawings d
        LEFT JOIN
    specialty_items si ON d.specialty_item_id = si.id
        LEFT JOIN
    shipping_requests sr ON sr.id = d.shipping_request_id
WHERE
    d.job_id = jobId
        AND si.label IS NOT NULL;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SpecialtyItemsByPartType` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SpecialtyItemsByPartType`(IN partType varchar(100))
BEGIN
SELECT 
    partType,
    c.label,
    j.prefix,
    j.year,
    j.label,
    d.label AS drawing,
    sr.title
FROM
    drawings d
        LEFT JOIN
    jobs j ON d.job_id = j.id
        LEFT JOIN
    customers c ON j.customer_id = c.id
        LEFT JOIN
    specialty_items si ON d.specialty_item_id = si.id
        LEFT JOIN
    shipping_requests sr ON sr.id = d.shipping_request_id
WHERE
    si.label = partType;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Zone` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Zone`(IN jobId int)
BEGIN
SELECT 
    z.number, z.field_date, j.prefix, j.year, j.label
FROM
    zones z
        INNER JOIN
    jobs j ON z.job_id = j.id
WHERE
    z.job_id = jobId
ORDER BY z.number;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ZoneList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ZoneList`(IN jobId int)
BEGIN
SELECT 
    number
FROM
    `ssi-business`.zones
WHERE
    job_id = jobId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-19  8:36:34
