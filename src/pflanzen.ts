import { SerializedTimings } from "../node_modules/rollup/dist/rollup";
import { setTextRange } from "../node_modules/typescript/lib/typescript";
import { ladePflanzen, speicherePflanzen } from "./pflanzenStorage";
import { Pflanze } from "./types";

//Funktion zum Hinzufügen einer neuen Pflanze
function pflanzenHinzufuegen() {
    const pflanzen: Pflanze[] = [];


    const pflanzenname = document.querySelector("#pflanzenname") as HTMLInputElement;
    const gießintervall = document.querySelector("#gießintervall") as HTMLInputElement;
    const standort = document.querySelector("#standort") as HTMLInputElement;

    console.log(gießintervall.value);
    if (gießintervall.value === "") {
        alert("Pflichtfeld")
        return
    }
    if (pflanzenname.value === "") {
        return
    }
    if (standort.value === "") {
        return
    }
    //Pflanzenobjekt erstellen
    const newPflanze: Pflanze = {
        name: pflanzenname.value,
        gießintervall: parseInt(gießintervall.value),
        standort: standort.value,
        beginnDesIntervalls:Date;
    };
    console.dir(newPflanze);

    //Pflanzen zum Array hinzufügen
    pflanzen.push(newPflanze);
    speicherePflanzen(pflanzen);

    //Pflanzenliste aktualisieren
    pflanzenlisteAktualisieren(pflanzen);
    //Formular zurücksetzten 
    pflanzenname.value = "";
    gießintervall.value = "";
    standort.value = "Wohnzimmer";
}
function pflanzenlisteAktualisieren(pflanzen: Pflanze[]) {
    let pflanzenliste = document.getElementById("pflanzenliste") as HTMLUListElement;
    //Für jede Pflanze in der Liste eine Listeneintrag erstellen
    for (let i = 0; i < pflanzen.length; i++) {
        let pflanze = pflanzen[i];

        //Listeneintrag erstellen
        let eintrag = document.createElement("li");
        eintrag.innerHTML =
            "<b>" +
            pflanze.name +
            "</b>(" +
            pflanze.standort +
            ")- gießen alle" +
            pflanze.gießintervall +
            "Tage";

        //Listeneintrag zur Pflanzenliste hinzufügen
        pflanzenliste.appendChild(eintrag);
    }
}

function pflanzenBenachrichtigung() {
    const aktuellesDatum = new Date();
}

export { pflanzenHinzufuegen, pflanzenBenachrichtigung, pflanzenlisteAktualisieren };


