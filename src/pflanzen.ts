//// Importiert die Funktionen "ladePflanzen" und "speicherePflanzen" aus dem Modul "./pflanzenStorage".
import moment from "moment";
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
    //erstellt eine neue Instanz der JavaScript Date-Klasse und speichert sie in der Konstante date 
    //(enthält den aktuellen Zeitpunkt als Datum und Uhrzeit)
    const date = new Date();

    //setzt die Stunden-, Minuten-, Sekunden- und Millisekunden-Werte auf 0
    date.setHours(0, 0, 0, 0);

    //Pflanzenobjekt erstellen

    //Objekt mit dem Namen newPflanze erstellt und dem yp Pflanze zugewiesen
    //name,gießintervall,standort wird aus dem Wert des HTML-Formularfelds pflanzenname geholt
    const newPflanze: Pflanze = {
        name: pflanzenname.value,
        gießintervall: parseInt(gießintervall.value),
        standort: standort.value,
        beginnDesIntervalls: date
    };

    //newPflanze-Objekt mit console.dir(newPflanze) ausgegeben, um es in der JavaScript-Konsole anzuzeigen zur kontrolle für mich
    console.dir(newPflanze);

    //Pflanzen zum Array hinzufügen
    //fügt die neu erstellte Pflanze zur Array-Liste von pflanzen hinzu.
    pflanzen.push(newPflanze);
    /* ruft eine Funktion speicherePflanzen auf,
     um die Pflanzenliste in dem lokalen Speicher des Browsers zu speichern,
     damit sie beim Schließen und Öffnen der Anwendung erhalten bleibt.*/
    speicherePflanzen(pflanzen);

    //Pflanzenliste aktualisieren
    pflanzenlisteAktualisieren(pflanzen);
    //Formular zurücksetzten 
    pflanzenname.value = "";
    gießintervall.value = "";
    standort.value = "Wohnzimmer";
}


function pflanzenlisteAktualisieren(pflanzen: Pflanze[]) {
    //ul-Element mit der ID "pflanzenliste" in der HTML-Datei ausgewählen und in der Variablen pflanzenliste gespeichert
    let pflanzenliste = document.getElementById("pflanzenliste") as HTMLUListElement;
    //Liste wird geleert
    pflanzenliste.innerHTML = "";
    //Date-Instanz wird erstellt und die Stunden, Minuten, Sekunden und Millisekunden werden auf 0 gesetzt.
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    //li-Element mit der ID "copySource" wird ausgewählt und in der Variablen copySource gespeichert
    const copySource = document.getElementById('copySource') as HTMLLIElement

    //Für jede Pflanze in der Liste eine Listeneintrag erstellen
    for (let i = 0; i < pflanzen.length; i++) {
        //Die aktuelle Pflanze in der Schleife wird in der Variablen pflanze gespeichert.
        let pflanze = pflanzen[i];
        /*Die beginnDesIntervalls-Eigenschaft der Pflanze wird in ein Date-Objekt umgewandelt,
         und die Stunden, Minuten, Sekunden und Millisekunden werden auf 0 gesetzt, um nur das Datum zu behalten*/
        let beginnDesIntervalls = new Date(pflanze.beginnDesIntervalls);
        beginnDesIntervalls.setHours(0, 0, 0, 0);
        console.dir(pflanze);
        //Die Differenz zwischen dem aktuellen Datum und dem Datum
        //( SekundenSeid1.1.1970 + x ) - ( SekundenSeid1.1.1970 + y)
        let dif = (date.getTime() - beginnDesIntervalls.getTime());
        let difTage = Math.ceil(dif / (1000 * 60 * 60 * 24));

        /* erstellen einen neuen Listeneintrag und setzen dessen Inhalt auf den Inhalt eines vorgefertigten 
        HTML-Elements namens "copySource", das als Vorlage dient*/
        let eintrag = document.createElement("li");
        eintrag.innerHTML = copySource.innerHTML
        /* erstellen eine Kopie eines vorgefertigten Listeneintrags (copySource)
         und fügen die gleichen CSS-Klassen zum neu erstellten Listeneintrag (eintrag) hinzu
        Listeneintrag wird als sichtbar markiert, indem die CSS-Klasse "invisible" entfernt wird*/
        copySource.classList.forEach(entry => {
            eintrag.classList.add(entry)
        })
        eintrag.classList.remove('invisible')
        /* wenn "Löschen"-Button geklickt.Wird eine Funktion aufgerufen, die zuerst die aktuelle 
        Position des Listenelements in der Pflanzenliste ermittelt und anschließend das Listenelement 
        mit der splice-Methode aus der Pflanzenliste entfernt. Dann wird die aktualisierte Pflanzenliste 
        im lokalen Speicher gespeichert und die Pflanzenliste auf der Webseite aktualisiert, um das gelöschte 
        Listenelement zu entfernen*/
        const removeButton = eintrag.querySelector("[data-entry-remove='']") as HTMLButtonElement
        removeButton.onclick = () => {
            let aktuellePosition = i

            pflanzen.splice(aktuellePosition, 1)
            // aus dem local Storage löschen  mit functions aufruf (neu speicherung im local storage)
            speicherePflanzen(pflanzen);
            pflanzenlisteAktualisieren(pflanzen)
        }

        /* Event Listener hinzugefügt wenn Button geklickt wird
        Nach Klick auf den Button wird die Variable beginnDesIntervalls der entsprechenden Pflanze
        auf das aktuelle Datum gesetzt. Anschließend wird der aktualisierte Pflanzen-Array im
        lokalen Speicher gespeichert und die Pflanzenliste wird aktualisiert*/
        const wasserButton = eintrag.querySelector("[data-entry-wasser='']") as HTMLButtonElement
        wasserButton.onclick = () => {
            pflanze.beginnDesIntervalls = new Date()


            // aus dem local Storage löschen  mit functions aufruf (neu speicherung im local storage)
            speicherePflanzen(pflanzen);
            pflanzenlisteAktualisieren(pflanzen)
        }
        /*neues Datum wird erstellt, das der Zeitpunkt ist, zu dem die Pflanze wieder gegossen werden muss. 
        Das Datum wird mit der JavaScript-Bibliothek "moment.js" erstellt, indem das aktuelle Datum 
        (beginnDesIntervalls) genommen und die Anzahl der Tage (pflanze.gießintervall) hinzugefügt wird.*/
        let endDatum = moment(beginnDesIntervalls).add(pflanze.gießintervall, 'days')

        // HTML-Element wird ausgewählt in dem das Datum angezeigt wird
        const endDatumEntry = eintrag.querySelector("[data-entry-next-datum='']") as HTMLTimeElement
        //der Textinhalt des ausgewählten HTML-Elements auf das formatierte Datum gesetzt
        endDatumEntry.innerText = endDatum.format("LL")
        /* wird überprüft, ob das Datum in der Vergangenheit liegt. Wenn ja, wird die Schriftfarbe des Datums 
        auf Rot geändert, um anzuzeigen, dass die Pflanze bereits gegossen werden hätte sollte*/
        if (endDatum.isBefore(new Date())) {
            endDatumEntry.style.color = "red"
        }
        // HTML-Element wird ausgewählt in dem der Fortschritt der Bewässerung der Pflanze angezeigt wird
        const progressEntry = eintrag.querySelector("[data-entry-progress='']") as HTMLDivElement
        /*berechnet, wie viel Prozent der Zeit seit der letzten Bewässerung vergangen sind. 
        Dazu wird die Anzahl der vergangenen Tage (difTage) durch die Anzahl der Tage zwischen
         den Bewässerungen (pflanze.gießintervall) dividiert und mit 100 multipliziert*/
        let prozent = (difTage / pflanze.gießintervall) * 100

        /* wird überprüft, ob der Fortschritt weniger als 100% beträgt.
         Wenn ja, wird die Breite des Fortschrittselements auf den berechneten Prozentwert gesetzt*/
        if (prozent <= 100) {
            progressEntry.style.width = prozent + "%"
        }

        /*Wenn der Fortschritt 100% oder mehr beträgt, wird die Breite auf 100% und die Hintergrundfarbe 
        auf Rot gesetzt, um anzuzeigen, dass die Pflanze überfällig ist und gegossen werden sollte.*/
        else {
            progressEntry.style.width = "100%"
            progressEntry.style.backgroundColor = "red"
        }

        /*HTML-Element mit der CSS-Klasse 'data-entry-name' aus dem Eintrag-Element extrahiert 
        und in der Konstante 'nameEntry' als HTML-Paragraph-Element gespeichert.*/
        const nameEntry = eintrag.querySelector("[data-entry-name='']") as HTMLParagraphElement
        //Name der aktuellen Pflanze als Textinhalt in das 'nameEntry'-Element geschrieben
        nameEntry.innerText = pflanze.name
        //das selbe wird nun auch für das für das Gießintervall und den Standort der Pflanze durchgeführt.
        const intervallEntry = eintrag.querySelector("[data-entry-intervall='']") as HTMLParagraphElement
        intervallEntry.innerText = pflanze.gießintervall + ""

        const standortEntry = eintrag.querySelector("[data-entry-standort='']") as HTMLParagraphElement
        standortEntry.innerText = pflanze.standort
        //Es wird das Erstellungsdatum der Pflanze als Textinhalt in das 'erstellungsDatumEntry'-Element geschrieben
        const erstellungsDatumEntry = eintrag.querySelector("[data-entry-datum='']") as HTMLTimeElement
        erstellungsDatumEntry.innerText = beginnDesIntervalls.toDateString()

        //aktualisierter Eintrag in der Pflanzenliste angehängt
        pflanzenliste.appendChild(eintrag);
    }
}


//Funktionen pflanzenHinzufuegen und pflanzenlisteAktualisieren werden exportiert
export { pflanzenHinzufuegen, pflanzenlisteAktualisieren };