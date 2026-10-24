
function checkout() {
    const totalElement = document.getElementById("total");

    if (!totalElement) {
        alert("Der Gesamtbetrag wurde nicht gefunden.");
        return;
    }

    const basketItems = document.getElementById("basketItems");

    if (!basketItems || basketItems.children.length === 0) {
        const subtotal = Number(
            document.getElementById("subtotal")?.textContent || 0
        );

        if (subtotal <= 0) {
            alert("Bitte lege zuerst Produkte in den Warenkorb.");
            return;
        }
    }

    let overlay = document.getElementById("checkoutOverlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "checkoutOverlay";
        overlay.className = "checkout-overlay";

        overlay.innerHTML = `
            <div class="checkout-box">
                <button type="button"
                    class="close-button"
                    id="closeCheckout"
                    aria-label="Formular schliessen">&times;</button>

                <h2>Deine Bestellung</h2>

                <p class="checkout-total">
                    Gesamtbetrag:
                    <strong id="formTotal"></strong> €
                </p>

                <form id="checkoutForm">
                    <label for="customerName">Vor- und Nachname</label>
                    <input id="customerName" name="name"
                        autocomplete="name" required>

                    <label for="customerAddress">Strasse und Hausnummer</label>
                    <input id="customerAddress" name="address"
                        autocomplete="street-address" required>

                    <label for="customerZip">Postleitzahl</label>
                    <input id="customerZip" name="zip"
                        autocomplete="postal-code" required>

                    <label for="customerCity">Ort</label>
                    <input id="customerCity" name="city"
                        autocomplete="address-level2" required>

                    <label for="customerPhone">Telefonnummer</label>
                    <input id="customerPhone" name="phone"
                        type="tel" autocomplete="tel" required>

                    <label for="customerEmail">E-Mail (optional)</label>
                    <input id="customerEmail" name="email"
                        type="email" autocomplete="email">

                    <button type="submit" class="order-button">
                        Bestellung abschicken
                    </button>

                    <p id="orderMessage" role="status"></p>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById("closeCheckout").addEventListener(
            "click", closeCheckout
        );

        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) closeCheckout();
        });

        document.getElementById("checkoutForm").addEventListener(
            "submit", function (event) {
                event.preventDefault();

                const form = event.currentTarget;

                if (!form.reportValidity()) return;

                document.getElementById("orderMessage").textContent =
                    "Das Formular ist ausgefüllt. Der Versand der Bestellung " +
                    "muss noch eingerichtet werden.";
            }
        );
    }

    document.getElementById("formTotal").textContent =
        Number(totalElement.textContent || 0).toFixed(2);

    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";

    document.getElementById("customerName").focus();
}

function closeCheckout() {
    const overlay = document.getElementById("checkoutOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }

    document.body.style.overflow = "";
} 
k
