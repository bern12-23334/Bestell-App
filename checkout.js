
function checkout() {

    if (basket.length === 0) {

        alert(
            "Dein Warenkorb ist leer!"
        );

        return;
    }


    let total =
        document.getElementById(
            "total"
        ).innerText;


    document.getElementById(
        "checkoutTotal"
    ).innerText =
        total;


    document.getElementById(
        "checkout"
    ).style.display =
        "flex";

}




function closeCheckout() {

    document.getElementById(
        "checkout"
    ).style.display =
        "none";

}

function placeOrder() {

    let name =
        document.getElementById(
            "name"
        ).value;


    let address =
        document.getElementById(
            "address"
        ).value;


    let city =
        document.getElementById(
            "city"
        ).value;

    if (
        name.trim() === ""
    ) {

        alert(
            "Bitte gib deinen Namen ein."
        );

        return;
    }


    

    if (
        address.trim() === ""
    ) {

        alert(
            "Bitte gib deine Adresse ein."
        );

        return;
    }


    

    if (
        city.trim() === ""
    ) {

        alert(
            "Bitte gib deinen Ort ein."
        );

        return;
    }


    let total =
        document.getElementById(
            "total"
        ).innerText;


    

    alert(

        "Bestellung erfolgreich!\n\n" +

        "Name: " +
        name +

        "\nAdresse: " +
        address +

        "\nOrt: " +
        city +

        "\n\nGesamt: " +
        total +
        " €"

    );



    basket = [];


    showBasket();


    

    closeCheckout();

}