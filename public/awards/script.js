"use strict"
//Lista zawierajaca informacje o odznakach - to z niej bedzie ksztaltowana strona
const url = 'http://localhost:8081/api/v1/odznaki';
let odznakiDoWyswietlenia = [];

//instrukcje w tym bloku wykonaja się tylko raz po zaladowaniu strony
$(document).ready(function() {
    getJSONbin();
})

let getJSONbin = function () {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            odznakiDoWyswietlenia = data; // Tutaj masz dostęp do otrzymanego JSON-a
            updateOdznaki();
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
        $("<div></div>").addClass("award-container").appendTo("#awards-container")
        $("<p></p>").addClass("wysrodkowany-napis").text(odznakiDoWyswietlenia[odznaka].nazwa).appendTo("div:last")
        $("<div></div>").addClass("zdjecie").appendTo("div:last")
        $("<img>").attr('src', odznakiDoWyswietlenia[odznaka].source).appendTo("div:last")
        $("<p></p>").addClass("wysrodkowany-napis").text(odznakiDoWyswietlenia[odznaka].opis).appendTo("div:last")
    }
}