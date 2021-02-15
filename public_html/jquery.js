var tomb = [];
var elso = true;
var elozo = -1;
var mostani = -1;
var alap = "kepek/kartya_alap.jpg";
var pontok = 0;

function init() {
    for (var i = 1; i <= 12; i++) {
        var szam;
        if (i % 2 === 0) {
            szam = i / 2;
        }
        else {
            szam = (i + 1) / 2;
        }
        var kartya = "<img id='"+(i-1)+"' src='kepek/kartya_"+szam+".jpg' alt='kártya'>";
        tomb[i - 1] = kartya;
    }
    $("#kezd").on("click", kezd);
    kezd();
}

function kezd() {
    $("#jatekter").empty();
    for (var i = 0; i < tomb.length; i++) {
        $("#jatekter").append("<img>");
        $("#jatekter img").eq(i).attr({
            "id" : i,
            "src" : alap,
            "alt" : "kártya"
        });
        $("#jatekter img").eq(i).click(ellenoriz);
    }
    kever();
    console.log(tomb);
    pontok = 0;
}

function ellenoriz() {
    fordit(this);
    var ketFel = elso;
    if (ketFel) {
        var elozoKezd = tomb[elozo].length === 51 ? 18 : 17;
        var elozoVeg = tomb[elozo].length === 51 ? 36 : 35;
        var mostaniKezd = tomb[mostani].length === 51 ? 18 : 17;
        var mostaniVeg = tomb[mostani].length === 51 ? 36 : 35;
        var egyik = tomb[elozo].slice(elozoKezd, elozoVeg);
        var masik = tomb[mostani].slice(mostaniKezd, mostaniVeg);
        if (egyik === masik) {
            console.log("azonos");
            pontok++;
        }
        else {
            console.log("különböző");
            var elozoIndex = tomb.indexOf(tomb[elozo]);
            var mostaniIndex = tomb.indexOf(tomb[mostani]);
            $("#jatekter img").eq(elozoIndex).unbind("click");
            $("#jatekter img").eq(mostaniIndex).unbind("click");
            setTimeout(visszafordit, 1500);
        }
    }
}

function fordit(kartya) {
    var index = parseInt($(kartya).attr("id"));
    console.log(index);
    var i = 0;
    while(i < tomb.length && i !== index) {
        i++;
    }
    var kepSrc = "";
    if (tomb[i].length === 51) {
        kepSrc = tomb[i].slice(18, 36);
    }
    else {
        kepSrc = tomb[i].slice(17, 35);
    }
    $(kartya).attr("src", kepSrc);
    
    if (elso) {
        elozo = index;
    }
    else {
        mostani = index;
    }
    elso = !elso;
    $(kartya).unbind("click");
}

function visszafordit() {
    var elozoIndex = tomb.indexOf(tomb[elozo]);
    var mostaniIndex = tomb.indexOf(tomb[mostani]);
    $("#jatekter img").eq(elozoIndex).attr("src", alap);
    $("#jatekter img").eq(mostaniIndex).attr("src", alap);
    $("#jatekter img").eq(elozoIndex).click(ellenoriz);
    $("#jatekter img").eq(mostaniIndex).click(ellenoriz);
}

function kever() {
    tomb.sort(function(a, b){return 0.5 - Math.random();});
}

$(function(){
    init();
});
