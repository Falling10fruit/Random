var Tab = document.getElementsByClassName("Tab");
var Add = document.getElementsByClassName("Add");
var Left = document.getElementsByClassName("Left");
var Right = document.getElementsByClassName("Right");
var TableRow = document.getElementsByClassName("TableRow");
var SubTotal = document.getElementsByClassName("SubTotal");
var Close = document.getElementsByClassName("Close");
var Clear = document.getElementById("Clear");
var Tabs = document.getElementById("Tabs");
var Cashier = document.getElementById("Cashier");
var DataBase = document.getElementById("DataBase");
var Items = document.getElementById("Items");
var Example = document.getElementById("Example");
var Total = document.getElementById("Total");
var TabMode = 0;

document.body.style.height = window.innerHeight + "px";
Cashier.style.height = DataBase.style.height = window.innerHeight - Tabs.getBoundingClientRect().height + "px";
Cashier.style.top = DataBase.style.top = Tabs.getBoundingClientRect().height + "px";
Cashier.style.width = DataBase.style.width = window.innerWidth + "px";
DataBase.style.left = Cashier.getBoundingClientRect().width + "px";
Total.style.width = window.innerWidth - 100 + "px";
Total.style.top = window.innerHeight - Total.getBoundingClientRect().height + "px";
for (let i = 0; i < 2; i++) {
    Right[i].style.width = window.innerWidth - Left[i].getBoundingClientRect().right + "px";
    Right[i].style.left = Left[i].getBoundingClientRect().right + "px";
    Right[i].style.width = window.innerWidth - Left[i].getBoundingClientRect().width + "px";
    Add[i].style.width = Add[i].getBoundingClientRect().height + "px";
    Clear.style.width = Clear.getBoundingClientRect().height + "px";
}

window.addEventListener("resize", function () {
    document.body.style.height = window.innerHeight + "px";
    Cashier.style.height = DataBase.style.height = window.innerHeight - Tabs.getBoundingClientRect().height + "px";
    Cashier.style.top = DataBase.style.top = Tabs.getBoundingClientRect().height + "px";
    Cashier.style.width = DataBase.style.width = window.innerWidth + "px";
    DataBase.style.left = Cashier.getBoundingClientRect().width + "px";
    Total.style.width = window.innerWidth - 100 + "px";
    Total.style.top = window.innerHeight - Total.getBoundingClientRect().height + "px";
    for (let i = 0; i < 2; i++) {
        Right[i].style.width = window.innerWidth - Left[i].getBoundingClientRect().right + "px";
        Right[i].style.left = Left[i].getBoundingClientRect().right + "px";
        Right[i].style.width = window.innerWidth - Left[i].getBoundingClientRect().width + "px";
        Add[i].style.width = Add[i].getBoundingClientRect().height + "px";
        Clear.style.width = Clear.getBoundingClientRect().height + "px";
    }
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

Tick();

function Tick () {
    let newX = -(Cashier.getBoundingClientRect().width) * TabMode;
    newX = Cashier.getBoundingClientRect().x + (newX - Cashier.getBoundingClientRect().x)/5

    Cashier.style.left = newX + "px";
    DataBase.style.left = Cashier.getBoundingClientRect().right + "px";

    requestAnimationFrame(Tick);
}