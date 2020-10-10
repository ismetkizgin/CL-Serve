-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 11 Eki 2020, 02:13:08
-- Sunucu sürümü: 8.0.21-0ubuntu0.20.04.4
-- PHP Sürümü: 7.4.10

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
  `UserID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblBlogContent`
--

CREATE TABLE `tblBlogContent` (
  `BlogContentID` int NOT NULL,
  `BlogID` int NOT NULL,
  `BlogTitle` varchar(100) NOT NULL,
  `BlogDescription` varchar(200) NOT NULL,
  `BlogContent` text NOT NULL,
  `LangueID` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblComponent`
--

CREATE TABLE `tblComponent` (
  `ComponentID` int NOT NULL,
  `UserID` int NOT NULL,
  `MenuID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblComponentContent`
--

CREATE TABLE `tblComponentContent` (
  `ComponentContentID` int NOT NULL,
  `ComponentName` varchar(100) NOT NULL,
  `ComponentDescription` varchar(250) NOT NULL,
  `ComponentCode` text NOT NULL,
  `ComponentState` tinyint(1) NOT NULL,
  `ComponentID` int NOT NULL,
  `LangueID` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblLangues`
--

CREATE TABLE `tblLangues` (
  `LangueID` varchar(5) NOT NULL,
  `LangueName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `tblLangues`
--

INSERT INTO `tblLangues` (`LangueID`, `LangueName`) VALUES
('en', 'English'),
('tr', 'Turkish');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblMenu`
--

CREATE TABLE `tblMenu` (
  `MenuID` int NOT NULL,
  `MenuName` varchar(100) NOT NULL,
  `MenuDescription` varchar(250) NOT NULL
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
  `UserBirthOfData` date NOT NULL,
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

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tblBlog`
--
ALTER TABLE `tblBlog`
  ADD PRIMARY KEY (`BlogID`),
  ADD KEY `UserID` (`UserID`);

--
-- Tablo için indeksler `tblBlogContent`
--
ALTER TABLE `tblBlogContent`
  ADD PRIMARY KEY (`BlogContentID`),
  ADD UNIQUE KEY `BlogID` (`BlogID`,`LangueID`),
  ADD KEY `BlogID_2` (`BlogID`),
  ADD KEY `LangueID` (`LangueID`);

--
-- Tablo için indeksler `tblComponent`
--
ALTER TABLE `tblComponent`
  ADD PRIMARY KEY (`ComponentID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `MenuID` (`MenuID`);

--
-- Tablo için indeksler `tblComponentContent`
--
ALTER TABLE `tblComponentContent`
  ADD PRIMARY KEY (`ComponentContentID`),
  ADD KEY `ComponentID` (`ComponentID`),
  ADD KEY `LangueID` (`LangueID`);

--
-- Tablo için indeksler `tblLangues`
--
ALTER TABLE `tblLangues`
  ADD PRIMARY KEY (`LangueID`);

--
-- Tablo için indeksler `tblMenu`
--
ALTER TABLE `tblMenu`
  ADD PRIMARY KEY (`MenuID`);

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
  MODIFY `BlogID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblBlogContent`
--
ALTER TABLE `tblBlogContent`
  MODIFY `BlogContentID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblComponent`
--
ALTER TABLE `tblComponent`
  MODIFY `ComponentID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblComponentContent`
--
ALTER TABLE `tblComponentContent`
  MODIFY `ComponentContentID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblMenu`
--
ALTER TABLE `tblMenu`
  MODIFY `MenuID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblProject`
--
ALTER TABLE `tblProject`
  MODIFY `ProjectID` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUser`
--
ALTER TABLE `tblUser`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblBlog`
--
ALTER TABLE `tblBlog`
  ADD CONSTRAINT `tblBlog_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`);

--
-- Tablo kısıtlamaları `tblBlogContent`
--
ALTER TABLE `tblBlogContent`
  ADD CONSTRAINT `tblBlogContent_ibfk_1` FOREIGN KEY (`BlogID`) REFERENCES `tblBlog` (`BlogID`) ON DELETE CASCADE,
  ADD CONSTRAINT `tblBlogContent_ibfk_2` FOREIGN KEY (`LangueID`) REFERENCES `tblLangues` (`LangueID`);

--
-- Tablo kısıtlamaları `tblComponent`
--
ALTER TABLE `tblComponent`
  ADD CONSTRAINT `tblComponent_ibfk_1` FOREIGN KEY (`MenuID`) REFERENCES `tblMenu` (`MenuID`),
  ADD CONSTRAINT `tblComponent_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`UserID`);

--
-- Tablo kısıtlamaları `tblComponentContent`
--
ALTER TABLE `tblComponentContent`
  ADD CONSTRAINT `tblComponentContent_ibfk_1` FOREIGN KEY (`ComponentID`) REFERENCES `tblComponent` (`ComponentID`) ON DELETE CASCADE,
  ADD CONSTRAINT `tblComponentContent_ibfk_2` FOREIGN KEY (`LangueID`) REFERENCES `tblLangues` (`LangueID`);

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
