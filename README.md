# Viinamayrakoira

<img src="https://github.com/Otju/viinamayrakoira/blob/master/frontend/public/doggoColor.svg?raw=true" height="200" alt="picture">

The website can be found at https://viinamayrakoira.otju.dev/

## Summary

Viinamayrakoira is a website for comparing alcoholic beverages from different Finnish stores.
Data from 12.2022

It includes (almost) all beverages from the following stores:

- Alko
- S-ryhmä
- K-kaupat

## Repository

Repository consists of

- Frontend made with React
- Backend made with Node.js that uses GraphQl and MongoDB
- Scraper made with Node.js

## Publishing backend to Google Cloud Run

```
docker build . -t viinamayrakoira-backend
docker tag viinamayrakoira-backend europe-west1-docker.pkg.dev/gold-order-310812/viinamayrakoira/backend
docker push europe-west1-docker.pkg.dev/gold-order-310812/viinamayrakoira/backend
```

The you need to select "Edit and Deploy new revision" -> Deploy from the Google Cloud Run console

## Credits

Made by me, [Otju](https://github.com/Otju)
