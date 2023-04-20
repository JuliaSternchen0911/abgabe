document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-plant") as HTMLButtonElement;
    addButton.onclick = addPlant;
  
    setPlantList();
  });
  
  function addPlant() {
    const nameInput = document.getElementById("plant-name") as HTMLInputElement;
    const intervalInput = document.getElementById("water-interval") as HTMLInputElement;
    const locationInput = document.getElementById("plant-location") as HTMLSelectElement;
  
    const name = nameInput.value;
    const interval = Number(intervalInput.value);
    const location = locationInput.value;
  
    if (name.trim() === "" || isNaN(interval)) {
      return;
    }
  
    const plant: any = {
      name,
      interval,
      location,
      lastWatered: new Date(),
    };
  
    const plantList = getPlantList();
    plantList.push(plant);
    setPlantList(plantList);
  
    nameInput.value = "";
    intervalInput.value = "";
    locationInput.value = "";
  }
  
  function getPlantList():  any[] {
    const plantListString = localStorage.getItem("plantList");
    if (plantListString) {
      return JSON.parse(plantListString);
    } else {
      return [];
    }
  }
  
  function setPlantList(plantList: any[] = []) {
    localStorage.setItem("plantList", JSON.stringify(plantList));
  
    const plantListContainer = document.getElementById("plant-list") as HTMLUListElement;
    plantListContainer.innerHTML = "";
  
    for (const plant of plantList) {
      const plantListItem = document.createElement("li");
      plantListItem.textContent = `${plant.name} - ${plant.location}`;
  
      const lastWatered = new Date(plant.lastWatered);
      const nextWatering = new Date(lastWatered.getTime() + plant.interval * 24 * 60 * 60 * 1000);
      const daysUntilWatering = Math.round((nextWatering.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000));
  
      if (daysUntilWatering <= 0) {
        plantListItem.classList.add("water-now");
        plantListItem.setAttribute("title", "This plant needs water now");
      } else {
        plantListItem.setAttribute("title", `This plant needs water in ${daysUntilWatering} days`);
      }
  
      plantListContainer.appendChild(plantListItem);
    }
  }
  