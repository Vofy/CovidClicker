# CovidClicker
Aplikace slouží k automatizovanému otravného odklikávání bezinfekčnosti

## Jak jednorázově spustit aplikaci?
```bash
dnf in libgbm
```
```bash
git clone https://github.com/Vofy/CovidClicker.git /opt/covidclicker && \
sudo chown -R $(logname):users /opt/covidclicker
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
0 7 * * 1-5 yarn /opt/covidclicker/index.js
```
