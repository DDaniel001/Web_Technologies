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

    $('#orderForm').on('submit', function(e) {
        // Megakadályozzuk az alapértelmezett küldést
        e.preventDefault();
        
        let isValid = true;
        
        // 1. Név ellenőrzése (nem lehet üres)
        const nameInput = $('#name');
        if (nameInput.val().trim() === "") {
            showError(nameInput, "A név megadása kötelező!");
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // 2. Pizza választás ellenőrzése
        const pizzaInput = $('#pizza-choice');
        if (pizzaInput.val().trim() === "") {
            showError(pizzaInput, "Válassz egy pizzát a listából!");
            isValid = false;
        } else {
            clearError(pizzaInput);
        }

        // 3. Dátum ellenőrzése
        const dateInput = $('#delivery-date');
        if (dateInput.val() === "") {
            showError(dateInput, "Kérlek válassz szállítási napot!");
            isValid = false;
        } else {
            clearError(dateInput);
        }

        // 4. Cím ellenőrzése (min 10 karakter)
        const addressInput = $('#address');
        if (addressInput.val().length < 10) {
            showError(addressInput, "A cím túl rövid (min. 10 karakter)!");
            isValid = false;
        } else {
            clearError(addressInput);
        }

        // 5. Checkbox ellenőrzése
        const termsInput = $('#terms');
        if (!termsInput.is(':checked')) {
            // A checkboxnál trükkös a hibaüzenet elhelyezése, így a szülő elembe tesszük
            termsInput.next('label').next('.error-message').text("El kell fogadnod a feltételeket!").show();
            isValid = false;
        } else {
            termsInput.next('label').next('.error-message').hide();
        }

        // Ha minden rendben, "elküldjük" az űrlapot
        if (isValid) {
            $('#orderForm').hide();
            $('#success-msg').fadeIn(); // jQuery animáció [cite: 26]
        }
    });

    // Segédfüggvény a hiba megjelenítésére 
    function showError(element, message) {
        element.addClass('error-border'); // CSS osztály hozzáadása
        element.next('.error-message').text(message).show(); // Üzenet kiírása
    }

    // Segédfüggvény a hiba törlésére
    function clearError(element) {
        element.removeClass('error-border');
        element.next('.error-message').hide();
    }

});