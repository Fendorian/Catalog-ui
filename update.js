function IzmenitiGradjana() {
    console.log('radi izmena');
    
    document.getElementById("update-item-form").addEventListener("submit", function(event) {
      event.preventDefault();
  
      var formData = {
        ID: document.getElementById("ID").value,
        Ime: document.getElementById("Ime").value,
        Prezime: document.getElementById("Prezime").value,
        StrucnaSprema: document.getElementById("StrucnaSprema").value,
        Plata: document.getElementById("Plata").value,
        Struka: document.getElementById("Struka").value,
        Slika: document.getElementById("Slika").value,
      };
  
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", "http://localhost:/Gradjani/Updategradjanin/2");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onload = function() {
        if (xhr.status === 200) {
          alert("Uspesno ste izmenili Gradjana");
        } else {
          console.log(formData);
        }
      };
      xhr.send(JSON.stringify(formData));
    });
  }
  