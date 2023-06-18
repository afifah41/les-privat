import { Sequelize, DataTypes } from "sequelize";

// Buat koneksi ke database
const sequelize = new Sequelize("lesprivat", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

export const User = sequelize.define(
	"User",
	{
		id_user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		birth_date: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		phone_number: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		gender: {
			type: DataTypes.ENUM("laki-laki", "perempuan"),
			allowNull: true,
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		profile_picture: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
		role: {
			type: DataTypes.ENUM("guru", "siswa"),
			allowNull: false,
		},
	},
	{
		tableName: "user",
		timestamps: false,
	}
);

export const Student = sequelize.define(
	"Student",
	{
		id_student: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		school: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
	},
	{
		tableName: "student",
		timestamps: false,
	}
);

export const Teacher = sequelize.define(
	"Teacher",
	{
		id_teacher: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
	},
	{
		tableName: "teacher",
		timestamps: false,
	}
);

export const Subject = sequelize.define(
	"Subject",
	{
		id_subject: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		subject_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	},
	{
		tableName: "subject",
		timestamps: false,
	}
);

export const Class = sequelize.define(
	"Class",
	{
		id_class: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		class_name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	},
	{
		tableName: "class",
		timestamps: false,
	}
);

export const Schedule = sequelize.define(
	"Schedule",
	{
		id_schedule: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		start_hour: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		end_hour: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		media: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		id_teacher: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: "schedule",
		timestamps: false,
	}
);

export const Registration = sequelize.define(
	"Registration",
	{
		id_registration: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		id_schedule: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_student: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		total_price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{
		tableName: "registration",
		timestamps: false,
	}
);

export const TCS = sequelize.define(
	"TCS",
	{
		id_teacher: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_class: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		id_subject: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{
		tableName: "TCS",
		timestamps: false,
	}
);

TCS.belongsTo(Teacher, {
	foreignKey: "id_teacher",
});
TCS.belongsTo(Class, {
	foreignKey: "id_class",
});
TCS.belongsTo(Subject, {
	foreignKey: "id_subject",
});

Registration.belongsTo(Schedule, {
	foreignKey: "id_schedule",
});
Registration.belongsTo(Student, {
	foreignKey: "id_student",
});

Schedule.belongsTo(Teacher, {
	foreignKey: "id_teacher",
});

Teacher.belongsTo(User, {
	foreignKey: "id_teacher",
});

Student.belongsTo(User, {
	foreignKey: "id_student",
});
