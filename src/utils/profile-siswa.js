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
	for (let i = current_year; i >= current_year - 80; i--) {
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

const datadiriLink = document.getElementById("datadiri");
const ubahpassLink = document.getElementById("ubahpassword");
const menugroupSection = document.getElementById("menugroup");
const ubahpassSection = document.getElementById("ubahpassgroup");

datadiriLink.addEventListener("click", function (event) {
	event.preventDefault();
	menugroupSection.style.display = "block";
	ubahpassSection.style.display = "none";

	datadiriLink.style.color = "#00A3FF";
	ubahpassLink.style.color = "";
});

ubahpassLink.addEventListener("click", function (event) {
	event.preventDefault();
	menugroupSection.style.display = "none";
	ubahpassSection.style.display = "block";

	datadiriLink.style.color = "";
	ubahpassLink.style.color = "#00A3FF";
});

document.addEventListener("DOMContentLoaded", function () {
	datadiriLink.classList.add("active");

	menugroupSection.style.display = "block";
	ubahpassSection.style.display = "none";

	datadiriLink.style.color = "#00A3FF";
	ubahpassLink.style.color = "";
});

function togglePasswordVisibility(inputId) {
	const passwordInput = document.getElementById(inputId);
	const toggleButton = passwordInput.nextElementSibling;
	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		toggleButton.style.backgroundImage = "url(/images/eyeiconshow.png)";
	} else {
		passwordInput.type = "password";
		toggleButton.style.backgroundImage = "url(/images/eyeiconhide.png)";
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const btnPilihFoto = document.getElementById("btnpilihfoto");
	btnPilihFoto.addEventListener("click", function () {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.onchange = function (event) {
			const file = event.target.files[0];
			console.log("Selected file:", file);
		};
		input.click();
	});
});

function openPopup() {
	var popup = document.getElementById("forgotPasswordPopup");
	popup.style.display = "flex";
}

function closePopup() {
	var popup = document.getElementById("forgotPasswordPopup");
	popup.style.display = "none";
}

function resetPassword() {
	closePopup();
}

document.addEventListener("DOMContentLoaded", function () {
	const btnEdit = document.getElementById("btnedit");
	const btnSimpan = document.getElementById("btnsimpan");
	const form = document.getElementById("formdatadiri");
	const formElements = form.elements;

	for (let i = 0; i < formElements.length; i++) {
		const element = formElements[i];
		if (element.tagName === "INPUT" || element.tagName === "SELECT") {
			element.disabled = true;
		}
	}

	btnEdit.addEventListener("click", function () {
		for (let i = 0; i < formElements.length; i++) {
			const element = formElements[i];
			if (element.tagName === "INPUT" || element.tagName === "SELECT") {
				element.disabled = false;
			}
		}
		btnEdit.style.backgroundColor = "#aaa";
		btnSimpan.style.backgroundColor = "#00A3FF";
	});
});
