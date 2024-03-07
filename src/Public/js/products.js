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

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
                Toast.fire({
                icon: "success",
                title: "Se ha agregado el producto al carrito!"
            });
        });
    });
});

