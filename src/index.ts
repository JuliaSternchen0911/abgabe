import { pflanzenHinzufuegen, pflanzenBenachrichtigung, pflanzenlisteAktualisieren } from "./pflanzen";

if (window.location.pathname === "/meinePflanzen.html") {
    //lade die Liste der Pflanzen Initial
    pflanzenlisteAktualisieren([]);

    //Registriere die Methode bei den Buttons
    const but = document.getElementById("pflanzeHinzufuegen") as HTMLInputElement;
    but.onclick = pflanzenHinzufuegen;
} else if (window.location.pathname ==="erinnerung.html"){
    pflanzenBenachrichtigung();
}




