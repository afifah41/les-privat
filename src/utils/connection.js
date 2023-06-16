import mysql from "mysql";

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "lesprivat",
});

pool.getConnection((err, connection) => {
	if (err) {
		console.error(">> Koneksi ke database GAGAL!");
	} else {
		console.log(">> Koneksi ke database BERHASIL!");
	}
});

export { pool as connection };