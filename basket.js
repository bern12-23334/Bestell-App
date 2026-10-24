
let basket = [];

// Produkt hinzufügen
function add(name, price) {
    let found = false;

    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === name) {
            basket[i].qty++;
            found = true;
            break;
        }
    }

    if (!found) {
        basket.push({
            name: name,
            price: Number(price),
            qty: 1
        });
    }

    showBasket();
}

// Ein Produkt entfernen
function remove(name) {
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === name) {
            basket[i].qty--;

            if (basket[i].qty <= 0) {
                basket.splice(i, 1);
            }

            break;
        }
    }

    showBasket();
}

// Gesamten Warenkorb leeren
function clearBasket() {
    basket.length = 0;
    showBasket();
}

// Warenkorb und Preise aktualisieren
function showBasket() {
    const basketItems = document.getElementById("basketItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const deliveryElement = document.getElementById("delivery");
    const checkoutTotal = document.getElementById("checkoutTotal");

    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].qty;
    }

    // Lieferkosten nur berechnen, wenn Produkte vorhanden sind
    const delivery = basket.length > 0 ? 4.99 : 0;
    const total = subtotal + delivery;

    // Produktliste bleibt ausgeblendet
    if (basketItems) {
        basketItems.innerHTML = "";
    }

    if (subtotalElement) {
        subtotalElement.innerText = subtotal.toFixed(2);
    }

    if (deliveryElement) {
        deliveryElement.innerText = delivery.toFixed(2);
    }

    if (totalElement) {
        totalElement.innerText = total.toFixed(2);
    }

    // Gesamtpreis im Bestellfenster aktualisieren
    if (checkoutTotal) {
        checkoutTotal.innerText = total.toFixed(2);
    }
}

// Preise beim Laden der Seite initialisieren
document.addEventListener("DOMContentLoaded", showBasket);
