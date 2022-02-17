
const addToCartBtn = document.querySelectorAll('.add-to-cart');
//console.log("🚀 - addToCartBtn", addToCartBtn);

addToCartBtn.forEach(btn => {
    btn.addEventListener('click', addToCart);
});

const shoppingCart = document.querySelector('.JS-products');

const btnComprar = document.querySelector('.buy').addEventListener('click', comprar);

function addToCart(e){
    const eBtn = e.target;
    //console.log("🚀 - addToCart - eBtn", eBtn);

    const item = eBtn.closest('.item');
    //console.log("🚀 - addToCart - item", item);
    
    const itemName = item.querySelector('.item-name').textContent;
    //console.log("🚀 - addToCart - itemName", itemName);
    
    const price = item.querySelector('.item-price').textContent;
    const itemPrice = parseInt(price);
    //console.log("🚀 - addToCart - price", itemPrice, typeof itemPrice);
    
    const itemImage = item.querySelector('.item-img').src;
    //console.log("🚀 - addToCart - itemImage", itemImage);

    addToShoppingCart(itemName, itemPrice, itemImage);
}

function addToShoppingCart(itemName, itemPrice, itemImage) {
    //console.log(itemName, itemPrice, itemImage);

    const elementTitle = shoppingCart.getElementsByClassName('item-name');
    console.log("🚀 - addToShoppingCart - elementTitle", elementTitle);
    for(let i = 0; i < elementTitle.length; i++){
        if(elementTitle[i].innerText === itemName) {
            let unitsPerProduct = elementTitle[i].parentElement.parentElement.querySelector('.units');
            unitsPerProduct.value++;
            updateCartTotal();
            return;
        }
    }


    const shoppingCartRow = document.createElement('div');
    const cartContent = `
    <div class="product-in-cart">
                <div class="col-name">
                    <img src="${itemImage}" alt="">
                    <h6 class="item-name">${itemName}</h6>
                </div>
                <div class="col-price">
                    <p class="product-price">$${itemPrice}</p>
                </div>
                <div class="col-unit">
                    <input type="number" class="units" min="1" name="" id="" value="1">
                    <button class="delete"> Eliminar </button>
                </div>
            </div>
    `;
    shoppingCartRow.innerHTML = cartContent;
    shoppingCart.append(shoppingCartRow);

    shoppingCartRow.querySelector('.delete').addEventListener('click', deleteItem);

    shoppingCartRow.querySelector('.units').addEventListener('change', quantityChange);

    updateCartTotal();
}

function updateCartTotal() {
    let total = 0;
    const cartTotal = document.querySelector('.total-price');
    const rowProducts = document.querySelectorAll('.product-in-cart');
    rowProducts.forEach(row => {
        const productPrice = row.querySelector('.product-price').textContent.replace('$', '');
        const price = Number(productPrice);
        /* const price = parseFloat(productPrice);
        console.log("🚀 - updateCartTotal - productPrice", price, typeof price); */
        const unitProducts = row.querySelector('.units').value;
        const quantity = Number(unitProducts);
        //console.log("🚀 - updateCartTotal - unitProducts", quantity);
        total = total + price * quantity;
        console.log(total)
    });
    cartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function deleteItem(e) {
    const click = e.target;
    click.closest('.product-in-cart').remove();
    updateCartTotal();
}

function quantityChange(e) {
    const change = e.target;
    /* input.value <= 0 ? input.value = 1 : null; */
    updateCartTotal();
}

function comprar() {
    if(shoppingCart.innerHTML != ''){
        shoppingCart.innerHTML = '';
        updateCartTotal();
        alert('Compra exitosa');
    };
}

/*
    * comentario
    * * importante
    ! Alerta
    ? Duda
    TODO: recordatorio
    @param

*/