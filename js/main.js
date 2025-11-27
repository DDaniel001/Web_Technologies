$(document).ready(function() {
    
    // --- MENU PAGE LOGIC ---
    
    // Check if we are on the menu page (looking for #pizza-list)
    if ($('#pizza-list').length) {
        
        // AJAX call to load JSON data
        $.ajax({
            url: 'js/data.json',
            dataType: 'json',
            success: function(data) {
                console.log("Data loaded successfully:", data);
                
                // Iterate through "pizzas" array
                $.each(data.pizzas, function(index, pizza) {
                    
                    // Feltétek összefűzése
                    var toppingsText = pizza.toppings.join(", ");

                    // Kép elérési útja: feltételezzük, hogy a JSON-ban csak a fájlnév van (pl. "margherita.jpg")
                    // Ezért elé írjuk az "images/" mappát.
                    var imagePath = "images/" + pizza.image; 

                    // Új sor létrehozása - JAVÍTOTT KÉP MEGJELENÍTÉSSEL
                    var newRow = `
                        <tr>
                            <td><strong>${pizza.name}</strong></td>
                            <td>${toppingsText}</td>
                            <td>${pizza.price} Ft</td>
                            <td>
                                <img src="${imagePath}" alt="${pizza.name}" style="width: 100px; height: auto; border-radius: 5px;">
                            </td> 
                        </tr>
                    `;

                    // Append the new row to the table body
                    $('#pizza-list').append(newRow);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error loading data:", textStatus, errorThrown);
                $('#pizza-list').html('<tr><td colspan="4">Error loading data!</td></tr>');
            }
        });
    }

    // --- ORDER FORM VALIDATION ---

    $('#orderForm').on('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();
        
        let isValid = true;
        
        // 1. Validate Name (Required)
        const nameInput = $('#name');
        if (nameInput.val().trim() === "") {
            showError(nameInput, "A név megadása kötelező!");
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // 2. Validate Pizza Choice (Required)
        const pizzaInput = $('#pizza-choice');
        if (pizzaInput.val().trim() === "") {
            showError(pizzaInput, "Válassz egy pizzát a listából!");
            isValid = false;
        } else {
            clearError(pizzaInput);
        }

        // 3. Validate Delivery Date (Required)
        const dateInput = $('#delivery-date');
        if (dateInput.val() === "") {
            showError(dateInput, "Kérlek válassz szállítási napot!");
            isValid = false;
        } else {
            clearError(dateInput);
        }

        // 4. Validate Address (Min length check)
        const addressInput = $('#address');
        if (addressInput.val().length < 10) {
            showError(addressInput, "A cím túl rövid (min. 10 karakter)!");
            isValid = false;
        } else {
            clearError(addressInput);
        }

        // 5. Validate Terms Checkbox (Must be checked)
        const termsInput = $('#terms');
        if (!termsInput.is(':checked')) {
            // Error message placement is tricky for checkboxes, targeting next sibling
            termsInput.next('label').next('.error-message').text("El kell fogadnod a feltételeket!").show();
            isValid = false;
        } else {
            termsInput.next('label').next('.error-message').hide();
        }

        // If form is valid, simulate successful submission
        if (isValid) {
            $('#orderForm').hide();
            $('#success-msg').fadeIn(); // jQuery animation
        }
    });

    // Helper function: Show error styling and message
    function showError(element, message) {
        element.addClass('error-border');
        element.next('.error-message').text(message).show();
    }

    // Helper function: Clear error styling and message
    function clearError(element) {
        element.removeClass('error-border');
        element.next('.error-message').hide();
    }

    // --- GALLERY ANIMATION (jQuery) ---
    
    // Check if the toggle button exists
    if ($('#toggle-gallery-btn').length) {
        
        $('#toggle-gallery-btn').on('click', function() {
            // slideToggle: Animates the height to hide/show element
            $('#gallery-container').slideToggle(600, function() {
                // Optional: Log when animation is complete
                console.log("Animation complete.");
            });
        });
    }

    // --- VIDEO & SOUND CONTROL (Custom JS) ---

    // Check if the video exists on the page
    if ($('#promo-video').length) {
        
        var videoElement = $('#promo-video').get(0);
        var soundElement = $('#video-sound').get(0); // Get the audio element

        // --- 1. BUTTON CONTROLS ---

        // Play Button
        $('#btn-play').on('click', function() {
            videoElement.play();
            // No need to play sound here, the 'play' event listener below handles it
        });

        // Pause Button
        $('#btn-pause').on('click', function() {
            videoElement.pause();
            // No need to pause sound here, the 'pause' event listener below handles it
        });

        // Mute Button (Mutes both video and audio)
        $('#btn-mute').on('click', function() {
            videoElement.muted = !videoElement.muted;
            soundElement.muted = !soundElement.muted;
            
            // Update button text
            if(soundElement.muted) {
                $(this).text("Némítás feloldása 🔊");
            } else {
                $(this).text("Némítás 🔇");
            }
        });

        // --- 2. SYNCHRONIZATION ---

        // If the video starts (via button or click), start the sound too
        $(videoElement).on('play', function() {
            soundElement.play();
        });

        // If the video pauses (via button or click), pause the sound too
        $(videoElement).on('pause', function() {
            soundElement.pause();
        });

        // If the video ends, stop the sound and rewind to the beginning
        $(videoElement).on('ended', function() {
            soundElement.pause();
            soundElement.currentTime = 0;
        });
    }

});