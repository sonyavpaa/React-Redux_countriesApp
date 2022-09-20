# Countires App

School project done in BCH during Web Dev Studies in Autumn 2022. An app that lists countries and fetches some data about weather and from Wikipedia.

## Tech used

- React
- Redux

## Stating the project

```cli
npm install
npm start
```

## Localstorage + Redux

Redux looks up if there is allready some data stored about favourite countries to localstorage in favvouriteSlice.js:

```js
const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: localStorage.favourites
      ? JSON.parse(localStorage.favourites).favourites
      : [],
  },
});
```

When adding or deleting favourite countries from the list, the list will be updated and added to localstorage store/index.js:

```js
let currentValue = store.getState().favourites;

store.subscribe(() => {
  let previousValue = currentValue;
  currentValue = store.getState().favourites;

  if (previousValue !== currentValue) {
    localStorage.setItem("favourites", JSON.stringify(currentValue));
  }
});
```

## API's used

- REST countries: https://restcountries.com/
- OpenWeather: https://openweathermap.org/api
- MediaWiki: https://www.mediawiki.org/wiki/API:Main_page
- NEWSDATA.IO: https://newsdata.io/ NB! By default the app uses dummy data from src/components/sampleApi.js; to use newsdata.io, you need an api key that you will get after registration at thhe newsdata.io website. Newsdata.io provides a number of free api calls. After recieving the api key, create .env file in the project root:

```
REACT_APP_API_KEY=YOU_NEW_API_KEY
```

The key will be called in getNews() in src/components/CountrySingle.js. Uncomment the axios call when wanting to use it.

## LICENCE

MIT licence
