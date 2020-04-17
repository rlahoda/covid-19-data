import { countries } from "./data.js";
import {
  dataCard,
  button,
  dataGenerate,
  filters,
  colorGenerate,
} from "./shared.js";
import sort from "./sort.js";

const initialData = Object.values(countries.countries);
let dataParam = ["cases"];
let multiData = false;
let dataItems = Object.keys(countries.countries);
let sortParam = "name";
let sortOrder = "az";
let dataFilters = {
  popMin: 0,
  popMax: 10000000000,
  casesMin: 0,
  casesMax: 100000000,
  deathsMin: 0,
  deathsMax: 100000000,
};
let dataLimits = {
  popMin: 0,
  popMax: 10000000000,
  casesMin: 0,
  casesMax: 100000000,
  deathsMin: 0,
  deathsMax: 100000000,
};

function setInitialLimits() {
  let popMax = 0;
  let casesMax = 0;
  let deathsMax = 0;

  initialData.map(c => {
    if (c.population > popMax) {
      popMax = c.population;
    }
    if (c.cases > casesMax) {
      casesMax = c.cases;
    }
    if (c.deaths > deathsMax) {
      deathsMax = c.deaths;
    }
  });

  dataFilters = {
    popMin: 0,
    popMax: popMax,
    casesMin: 0,
    casesMax: casesMax,
    deathsMin: 0,
    deathsMax: deathsMax,
  };
  dataLimits = {
    popMin: 0,
    popMax: popMax,
    casesMin: 0,
    casesMax: casesMax,
    deathsMin: 0,
    deathsMax: deathsMax,
  };
}

Chart.scaleService.updateScaleDefaults("linear", {
  ticks: {
    min: 0,
  },
});
const ctx = document.getElementById("dataChart").getContext("2d");
const chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: { datasets: [] },

  options: {
    legend: {
      display: false,
    },
    aspectRatio: 2,
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            tooltipFormat: "MMMM D, YYYY",
            unit: "day",
            displayFormats: { day: "MM/D" },
          },
        },
      ],
    },
  },
});

function selectionGenerate() {
  const clearButtons = document.querySelectorAll(".js-clear-button");

  for (const button of clearButtons) {
    button.addEventListener("click", dataClear);
  }
}

function checkGenerate() {
  const addButtons = document.querySelectorAll(".js-card-select-button-check");
  for (const button of addButtons) {
    button.classList.add("data-card__select-button--check-hidden");
  }
  dataItems.map(i => {
    const str = i.replace(/\s+/g, "-").toLowerCase();
    const card = document.querySelector(`#${str}-check`);
    card.classList.remove("data-card__select-button--check-hidden");
  });
}

function chartGenerate() {
  const sortedData = dataItems.sort();
  const buttonsArr = [];
  const chartData = [];
  sortedData.map(state => {
    const borderColor = colorGenerate();
    buttonsArr.push(button(state, borderColor));
    dataParam.map(param => {
      const stats = countries.countries[state];
      const stateData = dataGenerate(stats, param, borderColor);
      chartData.push(stateData);
    });
  });

  chart.data.datasets = chartData;
  const selectedContainer = document.querySelector("#chartSelected");
  selectedContainer.innerHTML = buttonsArr.join("");
  chart.update();
  selectionGenerate();
  checkGenerate();
}

function dataSelectButtons() {
  const selectButtons = document.querySelectorAll(".js-data-select-button");

  for (const button of selectButtons) {
    button.addEventListener("click", dataTypeSet);
    if (multiData) {
      if (button.classList.contains("data-item__icon--hidden")) {
        button.classList.remove("data-item__icon--hidden");
      }
      if (!button.classList.contains("data-item__icon--rotated")) {
        button.classList.add("data-item__icon--rotated");
      }
    } else {
      if (!button.classList.contains("data-item__icon--hidden")) {
        button.classList.add("data-item__icon--hidden");
      }
      if (button.classList.contains("data-item__icon--rotated")) {
        button.classList.remove("data-item__icon--rotated");
      }
    }
  }
}

function multiDataButton() {
  const button = document.querySelector("#select-multi-data");
  button.addEventListener("click", multiDataSwap);
  if (multiData) {
    button.classList.add("selected-item--selected");
  } else {
    button.classList.remove("selected-item--selected");
  }
}

function multiDataSwap() {
  multiData = !multiData;
  dataSelectButtons();
  const button = document.querySelector("#select-multi-data");
  if (multiData) {
    button.classList.add("selected-item--selected");
    button.classList.remove(" data-item__icon--rotated");
  } else {
    button.classList.remove("selected-item--selected");
    button.classList.add(" data-item__icon--rotated");
  }
}

function dataCards() {
  const statesArr = Object.values(countries.countries);
  const sortedStates = sort(statesArr, sortParam, sortOrder);
  let filteredPopMin = sortedStates.filter(
    i => i.population >= dataFilters.popMin
  );
  let filteredPopMax = filteredPopMin.filter(
    i => i.population <= dataFilters.popMax
  );
  let filteredCasesMin = filteredPopMax.filter(
    i => i.cases >= dataFilters.casesMin
  );
  let filteredCasesMax = filteredCasesMin.filter(
    i => i.cases <= dataFilters.casesMax
  );
  let filteredDeathsMin = filteredCasesMax.filter(
    i => i.deaths >= dataFilters.deathsMin
  );
  let filteredDeathsMax = filteredDeathsMin.filter(
    i => i.deaths <= dataFilters.deathsMax
  );
  let statesDisplay = "";
  filteredDeathsMax.map(state => {
    statesDisplay += dataCard(state);
  });
  const cardsContainer = document.querySelector("#cards-container");
  cardsContainer.innerHTML = statesDisplay;
  const cardsButtons = document.querySelectorAll(".js-select-button");

  for (const button of cardsButtons) {
    button.addEventListener("click", dataAdd);
    checkGenerate();
  }
}

function sortSelectButtons() {
  const selectButtons = document.querySelectorAll(".js-sort-button");

  for (const button of selectButtons) {
    button.addEventListener("click", sortTypeSet);
  }
}

function sortTypeSet(event) {
  const id = event.target.value;
  if (sortParam !== id) {
    sortParam = id;
    const activeButton = document.querySelectorAll(".js-sort-button");
    for (const button of activeButton) {
      button.classList.remove("selected-item--selected");
    }

    const selectedButton = document.querySelector(`#${event.target.id}`);
    selectedButton.classList.add("selected-item--selected");
  } else {
    const sortContainer = document.querySelector(".card-sort");
    if (sortOrder === "az") {
      sortOrder = "za";
      sortContainer.classList.add("sort-order--reversed");
    } else {
      sortOrder = "az";
      sortContainer.classList.remove("sort-order--reversed");
    }
  }
  dataCards();
}

function dataAdd(event) {
  const id = event.target.value;
  if (id === "all") {
    const itemList = Object.keys(countries.countries);
    dataItems = itemList.sort();
    chartGenerate();
  } else if (!dataItems.includes(id)) {
    const stats = countries.countries[id];
    const dataSets = [...chart.data.datasets];
    dataParam.map(param => {
      const borderColor = colorGenerate();
      const stateData = dataGenerate(stats, param, borderColor);
      dataSets.push(stateData);
    });
    chart.data.datasets = sort(dataSets, "label", "az");
    chart.update();
    const sortedItems = [...dataItems, id];
    dataItems = sortedItems.sort();
    chartGenerate();
    // const card = document.querySelector(`#${id}`);
    // card.classList.add("data-card--selected");
  }
}
function dataTypeSet(event) {
  const id = event.target.value;
  if (!dataParam.includes(id)) {
    if (multiData) {
      dataParam.push(id);
    } else {
      dataParam = [id];
    }
    chartGenerate();
  } else {
    if (multiData) {
      const updatedData = dataParam.filter(i => i !== id);
      dataParam = [...updatedData];
    } else {
      dataParam = [id];
    }
    chartGenerate();
  }
  const activeButton = document.querySelectorAll(".js-data-select-button");
  for (const button of activeButton) {
    if (dataParam.includes(button.value)) {
      if (!button.classList.contains("selected-item--selected")) {
        button.classList.add("selected-item--selected");
      }
      if (multiData) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    } else {
      if (button.classList.contains("selected-item--selected")) {
        button.classList.remove("selected-item--selected");
      }
      button.disabled = false;
    }
  }
}

function dataClear(event) {
  const id = event.target.value;
  if (dataItems.includes(id)) {
    const newArr = chart.data.datasets.filter(i => i.id !== id);
    const sortedArr = newArr.sort();
    chart.data.datasets = sortedArr;
    const filteredItems = dataItems.filter(i => i !== id);
    const sortedItems = filteredItems.sort();
    dataItems = sortedItems;
    chart.update();
    const str = id.replace(/\s+/g, "-").toLowerCase();
    const button = document.querySelector(`#select-${str}`);
    button.remove();
    checkGenerate();
  } else if (id === "clear") {
    chart.data.datasets = [];
    chart.update();
    dataItems = [];
    chartGenerate();
  }
}

function setCollapse() {
  const width = window.innerWidth;
  const details = document.querySelectorAll(".data-card__contents");
  if (width <= 600) {
    for (const item of details) {
      item.open = false;
    }
  } else if (width > 600) {
    for (const item of details) {
      item.open = true;
    }
  }
}

function createFilters() {
  const filterContainer = document.querySelector("#card-filters-container");
  filterContainer.innerHTML = filters(dataLimits, dataFilters);
  const filterInputs = document.querySelectorAll(".js-filter-input-input");
  for (const item of filterInputs) {
    item.addEventListener("click", setFilters);
  }
}

function setFilters(event) {
  const id = event.target.id;
  const value = event.target.value;
  dataFilters = { ...dataFilters, [id]: value };
  createFilters();
  dataCards();
}

window.onloadend = setCollapse;
window.onresize = setCollapse;

dataCards();
chartGenerate();
dataSelectButtons();
sortSelectButtons();
setInitialLimits();
// createFilters();
multiDataButton();
