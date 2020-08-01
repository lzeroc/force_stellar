/*
Navicat MySQL Data Transfer

Source Server Version : 50718

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2020-08-01 16:43:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `address` varchar(255) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
