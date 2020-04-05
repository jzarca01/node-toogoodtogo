# node-tgtg

An API wrapper for the anti-waste app [TooGoodToGo](https://toogoodtogo.com)

## Installation

```shell
yarn add node-tgtg
```

## Usage

```javascript
const Tgtg = require("node-tgtg");
const tgtg = new Tgtg({
  email: "",
  password: "",
});
```

## Methods

### Login

```javascript
await tgtg.login();
```

### Get profile

```javascript
await tgtg.getProfile();
```

### Discover nearby offers

```javascript
await tgtg.discoverNearby((tags = DEFAULT_TAGS), { latitude, longitude });
const DEFAULT_TAGS = [
  "Favorites",
  "LastToday",
  "Tomorrow",
  "NearBy",
  "CollectNow",
  "Meals",
  "BakedGoods",
  "Groceries",
  "Recommended",
  "Breakfast",
  "Lunch",
  "Dinner",
  "TooGoodToGoStore",
  "EverythingElse",
  "SoldOut",
  "NothingToSave",
  "Vegetarian",
  "Unlocked",
  "EssentialBags",
];
```

### Get store

```javascript
await tgtg.getStore(storeId, { latitude, longitude });
```
