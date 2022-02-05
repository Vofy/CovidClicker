# CovidClicker
Aplikace slouží k automatizovanému otravného odklikávání bezinfekčnosti

## Jak jednorázově spustit aplikaci?
```bash
sudo dnf in libgbm node npm
```
```bash
sudo git clone https://github.com/Vofy/CovidClicker.git /opt/covidclicker && \
sudo chown -R $(logname):users /opt/covidclicker && \
cd /opt/covidclicker && \
mv .env.example .env && \
nano .env && \
npm install && \
npm run start
```

## Nastavení cron úlohy
```bash
crontab -e
```
```cron
0 7 * * 1-5 yarn /opt/covidclicker/index.js >> /opt/covidclicker/events.log 2>&1
```
