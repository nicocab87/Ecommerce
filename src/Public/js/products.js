const socket = io();
let cartId;

// Elements
const buttonsAddToCart = document.querySelectorAll(".buttonAddToCart");

buttonsAddToCart.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        
        socket.emit('buttonAddProduct', ()=>{
            console.log('nos vamos al back')
        });
        
        socket.on('addProductResponse', async (dataCart) => {
            cartId = dataCart[0]._id;
            console.log('ID de carrito:', cartId);
            console.log('ID de producto:', productId);

            
            await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    });
});

