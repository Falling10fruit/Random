var Canvas = document.getElementById("Canvas");

if (window.innerHeight < window.innerWidth) {
    Canvas.style.height = Canvas.style.width = window.innerHeight/2 + "px";
} else {
    Canvas.style.height = Canvas.style.width = window.innerWidth/2 + "px";
}