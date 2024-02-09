const socket = io();

const createProductForm = document.getElementById("createProductForm");
const productsConatiner = document.getElementById("productsContainer")
const deleteButton = document.querySelectorAll('.deleteProduct')

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
        console.log(typeof(idProductToDelete))

    })
});

socket.on('updateProduct', (data) => {
    productsContainer.innerHTML = ''; 
    
    data.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>Titulo: ${product.title}</p>
            <p>Categoria: ${product.category}</p>
            <p>Descripción: ${product.description}</p>
            <p>${product.thumbnail}</p>
            <p>Stock: ${product.stock}</p>
            <p>Precio: ${product.price}</p>
            <p>${product.id}</p>
            <button id="deleteButton_${this.id}" class="deleteProduct">Borrar</button>
        `;
        productsConatiner.appendChild(productDiv); 
    });
});
