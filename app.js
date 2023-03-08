const URL = "localhost/Gradjani";
const API_GET_PRODUCT_FOR_CATEGORY = "http://localhost:/Gradjani/api/Products/GetItemsByCategory/";
const GET_ALL_Gradjani = "http://localhost:/Gradjani/uzmiSveGradjane";

function getJson(url, callback) {
    fetch(url).then((response) => response.json())
    .then(data => callback(data.Table)) 
    .catch(error => console.log(error))
}
function getMenu(){
    fetch("menu.html").then(response => 
        response.text()
    ).then(data => {
        document.querySelector('.meni').innerHTML = data;
    })
}
function getPageImage(){
    fetch("pageImage.html").then(response => 
        response.text()
    ).then(data => {
        document.querySelector('.pageImage').innerHTML = data;
    })
    
}
function getOnama() {
    fetch("izmena.html").then(response => 
        response.text()
    ).then(data => {
        document.querySelector('.izmena').innerHTML = data;
    })
}
function getUbacaj() {
    fetch("ubacaj.html").then(response => 
        response.text()
    ).then(data => {
        document.querySelector('.ubacaj').innerHTML = data;
    })
}
function getMainContent(){
    fetch("mainContent.html").then(response => 
        response.text()
    ).then(data => {
        document.querySelector('.mainContent').innerHTML = data;
    })
}



// Funkcije filtriranja
function ispisiSveGradjane() {
    getJson(GET_ALL_Gradjani,(data) => {
        let GradjaniData ="";
        data.map((values)=> {
            GradjaniData+=`
            <div class="back-arrow" onclick="ispisiSveGradjane();">Povratak</div>
             <div class="card-wrapper" onclick="singleItem(this)">
             <div class="show-id">${values.ID}</div>
             <div class="brisanje-Gradjana" onclick=brisanje(${values.ID})>Brisanje</div>
             <div class="izmena-Gradjana" onclick="showOnama();">Izmena</div>
             <div class="image-wrapper">
              <img src=/images/products/${values.Slika}>
             </div>
             <h1>${values.Ime}</h1>
             <div class="description">${values.Prezime}</div>
             </div>
             `;
        });
        document.querySelector('.main-cards').innerHTML = GradjaniData;
    })
    let mainCards = document.querySelector('.main-wrapper');
}
// Prikaz jednog Gradjana
function singleItem(selekt) {
    let elements = document.querySelectorAll('.card-wrapper');
    // console.log(selekt);
    let item = document.querySelector('.card-wrapper');
    let nonSelectedItems = Array.from(elements).filter(item => {
        return item !== selekt;
    }).forEach(item => {
        item.style.display = 'none';
    })
    selekt.classList.add('selectedItem');
    selekt.parentNode.querySelector('.back-arrow').style.display = 'block';
    selekt.querySelector('.brisanje-Gradjana').style.display = 'block';
    selekt.querySelector('.description').style.display = 'block';
}
function uzmiGradjanaOdMesneZajednice(mesnaZajednicaID){
    
    getJson('http://localhost:/Gradjani/uzmiGradjanaOdMesneZajednice/' + mesnaZajednicaID,(data) => {
        let productData="";
          
       data.map((values)=> {
             productData+=`
             <div class="back-arrow" onclick="ispisiSveGradjane();">Povratak</div>
             <div class="card-wrapper" onclick="singleItem(this)">
             <div class="image-wrapper">
              <img src=/images/products/${values.ImageUrl}>
             </div>
             <h1>${values.Ime}</h1>
             <div class="description">${values.Struka}</div>
             `;
            //  <div>${values.Abstract}</div>`;
            if(values.Abstract != null) {
                productData+=`<div>${values.Abstract}</div>`;
            }
            productData+=`</div>`;
         });
         document.querySelector('.main-cards').innerHTML =  "<div class='category-title'>" + "</div>"  + productData;
         
    })
    let mainCards = document.querySelector('.main-wrapper');
}
// Search funckija
function pretraziGradjanina(){
    let gradjanin = document.querySelector('#search').value;
    getJson('http://localhost:/Gradjani/PretraziGradjanina/' + gradjanin,(data) => {
        let gradjaninPodaci='';

        data.map((values)=> {
            gradjaninPodaci+=`
            <div class="back-arrow" onclick="ispisiSveGradjane();">Povratak</div>
             <div class="card-wrapper" onclick="singleItem(this)">
             <div class="image-wrapper">
              <img src=/images/products/${values.ImageUrl}>
             </div>
             <h1>${values.Ime}</h1>
             <div class="description">${values.Struka}</div>
             </div>`;
            
        });
        document.querySelector('.main-cards').innerHTML =  gradjaninPodaci;
        console.log(gradjaninPodaci);
        
        let mainCards = document.querySelector('.main-wrapper');
    })
}
// Brisanje jednog Gradjana
async function brisanje(id){
    const response = await fetch(`http://localhost:/Gradjani/DeleteGradjana/${id}`,{
    method: 'DELETE'
});
    if (response.ok){
        alert('Бирач избрисан');
        ispisiSveGradjane();
    }else {
        console.log('Nesto ne radi');
    }
    }
getMenu();
getPageImage();
getOnama();
getUbacaj();
getMainContent();
ispisiSveGradjane();

function showPocetna() {
    let onamaPage = document.querySelector(".izmena");
    onamaPage.style.display = 'none';

    let mainContent = document.querySelector(".mainContent");
    mainContent.style.display = 'block';

    let ubacaj = document.querySelector(".ubacaj");
    ubacaj.style.display = 'none';
}

function showOnama(){
    let onamaPage = document.querySelector(".izmena");
    onamaPage.style.display = 'block';

    let mainContent = document.querySelector(".mainContent");
    mainContent.style.display = 'none';

    let ubacaj = document.querySelector(".ubacaj");
    ubacaj.style.display = 'none';
}
function prikaziUbacaj(){
    let ubacaj = document.querySelector(".ubacaj");
    ubacaj.style.display = 'block';

    let mainContent = document.querySelector(".mainContent");
    mainContent.style.display = 'none';

    let onamaPage = document.querySelector(".izmena");
    onamaPage.style.display = 'none';
}
function stampaListe() {
        getJson('http://localhost:/Gradjani/uzmiSveGradjanePoImenuMesneZajednice/',(data) => {
            let GradjaniData ="";
            data.map((values)=> {
                GradjaniData+=`
              
                
                    <tr class="stampaTr">
                    <td>${values.Ime}</td>
                    <td>${values.Prezime}</td>
                    <td>${values.Plata}</td>
                    <td>${values.Struka}</td>
                    <td>${values.NazivMesta}</td>
                   </tr>
                
            
                 `;
            });
            let container = document.querySelector('.tb');
            let tds = document.createElement('tbody');
            tds.innerHTML = GradjaniData;
            container.appendChild(tds);
            
            
            
        })
        let mainCards = document.querySelector('.main-wrapper');
}
function stampa() {
    return window.print();
}