//// Importiert die Funktionen "ladePflanzen" und "speicherePflanzen" aus dem Modul "./pflanzenStorage".
import { ladePflanzen, speicherePflanzen } from "./pflanzenStorage";

// Importiert den Typ "Pflanze" aus dem Modul "./types"
import { Pflanze } from "./types";

// Funktion zum Hinzufügen einer neuen Pflanze
// Definiert die Funktion "pflanzenHinzufuegen", die als Event-Handler verwendet wird.
function pflanzenHinzufuegen(e: Event) {

    // Verhindert das Standardverhalten des Events, d.h. das Neuzeichnen der Seite nach dem Absenden des Formulars.
    e.preventDefault();

    // Ruft die Funktion "ladePflanzen" auf und speichert das zurückgegebene Array von Pflanzen in der Variablen "pflanzen".
    const pflanzen: Pflanze[] = ladePflanzen();

    /* Ruft das HTML-Element mit der ID "pflanzenname" ab und speichert es in der Variablen "pflanzenname". 
    Der Typ des Elements wird als HTMLInputElement definiert.*/
    const pflanzenname = document.querySelector("#pflanzenname") as HTMLInputElement;

    /* Ruft das HTML-Element mit der ID "gießintervall" ab und speichert es in der Variablen "gießintervall".
     Der Typ des Elements wird als HTMLInputElement definiert.*/
    const gießintervall = document.querySelector("#gießintervall") as HTMLInputElement;

    /* Ruft das HTML-Element mit der ID "standort" ab und speichert es in der Variablen 
    "standort". Der Typ des Elements wird als HTMLInputElement definiert.*/
    const standort = document.querySelector("#standort") as HTMLInputElement;


    // Gibt den Wert des Elements "gießintervall" in der Browser-Konsole aus.
    console.log(gießintervall.value);
    // Überprüft, ob das Element "gießintervall" keinen Wert hat.
    if (gießintervall.value === "") {
        // Zeigt eine Warnmeldung an.
        alert("Pflichtfeld")
        // Beendet die Funktion.
        return
    }
    // Überprüft, ob das Element "pflanzenname" keinen Wert hat.
    if (pflanzenname.value === "") {
        // Beendet die Funktion.
        return
    }
    // Überprüft, ob das Element "standort" keinen Wert hat.
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
    pflanzenliste.innerHTML = "";
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const copySource = document.getElementById('copySource') as HTMLLIElement

    //Für jede Pflanze in der Liste eine Listeneintrag erstellen
    for (let i = 0; i < pflanzen.length; i++) {
        let pflanze = pflanzen[i];
        let beginnDesIntervalls = new Date(pflanze.beginnDesIntervalls);
        beginnDesIntervalls.setHours(0, 0, 0, 0);
        console.dir(pflanze);
        //( SekundenSeid1.1.1970 + x ) - ( SekundenSeid1.1.1970 + y)
        let dif = (date.getTime() - beginnDesIntervalls.getTime());
        let difTage = Math.ceil(dif / (1000 * 60 * 60 * 24));
        //ganzzahliger rest %
        let sollGießen = difTage % pflanze.gießintervall == 0;
        //Listeneintrag erstellen

        let eintrag = document.createElement("li");
        eintrag.innerHTML = copySource.innerHTML

        copySource.classList.forEach(entry => {
            eintrag.classList.add(entry)
        })
        eintrag.classList.remove('invisible')

        const removeButton = eintrag.querySelector("[data-entry-remove='']") as HTMLButtonElement
        removeButton.onclick = () => {

            const positionDerPflanzeZuLoeschen = i

            pflanzen.splice(positionDerPflanzeZuLoeschen, 1)

            // aus dem local Storage löschen  mit functions aufruf (neu speicherung im local storage)
            speicherePflanzen(pflanzen);
            pflanzenlisteAktualisieren(pflanzen)
        }




        const nameEntry = eintrag.querySelector("[data-entry-name='']") as HTMLParagraphElement
        nameEntry.innerText = pflanze.name

        const intervallEntry = eintrag.querySelector("[data-entry-intervall='']") as HTMLParagraphElement
        intervallEntry.innerText = pflanze.gießintervall + ""

        const standortEntry = eintrag.querySelector("[data-entry-standort='']") as HTMLParagraphElement
        standortEntry.innerText = pflanze.standort

        const erstellungsDatumEntry = eintrag.querySelector("[data-entry-datum='']") as HTMLTimeElement
        erstellungsDatumEntry.innerText = beginnDesIntervalls.toDateString()


        pflanzenliste.appendChild(eintrag);
    }
}



export { pflanzenHinzufuegen, pflanzenlisteAktualisieren };