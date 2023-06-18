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

	// Populate months
	let month = "";
	for (let i = 0; i < months.length; i++) {
		month += "<option>" + months[i] + "</option>";
	}
	month_el.innerHTML = month;

	// Update days based on selected month
	function updateDays() {
		const selectedMonth = month_el.selectedIndex;
		let daysInMonth;

		if (selectedMonth === 1) {
			const selectedYear = parseInt(year_el.value);
			daysInMonth = isLeapYear(selectedYear) ? 29 : 28;
		} else {
			daysInMonth = new Date(
				new Date().getFullYear(),
				selectedMonth + 1,
				0
			).getDate();
		}

		let day = "";
		for (let i = 1; i <= daysInMonth; i++) {
			day += "<option>" + i + "</option>";
		}
		day_el.innerHTML = day;
	}

	// Check if a year is a leap year
	function isLeapYear(year) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}

	// Add event listeners to select elements
	month_el.addEventListener("change", updateDays);
	year_el.addEventListener("change", updateDays);

	// Initialize days
	updateDays();

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
var tingkatpendSection = document.getElementById("tingkatpendgroup");
var tingkatpendLink = document.getElementById("tingkatpend");

datadiriLink.addEventListener("click", function (event) {
	event.preventDefault();
	menugroupSection.style.display = "block";
	ubahpassSection.style.display = "none";
	datadiriLink.style.color = "#00A3FF";
	ubahpassLink.style.color = "";

	if (tingkatpendSection) {
		tingkatpendSection.style.display = "none";
		tingkatpendLink.style.color = "";
	}
});

ubahpassLink.addEventListener("click", function (event) {
	event.preventDefault();
	menugroupSection.style.display = "none";
	ubahpassSection.style.display = "block";
	datadiriLink.style.color = "";
	ubahpassLink.style.color = "#00A3FF";

	if (tingkatpendSection) {
		tingkatpendSection.style.display = "none";
		tingkatpendLink.style.color = "";
	}
});

if (tingkatpendLink) {
	tingkatpendLink.addEventListener("click", function (event) {
		event.preventDefault();
		menugroupSection.style.display = "none";
		ubahpassSection.style.display = "none";
		tingkatpendSection.style.display = "block";
		datadiriLink.style.color = "";
		ubahpassLink.style.color = "";
		tingkatpendLink.style.color = "#00A3FF";
	});
}

document.addEventListener("DOMContentLoaded", function () {
	datadiriLink.classList.add("active");
	menugroupSection.style.display = "block";
	ubahpassSection.style.display = "none";
	datadiriLink.style.color = "#00A3FF";
	ubahpassLink.style.color = "";

	if (tingkatpendSection) {
		tingkatpendSection.style.display = "none";
		tingkatpendLink.style.color = "";
	}
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
	const pilihFoto = document.getElementById("pilih-foto-profile");
	const profileIcon = document.getElementById("pilih-foto-profile");
	const btnUploadFoto = document.getElementById("btn-upload-foto-profile");

	pilihFoto.addEventListener("click", function () {
		let input = document.getElementById("fileinput");

		if (!input) {
			input = document.createElement("input");
			input.type = "file";
			input.accept = "image/*";
			input.id = "fileinput";
			input.style.display = "none";

			input.onchange = function (event) {
				const file = event.target.files[0];
				console.log("Selected file:", file);

				const reader = new FileReader();
				reader.onload = function (e) {
					profileIcon.src = e.target.result;
					btnUploadFoto.style.display = "block";
				};
				reader.readAsDataURL(file);
			};

			document.body.appendChild(input);
		}

		input.click();
	});

	btnUploadFoto.addEventListener("click", function (event) {
		event.preventDefault();

		const fileInput = document.getElementById("fileinput");
		const file = fileInput.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onloadend = function () {
				const picture = reader.result;

				fetch("/update-foto", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ picture, extension: file.type.split("/")[1] }),
				})
					.then((response) => {
						if (response.ok) {
							window.location.href = "/update-foto";
						} else {
							throw new Error("Gagal mengunggah foto profil.");
						}
					})
					.catch((error) => {
						console.error(error);
					});
			};

			reader.readAsDataURL(file);
		}

		btnUploadFoto.style.display = "none";
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
	let btnEdit = document.getElementById("btnedit-guru");
	let btnSimpan = document.getElementById("btnsimpan-guru");

	if (!btnEdit || !btnSimpan) {
		btnEdit = document.getElementById("btnedit");
		btnSimpan = document.getElementById("btnsimpan");
	}

	const form = document.getElementById("formdatadiri");
	const formElements = form.elements;

	for (let i = 0; i < formElements.length; i++) {
		const element = formElements[i];
		if (
			element.tagName === "INPUT" ||
			element.tagName === "SELECT" ||
			element.tagName === "TEXTAREA" // Include textarea elements
		) {
			element.disabled = true;
		}
	}

	btnEdit.addEventListener("click", function () {
		for (let i = 0; i < formElements.length; i++) {
			const element = formElements[i];
			if (
				element.tagName === "INPUT" ||
				element.tagName === "SELECT" ||
				element.tagName === "TEXTAREA" // Include textarea elements
			) {
				element.disabled = false;
			}
		}
		btnEdit.style.backgroundColor = "#aaa";
		btnSimpan.style.backgroundColor = "#00A3FF";
	});
});

var tingkatButton = document.querySelectorAll("#tingkat");

tingkatButton.forEach((userItem) => {
	userItem.addEventListener("click", function () {
		var currentColor = userItem.style.backgroundColor;
		if (currentColor === "rgb(0, 163, 255)") {
			userItem.style.backgroundColor = "#aaa";
		} else {
			userItem.style.backgroundColor = "#00A3FF";
		}
	});
});
