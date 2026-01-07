const form = document.getElementById("authForm");
const toggleBtn = document.getElementById("toggleBtn");
const title = document.getElementById("form-title");
const nameField = document.getElementById("nameField");
const successMsg = document.getElementById("successMsg");
const button = document.querySelector(".btn");
const forgotPassword = document.getElementById("forgotPassword");

let isLogin = true;

// Toggle Login / Signup
toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  title.innerText = isLogin ? "Login" : "Sign Up";
  button.innerText = isLogin ? "Login" : "Register";
  toggleBtn.innerText = isLogin ? "Sign up" : "Login";
  nameField.style.display = isLogin ? "none" : "block";
  forgotPassword.style.display = isLogin ? "block" : "none";
  successMsg.innerText = "";
  clearErrors();
});

// Forgot Password
forgotPassword.addEventListener("click", () => {
  clearErrors();
  const email = document.getElementById("email").value.trim();

  if (email === "") {
    showError("email", "Enter your email to reset password");
    return;
  }

  if (!email.includes("@")) {
    showError("email", "Invalid email address");
    return;
  }

  successMsg.innerText = "Password reset link sent to your email 📧";
});

// Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();
  successMsg.innerText = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let valid = true;

  if (!isLogin && name === "") {
    showError("name", "Name is required");
    valid = false;
  }

  if (email === "") {
    showError("email", "Email is required");
    valid = false;
  } else if (!email.includes("@")) {
    showError("email", "Invalid email");
    valid = false;
  }

  if (password === "") {
    showError("password", "Password is required");
    valid = false;
  } else if (password.length < 6) {
    showError("password", "Minimum 6 characters");
    valid = false;
  }

  if (valid) {
    successMsg.innerText = isLogin
      ? "Login successful 🎉"
      : "Account created successfully 🎉";
    form.reset();
  }
});

// Helpers
function showError(id, message) {
  const input = document.getElementById(id);
  input.nextElementSibling.innerText = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(err => err.innerText = "");
}
