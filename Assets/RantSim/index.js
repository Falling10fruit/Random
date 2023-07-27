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
var TraitLimit = 8;
var SelectPrimaryTraits = document.getElementById("SelectPrimaryTraits");
var SelectTargetTraits = document.getElementById("SelectTargetTraits");
var SelectTraitLimit = document.getElementById("SelectTraitLimit");
var PrimaryTraitOptions = document.getElementsByClassName("PrimaryTraitOptions");
var PrimaryTraitOptions = document.getElementsByClassName("PrimaryTraitOptions");

function ResetTraitOptions () {
    let TraitOption = document.createElement("input");
    TraitOption.setAttribute("type", "checkbox");

    for (var i = 0; i < Traits.length; i++) {
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
    }
}