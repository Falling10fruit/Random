var Tab = document.getElementsByClassName("Tab");
var Add = document.getElementsByClassName("Add");
var Left = document.getElementsByClassName("Left");
var Right = document.getElementsByClassName("Right");
var TableRow = document.getElementsByClassName("TableRow");
var Tabs = document.getElementById("Tabs");
var Reciept = document.getElementById("Reciept");
var DataBase = document.getElementById("DataBase");
var Items = document.getElementById("Items");
var Example = document.getElementById("Example");
var TabMode;

document.body.style.height = window.innerHeight + "px";
Reciept.style.height = DataBase.style.height = window.innerHeight - Tab[0].getBoundingClientRect().height + "px";
Reciept.style.top = DataBase.style.top = Tabs.getBoundingClientRect().height;
Reciept.style.left = "0px";
DataBase.style.left = Reciept.getBoundingClientRect().width;

window.addEventListener("resize", function () {
    document.body.style.height = window.innerHeight + "px";
    Reciept.style.height = DataBase.style.height = window.innerHeight - Tab[0].getBoundingClientRect().height + "px";
});

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
});

Tab[1].addEventListener("click", function (e) {
    TabMode = 1;
    Tab[1].style.backgroundColor = "rgba(200, 200, 200, 1)";
    Tab[0].style.backgroundColor = "rgba(255, 255, 255, 1)";
});

for (var i = 0; i < Add.length; i++) {
    Add[i].style.width = Add[i].getBoundingClientRect().height + "px";
    Add[i].style.height = Add[i].style.width;
}

for (var i = 0; i < Left.length; i++) {
    Left[i].style.width = "100px";
    Right[i].style.width = window.innerWidth - Left[i].getBoundingClientRect().width + "px";
}

for (var i = 0; i < TableRow.length; i++) {
    TableRow[i].style.height = "50px";

    if (i == 0 || i == TableRow.length - 1) {
        TableRow[i].style.backgroundColor = "rgb(125, 125, 125)";
    } else {
        TableRow[i].style.backgroundColor = "rgb(" + ((i%2)*50 + 150) + ", " + ((i%2)*50 + 150) + ", " + ((i%2)*50 + 150) + ")";
        console.log("rgb(" + ((i%2)*50 + 150) + ", " + ((i%2)*50 + 150) + ", " + ((i%2)*50 + 150) + ")");
    }
}

Add[0].addEventListener("mouseover", function () {
    Add[0].style.backgroundColor = "rgb(100, 100, 100)";
});

Add[0].addEventListener("mouseout", function () {
    Add[0].style.backgroundColor = "rgb(80, 80, 80)";
});

Add[0].addEventListener("mouseup", function () {
    Add[0].style.backgroundColor = "rgb(100, 100, 100)";
})

Add[0].addEventListener("mousedown", function () {
    Add[0].style.backgroundColor = "rgb(70, 70, 70)";

    var NewItem = Example.cloneNode(true);
    NewItem.removeAttribute("id");
    Items.appendChild(NewItem);
});

function Tick () {
    let newX = -(Tab[0].getBoundingClientRect().width) * TabMode;

    Tab[0].style.left = (newX - Tab[0].style.left)/10;
    Tab[1].style.left = Tab[0].getBoundingClientRect().right;

    requestAnimationFrame(Tick);
}