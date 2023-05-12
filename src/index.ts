/*importiert die Funktionen "pflanzenHinzufuegen" und "pflanzenlisteAktualisieren"
 aus der "./pflanzen"-Datei und die Funktion "ladePflanzen" aus der "./pflanzenStorage"-Datei.*/
import { pflanzenHinzufuegen, pflanzenlisteAktualisieren } from "./pflanzen";
import { ladePflanzen } from "./pflanzenStorage";;

//prüft, ob die aktuelle URL-Adresse "pflanzen.html" lautet (überpürft Pfad)
if (window.location.pathname === "/pflanzen.html") {
    /*lädt die Liste der Pflanzen aus dem Local Storage, indem sie die "ladePflanzen"
    -Funktion aufruft, und aktualisiert die Pflanzenliste auf der Seite durch den Aufruf
     der "pflanzenlisteAktualisieren"-Funktion mit der geladenen Liste als Argument.*/
    let pflanzen= ladePflanzen();
    pflanzenlisteAktualisieren(pflanzen);
  
    /* registriert die "pflanzenHinzufuegen"-Funktion als Event-Handler für den Klick 
    auf den "pflanzeHinzufuegen"-Button, der durch den Aufruf von "document.getElementById"
     abgerufen wird und in der Konstanten "but" gespeichert wird.*/
    //Registriere die Methode bei den Buttons
    const but = document.getElementById("pflanzeHinzufuegen") as HTMLInputElement;
    but.onclick = pflanzenHinzufuegen;
} 





