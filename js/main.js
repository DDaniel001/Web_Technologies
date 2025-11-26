$(document).ready(function() {
    
    // Csak akkor fusson le, ha a menu.html-en vagyunk (van pizza-lista ID)
    if ($('#pizza-lista').length) {
        
        // AJAX hívás a JSON fájl betöltésére
        $.ajax({
            url: 'js/data.json',
            dataType: 'json',
            success: function(data) {
                console.log("Adatok sikeresen betöltve:", data);
                
                // Végigmegyünk a pizzák listáján
                $.each(data.pizzak, function(index, pizza) {
                    
                    // Feltétek összefűzése vesszővel (tömb kezelése)
                    var feltetekSzoveg = pizza.feltetek.join(", ");

                    // Új HTML elem (táblázat sor) összeállítása
                    var ujSor = `
                        <tr>
                            <td><strong>${pizza.nev}</strong></td>
                            <td>${feltetekSzoveg}</td>
                            <td>${pizza.ar} Ft</td>
                            <td>[Kép: ${pizza.kep}]</td> 
                        </tr>
                    `;

                    // Hozzáadás a táblázathoz
                    $('#pizza-lista').append(ujSor);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Hiba a betöltéskor:", textStatus, errorThrown);
                $('#pizza-lista').html('<tr><td colspan="4">Hiba történt az adatok betöltésekor!</td></tr>');
            }
        });
    }

});