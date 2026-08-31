function szamol() {
    // 1. Értékek beolvasása
    const belmagassag = Number(document.getElementById("belmagassag").value);
    const szelessegekInput = document.getElementById("szelessegek").value;
    const falakSzelessegei = szelessegekInput.split(' ').filter(x => x.trim() !== '').map(Number);
    
    // Csempe méretek átváltása méterbe
    const csempeSzelessegM = Number(document.getElementById("csempeSzelesseg").value) / 100;
    const csempeMagassagM = Number(document.getElementById("csempeMagassag").value) / 100;
    const dbEgyCsomagban = Number(document.getElementById("csomagDb").value);

    let osszesNettoDb = 0;
    let falankentHtml = "";

    // 2. Valódi burkolási logika (sorok és oszlopok száma falanként)
    falakSzelessegei.forEach((szelesseg, index) => {
        // Hány csempe kell vízszintesen (felfelé kerekítve, mert a vágott is egésznek számít)
        const oszlopok = Math.ceil(szelesseg / csempeSzelessegM);
        // Hány csempe kell függőlegesen (felfelé kerekítve)
        const sorok = Math.ceil(belmagassag / csempeMagassagM);
        
        // Az adott falhoz szükséges tényleges darabszám
        const szuksegesDb = oszlopok * sorok;
        osszesNettoDb += szuksegesDb;
        
        falankentHtml += `<p><span>${index + 1}. fal (${oszlopok}x${sorok} db):</span> <strong>${szuksegesDb} db</strong></p>`;
    });

    // 3. Összesítés a 10% extra és a csomagok számítása
    const ajanlottDb = Math.ceil(osszesNettoDb * 1.10); // +10% biztonsági tartalék vágási veszteségre
    const szuksegesCsomag = Math.ceil(ajanlottDb / dbEgyCsomagban); // Egész csomag vásárlása
    const vasaroltOsszesDb = szuksegesCsomag * dbEgyCsomagban;

    // 4. Megjelenítés a HTML-ben
    document.getElementById("falankent").innerHTML = falankentHtml;
    document.getElementById("resNetto").innerText = osszesNettoDb + " db";
    document.getElementById("resAjanlott").innerText = ajanlottDb + " db";
    document.getElementById("resCsomag").innerText = szuksegesCsomag + " csomag";
    document.getElementById("resVasarolt").innerText = vasaroltOsszesDb + " db";

    document.getElementById("eredmenyek").style.display = "block";
}