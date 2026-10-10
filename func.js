let basket = [];

function add(name, price) {

    let found = false;

    for (let i = 0; i < basket.length; i++) {
        if (basket[i].name === name) {
            basket[i].qty++;
            found = true;
        }
    }

    if (!found) {
        basket.push({ name: name, price: price, qty: 1 });
    }

    show();
}

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

    show();
}

function show() {

    let basketItems = document.getElementById("basketItems");
    let html = "";
    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {

        let item = basket[i];
        let total = item.price * item.qty;

        subtotal += total;

        html += `
            <div class="basket-item">
                <span>${item.name}</span>

                <span>
                    <button onclick="remove('${item.name}')">-</button>
                    ${item.qty}
                    <button onclick="add('${item.name}', ${item.price})">+</button>

                    ${total.toFixed(2)} €
                </span>
            </div>
        `;
    }

    basketItems.innerHTML = html;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("total").innerText = (subtotal + 4.99).toFixed(2);
}