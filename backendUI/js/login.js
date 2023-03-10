// Slowly appear
window.addEventListener("load", function () {
  let myDiv = document.querySelector(".right-side-login");
  let leftSide = document.querySelector(".left-side");
  leftSide.style.transform = "translate(0%)";
  myDiv.style.opacity = 1;
});
// Create svg so I don't need to embed it to html and doorboy gets in when signed is successful
function successSignIn() {
  let object = document.querySelector(".doorboy-svg");
  let svgDoc = object.contentDocument;
  let character = svgDoc.getElementById("character");
  let floor = svgDoc.getElementById("floor");
  let shadow = svgDoc.getElementById("Path-12");

  character.style.transition = "transform 1s ease-in-out";
  character.style.transform = "translate(30%)";

  floor.style.display = "none";

  shadow.style.display = "none";
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
  let loginInfo = document.querySelector('.outer-form-login');
  let registerInfo = document.querySelector('.outer-form-registration');
  if(login.style.display === "none"){
     loginInfo.style.display = "flex";
     registerInfo.style.display = "none";
    console.log("1 je");
  } else {
     loginInfo.style.display = "none";
     registerInfo.style.display = "flex";
    console.log('nije 1');
  }
  if (login.style.display === "none") {  
    revertToLogin();
    
  } else {
    shrinkAndShow();
    
  }
}

var GetLogin = function () {
  var korisnickoime = document.getElementById("txtUsername").value;
  var sifra = document.getElementById("txtPassword").value;

  console.log(korisnickoime);
  var loginUrl = "http://localhost:/Gradjani/GetLogin";
  var loginData = JSON.stringify({
    KorisnickoIme: korisnickoime,
    Sifra: sifra,
  });

  var xhr = new XMLHttpRequest();
  xhr.open("POST", loginUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      alert(result);
      if (result === "Uspesno logovanje") {
        successSignIn();
        // window.location.replace("http://127.0.0.1:5501/index.html");
        let token = result.token;
        document.cookie = "token = " + token;
      } else {
        alert("Popunite sva polja!");
      }
    } else {
      alert(xhr.responseText);
    }
  };
  xhr.send(loginData);
};
