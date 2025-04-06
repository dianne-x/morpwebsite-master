# MORP Webes Alkalmazás

Ez a dokumentum a MORP webes alkalmazás telepítési és használati útmutatója.

## Szerkezet

Az alkalmazás a következő főbb részekből áll:

- **api:** PHP alapú websocket szerver.
- **client:** A webes felhasználói felület.
- **server:** Socket.IO szerver.
- **storage:** Az alkalmazásból feltöltött képek tárolására szolgáló mappa.
- **db scripts:** MySQL adatbázis létrehozásához szükséges szkriptek.

## Adatbázis (MySQL)

Az adatbázis inicializálásához futtasd a következő SQL fájlokat a megadott sorrendben:

1.  `db_scripts/ne hasznald meg/fasza.sql`
2.  `ideas/cascade` (a constraint-ek miatt külön importálni kell)

## Lokális Telepítés

A lokális telepítéshez kövesd az alábbi lépéseket:

1.  **Helyezd a `morpwebsite-master` mappát a XAMPP `htdocs` mappájába.**

2.  **`api` mappa:**
    ```bash
    cd morpwebsite-master/api
    c:/xampp/php/php.exe composer.phar install
    ```
    Másold át a `.env.example` fájlt `.env` néven, és konfiguráld a szükséges beállításokat.

3.  **`client` mappa:**
    ```bash
    cd /client
    npm i
    yarn install
    ```
    Másold át a `.env.example` fájlt `.env` néven, és konfiguráld a szükséges beállításokat.

4.  **`server` mappa:**
    ```bash
    cd /server
    npm i
    yarn install
    ```

## Futtatás

A fejlesztői környezet elindításához használd a `runDevelopment.bat` fájlt a főkönyvtárban. Ez elindítja a websocket szervert, a Socket.IO szervert, az SQL adatbázist stb.

## Lokális Portok

Az alkalmazás lokálisan a következő portokon érhető el:

-   **Client:** `http://localhost:3000`
-   **Socket.IO Server:** `http://localhost:3001`
-   **Websocket Server:** `ws://localhost:8080`

## Mire Figyelj a Felrakásnál (Élesítésnél)

-   **Client mappa lebuildelése:** Ha lehetséges, buildeld le a `client` mappát az optimális teljesítmény érdekében.
-   **.env fájlok konfigurálása:** Minden `.env` fájlban (`api`, `client`) írd át a példa adatokat a valós éles adatokra.
-   **`server/index.js` konfigurálása:**
    -   A 12. sorban állítsd be a megfelelő MySQL kapcsolatot.
    -   Ellenőrizd és szükség esetén módosítsd a szerver futtatási portját a fájl végén.
-   **Websocket port konfigurálása:** Ha a websocket szerver nem a `ws://localhost:8080` címen fog futni, akkor frissítsd a portot az `api/php/WebSocketServer.php` fájlban.
