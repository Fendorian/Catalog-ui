window.addEventListener("load", function() {
    var myDiv = document.querySelector(".right-side");
    myDiv.style.opacity = 1;
  });

  var GetLogin = function() {
    var korisnickoime = document.getElementById('txtUsername').value;
    var sifra = document.getElementById('txtPassword').value;
    
    console.log(korisnickoime);
    var loginUrl = "http://localhost:/Gradjani/GetLogin";
    var loginData = JSON.stringify({ "KorisnickoIme": korisnickoime, "Sifra": sifra });
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', loginUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        alert(result);
        if (result === "Uspesno logovanje") {
          window.location.replace("http://127.0.0.1:5501/index.html");
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
  