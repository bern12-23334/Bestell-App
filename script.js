function init() {
    renderMenu();
}

function renderMenu() {
    let menu = document.getElementById("menu");

    menu.innerHTML = "";

    for (let i = 0; i < categories.length; i++) {

        let category = categories[i];

        menu.innerHTML += `<h2>${category.name}</h2>`;

        for (let j = 0; j < category.items.length; j++) {

            let item = category.items[j];

            menu.innerHTML += `
                <div class="menu-item">

                    <h3>${item.name}</h3>

                    <p>${item.description}</p>

                    <p>${item.price.toFixed(2)} €</p>

                    <div class="quantity-buttons">

                        <button onclick="add('${item.name}', ${item.price})">
                            +
                        </button>

                        <button onclick="remove('${item.name}')">
                            -
                        </button>

                    </div>

                </div>
            `;
        }
    }
}