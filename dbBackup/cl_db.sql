-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 29 Eki 2020, 17:39:32
-- Sunucu sürümü: 8.0.22-0ubuntu0.20.04.2
-- PHP Sürümü: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `cl_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblBlog`
--

CREATE TABLE `tblBlog` (
  `BlogID` int NOT NULL,
  `UserID` int NOT NULL,
  `BlogMenuID` int NOT NULL,
  `BlogTitle` varchar(100) NOT NULL,
  `BlogDescription` varchar(200) NOT NULL,
  `BlogContent` text NOT NULL,
  `BlogState` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblBlogMenu`
--

CREATE TABLE `tblBlogMenu` (
  `BlogMenuID` int NOT NULL,
  `BlogMenuName` varchar(150) NOT NULL,
  `BlogMenuDescription` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblComponent`
--

CREATE TABLE `tblComponent` (
  `ComponentID` int NOT NULL,
  `UserID` int NOT NULL,
  `MenuID` int NOT NULL,
  `ComponentName` varchar(100) NOT NULL,
  `ComponentDescription` varchar(250) NOT NULL,
  `ComponentCode` text NOT NULL,
  `ComponentState` tinyint(1) NOT NULL DEFAULT '0',
  `ComponentCreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblComponentMenu`
--

CREATE TABLE `tblComponentMenu` (
  `ComponentMenuID` int NOT NULL,
  `ComponentMenuName` varchar(50) NOT NULL,
  `ComponentMenuDescription` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblProject`
--

CREATE TABLE `tblProject` (
  `ProjectID` int NOT NULL,
  `ProjectName` varchar(100) NOT NULL,
  `ProjectCreatedDate` date NOT NULL,
  `ProjectUpdateDate` date NOT NULL,
  `ProjectCode` text NOT NULL,
  `UserID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUser`
--

CREATE TABLE `tblUser` (
  `UserID` int NOT NULL,
  `UserFirstName` varchar(50) NOT NULL,
  `UserLastName` varchar(50) NOT NULL,
  `UserEmail` varchar(100) NOT NULL,
  `UserPassword` varchar(99) NOT NULL,
  `UserDateOfBirth` date NOT NULL,
  `UserTypeName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserType`
--

CREATE TABLE `tblUserType` (
  `UserTypeName` varchar(50) NOT NULL,
  `UserTypeNumber` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `tblUserType`
--

INSERT INTO `tblUserType` (`UserTypeName`, `UserTypeNumber`) VALUES
('Administrator', 666),
('Developer', 555),
('Editor', 444),
('Root', 777),
('User', 333);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwBlogList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwBlogList` (
`BlogContent` text
,`BlogDescription` varchar(200)
,`BlogID` int
,`BlogMenuID` int
,`BlogState` tinyint(1)
,`BlogTitle` varchar(100)
,`UserID` int
,`UserNameSurname` varchar(101)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwComponentList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwComponentList` (
`ComponentCode` text
,`ComponentCreatedDate` datetime
,`ComponentDescription` varchar(250)
,`ComponentID` int
,`ComponentName` varchar(100)
,`ComponentState` tinyint(1)
,`MenuID` int
,`UserID` int
,`UserNameSurname` varchar(101)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwUserList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwUserList` (
`UserDateOfBirth` date
,`UserEmail` varchar(100)
,`UserFirstName` varchar(50)
,`UserID` int
,`UserLastName` varchar(50)
,`UserTypeName` varchar(50)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwBlogList`
--
DROP TABLE IF EXISTS `vwBlogList`;

CREATE VIEW `vwBlogList`  AS  select `tblBlog`.`BlogID` AS `BlogID`,`tblBlog`.`UserID` AS `UserID`,`tblBlog`.`BlogMenuID` AS `BlogMenuID`,`tblBlog`.`BlogTitle` AS `BlogTitle`,`tblBlog`.`BlogDescription` AS `BlogDescription`,`tblBlog`.`BlogContent` AS `BlogContent`,`tblBlog`.`BlogState` AS `BlogState`,concat(`tblUser`.`UserFirstName`,' ',`tblUser`.`UserLastName`) AS `UserNameSurname` from (`tblBlog` join `tblUser` on((`tblUser`.`UserID` = `tblBlog`.`UserID`))) ;

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwComponentList`
--
DROP TABLE IF EXISTS `vwComponentList`;

CREATE VIEW `vwComponentList`  AS  select `tblComponent`.`ComponentID` AS `ComponentID`,`tblComponent`.`UserID` AS `UserID`,`tblComponent`.`MenuID` AS `MenuID`,`tblComponent`.`ComponentName` AS `ComponentName`,`tblComponent`.`ComponentDescription` AS `ComponentDescription`,`tblComponent`.`ComponentCreatedDate` AS `ComponentCreatedDate`,`tblComponent`.`ComponentCode` AS `ComponentCode`,`tblComponent`.`ComponentState` AS `ComponentState`,concat(`tblUser`.`UserFirstName`,' ',`tblUser`.`UserLastName`) AS `UserNameSurname` from (`tblComponent` join `tblUser` on((`tblComponent`.`UserID` = `tblUser`.`UserID`))) ;

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwUserList`
--
DROP TABLE IF EXISTS `vwUserList`;

CREATE VIEW `vwUserList`  AS  select `tblUser`.`UserID` AS `UserID`,`tblUser`.`UserFirstName` AS `UserFirstName`,`tblUser`.`UserLastName` AS `UserLastName`,`tblUser`.`UserEmail` AS `UserEmail`,`tblUser`.`UserDateOfBirth` AS `UserDateOfBirth`,`tblUser`.`UserTypeName` AS `UserTypeName` from `tblUser` ;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tblBlog`
--
ALTER TABLE `tblBlog`
  ADD PRIMARY KEY (`BlogID`),
  ADD UNIQUE KEY `BlogMenuID_2` (`BlogMenuID`,`BlogTitle`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `BlogMenuID` (`BlogMenuID`);

--
-- Tablo için indeksler `tblBlogMenu`
--
ALTER TABLE `tblBlogMenu`
  ADD PRIMARY KEY (`BlogMenuID`),
  ADD UNIQUE KEY `BlogMenuName` (`BlogMenuName`);

--
-- Tablo için indeksler `tblComponent`
--
ALTER TABLE `tblComponent`
  ADD PRIMARY KEY (`ComponentID`),
  ADD UNIQUE KEY `MenuID_2` (`MenuID`,`ComponentName`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `MenuID` (`MenuID`);

--
-- Tablo için indeksler `tblComponentMenu`
--
ALTER TABLE `tblComponentMenu`
  ADD PRIMARY KEY (`ComponentMenuID`),
  ADD UNIQUE KEY `ComponentMenuName` (`ComponentMenuName`);

--
-- Tablo için indeksler `tblProject`
--
ALTER TABLE `tblProject`
  ADD PRIMARY KEY (`ProjectID`),
  ADD KEY `UserID` (`UserID`);

--
-- Tablo için indeksler `tblUser`
--
ALTER TABLE `tblUser`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserEmail` (`UserEmail`),
  ADD KEY `UserTypeName` (`UserTypeName`);

--
-- Tablo için indeksler `tblUserType`
--
ALTER TABLE `tblUserType`
  ADD PRIMARY KEY (`UserTypeName`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tblBlog`
--
ALTER TABLE `tblBlog`
  MODIFY `BlogID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `tblBlogMenu`
--
ALTER TABLE `tblBlogMenu`
  MODIFY `BlogMenuID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `tblComponent`
--
ALTER TABLE `tblComponent`
  MODIFY `ComponentID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Tablo için AUTO_INCREMENT değeri `tblComponentMenu`
--
ALTER TABLE `tblComponentMenu`
  MODIFY `ComponentMenuID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Tablo için AUTO_INCREMENT değeri `tblProject`
--
ALTER TABLE `tblProject`
  MODIFY `ProjectID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUser`
--
ALTER TABLE `tblUser`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblBlog`
--
ALTER TABLE `tblBlog`
  ADD CONSTRAINT `tblBlog_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`),
  ADD CONSTRAINT `tblBlog_ibfk_2` FOREIGN KEY (`BlogMenuID`) REFERENCES `tblBlogMenu` (`BlogMenuID`);

--
-- Tablo kısıtlamaları `tblComponent`
--
ALTER TABLE `tblComponent`
  ADD CONSTRAINT `tblComponent_ibfk_1` FOREIGN KEY (`MenuID`) REFERENCES `tblComponentMenu` (`ComponentMenuID`),
  ADD CONSTRAINT `tblComponent_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`);

--
-- Tablo kısıtlamaları `tblProject`
--
ALTER TABLE `tblProject`
  ADD CONSTRAINT `tblProject_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblUser`
--
ALTER TABLE `tblUser`
  ADD CONSTRAINT `tblUser_ibfk_1` FOREIGN KEY (`UserTypeName`) REFERENCES `tblUserType` (`UserTypeName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;