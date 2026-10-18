function init() {
    const menu = document.getElementById("menu");
    const slider = document.getElementById("categorySlider");

    if (!menu || !slider) {
        console.error(
            "Fehler: Das Element #menu oder #categorySlider fehlt."
        );
        return;
    }

    if (typeof categories === "undefined") {
        console.error(
            "Fehler: categories wurde nicht geladen. Prüfe dbs.js."
        );
        return;
    }

    renderMenu();
}

function renderMenu() {
    const menu = document.getElementById("menu");

    menu.innerHTML = categories.map((category, index) => `
        <section class="food-category" id="category-${index}">

            <div class="category-banner">
                <img
                    src="${category.image}"
                    alt="${category.name}"
                    onerror="this.onerror=null; console.error('Kategorie-Bild fehlt:', this.src);"
                >
                <h2>${category.name}</h2>
            </div>

            <div class="category-dishes">
                ${category.items.map(item => `
                    <article class="menu-item">

                        <div class="menu-info">
                            <h3>${item.name}</h3>

                            <p>${item.description}</p>

                            <p class="price">
                                ${Number(item.price).toFixed(2)} €
                            </p>

                            <div class="quantity-buttons">
                                <button
                                    type="button"
                                    onclick="remove('${item.name}')"
                                    aria-label="${item.name} entfernen">
                                    −
                                </button>

                                <button
                                    type="button"
                                    onclick="add('${item.name}', ${item.price})"
                                    aria-label="${item.name} hinzufügen">
                                    +
                                </button>
                            </div>
                        </div>

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            loading="lazy"
                            onerror="this.onerror=null; console.error('Gericht-Bild fehlt:', this.src);"
                        >

                    </article>
                `).join("")}
            </div>

        </section>
    `).join("");

    renderCategorySlider();
}

function renderCategorySlider() {
    const slider = document.getElementById("categorySlider");

    slider.innerHTML = categories.map((category, index) => `
        <button
            type="button"
            class="${index === 0 ? "active" : ""}"
            onclick="scrollToCategory(${index})">
            ${category.name}
        </button>
    `).join("");
}

function scrollToCategory(index) {
    const target = document.getElementById("category-" + index);

    if (!target) {
        return;
    }

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    document.querySelectorAll("#categorySlider button")
        .forEach((button, buttonIndex) => {
            button.classList.toggle(
                "active",
                buttonIndex === index
            );
        });
}

document.addEventListener("DOMContentLoaded", init);