const socket = io();

//Elements
const createProductForm = document.getElementById("createProductForm");
const productsConatiner = document.getElementById("productsContainer")
let deleteButton = document.querySelectorAll('.deleteProduct')

// Event Listenners
document.addEventListener("DOMContentLoaded", function() {
    createProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const formData = new FormData(createProductForm);
            const newProduct = {};
    
            formData.forEach((value, key) => {
                newProduct[key]=value.trim()
                console.log('new product', newProduct)
    
            });
            socket.emit('addProduct', newProduct)
    });
    
    deleteButton.forEach(button => {
        button.addEventListener('click', async (event) => {
            const idProductToDelete = parseInt(event.target.id.split('_')[1])
            socket.emit('deleteProduct',idProductToDelete);
        })
    });
    
    socket.on('updateProduct', (data) => {
        productsContainer.innerHTML = ''; 
        
        data.forEach((product) => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
            <div class="box"
                <p>Titulo: ${product.title}</p>
                <p>Categoria: ${product.category}</p>
                <p>Descripción: ${product.description}</p>
                <p>${product.thumbnail}</p>
                <p>Stock: ${product.stock}</p>
                <p>Precio:$ ${product.price}</p>
                <button id='deleteButton_${product.id}' class="deleteProduct"> Borrar </button>
            </div>
            `;
            productDiv.classList.add("box")
            
            productsConatiner.appendChild(productDiv); 
        });
        
    
        deleteButton = document.querySelectorAll('.deleteProduct')
        deleteButton.forEach(button => {
            button.addEventListener('click', async (event) => {
                const idProductToDelete = parseInt(event.target.id.split('_')[1])
                socket.emit('deleteProduct',idProductToDelete);
            })
        })
    })
});


