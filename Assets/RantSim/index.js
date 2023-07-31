var Creatures = {
    Male: [/*
        {
            Age: 0,
            Traits: [] List of numbers indicates indexNo for the Traits array
        }*/
    ],
    Female: [/*
        {
            Age: 0,
            Pregnant: false,
            Traits: [] List of numbers indicates indexNo for the Traits array
        }*/
    ]

};
var Traits = ["OpposableThumbs", "Tools", "Lungs", "ToughSkin", "ToughStomach", "StrongArms", "ShortTermMemory", "Fur", "Communication", "Tail", "Gills", "WebbedFeet", "Scales", "GrassStomach", "Social", "Wings", "Echolocation", "Beaks", "Claws", "Mane", "NoLimbs", "Fins"];
var PrimaryTraits = [0, 1, 2, 3, 7, 12];
var TargetTraits = [0, 1, 2, 3, 4, 5, 6]
var StartingPopulation = 2;
var KidAmount = 3;
var TraitLimit = 8;
var SelectStartingPopulation = document.getElementById("SelectStartingPopulation");
var SelectKidAmount = document.getElementById("SelectKidAmount");
var SelectTraitLimit = document.getElementById("SelectTraitLimit");
var StartingPopulationLabel = document.getElementById("StartingPopulationLabel");
var KidAmountLabel = document.getElementById("KidAmountLabel");
var TraitLimitLabel = document.getElementById("TraitLimitLabel");
var StartSimButton = document.getElementById("StartSimButton");
var SelectPrimaryTraits = document.getElementById("SelectPrimaryTraits");
var SelectTargetTraits = document.getElementById("SelectTargetTraits");
var PrimaryTraitOptions = document.getElementsByClassName("PrimaryTraitOptions");
var TargetTraitOptions = document.getElementsByClassName("TargetTraitOptions");

SelectStartingPopulation.addEventListener("input", function () {
    StartingPopulation = SelectStartingPopulation.value;
    StartingPopulationLabel.innerHTML = StartingPopulation;
});

SelectKidAmount.addEventListener("input", function () {
    KidAmount = SelectKidAmount.value;
    KidAmountLabel.innerHTML = KidAmount;
});

SelectTraitLimit.addEventListener("input", function () {
    TraitLimit = SelectTraitLimit.value;
    TraitLimitLabel.innerHTML = TraitLimit;
});

StartSimButton.addEventListener("click", function () {
    Creatures.Female.push({
        Age: 0,
        Pregnant: false,
        Traits: PrimaryTraits.slice()
    });
    
    Creatures.Male.push({
        Age: 0,
        Traits: PrimaryTraits.slice()
    });

    for (var i = 0; i < StartingPopulation - 2; i++) {
        if (Math.floor(Math.random()*5) < 3) {
            Creatures.Female.push({
                Age: 0,
                Pregnant: false,
                Traits: PrimaryTraits.slice()
            });
        } else {
            Creatures.Male.push({
                Age: 0,
                Traits: PrimaryTraits.slice()
            });
        }
    }

    while ()
});

ResetTraitOptions();

function ResetTraitOptions () {
    let TraitOption = document.createElement("input");
    TraitOption.setAttribute("type", "checkbox");

    for (var i = 0; i < Traits.length; i++) {
        if (i != 0) {
            let BR = document.createElement("br");
            SelectTargetTraits.appendChild(BR.cloneNode(true));
            SelectPrimaryTraits.appendChild(BR.cloneNode(true));
        }

        let PrimaryTraitOption = TraitOption.cloneNode(true);
        PrimaryTraitOption.setAttribute("class", "PrimaryTraitOptions");
        for (var x = 0; x < PrimaryTraits.length; x++) {
            if (i == PrimaryTraits[x]) {
                PrimaryTraitOption.setAttribute("checked", true);
            }
        }
        SelectPrimaryTraits.appendChild(PrimaryTraitOption);

        let TargetTraitOption = TraitOption.cloneNode(true);
        TargetTraitOption.setAttribute("class", "TargetTraitOptions");
        for (var x = 0; x < TargetTraits.length; x++) {
            if (i == PrimaryTraits[x]) {
                TargetTraitOption.setAttribute("checked", true);
            }
        }
        SelectTargetTraits.appendChild(TargetTraitOption);

        let Label = document.createElement("label");
        Label.innerHTML = Traits[i];
        SelectPrimaryTraits.appendChild(Label.cloneNode(true));
        SelectTargetTraits.appendChild(Label.cloneNode(true));
    }

    for (var i = 0; i < PrimaryTraitOptions.length; i++) {
        PrimaryTraitOptions[i].addEventListener("click", function () {
            if (!PrimaryTraitOptions[i].selected) {
                PrimaryTraits.splice(0, 1);
                PrimaryTraits.push(i);
            }
        })
    }

    for (var i = 0; i < TargetTraitOptions.length; i++) {
        TargetTraitOptions[i].addEventListener("click", function () {
            if (!TargetTraitOptions[i].selected) {
                TargetTraits.splice(0, 1);
                TargetTraits.push(i);
            }
        })
    }
}

function IsTargetTraitsAchieved () {
    for (var i = 0; i < Creatures.Male.length)
}