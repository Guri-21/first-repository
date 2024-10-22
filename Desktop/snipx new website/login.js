const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".login-container");
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
document.getElementById('signUpBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim(); // New password confirmation field

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (username === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Please fill in all the fields.");
  } else if (!passwordPattern.test(password)) {
    alert("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.");
  } else if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
  } else {
    alert("Form submitted successfully!");
  }
});

document.getElementById('loginBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const loginUsername = document.getElementById('loginUsername').value.trim();
  const loginPassword = document.getElementById('loginPassword').value.trim();
  const rememberMe = document.getElementById('rememberMe').checked;

  if (loginUsername === "" || loginPassword === "") {
    alert("Please fill in both username and password.");
  } else {
    alert("Login successful!");

    if (rememberMe) {
      localStorage.setItem('rememberedUsername', loginUsername);
      localStorage.setItem('rememberedPassword', loginPassword); // Password will also be remembered now
    } else {
      sessionStorage.setItem('sessionUsername', loginUsername);
      sessionStorage.setItem('sessionPassword', loginPassword);
    }
  }
});

window.addEventListener('load', () => {
  const rememberedUsername = localStorage.getItem('rememberedUsername');
  const rememberedPassword = localStorage.getItem('rememberedPassword');

  if (rememberedUsername && rememberedPassword) {
    document.getElementById('loginUsername').value = rememberedUsername;
    document.getElementById('loginPassword').value = rememberedPassword;
    document.getElementById('rememberMe').checked = true;
  }
});

const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#loginPassword');

togglePassword.addEventListener('click', function() {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});

const toggleSignUpPassword = document.querySelector('#toggleSignUpPassword');
const signUpPasswordInput = document.querySelector('#password');
const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const confirmPasswordInput = document.querySelector('#confirmPassword');

toggleSignUpPassword.addEventListener('click', function() {
  const type = signUpPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  signUpPasswordInput.setAttribute('type', type);

  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});

toggleConfirmPassword.addEventListener('click', function() {

  const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPasswordInput.setAttribute('type', type);

  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});
