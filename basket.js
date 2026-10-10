let basket = [];



function add(name, price) {

    let found = false;


    for (
        let i = 0;
        i < basket.length;
        i++
    ) {

        if (
            basket[i].name === name
        ) {

            basket[i].qty++;

            found = true;

            break;
        }

    }


    if (!found) {

        basket.push({

            name: name,

            price: price,

            qty: 1

        });

    }


    showBasket();

}



function remove(name) {

    for (
        let i = 0;
        i < basket.length;
        i++
    ) {

        if (
            basket[i].name === name
        ) {

            basket[i].qty--;


            if (
                basket[i].qty <= 0
            ) {

                basket.splice(i, 1);

            }


            break;
        }

    }


    showBasket();

}



function showBasket() {

    let basketItems =
        document.getElementById(
            "basketItems"
        );


    let html = "";


    let subtotal = 0;


    for (
        let i = 0;
        i < basket.length;
        i++
    ) {

        let item =
            basket[i];


        let total =
            item.price * item.qty;


        subtotal += total;


        html += `

            <div class="basket-item">


                <div class="basket-name">

                    ${item.name}

                </div>


                <div class="basket-controls">


                    <button
                        onclick="remove('${item.name}')">

                        -

                    </button>


                    <span>

                        ${item.qty}

                    </span>


                    <button
                        onclick="add('${item.name}', ${item.price})">

                        +

                    </button>


                    <strong>

                        ${total.toFixed(2)} €

                    </strong>


                </div>


            </div>

        `;

    }


    basketItems.innerHTML =
        html;


    

    document.getElementById(
        "subtotal"
    ).innerText =
        subtotal.toFixed(2);



    let delivery = 4.99;


    let total =
        subtotal + delivery;


    document.getElementById(
        "total"
    ).innerText =
        total.toFixed(2);

}