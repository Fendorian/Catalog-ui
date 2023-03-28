// Group all querySelectors at the beginning
const myDiv = document.querySelector(".right-side-login");
const leftSide = document.querySelector(".left-side");
const login = document.querySelector(".inner-form-login");
const registration = document.querySelector(".inner-form-registration");

// Combine event listeners
document.addEventListener("DOMContentLoaded", () => {
  leftSide.style.transform = "translate(0%)";
  myDiv.style.opacity = 1;
  
  // Add event listeners for the buttons
  document.querySelector("#sign-in-button").addEventListener("click", register);
  document.querySelector("#login-button").addEventListener("click", successLogin);
  document.querySelector("#toggle-button").addEventListener("click", toggle);
});

async function successLogin() {
  const username = document.querySelector('.inner-form-bot-input[type="text"]').value;
  const password = document.querySelector('.inner-form-bot-input[type="password"]').value;

  try {
    const response = await fetch('http://localhost/Catalog/api/Logins/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 200) {
      const token = await response.text();

      document.cookie = `token=${token}; path=/`;
      document.cookie = `username=${username}; path=/`;

      const object = document.querySelector(".doorboy-svg");
      const svgDoc = object.contentDocument;
      const character = svgDoc.getElementById("character");
      const floor = svgDoc.getElementById("floor");
      const shadow = svgDoc.getElementById("Path-12");

      character.style.transition = "transform 1s ease-in-out";
      character.style.transform = "translate(30%)";

      floor.style.display = "none";
      shadow.style.display = "none";

      setTimeout(() => {
        window.location.href = 'backIndex.html';
      }, 1000);
    } else if (response.status === 401) {
      console.log('User is not authenticated');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function changeFormVisibility(loginVisible) {
  login.style.transform = loginVisible ? "scale(1)" : "scale(0.1)";
  registration.style.transform = loginVisible ? "scale(0.1)" : "scale(1)";
  setTimeout(() => {
    login.style.display = loginVisible ? "inline-table" : "none";
    registration.style.display = loginVisible ? "none" : "inline-table";
  }, 500);
}

function toggle() {
  const loginVisible = login.style.display === "none";
  changeFormVisibility(loginVisible);
}

async function register() {
  const username = document.querySelector("#sign-in-username").value;
  const email = document.querySelector("#sign-in-email").value;
  const password = document.querySelector("#sign-in-password").value;
  const confirmPassword = document.querySelector("#sign-in-confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords must match!");
    return;
  }

  try {
    const response = await fetch("http://localhost/Catalog/api/Logins/CreateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.status === 200) {
      alert("You successfully created an account!");
      toggle();
    } else {
      console.log("Failed to create account");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
