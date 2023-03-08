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
function UbacitiGradjana() {
    console.log('radi ubacaj');
    $("#create-item-form").submit(function(event) {
        event.preventDefault();

        var formData = {
            ID: $("#InsertID").val(),
            Ime: $("#InsertIme").val(),
            Prezime: $("#InsertPrezime").val(),
            StrucnaSprema: $("#InsertStrucnaSprema").val(),
            Plata: $("#InsertPlata").val(),
            Struka: $("#InsertStruka").val(),
            Slika: $("#InsertSlika").val(),
            MesnaZajednica: $("#InsertMesnaZajednica").val()

        };
        //poslovno pravilo
        if (parseInt($("#InsertPlata").val()) > 10000) {
            alert("Error: Plata ne moze biti veca od 10 000.");
            return;
        }

        $.ajax({
            header: {
                 'Access-Control-Allow-Origin': '*'
            },
            type: "POST",
            url: "http://localhost:/Gradjani/CreateGradjan",
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function() {
                alert("Uspesno ste ubacili Gradjana");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + error + status);
            }
        });
    });
}
