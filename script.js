
let cart = [];

function init() {
    renderMenu();
    renderCart();
}

function renderMenu() {
    const menu = document.getElementById("menu");

    if (!menu) return;

    menu.innerHTML = "";

    for (const category of categories) {
        menu.innerHTML += `<h2 class="category-title">${category.name}</h2>`;

        for (const item of category.items) {
            menu.innerHTML += `
                <div class="menu-item">
                    <div class="menu-info">
                        <h3>${item.name}</h3>
                        <p>${item.description || ""}</p>
                        <p class="price">${item.price.toFixed(2)} €</p>

                        <div class="quantity-buttons">
                            <button type="button"
                                onclick="add('${escapeName(item.name)}', ${item.price})">
                                +
                            </button>
                            <button type="button"
                                onclick="remove('${escapeName(item.name)}')">
                                −
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

function escapeName(name) {
    return String(name)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, "&quot;");
}

function add(name, price) {
    const item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });
    }

    renderCart();
}

function remove(name) {
    const item = cart.find(product => product.name === name);

    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.name !== name);
    }

    renderCart();
}

function renderCart() {
    const basket = document.getElementById("basket");
    if (!basket) return;

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    basket.innerHTML = `
        <h2>Dein Warenkorb</h2>

        ${
            cart.length === 0
                ? "<p>Dein Warenkorb ist leer.</p>"
                : cart.map(item => `
                    <div class="basket-item">
                        <div class="basket-name">${item.name}</div>
                        <div class="basket-controls">
                            <button type="button"
                                onclick="remove('${escapeName(item.name)}')">−</button>
                            <span>${item.quantity}x</span>
                            <button type="button"
                                onclick="add('${escapeName(item.name)}', ${item.price})">+</button>
                            <strong>${(item.price * item.quantity).toFixed(2)} €</strong>
                        </div>
                    </div>
                `).join("")
        }

        <hr>

        <p class="total">
            <span>Total:</span>
            <span>${total.toFixed(2)} €</span>
        </p>

        <button type="button" class="checkout-button"
            onclick="openCheckout()" ${cart.length === 0 ? "disabled" : ""}>
            Kaufen / Bestellen
        </button>

        <button type="button" class="clear-button"
            onclick="clearCart()" ${cart.length === 0 ? "disabled" : ""}>
            Warenkorb leeren
        </button>
    `;
}

function clearCart() {
    cart = [];
    renderCart();
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Dein Warenkorb ist leer.");
        return;
    }

    let overlay = document.getElementById("checkoutOverlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "checkoutOverlay";
        overlay.className = "checkout-overlay";

        overlay.innerHTML = `
            <div class="checkout-box">
                <button type="button" class="close-button"
                    onclick="closeCheckout()" aria-label="Schliessen">
                    &times;
                </button>

                <h2>Deine Bestellung</h2>
                <p class="checkout-total" id="checkoutTotal"></p>

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

                    <label for="customerPhone">Telefon</label>
                    <input id="customerPhone" name="phone"
                        type="tel" autocomplete="tel" required>

                    <label for="customerEmail">E-Mail (optional)</label>
                    <input id="customerEmail" name="email"
                        type="email" autocomplete="email">

                    <button type="submit" class="order-button">
                        Bestellung abschicken
                    </button>
                </form>

                <p id="checkoutMessage" role="status"></p>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.addEventListener("click", event => {
            if (event.target === overlay) closeCheckout();
        });

        document.getElementById("checkoutForm")
            .addEventListener("submit", submitOrder);
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("checkoutTotal").textContent =
        "Gesamtbetrag: " + total.toFixed(2) + " €";

    overlay.style.display = "flex";
}

function closeCheckout() {
    const overlay = document.getElementById("checkoutOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
}

function submitOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Dein Warenkorb ist leer.");
        closeCheckout();
        return;
    }

    const form = document.getElementById("checkoutForm");

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const order = {
        customer: {
            name: data.get("name"),
            address: data.get("address"),
            zip: data.get("zip"),
            city: data.get("city"),
            phone: data.get("phone"),
            email: data.get("email")
        },
        items: cart.map(item => ({ ...item })),
        total: cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )
    };

    // Die Bestellung wird vorerst nur angezeigt.
    // Für den echten Versand braucht es einen Bestellserver
    // oder eine angebundene Bestelllösung.
    console.log("Bestellung:", order);

    document.getElementById("checkoutMessage").textContent =
        "Die Angaben wurden geprüft, aber noch nicht versendet. " +
        "Der Bestellversand muss noch eingerichtet werden.";
}

document.addEventListener("DOMContentLoaded", init);

