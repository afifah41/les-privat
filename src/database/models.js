import { Sequelize, DataTypes } from "sequelize";

// Buat koneksi ke database
const sequelize = new Sequelize("lesprivat", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

// Definisikan model Pengguna
const pengguna = sequelize.define(
	"pengguna",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profile_picture: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone_number: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		birth_date: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "pengguna", // Menentukan nama tabel
		timestamps: false, // Menonaktifkan createdAt dan updatedAt
	}
);

// Definisikan model Pengguna
const alamat = sequelize.define(
	"pengguna",
	{
		idP: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		idKel: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "alamat",
		timestamps: false,
	}
);

export { sequelize, pengguna, alamat };
