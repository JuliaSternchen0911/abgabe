import { Pflanze } from "./types";

const pflanzenKey = "pflanzen";

function speicherePflanzen(pflanzen: Pflanze[]) {
    localStorage.setItem(pflanzenKey, JSON.stringify(pflanzen));

}

function ladePflanzen(): Pflanze[] {
    let pflanzen = localStorage.getItem(pflanzenKey);
    if (pflanzen === null || pflanzen === "") {
        return []
    }
    ;
    let gespeichertePflanzen = JSON.parse(pflanzen) as Pflanze[];
    return gespeichertePflanzen
}
export {speicherePflanzen, ladePflanzen }


