
let basket = [];

// PRODUKT HINZUFÜGEN
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


// PRODUKT ENTFERNEN
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


// WARENKORB LEEREN
function clearBasket() {
    basket.length = 0;
    showBasket();
}


// WARENKORB ANZEIGEN
function showBasket() {

    const basketItems = document.getElementById("basketItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const deliveryElement = document.getElementById("delivery");
    const checkoutTotal = document.getElementById("checkoutTotal");

    let subtotal = 0;

    // Produktliste leeren
    if (basketItems) {
        basketItems.innerHTML = "";

        // Alle Produkte anzeigen
        basket.forEach(product => {

            subtotal += product.price * product.qty;

            const item = document.createElement("div");
            item.className = "basket-product";

            item.innerHTML = `
                <div class="basket-product-info">
                    <strong>${product.name}</strong>

                    <p>
                        ${product.price.toFixed(2)} €
                    </p>
                </div>

                <div class="basket-quantity">

                    <button
                        type="button"
                        onclick="remove('${product.name}')">
                        −
                    </button>

                    <span>${product.qty}</span>

                    <button
                        type="button"
                        onclick="add('${product.name}', ${product.price})">
                        +
                    </button>

                </div>

                <strong>
                    ${(product.price * product.qty).toFixed(2)} €
                </strong>
            `;

            basketItems.appendChild(item);
        });
    }

    // Lieferkosten
    const delivery = basket.length > 0 ? 4.99 : 0;

    // Gesamtpreis
    const total = subtotal + delivery;


    // Zwischensumme
    if (subtotalElement) {
        subtotalElement.innerText = subtotal.toFixed(2);
    }

    // Lieferkosten
    if (deliveryElement) {
        deliveryElement.innerText = delivery.toFixed(2);
    }

    // Gesamtpreis
    if (totalElement) {
        totalElement.innerText = total.toFixed(2);
    }

    // Checkout-Gesamtpreis
    if (checkoutTotal) {
        checkoutTotal.innerText = total.toFixed(2);
    }
}


// WARENKORB BEIM LADEN INITIALISIEREN
document.addEventListener("DOMContentLoaded", function() {
    showBasket();
});

