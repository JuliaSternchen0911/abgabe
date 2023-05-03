import { ladePflanzen, speicherePflanzen } from "./pflanzenStorage";
import { Pflanze } from "./types";

//Funktion zum Hinzufügen einer neuen Pflanze
function pflanzenHinzufuegen(e: Event) {
    e.preventDefault();
    const pflanzen: Pflanze[] = ladePflanzen();


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
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    //Pflanzenobjekt erstellen
    const newPflanze: Pflanze = {
        name: pflanzenname.value,
        gießintervall: parseInt(gießintervall.value),
        standort: standort.value,
        beginnDesIntervalls: date
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
    const date = new Date();
    date.setHours(0, 0, 0, 0);


    //Für jede Pflanze in der Liste eine Listeneintrag erstellen
    for (let i = 0; i < pflanzen.length; i++) {
        let pflanze = pflanzen[i];
        let beginnDesIntervalls = new Date(pflanze.beginnDesIntervalls);
        console.dir(pflanze);
        //( SekundenSeid1.1.1970 + x ) - ( SekundenSeid1.1.1970 + y)
        let dif = (date.getTime() - beginnDesIntervalls.getTime());
        let difTage = Math.ceil(dif / (1000 * 60 * 60 * 24));
        //ganzzahliger rest %
        let sollGießen = difTage % pflanze.gießintervall == 0;
        //Listeneintrag erstellen
        let eintrag = document.createElement("li");
        eintrag.innerHTML =
            "<b>" +
            pflanze.name +
            "</b> (" +
            pflanze.standort +
            ")- gießen alle " +
            pflanze.gießintervall +
            //tenärer Operator
            " Tage " + ((sollGießen) ? " 🌧 " : "");

        //Listeneintrag zur Pflanzenliste hinzufügen
        pflanzenliste.appendChild(eintrag);
    }
}



export { pflanzenHinzufuegen, pflanzenlisteAktualisieren };


