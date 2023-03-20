// Slowly appear
window.addEventListener("load", function () {
  let myDiv = document.querySelector(".right-side-login");
  let leftSide = document.querySelector(".left-side");
  leftSide.style.transform = "translate(0%)";
  myDiv.style.opacity = 1;
});
// function successLogin() 
// {
//   // Get the input values
//   var username = document.querySelector('.inner-form-bot-input[type="text"]').value;
//   var password = document.querySelector('.inner-form-bot-input[type="password"]').value;

//   // Create a new XMLHttpRequest object
//   var xhr = new XMLHttpRequest();

//   // Set the request URL and method
//   xhr.open('POST', 'http://localhost/Catalog/api/Logins/Login');

//   // Set the request header content type
//   xhr.setRequestHeader('Content-Type', 'application/json');

//   // Handle the response
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       // User is authenticated
//       console.log('User is authenticated');

//       var token = xhr.responseText;

//       document.cookie = "token=" + token + "; path=/";
//       document.cookie = "username=" + username + "; path=/";

//       // Continue with animation
//       let object = document.querySelector(".doorboy-svg");
//       let svgDoc = object.contentDocument;
//       let character = svgDoc.getElementById("character");
//       let floor = svgDoc.getElementById("floor");
//       let shadow = svgDoc.getElementById("Path-12");

//       character.style.transition = "transform 1s ease-in-out";
//       character.style.transform = "translate(30%)";

//       floor.style.display = "none";

//       shadow.style.display = "none";

//       setTimeout(function () {
//         window.location.href = 'backIndex.html';
//       }, 1000);

      
//     } else if (xhr.status === 401) {
//       // User is not authenticated
//       console.log('User is not authenticated');
//     }
//   };

//   // Create the request body JSON object
//   var requestBody = {
//     username: username,
//     password: password
//   };

//   // Send the request
//   xhr.send(JSON.stringify(requestBody));
// }
function successLogin() 
{
  // Get the input values
  var username = document.querySelector('.inner-form-bot-input[type="text"]').value;
  var password = document.querySelector('.inner-form-bot-input[type="password"]').value;

  // Define the regular expressions for username and password validation
  var usernameRegex = /^[a-zA-Z0-9._-]+$/g;
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_+=~`]{8,}$/g;

  // Validate the input values against the regular expressions
  var isUsernameValid = usernameRegex.test(username);
  var isPasswordValid = passwordRegex.test(password);

  // If either the username or password is invalid, display an error message and return
  if (!isUsernameValid || !isPasswordValid) {
    var errorMessage = document.querySelector('.error-message');
    errorMessage.style.display = 'block';
    return;
  }

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set the request URL and method
  xhr.open('POST', 'http://localhost/Catalog/api/Logins/Login');

  // Set the request header content type
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // User is authenticated
      console.log('User is authenticated');

      var token = xhr.responseText;

      document.cookie = "token=" + token + "; path=/";
      document.cookie = "username=" + username + "; path=/";

      // Continue with animation
      let object = document.querySelector(".doorboy-svg");
      let svgDoc = object.contentDocument;
      let character = svgDoc.getElementById("character");
      let floor = svgDoc.getElementById("floor");
      let shadow = svgDoc.getElementById("Path-12");

      character.style.transition = "transform 1s ease-in-out";
      character.style.transform = "translate(30%)";

      floor.style.display = "none";

      shadow.style.display = "none";

      setTimeout(function () {
        window.location.href = 'backIndex.html';
      }, 1000);

      
    } else if (xhr.status === 401) {
      // User is not authenticated
      console.log('User is not authenticated');
    }
  };

  // Create the request body JSON object
  var requestBody = {
    username: username,
    password: password
  };

  // Send the request
  xhr.send(JSON.stringify(requestBody));
}

let login = document.querySelector(".inner-form-login");
let registration = document.querySelector(".inner-form-registration");
function shrinkAndShow() {
  login.style.transform = "scale(0.1)";
  setTimeout(() => {
    login.style.display = "none";
    registration.style.display = "inline-table";
    registration.style.transform = "scale(1)";
  }, 500);
}
function revertToLogin() {
  registration.style.transform = "scale(0.1)";
  setTimeout(() => {
    registration.style.display = "none";
    login.style.display = "inline-table";
    login.style.transform = "scale(1)";
  }, 500);
}
function toggle() {
  let loginInfo = document.querySelector(".outer-form-login");
  let registerInfo = document.querySelector(".outer-form-registration");
  if (login.style.display === "none") {
    loginInfo.style.display = "flex";
    registerInfo.style.display = "none";
    console.log("1 je");
  } else {
    loginInfo.style.display = "none";
    registerInfo.style.display = "flex";
    console.log("nije 1");
  }
  if (login.style.display === "none") {
    revertToLogin();
  } else {
    shrinkAndShow();
  }
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}





function register() {
  // create a new XHR object
  var xhr = new XMLHttpRequest();

  // specify the endpoint URL where you want to send the request
  var url = "http://localhost/Catalog/api/Logins/CreateUser";
  let username = document.querySelector("#sign-in-username").value;
  let email = document.querySelector("#sign-in-email").value;
  let password = document.querySelector("#sign-in-password").value;
  let confirmPassword = document.querySelector("#sign-in-confirm-password").value;
  // create a JSON object with the user information
  var user = {
    username: username,
    email: email,
    password: password,
  };

  // stringify the JSON object
  var data = JSON.stringify(user);

  // set the request headers
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  xhr.setRequestHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // handle the response from the server
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      if(password === confirmPassword) {
        alert("You successfuly created account!");
        toggle();
      }else {
        alert("Passwords must match!");
      }
      
    } else {
      console.log("nije uspeo unos podataka");
      console.log(user);
    }
  };

  // send the request to the server
  xhr.send(data);
}
// ValidateToken();

/* http://localhost/Catalog/api/Products/GetAllUsers */

/* http://localhost/Catalog/api/Login/ValidateUser */