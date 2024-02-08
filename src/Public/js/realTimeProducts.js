const socket = io();

const createProductForm = document.getElementById("createProductForm");
const productsConatiner = document.getElementById("productsContainer")

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

socket.on('updateProduct', (data) => {
    productsContainer.innerHTML = ''; 
    
    data.forEach((product) => {
        const productDiv = document.createElement('li');
        productDiv.innerHTML = `
            <p>Titulo: ${product.title}</p>
            <p>Categoria: ${product.category}</p>
            <p>Descripción: ${product.description}</p>
            <p>${product.thumbnail}</p>
            <p>Stock: ${product.stock}</p>
            <p>Precio: ${product.price}</p>
            <p>${product.id}</p>
        `;
        productsConatiner.appendChild(productDiv); 
    });
});
