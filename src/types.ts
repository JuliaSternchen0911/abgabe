/*Definiert eine TypeScript-typ namens "Pflanze",
 das vier Eigenschaften hat: "name" als string, "gießintervall"
  als number, "standort" als string und "beginnDesIntervalls" als Date.*/
type Pflanze = {
    name: string;
    gießintervall: number;
    standort: string
    beginnDesIntervalls: Date;
}
 /*stellt sicher, dass das Interface in anderen Dateien oder Modulen
  innerhalb einer Anwendung verwendet werden kann, indem es als Modul exportiert wird.*/
export { Pflanze }