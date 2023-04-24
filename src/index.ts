import { pflanzenHinzufuegen, pflanzenBenachrichtigung, pflanzenlisteAktualisieren } from "./pflanzen";
import { ladePflanzen } from "./pflanzenStorage";

if (window.location.pathname === "/meinePflanzen.html") {
    //lade die Liste der Pflanzen Initial
    let pflanzen= ladePflanzen();
    pflanzenlisteAktualisieren(pflanzen);
  
    //Registriere die Methode bei den Buttons
    const but = document.getElementById("pflanzeHinzufuegen") as HTMLInputElement;
    but.onclick = pflanzenHinzufuegen;
} else if (window.location.pathname ==="erinnerungen.html"){
    pflanzenBenachrichtigung();
}




