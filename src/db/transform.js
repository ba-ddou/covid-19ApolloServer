const csv = require("csv-parser");
const fs = require("fs");
// let results = [];

function getTerritories() {
	return new Promise((resolve, reject) => {
		let results = [];
		fs.createReadStream("territories.csv")
			.pipe(
				csv({
					mapHeaders: ({ header, index }) => {
						// console.log(index, header);
						if (index === 0) return "id";
						else return "name";
					},
					mapValues: ({ header, index, value }) => {
						if (index === 1) return value.toLowerCase();
						else return parseInt(value.substring(1, value.length));
					},
				})
			)
			.on("data", (data) => results.push(data))
			.on("end", () => {
				results = results.filter((elem) => elem.id);
				resolve(results);
			});
	});
}

function getDates() {
	return new Promise((resolve, reject) => {
		let results = [];
		fs.createReadStream("dates.csv")
			.pipe(
				csv({
					mapHeaders: ({ header, index }) => {
						if (index === 0) return "id";
						else return "date";
					},
					mapValues: ({ header, index, value }) => {
						if (index === 1) return value;
						else return parseInt(value.substring(1, value.length));
					},
				})
			)
			.on("data", (data) => results.push(data))
			.on("end", () => {
				results = results.filter((elem) => elem.id);
				resolve(results);
			});
	});
}

function getStats() {
	return new Promise((resolve, reject) => {
		let results = [];
		return fs
			.createReadStream("stats.csv")
			.pipe(
				csv({
					mapHeaders: ({ header, index }) => {
						switch (index) {
							case 0:
								return "date";
								break;
							case 1:
								return "territory";
								break;
							case 2:
								return header.toLowerCase();
								break;
							case 3:
								return "dead";
								break;
							case 4:
								return header.toLowerCase();
								break;
						}
					},
					mapValues: ({ header, index, value }) => {
						switch (index) {
							case 0:
								return parseInt(
									value.substring(1, value.length)
								);
								break;
							default:
								return parseInt(value);
								break;
						}
					},
				})
			)
			.on("data", (data) => results.push(data))
			.on("end", () => {
				results = results.filter((elem) => elem.date);
				resolve(results);
			});
	});
}

async function run() {
	let stats = await getDates().catch((err) => console.error(err));
	console.log(stats);
}

run();
