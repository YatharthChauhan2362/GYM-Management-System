-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2021 at 02:41 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.2.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `table`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(128) NOT NULL,
  `salt` char(128) NOT NULL,
  `admin` int(11) NOT NULL DEFAULT 0,
  `days` varchar(220) DEFAULT '0',
  `present` varchar(220) DEFAULT '0',
  `absent` varchar(220) DEFAULT '0',
  `pect` varchar(220) DEFAULT '0',
  `pic` int(11) DEFAULT 0,
  `picName` mediumtext DEFAULT NULL,
  `paid` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `username`, `email`, `password`, `salt`, `admin`, `days`, `present`, `absent`, `pect`, `pic`, `picName`, `paid`) VALUES
(9, 'gajen', 'gajen@gmail.com', 'd3ce32ff23b3687799c216bbcd8d8c0d48d2f65420cdea20798f2eff5b7b7ba64750308a5d5e7f155d4d4ad95af4823522ffdb251fe541a1b4fdcc53b676aeeb', '68c56b59e6deba2158e22b1b8fe42ba8f12062bcfd24196cc2f434135666f385ffd26e2a8791a57678b2f7700c1b69b78da4fc474c43d1414b824ffe01890747', 1, '0', '0', '0', '0', 0, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
