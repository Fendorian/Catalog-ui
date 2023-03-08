function IzmenitiGradjana() {
    console.log('radi izmena');
    $("#update-item-form").submit(function(event) {
        event.preventDefault();

        var formData = {
            ID: $("#ID").val(),
            Ime: $("#Ime").val(),
            Prezime: $("#Prezime").val(),
            StrucnaSprema: $("#StrucnaSprema").val(),
            Plata: $("#Plata").val(),
            Struka: $("#Struka").val(),
            Slika: $("#Slika").val(),

        };

        $.ajax({
            header: {
                 'Access-Control-Allow-Origin': '*'
            },
            type: "PUT",
            url: `http://localhost:/Gradjani/Updategradjanin/2`,
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function() {
                alert("Uspesno ste izmenili Gradjana")
            },
            error: function(xhr, status, error) {
                console.log(formData);
              
            }
        });
    });
}