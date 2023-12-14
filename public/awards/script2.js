"use strict"
//Lista zawierajaca informacje o odznakach - to z niej bedzie ksztaltowana strona
const url = 'http://localhost:8081/api/v1/odznakaManager/user/2'; //tu musi być na podstawie zalogowanego usera generowane id
const url2 = 'http://localhost:8081/api/v1/odznakaManager/gracze/2' //tu to samo
const url3 = 'http://localhost:8081/api/v1/odznakaManager/przypnij'
let odznakiDoWyswietlenia = [];
let userDlaKtoregoWyswietlamyOdznaki;

//instrukcje w tym bloku wykonaja się tylko raz po zaladowaniu strony
$(document).ready(function() {
    getJSONbin();
})

let ustaw = function (id) {
    userDlaKtoregoWyswietlamyOdznaki.odznaka = id;
    $.ajax({
        url: 'http://localhost:8081/api/v1/odznakaManager/przypnij?idUsera='+userDlaKtoregoWyswietlamyOdznaki.id+'&idOdz='+id,
        method: 'GET',
        success: function (data) {
            // Tutaj masz dostęp do otrzymanego JSON-a
            updateOdznaki();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX request failed:', textStatus, errorThrown);
        }
    });
}
let getJSONbin = function () {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            odznakiDoWyswietlenia = data; // Tutaj masz dostęp do otrzymanego JSON-a
            $.ajax({
                url: url2,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    userDlaKtoregoWyswietlamyOdznaki = data; // Tutaj masz dostęp do otrzymanego JSON-a
                    updateOdznaki();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('AJAX request failed:', textStatus, errorThrown);
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX request failed:', textStatus, errorThrown);
        }
    });

}

let updateOdznaki = function () {
    $("#awards-container").empty();
    for (let odznaka in odznakiDoWyswietlenia) {
        console.log("test")
        if(odznakiDoWyswietlenia[odznaka].id == userDlaKtoregoWyswietlamyOdznaki.odznaka) {
            $("<div></div>").addClass("award-container-red").attr('id', odznakiDoWyswietlenia[odznaka].id).appendTo("#awards-container")
        }
        else {
            $("<div></div>").addClass("award-container").attr('id', odznakiDoWyswietlenia[odznaka].id).attr('onclick', 'ustaw('+odznakiDoWyswietlenia[odznaka].id+')').appendTo("#awards-container")
        }
        $("<p></p>").addClass("wysrodkowany-napis").text(odznakiDoWyswietlenia[odznaka].nazwa).appendTo("div:last")
        $("<div></div>").addClass("zdjecie").appendTo("div:last")
        $("<img>").attr('src', odznakiDoWyswietlenia[odznaka].source).appendTo("div:last")
        $("<p></p>").addClass("wysrodkowany-napis").text(odznakiDoWyswietlenia[odznaka].opis).appendTo("div:last")
    }
}