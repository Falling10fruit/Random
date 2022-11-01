var Tab = document.getElementsByClassName("Tab");
var Reciept = document.getElementById("Reciept");
var DataBase = document.getElementById("DataBase");
var TabMode;

document.body.style.height = window.innerHeight + "px";
Reciept.style.height = DataBase.style.height = window.innerHeight - Tab[0].getBoundingClientRect().height + "px";

Tab[0].addEventListener("mouseover", function (e) {
    if (TabMode != 0) {
        Tab[0].style.backgroundColor = "rgb(175, 175, 175)";
    }
});

Tab[1].addEventListener("mouseover", function (e) {
    if (TabMode != 1) {
        Tab[1].style.backgroundColor = "rgb(175, 175, 175)";
    }
});

Tab[0].addEventListener("mouseout", function (e) {
    if (TabMode != 0) {
        Tab[0].style.backgroundColor = "rgb(255, 255, 255)";
    }
});

Tab[1].addEventListener("mouseout", function (e) {
    if (TabMode != 1) {
        Tab[1].style.backgroundColor = "rgb(255, 255, 255)";
    }
});

Tab[0].addEventListener("click", function (e) {
    TabMode = 0;
    Tab[0].style.backgroundColor = "rgb(200, 200, 200)";
    Tab[1].style.backgroundColor = "rgb(255, 255, 255)";

    Reciept.style.visibility = "visible";
    Reciept.style.position = "relative";
    DataBase.style.visibility = "hidden";
    DataBase.style.position = "fixed";
});

Tab[1].addEventListener("click", function (e) {
    TabMode = 1;
    Tab[1].style.backgroundColor = "rgba(200, 200, 200, 1)";
    Tab[0].style.backgroundColor = "rgba(255, 255, 255, 1)";
    
    DataBase.style.visibility = "visible";
    DataBase.style.position = "relative";
    Reciept.style.visibility = "hidden";
    Reciept.style.position = "fixed";
});