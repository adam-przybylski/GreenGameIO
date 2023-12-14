"use strict"
const url = 'http://localhost:8081/api/v1/odznaki'
let zdjeciaDostepneWSystemie = ["test1.png", "test2.png", "test3.png", "test4.png", "test5.png", "test6.png", "test7.png", "test8.png", "test9.png", "test10.png"]
let tablicaPomocnicza = []
let obecneOdznakiWSystemie
let dostepneZdjecia
let index = 0

$(document).ready(function() {
    pobierzDane();
})

let zatwierdz = function () {
console.log('dziala')
    let opis = $("#fopis").val()
    let nazwa = $("#fnazwa").val()
    //console.log('http://localhost:8081/api/v1/odznakaManager/dodajOdznake?nazwa='+nazwa+'&opis='+opis + '&src=' +dostepneZdjecia[index])
    $.ajax({
        url: 'http://localhost:8081/api/v1/odznakaManager/dodajOdznake?nazwa='+nazwa+'&opis='+opis + '&src=' +dostepneZdjecia[index],
        method: 'GET',
        success: function (data) {
            console.log(data)
            // Tutaj masz dostęp do otrzymanego JSON-a
            pobierzDane();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX request failed:', textStatus, errorThrown);
        }
    });
}

let zmiana = function () {
    $("img").attr('src', dostepneZdjecia[index])

}

let next = function () {
    console.log("test")
    if (index+1 < dostepneZdjecia.length) {
        index++
        zmiana()
    }
}

let prev = function () {
    if (index > 0) {
        index--
        zmiana()
    }
}

let pobierzDane = function () {
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            obecneOdznakiWSystemie = data;
            wypelnijPomocniczaTablica()
            dostepneZdjecia = znajdzNieWspolneElementy(tablicaPomocnicza, zdjeciaDostepneWSystemie)// Tutaj masz dostęp do otrzymanego JSON-a
                $("#divZ").empty()
            $("<img>").attr('src', dostepneZdjecia[index]).appendTo("#divZ")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('AJAX request failed:', textStatus, errorThrown);
        }
    });
}

function wypelnijPomocniczaTablica() {
    for (let zdj in obecneOdznakiWSystemie) {
        tablicaPomocnicza.push(obecneOdznakiWSystemie[zdj].source);
    }
}

function znajdzNieWspolneElementy(tablica1, tablica2) {
    let nieWspolneTablica1 = tablica1.filter(element => !tablica2.includes(element));
    let nieWspolneTablica2 = tablica2.filter(element => !tablica1.includes(element));

    return nieWspolneTablica1.concat(nieWspolneTablica2);
}
