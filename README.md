# Weather App

School project done in BCH during Web Dev Studies in Autumn 2022.

## Tech used

- React
- Redux

## Stating the project

```cli
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
