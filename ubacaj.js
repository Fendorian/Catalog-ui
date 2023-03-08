$(document).ready(function() {
    // Your code here

    getJson('http://localhost:/Gradjani/uzmiSveMesneZajednice/',(data) => {
        let GradjaniData ="";
        data.map((values)=> {
            GradjaniData+=`
            <option value="${values.MesnaZajednicaID}">${values.NazivMesta}</option>
             `;
        });
        let insertMesneZajednice = document.querySelector('#InsertMesnaZajednica');
        insertMesneZajednice.innerHTML = GradjaniData;
        container.appendChild(tds);
        
        
        
    })
    let mainCards = document.querySelector('.main-wrapper');
});
function ubacitiGradjana() {
    console.log('radi ubacaj');
    document.querySelector('#create-item-form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      var formData = {
        ID: document.querySelector('#InsertID').value,
        Ime: document.querySelector('#InsertIme').value,
        Prezime: document.querySelector('#InsertPrezime').value,
        StrucnaSprema: document.querySelector('#InsertStrucnaSprema').value,
        Plata: document.querySelector('#InsertPlata').value,
        Struka: document.querySelector('#InsertStruka').value,
        Slika: document.querySelector('#InsertSlika').value,
        MesnaZajednica: document.querySelector('#InsertMesnaZajednica').value
      };
  
      // poslovno pravilo
      if (parseInt(document.querySelector('#InsertPlata').value) > 10000) {
        alert('Error: Plata ne moze biti veca od 10 000.');
        return;
      }
  
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:/Gradjani/CreateGradjan');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.onload = function() {
        if (xhr.status === 200) {
          alert('Uspesno ste ubacili Gradjana');
        } else {
          console.log('Error: ' + xhr.statusText);
        }
      };
      xhr.send(JSON.stringify(formData));
    });
  }