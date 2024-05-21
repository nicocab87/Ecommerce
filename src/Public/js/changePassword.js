const changePassword = document.getElementById("changePassword")

changePassword.addEventListener('submit', (e)=>{
    e.preventDefault();

    const data = new FormData (changePassword);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    fetch('/api/session/changePassword',{ 
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
        'Content-Type': 'application/json'
    }
    }).then(res=>{
        if(res.status == 200) {
            window.location.replace('/login')
        }else{
            Swal.fire({
                icon: "error",
                title: "No se puede introducir la misma contraseña",
                text: "Intente con una nueva!",
            });
        }
    }).then(response=>{
        console.log(response)
    })
})