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
      >${data.population > 0 ? data.population : "Not Available"}
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
  }">View on chart</button>
  </div>`;
}
