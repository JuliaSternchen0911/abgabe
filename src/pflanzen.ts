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

        const removeButton = eintrag.querySelector("[data-entry-remove='']") as HTMLButtonElement
        removeButton.onclick = () => {
            const pflanzeZuLoeschen = pflanze

            const positionDerPflanzeZuLoeschen = i

            pflanzen.splice(positionDerPflanzeZuLoeschen, 1)

            // aus dem local Storage löschen  

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

        eintrag.classList.remove('invisible')
        pflanzenliste.appendChild(eintrag);
        /*
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
                console.dir({
                    name: pflanze.name, dif, difTage, sollGießen,datum:beginnDesIntervalls,pflanze
                })
                //Listeneintrag zur Pflanzenliste hinzufügen
                pflanzenliste.appendChild(eintrag);
        */
    }
}



export { pflanzenHinzufuegen, pflanzenlisteAktualisieren };