import {
	User,
	Student,
	Teacher,
} from "./src/database/models.js";

async function insertUsers() {
	try {
		// Insert 10 student users
		for (let i = 1; i <= 10; i++) {
			const studentUser = await User.create(
				{
					name: `Student User ${i}`,
					email: `student${i}@example.com`,
					password: "student123",
					phone_number: "123456789",
					gender: "laki-laki",
					address: "Student Address",
					profile_picture: "student.jpg",
					role: "siswa",
					Student: {
						school: `School ${i}`,
					},
				},
				{ include: Student }
			);
			console.log("Inserted student user:", studentUser.toJSON());
		}

		// Insert 10 teacher users
		for (let i = 1; i <= 10; i++) {
			const teacherUser = await User.create(
				{
					name: `Teacher User ${i}`,
					email: `teacher${i}@example.com`,
					password: "teacher123",
					phone_number: "987654321",
					gender: "perempuan",
					address: "Teacher Address",
					profile_picture: "teacher.jpg",
					role: "guru",
					Teacher: {},
				},
				{ include: Teacher }
			);
			console.log("Inserted teacher user:", teacherUser.toJSON());
		}
	} catch (error) {
		console.error("Error inserting users:", error);
	}
}

insertUsers();
