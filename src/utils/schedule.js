function openPopup() {
	var popup = document.getElementById("createpopup");
	popup.style.display = "flex";
}

function closePopup() {
	var popup = document.getElementById("createpopup");
	popup.style.display = "none";
}
function updateTableView(schedules) {
	const tableBody = document.querySelector("#tabel table tbody");

	const rows = tableBody.querySelectorAll("tr:not(#empty-row)");
	rows.forEach((row) => row.remove());

	schedules.forEach((schedule) => {
		const newRow = document.createElement("tr");
		newRow.innerHTML = `
            <td>${schedule.date}</td>
            <td>${schedule.day}</td>
            <td>${schedule.start_hour}</td>
            <td>${schedule.end_hour}</td>
            <td>${schedule.media}</td>
        `;
		tableBody.appendChild(newRow);
	});
}

function initDoB(day_el, month_el, year_el) {
	let day = "";
	for (let i = 1; i <= 31; i++) {
		day += "<option value='" + i + "'>" + i + "</option>";
	}
	day_el.innerHTML = day;

	let month = "";
	for (let i = 1; i <= 12; i++) {
		month += "<option value='" + i + "'>" + i + "</option>";
	}
	month_el.innerHTML = month;

	const current_year = new Date().getFullYear();
	let year = "";
	for (let i = current_year; i <= current_year + 5; i++) {
		year += "<option value='" + i + "'>" + i + "</option>";
	}
	year_el.innerHTML = year;
}

(function () {
	const day = document.querySelector('select[name="day"]');
	const month = document.querySelector('select[name="month"]');
	const year = document.querySelector('select[name="year"]');
	document.addEventListener("DOMContentLoaded", function () {
		initDoB(day, month, year);
	});
})();
