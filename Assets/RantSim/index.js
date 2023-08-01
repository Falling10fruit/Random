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
var Traits = [
    "OpposableThumbs", // 0
    "Tools", // 1
    "Lungs", // 2
    "ToughSkin", // 3
    "OpposableToes", // 4
    "StrongArms", // 5
    "ShortTermMemory", // 6
    "Fur", // 7
    "Communication", // 8
    "WeakStomach", // 9
    "PassDownInfo", // 10
    "Farming", // 11
    "Taming", // 12
    "GrassStomach", // 13
    "Social", // 14
    "Wings", // 15
    "Echolocation", // 16
    "Beaks", // 17
    "Claws", // 18
    "Mane", // 19
    "NoLimbs", // 20
    "Fins", // 21
    "Tails", // 22
    "Gills", // 23
    "WebbedFeet", // 24
    "Scales" // 25
];
var PrimaryTraits = [0, 1, 2, 3, 4, 5, 6, 7];
var TargetTraits = [0, 1, 2, 8, 9, 10, 11, ];
var StartingPopulation = 2;
var KidAmount = 3;
var TraitLimit = 8;
var AgeDeath = 10;
var SelectStartingPopulation = document.getElementById("SelectStartingPopulation");
var SelectKidAmount = document.getElementById("SelectKidAmount");
var SelectTraitLimit = document.getElementById("SelectTraitLimit");
var SelectAgeDeath = document.getElementById("SelectAgeDeath");
var StartingPopulationLabel = document.getElementById("StartingPopulationLabel");
var KidAmountLabel = document.getElementById("KidAmountLabel");
var TraitLimitLabel = document.getElementById("TraitLimitLabel");
var AgeDeathLabel = document.getElementById("AgeDeathLabel");
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

SelectAgeDeath.addEventListener("input", function () {
    AgeDeath = SelectAgeDeath.value;
    AgeDeathLabel.innerHTML = AgeDeath;
});

StartSimButton.addEventListener("click", function () {
    Creatures.Female.push({
        Age: 0,
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
                Traits: PrimaryTraits.slice()
            });
        } else {
            Creatures.Male.push({
                Age: 0,
                Traits: PrimaryTraits.slice()
            });
        }
    }

    while (!IsTargetTraitsAchieved) {
        for (var i = 0; i < Creatures.Female.length; i++) {
            if (Creatures.Female[i].Age == AgeDeath) {
                Creatures.Female.splice(i, 1);
            } else {
                Creatures.Female[i].Age++;
            }
        }

        for (var i = 0; i < Creatures.Male.length; i++) {
            if (Creatures.Male[i].Age == AgeDeath) {
                Creatures.Male.splice(i, 1);
            } else {
                Creatures.Male[i].Age++;
            }
        }

        let AreThereNoFemaleChildren = true;
        let AreTheroMaleChildren = false;
        let OldFemaleArrayLength = Creatures.Female.length;

        for (var FemaleNo = 0; FemaleNo < OldFemaleArrayLength; FemaleNo++) {
            let FatherNo = Math.floor(Math.random()*Creatures.Male.length);
            let ChildTraits = [];

            for (var TraitNo = 0; TraitNo < TraitLimit; TraitNo++) {
                if (Math.floor(Math.random()*2) < 1) {
                    ChildTraits.push(Creatures.Female[FemaleNo].Traits[TraitNo]);
                } else {
                    ChildTraits.push(Creatures.Male[FatherNo].Traits[TraitNo]);
                }
            }

            if ((Math.floor(Math.random()*5) < 3 && AreTheroMaleChildren) || AreThereNoFemaleChildren) {
                Creatures.Female.push({
                    Age: 0,
                    Traits: []
                });

                AreThereNoFemaleChildren = false;
            } else {
                Creatures.Male.push({
                    Age: 0,
                    Traits: []
                });

                AreTheroMaleChildren = true;
            }
        }
    }
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
    for (var i = 0; i < Creatures.Male.length; i++) {
        if (TargetTraits.toString() == Creatures.Male[i].Traits.toString()) {
            return true;
        }
    }
    
    for (var i = 0; i < Creatures.Female.length; i++) {
        if (TargetTraits.toString() == Creatures.Female[i].Traits.toString()) {
            return true;
        }
    }

    return false;
}