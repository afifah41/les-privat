const wrapper = document.querySelector(".wrapper-index");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btn-login-popup");
const iconClose = document.querySelector(".icon-close");
const loginForm = document.querySelector(".form-box.login form");

registerLink.addEventListener("click", () => {
	wrapper.classList.add("active");
});

loginLink.addEventListener("click", () => {
	wrapper.classList.remove("active");
});

btnPopup.addEventListener("click", () => {
	wrapper.classList.add("active-popup");
});

iconClose.addEventListener("click", () => {
	wrapper.classList.remove("active-popup");
});

const registerForm = document.querySelector(".form-box.register form");

registerForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const passwordInput = document.querySelector(
		'.form-box.register input[name="password"]'
	);
	const passwordValue = passwordInput.value;

	if (passwordValue.length < 8 || !/[A-Z]/.test(passwordValue)) {
		const errorPopup = document.createElement("div");
		errorPopup.className = "error-popup";
		errorPopup.innerText =
			"Invalid password. Password should have a minimum of 8 characters and at least 1 uppercase letter.";

		registerForm.appendChild(errorPopup);

		// Clear the password input value
		passwordInput.value = "";

		setTimeout(() => {
			errorPopup.remove();
		}, 1000);
		return;
	}

	registerForm.submit();
});
