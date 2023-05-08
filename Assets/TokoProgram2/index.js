var Tab = document.getElementsByClassName("Tab");
var Add = document.getElementsByClassName("Add");
var Left = document.getElementsByClassName("Left");
var Right = document.getElementsByClassName("Right");
var TableRow = document.getElementsByClassName("TableRow");
var RecieptRow = document.getElementsByClassName("RecieptRow");
var ReciepetSelect = document.getElementsByClassName("RecieptSelect");
var RecieptAmount = document.getElementsByClassName("RecieptAmount");
var SubTotal = document.getElementsByClassName("SubTotal");
var Close = document.getElementsByClassName("Close");
var Clear = document.getElementById("Clear");
var Tabs = document.getElementById("Tabs");
var Cashier = document.getElementById("Cashier");
var DataBase = document.getElementById("DataBase");
var Items = document.getElementById("Items");
var RecieptExample = document.getElementById("RecieptExample");
var Total = document.getElementById("Total");
var TabMode = 0;
var Database = [
    /*
    {
        ProductName: "BTSHappyMeal",
        Price: 50000 
    }
    */
];
var Reciept = [
    /*
    {
        ProductIndex: 0,
        Amount: 1
    }
    */
];
var Undo = [];

Undo = [DataBase, Reciept];

manuallyPlaceEverythingInPlaceOhMyGoshHowDoesCSSWork();

window.addEventListener("resize", function () {
    manuallyPlaceEverythingInPlaceOhMyGoshHowDoesCSSWork();
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

addButtonStyleThing(Add[0]);
addButtonStyleThing(Add[1]);
addButtonStyleThing(Clear);

Add[0].addEventListener("mousedown", function () {
    Reciept.push({
        Index: 0,
        Amount: 1
    })
});

Clear.addEventListener("mousedown", function () {
});

Tick();

function Tick () {
    let newX = -(Cashier.getBoundingClientRect().width) * TabMode;
    newX = Cashier.getBoundingClientRect().x + (newX - Cashier.getBoundingClientRect().x)/5

    Cashier.style.left = newX + "px";
    DataBase.style.left = Cashier.getBoundingClientRect().right + "px";

    requestAnimationFrame(Tick);
}

function manuallyPlaceEverythingInPlaceOhMyGoshHowDoesCSSWork () {
    document.body.style.height = window.innerHeight + "px";
    Cashier.style.height = DataBase.style.height = window.innerHeight - Tabs.getBoundingClientRect().height + "px";
    Cashier.style.top = DataBase.style.top = Tabs.getBoundingClientRect().height + "px";
    Cashier.style.width = DataBase.style.width = window.innerWidth + "px";
    DataBase.style.left = Cashier.getBoundingClientRect().width + "px";
    Total.style.width = window.innerWidth - 100 + "px";
    Total.style.top = window.innerHeight - Total.getBoundingClientRect().height + "px";
    Clear.style.width = Clear.getBoundingClientRect().height + "px";
    for (let i = 0; i < 2; i++) {
        Right[i].style.width = window.innerWidth - Left[i].getBoundingClientRect().right + "px";
        Right[i].style.left = Left[i].getBoundingClientRect().right + "px";
        Right[i].style.width = window.innerWidth - Left[i].getBoundingClientRect().width + "px";
        Add[i].style.width = Add[i].getBoundingClientRect().height + "px";
    }
}

function addButtonStyleThing (Element) {
    Element.addEventListener("mouseover", function () {
        Element.style.backgroundColor = "rgb(100, 100, 100)";
    });
    
    Element.addEventListener("mouseout", function () {
        Element.style.backgroundColor = "rgb(80, 80, 80)";
    });
    
    Element.addEventListener("mouseup", function () {
        Element.style.backgroundColor = "rgb(100, 100, 100)";
    });

    Element.addEventListener("mousedown", function () {
        Element.style.backgroundColor = "rgb(70, 70, 70)";
    });
};

function renderReciept () {
    RecieptRow.splice(0, RecieptRow.length);

    for (let i = 0; i < Reciept.length; i++) {
        let NewItem = RecieptExample.cloneNode(true);
        NewItem.removeAttribute("id");
        Items.appendChild(NewItem);

        ReciepetSelect[i].addEventListener("focus", function () {
        });
        
        RecieptAmount[i].addEventListener("input", function (e) {
            Reciept[i].Amount = e.target.value;
        });
    
        RecieptClose[i].addEventListener("click", function () {
            NewItem.remove();
        });
    }
}

function renderDatabase () {

}