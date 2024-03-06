// Elements
const buttonsAddToCart = document.querySelectorAll(".buttonAddToCart");

buttonsAddToCart.forEach(button => {
    button.addEventListener('click', async () => {
        const dataCart = await managerCart.getCart();
        
        if(!dataCart){
            dataCart = await managerCart.addCart()
        }
    
        const cartId = dataCart._id
        const productId = button.dataset.productId;
    
        console.log('ID de carrito:', cartId);
        console.log('ID de producto:', productId);
        await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    });
})

module.exports = addProduct()

