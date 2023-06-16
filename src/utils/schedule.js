function openPopup() {
	var popup = document.getElementById("createpopup");
	popup.style.display = "flex";
}

function closePopup() {
	var popup = document.getElementById("createpopup");
	popup.style.display = "none";
}

document.getElementById("upload").addEventListener("click", function () {
	var selectedDay = document.querySelector('select[name="hari"]').value;
	var selectedStartHour = document.querySelector(
		'select[name="jammulai"]'
	).value;
	var selectedDuration = parseInt(
		document.querySelector('select[name="durasi"]').value
	);

	var startHourIndex = Math.floor((parseInt(selectedStartHour) - 7) / 1); // Calculate the index of the start hour
	var endHourIndex = startHourIndex + selectedDuration; // Calculate the index of the end hour

	var tableRows = document.querySelectorAll("#tabel tr");
	for (var i = startHourIndex; i < endHourIndex; i++) {
		var currentRow = tableRows[i + 1]; // Start from index 1 to skip the header row
		var cell = currentRow.cells.namedItem(selectedDay);
		cell.style.backgroundColor = "black";
	}

	closePopup(); // Close the popup after updating the table
});
function initDoB(day_el, month_el, year_el) {
	const months = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	let day = "";
	for (let i = 1; i <= 31; i++) {
		day += "<option>" + i + "</option>";
	}
	day_el.innerHTML = day;

	let month = "";
	for (let i = 0; i < months.length; i++) {
		month += "<option>" + months[i] + "</option>";
	}
	month_el.innerHTML = month;

	const current_year = new Date().getFullYear();
	let year = "";
	for (let i = current_year; i <= current_year + 5; i++) {
		year += "<option>" + i + "</option>";
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

(function () {
	const day = document.querySelector('select[name="day2"]');
	const month = document.querySelector('select[name="month2"]');
	const year = document.querySelector('select[name="year2"]');
	document.addEventListener("DOMContentLoaded", function () {
		initDoB(day, month, year);
	});
})();
