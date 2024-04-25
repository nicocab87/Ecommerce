// Variables
const socket = io();
let cartId;

// Elements
const buttonsAddToCart = document.querySelectorAll(".buttonAddToCart");

// Swal Creation
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


// Get CartId
fetch('/api/session/current')
    .then(response => response.json())
    .then(data => {
        cartId= data.user.cart
    })

// EventListenner

buttonsAddToCart.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        
        socket.emit('buttonAddProduct', ()=>{
            console.log('button add product')
        });
        
        socket.on('addProductResponse', async () => {
            console.log(cartId,'cart')
            await fetch(`/api/carts/${cartId}/product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
                Toast.fire({
                icon: "success",
                title: "Se ha agregado el producto al carrito!"
            });
        });
    });
});

