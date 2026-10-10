function init() {

    renderMenu();

}


function renderMenu() {

    let menu =
        document.getElementById("menu");


    menu.innerHTML = "";


    for (
        let i = 0;
        i < categories.length;
        i++
    ) {

        let category =
            categories[i];

        menu.innerHTML += `

            <h2 class="category-title">

                ${category.name}

            </h2>

        `;

        for (
            let j = 0;
            j < category.items.length;
            j++
        ) {

            let item =
                category.items[j];


            menu.innerHTML += `

                <div class="menu-item">


                    <div class="menu-info">

                        <h3>
                            ${item.name}
                        </h3>


                        <p>
                            ${item.description}
                        </p>


                        <p class="price">

                            ${item.price.toFixed(2)} €

                        </p>


                        <div class="quantity-buttons">


                            <button
                                onclick="remove('${item.name}')">

                                -

                            </button>


                            <button
                                onclick="add('${item.name}', ${item.price})">

                                +

                            </button>


                        </div>

                    </div>


                    <img
                        src="${item.image}"
                        alt="${item.name}">


                </div>

            `;

        }

    }

}