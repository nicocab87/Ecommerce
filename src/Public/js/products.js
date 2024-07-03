// Variables
const socket = io();
let cartId;

// Elements
const buttonsAddToCart = document.querySelectorAll(".buttonAddToCart");
const buttonDetails = document.querySelectorAll(".buttonDetails")

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

// EventListenner

buttonsAddToCart.forEach(button => {
    button.addEventListener('click', () => {
        fetch('api/session/current')
            .then(res=>res.json())
            .then(async (data)=>{
                if(data.user){
                    const cartId=data.user.cart
                    const productId = button.dataset.productId;
                    console.log(productId,'productID')

                    await fetch(`/api/carts/${cartId}/product/${productId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        } 
                    }).then(res=>{
                        if(res.status == 200) {
                            Toast.fire({
                                icon: "success",
                                title: "Se ha agregado el producto al carrito!"
                            });
                        }
                    })

                }else{
                    window.location.replace('/login')
                }
            })
    });
});

buttonDetails.forEach(button => {
    button.addEventListener('click', async() => {
        const detailsId = button.dataset.detailsId;
        console.log(detailsId,'detailsID')
        window.location.href = `/details/${detailsId}`
    })
})


