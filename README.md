# sj22a

Demo projekat za vežbu 2.

U app.js se nalazi osnova za express aplikaciju.
Instalirani su express i sequelize.
Napravljeni su modeli Student i Smer
Napravljene su migracije i seederi

Šta je sve pokrenuto u konzoli da bi se dobio ovakav paket:
    npm init
    npm install nodemon
    npm install express
    npm install sequelize mariadb
    npm install -g sequelize-cli
    sequelize init
    sequelize model:generate --name Student --attributes ime:string,prezime:string,zvanje:string,tema_rada:string,mentor:string,godina:integer
    sequelize model:generate --name Smer --attributes naziv:string
    sequelize seed:generate --name create-smerovi
    sequelize seed:generate --name create-studenti

Šta je potrebno uraditi da biste pokrenuli projekat:
    Ako projekat povlačite sa repozitorijuma uradite inicijalni 
        npm install
    Zatim proverite parametre u config/config.json i prilagodite po potrebi development config

    Da biste kreirali početno stanje u bazi uradite:
        sequelize db:create
        sequelize db:migrate
        sequelize db:seed:all

    Sada bi trebalo da možete da uradite node app i pokrenete aplikaciju koja vraća api info na home ruti
        localhost:8000/
