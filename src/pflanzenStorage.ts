// importiert das "Pflanze"-Interface aus der "./types"-Datei.
import { Pflanze } from "./types";

//Definiert eine Konstante namens "pflanzenKey", die den Schlüssel für den Local Storage-Objektspeicher enthält
const pflanzenKey = "pflanzen";

/*"speicherePflanzen" speichert eine Liste von Pflanzenobjekten im Local Storage, indem sie das
 "pflanzenKey"-Schlüssel-Wert-Paar mit der serialisierten JSON-Darstellung der Pflanzen aktualisiert.
  Die Funktion erwartet ein Argument, das eine Liste von Pflanzenobjekten des Typs "Pflanze" ist.*/
function speicherePflanzen(pflanzen: Pflanze[]) {
    localStorage.setItem(pflanzenKey, JSON.stringify(pflanzen));

}

/*adePflanzen" liest die Liste von Pflanzenobjekten aus dem Local Storage aus, 
indem sie das "pflanzenKey"-Schlüssel-Wert-Paar abruft und die JSON-Serialisierung des
 Wertes in eine Liste von Pflanzenobjekten des Typs "Pflanze" umwandelt. Wenn der Wert des 
 "pflanzenKey"-Schlüssels null oder leer ist, gibt die Funktion eine leere Liste zurück.*/
function ladePflanzen(): Pflanze[] {
    let pflanzen = localStorage.getItem(pflanzenKey);
    if (pflanzen === null || pflanzen === "") {
        return []
    }
    ;
    let gespeichertePflanzen = JSON.parse(pflanzen) as Pflanze[];
    return gespeichertePflanzen
}
/*exportiert die Funktionen "speicherePflanzen" und "ladePflanzen",
 so dass sie in anderen Dateien oder Modulen innerhalb der Anwendung verwendet werden können.*/
export {speicherePflanzen, ladePflanzen }


