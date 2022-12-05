const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "root",
	database: "yuval",
});

// Connect to MySQL
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log("MySql Connected");
});

app.listen("3000", () => {
	console.log("Server started on port 3000");
});

app.get("/", function (req, res) {
	res.send("What's up?!");
});

app.get("/all", (req, res) => {
	const sql = "SELECT * FROM users";
	db.query(sql, (err, rows) => {
		if (err) {
			res.send({ success: false, message: "Could not connect to db" });
		} else {
			let result = rows.map((item) => item.phone);

			fetch("https://example.com/profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(result),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Success:", data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
			//res.send(JSON.stringify(result));
		}
	});
});

module.exports = app;
