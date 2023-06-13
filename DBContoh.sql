CREATE TABLE Siswa (
    idS int PRIMARY KEY AUTO_INCREMENT,
    Nama varchar(50) NOT NULL,
    Email varchar(50) NOT NULL,
    Pass varchar(50) NOT NULL,
    jenisK varchar(50) NOT NULL,
    asalSekolah varchar(50) NOT NULL
);

CREATE TABLE Guru (
    idG int PRIMARY KEY AUTO_INCREMENT,
    Nama varchar(50) NOT NULL,
    Email varchar(50) NOT NULL,
    Pass varchar(50) NOT NULL,
    jenisK varchar(50) NOT NULL
);