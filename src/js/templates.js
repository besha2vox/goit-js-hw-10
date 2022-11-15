function createMarkupList(params) {
  return params
    .map(({ flags: { svg }, name: { official } }) => {
      return `<li class="country-item"><button><img width="40" src="${svg}">
        <p class="country-name">${official}</p></button></li>`;
    })
    .join('');
}

function createMarkup(params) {
  const [
    {
      flags: { svg },
      name: { official },
      capital,
      population,
      languages,
    },
  ] = params;

  const lang = Object.values(languages).join(', ');

  return `<div class="wrapper">
    <img height="24" src="${svg}" />
    <h2 class="country-name">${official}</h2>
  </div>
  <p class="descr"><span>Capital</span>: ${capital}</p>
  <p class="descr"><span>Population</span>: ${population}</p>
  <p class="descr"><span>Languages</span>: ${lang}</p>`;
}

export { createMarkupList, createMarkup };
