var GetLogin = function ()
{
     var korisnickoime = $('#txtUsername').val();
     var sifra = $('#txtPassword').val();
    

    console.log(korisnickoime);
    var loginUrl = "http://localhost:/Gradjani/GetLogin";
    var loginData = JSON.stringify({ "KorisnickoIme": korisnickoime, "Sifra": sifra });

    $.ajax({
        type: "POST",
        data: loginData,
        url: loginUrl,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result)
        {
            alert(result);
            if (result === "Uspesno logovanje")
            {
                window.location.replace("http://127.0.0.1:5501/index.html");

                let token = result.token;

                document.cookie = "token = "+ token;
            }
            else
            {
                alert("Popunite sva polja!")
            }
            
        },
        error: function (result)
        {
            alert(result);
        },
    });

};