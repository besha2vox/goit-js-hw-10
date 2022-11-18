import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import { createMarkupList, createMarkup } from './js/templates.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const value = e.target.value.trim();
  if (value.length < 1) reset();
  if (!value) return;
  handlerFetchCountries(value);
}

function reset() {
  refs.list.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function handlerFetchCountries(value) {
  fetchCountries(value).then(response).catch(error);
}

function response(params) {
  if (params.length > 10) overTenCountries(params);
  if (params.length <= 10 && params.length > 1) lessTenCountries(params);
  if (params.length === 1) oneCoutnry(params);
}

function overTenCountries(params) {
  Notify.info('Too many matches found. Please enter a more specific name.');
  reset();
}

function lessTenCountries(params) {
  refs.list.innerHTML = createMarkupList(params);
  refs.list.addEventListener('click', onItemClick);
}

function oneCoutnry(params) {
  refs.list.innerHTML = createMarkup(params);
}

function error() {
  Notify.failure('Oops, there is no country with that name');
  reset();
}

function onItemClick(e) {
  const listItemRef = e.target.closest('button');
  const isIncludes = listItemRef.tagName === 'BUTTON';

  if (!isIncludes) return;

  refs.input.value = listItemRef.lastChild.textContent;
  handlerFetchCountries(refs.input.value);
  refs.list.removeEventListener('click', onItemClick);
}
