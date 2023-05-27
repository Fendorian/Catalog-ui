const url = `http://localhost/Catalog/api`
// Group all querySelectors at the beginning
const myDiv = document.querySelector(".right-side-login");
const leftSide = document.querySelector(".left-side");
const login = document.querySelector(".inner-form-login");
const registration = document.querySelector(".inner-form-registration");
const loginText = document.querySelector(".outer-form-login");
const registrationText = document.querySelector(".outer-form-registration");



// Combine event listeners
document.addEventListener("DOMContentLoaded", () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
  
  if (tokenCookie) {
    // If a token cookie exists, parse it and check the token value
    const tokenValue = JSON.parse(decodeURIComponent(tokenCookie.split('=')[1])).token;
    
    if (tokenValue) {
      // If a token value exists, redirect to backIndex.html
      window.location.href = 'backIndex.html';
    }
  }

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
    const response = await fetch(`${url}/Logins/Login`, {
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
      var element = document.querySelector('.inner-form-login');
      element.classList.add('shake');
  
      // Remove the class after the animation completes to allow it to be re-added later
      setTimeout(function() {
          element.classList.remove('shake');
      }, 1000); 
      console.log('User is not authenticated');
      let notification = document.querySelector('.notification-container');
        notification.style.display = "block";
      setTimeout(() => {
        notification.style.display = "none";
      }, 3000)
      
    }
  } catch (error) {
    console.error('Error:', error);
    let notification = document.querySelector('.notification-container');
    notification.style.display = "block";
  }
}

function changeFormVisibility(loginVisible) {
  login.style.transform = loginVisible ? "scale(1)" : "scale(0.1)";
  registration.style.transform = loginVisible ? "scale(0.1)" : "scale(1)";
  setTimeout(() => {
    login.style.display = loginVisible ? "inline-table" : "none";
    loginText.style.display = loginVisible ? "flex" : "none";
    registration.style.display = loginVisible ? "none" : "inline-table";
    registrationText.style.display = loginVisible ? "none" : "flex";
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
    const response = await fetch(`${url}/Logins/CreateUser`, {
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
