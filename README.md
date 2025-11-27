# Web Technológiák Beadandó - Pizzéria weboldala

Ez a repository a Miskolci Egyetem "Web technológiák 1." tárgyának féléves beadandó feladatát tartalmazza. A projekt egy fiktív pizzéria modern, reszponzív weboldalát valósítja meg kliensoldali technológiákkal.

---

## Készítette

* **Név:** Dudás Dániel
* **Neptun kód:** ADVLIC
* **Szak:** Programtervező Informatikus
* **Dátum:** 2025.11.26

---

## A Feladat Leírása

A feladat célja egy összetett weboldal elkészítése volt, amely bemutatja a modern webfejlesztési technológiák (HTML5, CSS3, JavaScript) gyakorlati alkalmazását. A projekt során kiemelt figyelmet kapott a szemantikus felépítés, a dinamikus tartalomkezelés és a felhasználói élmény.

### Főbb megvalósított funkciók:
1.  **Dinamikus Étlap:** A pizzák listája nem statikus HTML-ben, hanem egy külső JSON fájlban (`js/data.json`) található, amelyet AJAX technológiával töltünk be az oldalra.
2.  **Interaktív Galéria:** jQuery alapú animáció (`slideToggle`) teszi látványossá a képek megjelenítését és elrejtését.
3.  **Rendelés Validáció:** A rendelési űrlap kliensoldali ellenőrzést tartalmaz (JavaScript), amely azonnal visszajelez a felhasználónak hiba esetén (pl. üres mező, rövid cím).
4.  **Egyedi Videólejátszó:** A Kapcsolat oldalon található videó saját készítésű JavaScript vezérlőgombokkal (Lejátszás, Megállítás, Némítás) irányítható.
5.  **Modern Design:** Egyedi CSS formázás, reszponzív elrendezés, modern táblázat és űrlap design.

---

## Alkalmazott Technológiák

A projekt tisztán kliensoldali (frontend) technológiákra épül:

* **HTML5:** Szemantikus elemek (`header`, `nav`, `main`, `section`, `article`, `footer`) használata.
* **CSS3:** Flexbox és Grid layout, egyedi stílusok, animációk, reszponzivitás.
* **JavaScript (ES6):** Űrlap validáció, videó vezérlés, DOM manipuláció.
* **jQuery:** AJAX kérések kezelése, animációk egyszerűsítése.
* **JSON:** Strukturált adattárolás.

---

## Projekt Struktúra

```text
pizzeria-projekt/
│
├── index.html          # Főoldal (Hero szekcióval)
├── menu.html           # Étlap (AJAX adatbetöltéssel)
├── order.html          # Rendelés (Űrlap validációval)
├── gallery.html        # Galéria (jQuery animációval)
├── contact.html        # Kapcsolat (Videó vezérléssel)
│
├── css/
│   └── style.css       # Központi stíluslap
│
├── js/
│   ├── main.js         # JavaScript logika (AJAX, Validáció)
│   └── data.json       # Termékadatbázis
│
├── images/             # Képek helye
│
└── sounds/             # Hangok helye