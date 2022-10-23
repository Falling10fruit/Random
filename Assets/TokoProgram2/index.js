var Tab = document.getElementsByClassName("Tab");
var Reciept = document.getElementById("Reciept");
var TabMode = 0;

document.body.style.height = window.innerHeight + "px";

Tab[0].addEventListener("click", function (e) {
    TabMode = 0;
});