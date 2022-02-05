# CovidClicker
Aplikace slouží k automatizaci otravného odklikávání bezinfekčnosti

<a href="https://codeclimate.com/github/Vofy/CovidClicker/maintainability"><img src="https://api.codeclimate.com/v1/badges/07439c7ca052ee921104/maintainability" /></a>

## Jak jednorázově spustit aplikaci?
```bash
sudo dnf install libgbm nodejs npm git
```
```bash
sudo git clone https://github.com/Vofy/CovidClicker.git /opt/covidclicker && \
sudo chown -R $(logname):users /opt/covidclicker && \
cd /opt/covidclicker && \
mv .env.default .env && \
nano .env && \
npm install && \
npm run start
```

## Nastavení cron úlohy
```bash
crontab -e
```
```cron
0 7 * * 1-5 node /opt/covidclicker/index.js >> /opt/covidclicker/events.log 2>&1
```

## Tuto aplikaci jsem naprogramoval za méně jak jednu noc
Takže určitě má nějaké mouchy, v případě, že je opravíte, neváhejte vytvořit pull request nebo mě kontaktovat na: [Tomas.Batelka@vut.cz](mailto:Tomas.Batelka@vut.cz)
