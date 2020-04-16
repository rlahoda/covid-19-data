function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollButton() {
  const button = document.querySelector(".js-scroll-button");
  button.addEventListener("click", scrollToTop);
}

function hideScrollButton() {
  const button = document.querySelector(".js-scroll-button");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "flex";
  } else {
    button.style.display = "none";
  }
}

window.onscroll = function () {
  hideScrollButton();
};
scrollButton();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function dataCard(data) {
  const str = data.name.replace(/\s+/g, "-").toLowerCase();
  const firstCaseDate = moment(data.firstCase).format("MMMM D, YYYY");
  let firstDeathDate = "";
  if (data.firstDeath) {
    firstDeathDate = moment(data.firstDeath).format("MMMM D, YYYY");
  }
  return `
  <div class="data-card" id="${data.name}">
  <details class="data-card__contents" open>
    <summary class="data-card__header">
      <h1 class="data-card__data-title">${data.name}</h1>
    </summary>
    <div class="data-card__stats-container">
      <span class="data-card__stats">Total Cases:</span>
      <span class="data-card__stats data-card__stats--highlighted"
        >${numberWithCommas(data.cases)}</span
      >
    </div>
    <div class="data-card__stats-container">
      <span class="data-card__stats">Total Deaths:</span
      ><span class="data-card__stats data-card__stats--highlighted"
        >${data.deaths ? numberWithCommas(data.deaths) : "Not Available"}</span
      >
    </div>
    <div class="data-card__stats-container">
      <span class="data-card__stats">Mortality Rate:</span
      ><span class="data-card__stats data-card__stats--highlighted"
        >${data.mortality.toFixed(4)}%</span
      >
    </div>
    <div class="data-card__stats-container">
      <span class="data-card__stats">First Case:</span
      ><span class="data-card__stats data-card__stats--highlighted"
        >${firstCaseDate}
    </div>
    <div class="data-card__stats-container">
      <span class="data-card__stats">First Death:</span
      >${
        data.firstDeath
          ? `
          <span class="data-card__stats data-card__stats--highlighted">
          ${firstDeathDate}</span>
         `
          : `
          <span class="data-card__stats">
            (none reported)
          </span>
        `
      }
    </div>
    <div class="data-card__stats-container">
    <span class="data-card__stats">Population:</span
    ><span class="data-card__stats data-card__stats--highlighted"
      >${
        data.population > 0
          ? numberWithCommas(data.population)
          : "Not Available"
      }
  </div>
  <div class="data-card__stats-container">
  <span class="data-card__stats">% Pop Cases:</span
  ><span class="data-card__stats data-card__stats--highlighted"
    >${data.casesPop > 0 ? data.casesPop.toFixed(4) + "%" : "Not Available"}
</div>
<div class="data-card__stats-container">
<span class="data-card__stats">% Pop Deaths:</span
><span class="data-card__stats data-card__stats--highlighted"
  >${data.deathsPop > 0 ? data.deathsPop.toFixed(4) + "%" : "Not Available"}
</div>
  </details>
  <button class="data-card__select-button js-select-button" value="${
    data.name
  }">View on chart <span id="${str}-check" class="data-card__select-button--check data-card__select-button--check-hidden js-card-select-button-check"><?xml version="1.0" encoding="utf-8"?>
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve" height="1.5em" fill="currentColor">
  <polygon points="22,6.1 20,4.1 7.6,16 2.1,10.2 0,12.2 7.5,20.1 "/>
  </svg>
  </span></button>
  </div>`;
}

export function button(id, color) {
  const str = id.replace(/\s+/g, "-").toLowerCase();

  return `<button value="${id}" id="select-${str}"class="selected-item js-clear-button"style="border:solid 3px ${color};">
  ${id}
  <span class="selected-item__icon" >
  <?xml version="1.0" encoding="utf-8"?>
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 10 10"
    style="enable-background: new 0 0 10 10;"
    xml:space="preserve"
    height="1em"
  >
    <style type="text/css">
      .st0 {
        fill: currentColor;
      }
    </style>
    <path
      class="st0"
      d="M5,0C2.3,0,0.1,2.3,0.1,5c0,2.7,2.2,4.9,4.9,4.9S9.9,7.7,9.9,5C9.9,2.3,7.7,0,5,0z M8.2,7.4L7.4,8.2L4.9,5.8
L2.5,8.2L1.7,7.4L4.1,5L1.7,2.6l0.8-0.8l2.4,2.4l2.4-2.4l0.8,0.8L5.8,5L8.2,7.4z"
    />
  </svg></span>
</button>`;
}

export function dataGenerate(data, dataParam) {
  const processedDataArr = data.data.map(d => {
    let dataItem = d[dataParam];
    if (
      dataParam === "casesPop" ||
      dataParam === "deathsPop" ||
      dataParam === "mortality"
    ) {
      dataItem = d[dataParam].toFixed(4);
    }
    return {
      x: new Date(d.date),
      y: dataItem,
    };
  });
  return {
    label: data.name,
    data: processedDataArr,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
  };
}

export function filters(dataLimits, filters) {
  return `<div class="filter-container">
  <p>Population</p>
  <div class="filter-item" id="pop-min-filter">
    <label>Minimum:</label>
    <div class="filter-input">
      <input
      class="js-filter-input-input"
        type="range"
        id="popMin"
        name="popMin"
        min="${dataLimits.popMin}"
        max="${dataLimits.popMax}"
        value="${filters.popMin}"
        step="1000"
      />
      ${numberWithCommas(filters.popMin)}
    </div>
  </div>

  <div class="filter-item" id="pop-max-filter">
    <label>Maximum:</label>
    <div class="filter-input">
      <input
      class="js-filter-input-input"
        type="range"
        id="popMax"
        name="popMax"
        min="${dataLimits.popMin}"
        max="${dataLimits.popMax}"
        value="${filters.popMax}"
        step="1000"
      />
      ${numberWithCommas(filters.popMax)}
    </div>
  </div>
</div>
<div class="filter-container">
  <p>Cases</p>
  <div class="filter-item" id="cases-min-filter">
    <label>Minimum:</label>
    <div class="filter-input">
      <input
      class="js-filter-input-input"
        type="range"
        id="casesMin"
        name="casesMin"
        min="${dataLimits.casesMin}"
        max="${dataLimits.casesMax}"
        value="${filters.casesMin}"
        step="1000"
      />
      ${numberWithCommas(filters.casesMin)}
    </div>
  </div>

  <div class="filter-item" id="cases-max-filter">
    <label>Maximum:</label>
    <div class="filter-input">
      <input
      class="js-filter-input-input"
        type="range"
        id="casesMax"
        name="casesMax"
        min="${dataLimits.casesMin}"
        max="${dataLimits.casesMax}"
        value="${filters.casesMax}"
        step="1000"
      />
      ${numberWithCommas(filters.casesMax)}
    </div>
  </div>
</div>
<div class="filter-container">
  <p>Deaths</p>
  <div class="filter-item" id="deaths-min-filter">
    <label>Minimum:</label>
    <div class="filter-input">
      <input
      class="js-filter-input-input"
        type="range"
        id="deathsMin"
        name="deathsMin"
        min="${dataLimits.deathsMin}"
        max="${dataLimits.deathsMax}"
        value=${filters.deathsMin}"
        step="1000"
      />
      ${numberWithCommas(filters.deathsMin)}
    </div>
  </div>

  <div class="filter-item" id="deaths-max-filter">
    <label>Maximum:</label>
    <div class="filter-input">
      <input
      class="js-filter-input-input"
        type="range"
        id="deathsMax"
        name="deathsMax"
        min="${dataLimits.deathsMin}"
        max="${dataLimits.deathsMax}"
        value="${filters.deathsMax}"
        step="1000"
      />
     ${numberWithCommas(filters.deathsMax)}
    </div>
  </div>`;
}
