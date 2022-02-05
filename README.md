# CovidClicker
Aplikace slouží k automatizovanému otravného odklikávání bezinfekčnosti

## Jak jednorázově spustit aplikaci?
```bash
dnf in libgbm
```

```bash
yarn install
yarn run start
```
nebo
```bash
npm install
npm run start
```

## Nastavení cron úlohy
```bash
crontab -e
```

```cron
0 7 * * 1-5 yarn /<cesta>/index.js
```
