const resetPasswordForm = document.getElementById("resetPasswordForm");

resetPasswordForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const data = new FormData (loginForm);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    fetch('/api/session/resetPassword',{ 
    method: 'post',
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
                title: "Usuario inexistente",
                text: "Intente nuevamente!",
            });
        }
    }).then(response=>{
        console.log(response)
    })
})