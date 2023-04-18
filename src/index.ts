import { pflanze, pflanzenname, standort, gießintervall,pflanzenliste } from 'domUtils';

//Funktion zum Hinzufügen einer neuen Pflanze
function pflanzeHinzufuegen() {

    //Pflanzenobjekt erstellen
    pflanze = {
        name: pflanzenname,
        gießintervall: gießintervall,
        standort: standort
    };

    //Pflanze zum Array hinzufügen
    pflanze.push(pflanze);

    //Pflanzenliste aktualisieren
    pflanzenlisteAktualisieren();

    //Formular zurücksetzen
    pflanzenname = "";
    gießintervall= "";
    standort = "Wohnzimmer";
}

//Funktion zum Aktualisieren der Pflanzenliste
function pflanzenlisteAktualisieren() {
    
         pflanzenliste = document.getElementById("pflanzenliste");

        //Pflanzenliste leeren
        pflanzenliste.innerHTML = "";
        let pflanzenliste = document.getElementById("pflanzenliste");
        //Für jede Pflanze in der Liste eine Listeneintrag erstellen
        for (let i = 0; i < pflanzen.length; i++) {
            let pflanze = pflanzen[i];

            //Listeneintrag erstellen
            let eintrag = document.createElement("li");
            eintrag.innerHTML = "<b>" + pflanze.name + "</b> (" + pflanze.standort + ") - gießen alle " + pflanze.gießintervall + " Tage";

            //Listeneintrag zur Pflanzenliste hinzufügen
            pflanzenliste.appendChild(eintrag);

        }
    }
}
