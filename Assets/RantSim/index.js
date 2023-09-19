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
            Traits: [] List of numbers indicates indexNo for the Traits array
        }*/
    ]
};
var BestCreatureTraits = {
    NumberOfMatchingTraits: 0,
    TraitList: []
}
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
var TargetTraits = [0, 1, 2, 8, 9, 10, 11, 12];
var Data = [];
var Pause = false;
var GenerationNo = 0;
var FemaleNo = 0;
var OldFemaleArrayLength = 1;
var StartingPopulation = 2;
var KidAmount = 3;
var TraitLimit = 8;
var AgeDeath = 10;
var MutationChance = 5;
var SelectStartingPopulation = document.getElementById("SelectStartingPopulation");
var SelectKidAmount = document.getElementById("SelectKidAmount");
var SelectTraitLimit = document.getElementById("SelectTraitLimit");
var SelectAgeDeath = document.getElementById("SelectAgeDeath");
var SelectMutationChance = document.getElementById("SelectMutationChance");
var StartingPopulationLabel = document.getElementById("StartingPopulationLabel");
var KidAmountLabel = document.getElementById("KidAmountLabel");
var TraitLimitLabel = document.getElementById("TraitLimitLabel");
var AgeDeathLabel = document.getElementById("AgeDeathLabel");
var MutationChanceLabel = document.getElementById("MutationChanceLabel");
var StartSimButton = document.getElementById("StartSimButton");
var PauseSimButton = document.getElementById("PauseSimButton");
var SelectPrimaryTraits = document.getElementById("SelectPrimaryTraits");
var SelectTargetTraits = document.getElementById("SelectTargetTraits");
var PrimaryTraitOptions = document.getElementsByClassName("PrimaryTraitOptions");
var TargetTraitOptions = document.getElementsByClassName("TargetTraitOptions");
var GenerationNoH3 = document.getElementById("GenerationNoH3");
var CurrentBestUI = document.getElementsByClassName("CurrentBestUI");
var ULBestCreatureTraits = document.getElementById("ULBestCreatureTraits");
var LIBestCreatureTraits = document.getElementById("LIBestCreatureTraits");
var SimResultsUI = document.getElementById("SimResultsUI");
var Graph = document.getElementById("Graph");
var CTX = Graph.getContext("2d");

SelectTraitLimit.setAttribute("max", Traits.length);

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

SelectMutationChance.addEventListener("input", function () {
    MutationChance = SelectMutationChance.value;
    MutationChanceLabel.innerText = MutationChance + "%";
});

PauseSimButton.addEventListener("click", function () {
    if (Pause) {
        SimulateGeneration();
        PauseSimButton.innerText = "Pause";
    } else {
        PauseSimButton.innerText = "Unpause";
    }

    Pause = !Pause;
});

StartSimButton.addEventListener("click", function () {
    StartSimButton.innerHTML = "Restart";
    PauseSimButton.style.visibility = "visible";

    ResetGeneration();

    SimulateGeneration();
});

SetUpTraitOptions();

function SimulateGeneration () {
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
}

function SimulateCreatures () {
    OldFemaleArrayLength = Creatures.Female.length;
    FemaleNo = 0;

    if (FemaleNo > Math.floor(Creatures.Female.length/2000)*2000) {
        SimulateHowManyFemale
    } else {
        SimulateHowManyFemale(Math.floor(Creatures.Female.length/2000))
    }

    RenderGraph();

    if (!IsTargetTraitsAchieved() && !Pause) {
        window.requestAnimationFrame(SimulateGeneration);
        GenerationNoH3.innerText = parseInt(GenerationNoH3) + 1;
    } else {
        ResetGeneration();

        GenerationNoH3.innerText = "0";

        for (let i = 0; i < Data.length; i++) {

        }
    }
}

function SimulateHowManyFemale () {
    let AreThereNoFemaleChildren = true;
    let AreTheroMaleChildren = false;

    for ( FemaleNo = 0; FemaleNo < OldFemaleArrayLength; FemaleNo++) {
        for (var ChildNo = 0; ChildNo < KidAmount; ChildNo++) {
            let FatherNo = Math.floor(Math.random()*Creatures.Male.length);
            let ChildTraits = [];

            for (var TraitNo = 0; TraitNo < TraitLimit; TraitNo++) {
                if (Math.floor(Math.random()*2) < 1) {
                    ChildTraits.push(Creatures.Female[FemaleNo].Traits[TraitNo]);
                } else {
                    ChildTraits.push(Creatures.Male[FatherNo].Traits[TraitNo]);
                }
            }

            if (Math.floor(Math.random()*5) < 4) {
                let AllowedTraitsToMutateTo = Traits.slice();

                for (var i = 0; i < AllowedTraitsToMutateTo.length; i++) {
                    if (ChildTraits.includes(AllowedTraitsToMutateTo[i])) {
                        AllowedTraitsToMutateTo[i] = "EMPTY";
                    } else {
                        AllowedTraitsToMutateTo[i] = i;
                    }
                }

                for (var i = AllowedTraitsToMutateTo.length - 1; i >= 0; i--) {
                    if (AllowedTraitsToMutateTo[i] == "EMPTY") {
                        AllowedTraitsToMutateTo.splice(i, 1);
                    }
                }

                ChildTraits[Math.floor(Math.random()*ChildTraits.length)] = AllowedTraitsToMutateTo[Math.floor(Math.random()*AllowedTraitsToMutateTo.length)]; 
            }

            if ((Math.floor(Math.random()*5) < 3 && AreTheroMaleChildren) || AreThereNoFemaleChildren) {
                Creatures.Female.push({
                    Age: 0,
                    Traits: ChildTraits.slice()
                });

                AreThereNoFemaleChildren = false;
            } else {
                Creatures.Male.push({
                    Age: 0,
                    Traits: ChildTraits.slice()
                });

                AreTheroMaleChildren = true;
            }
        }    
    }

}

function ResetGeneration () {
    Creatures.Male.splice(0, Creatures.Male.length);
    Creatures.Female.splice(0, Creatures.Female.length);

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
}

function SetUpTraitOptions () {
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
        PrimaryTraitOption.setAttribute("id", "PrimaryTraitOptionNo" + i);
        for (var x = 0; x < PrimaryTraits.length; x++) {
            if (i == PrimaryTraits[x]) {
                PrimaryTraitOption.setAttribute("checked", true);
            }
        }
        SelectPrimaryTraits.appendChild(PrimaryTraitOption);

        let TargetTraitOption = TraitOption.cloneNode(true);
        TargetTraitOption.setAttribute("class", "TargetTraitOptions");
        TargetTraitOption.setAttribute("class", "TargetTraitOptionNo" + i);
        for (var x = 0; x < TargetTraits.length; x++) {
            if (i == PrimaryTraits[x]) {
                TargetTraitOption.setAttribute("checked", true);
            }
        }
        SelectTargetTraits.appendChild(TargetTraitOption);

        let Label = document.createElement("label");
        Label.innerHTML = Traits[i];
        Label.setAttribute("for", "PrimaryTraitOptionNo" + i);
        SelectPrimaryTraits.appendChild(Label.cloneNode(true));
        Label.setAttribute("for", "TargetTraitOptionNo" + i);
        SelectTargetTraits.appendChild(Label.cloneNode(true));
    }

    for (let i = 0; i < PrimaryTraitOptions.length; i++) {
        PrimaryTraitOptions[i].addEventListener("click", function () {
            if (PrimaryTraitOptions[i].selected) {
                for (let x = 0; x < PrimaryTraits.length; x++) {
                    if (i == PrimaryTraits[x]) {
                        PrimaryTraits.splice(x, 1);
                    }
                }
            } else {
                PrimaryTraits.splice(0, 1);
                PrimaryTraits.push(i);
            }

            ResetSelectedCheckboxes();
        });
    }

    for (let i = 0; i < TargetTraitOptions.length; i++) {
        TargetTraitOptions[i].addEventListener("click", function () {
            if (TargetTraitOptions[i].selected) {
                for (let x = 0; x < TargetTraits.length; x++) {
                    if (i == TargetTraits[x]) {
                        TargetTraits.splice(x, 1);
                    }
                }
            } else {
                TargetTraits.splice(0, 1);
                TargetTraits.push(i);
            }
        
            ResetSelectedCheckboxes();  
        });
    }
}

function IsTargetTraitsAchieved () {
    for (var i = 0; i < Creatures.Male.length; i++) {
        let NoOfCurrentMatchingTraits = 0;

        for (var TraitNo = 0; TraitNo < TargetTraits.length; TraitNo++) {
            if (Creatures.Male[i].Traits.includes(TargetTraits[TraitNo])) {
                NoOfCurrentMatchingTraits++;
            }
        }
    }
    
    for (var i = 0; i < Creatures.Female.length; i++) {
        let NoOfCurrentMatchingTraits = 0;

        for (var TraitNo = 0; TraitNo < TargetTraits.length; TraitNo++) {
            if (Creatures.Female[i].Traits.includes(TargetTraits[TraitNo])) {
                NoOfCurrentMatchingTraits++;
            }
        }

        if (NoOfCurrentMatchingTraits > BestCreatureTraits.NumberOfMatchingTraits) {
            BestCreatureTraits.NumberOfMatchingTraits = NoOfCurrentMatchingTraits;
            BestCreatureTraits.TraitList = Creatures.Female[i].Traits.slice();

            if (NoOfCurrentMatchingTraits == TraitLimit) {
                return true;
            } 
        }
    }

    return false;
}

function ResetSelectedCheckboxes () {
    for (let i = 0; i < PrimaryTraitOptions.length; i++) {
        PrimaryTraitOptions[i].setAttribute("checked", "false");

        for (let x = 0; x < PrimaryTraits.length; x++) {
            if (i == PrimaryTraits[x]) {
                PrimaryTraitOptions[i].setAttribute("checked", "true");
            }
        }
    }

    for (let i = 0; i < TargetTraitOptions.length; i++) {
        TargetTraitOptions[i].setAttribute("checked", "false");

        for (let x = 0; x < TargetTraits.length; x++) {
            if (i == TargetTraits[x]) {
                TargetTraitOptions[i].setAttribute("checked", "true");
            }
        }
    }
}

function UpdateCurrentBestUI () {

}

function InsertData () {
    for (let i = 0; i < Data.length; i++) {
        if (Data[i][0] == GenerationNo) {
            Data[i][1]++;

            return;
        }
    }

    Data.push([GenerationNo, 0]);
}

function RenderGraph () {
    Graph.width = SimResultsUI.getBoundingClientRect().width;
    Graph.height = SimResultsUI.getBoundingClientRect().height*0.7;

    let HighX = 0;
    let HighY = 0;
    let LowX = 9999;
    let LowY = 9999;

    for (var i = 0; i < Data.length; i++) {
        HighX = Math.max(Data[i][0] +5, HighX);
        HighY = Math.max(Data[i][1] +5, HighY);
        LowX = Math.max(Math.min(Data[i][0] -5, LowX), 0);
        LowY = Math.max(Math.min(Data[i][1] -5, LowY), 0);
    }

    CTX.fillStyle = "rgb(0, 0, 0)";

    CTX.fillRect(25, 25, 1, Graph.height -50);
    CTX.fillRect(25, Graph.height -26, Graph.width -50, 1);

    CTX.textAlign = "center";
    CTX.textBaseline = "top";

    for (let i = 0; i < HighX -LowX; i++) {
        CTX.fillRect(25 +i*((Graph.width -50)/(HighX -LowX)), 25, 1, Graph.height -50);
        CTX.fillText(i +LowX, 25 +(Graph.width -50)/((HighX -LowX)*2) +i*((Graph.width -50)/(HighX -LowX)), Graph.height -24);
    }

    CTX.textAlign = "right";
    CTX.textBaseline = "middle";

    for (let i = 0; i < HighY -LowY; i++) {
        CTX.fillRect(25, Graph.height -25 -i*((Graph.height -50)/(HighY -LowY)), Graph.width -50, 1);
        CTX.fillText(i +LowY, 24, Graph.height -25 -(Graph.height -50)/((HighY -LowY)*2) -i*((Graph.height -50)/(HighY -LowY))); 
    }

    for (let i = 0; i < Data.length; i++) {

    }
}