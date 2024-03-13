// Elements
const registerForm = document.getElementById("registerForm");

// Swal Creation
const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});


// Event Listenner

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(registerForm);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    fetch("/api/session/register", {
        method: "post",
        body: JSON.stringify(obj),
        headers: {
        "Content-Type": "application/json",
        },
    })
        .then((res) => {
        if (res.status == 200) {
            Toast.fire({
                icon: "success",
                title: "Se ha registrado el usruario correctamente!"
            });
            setTimeout(function() {
                window.location.replace("/products");
            }, 3000);
            
        } else {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha podido completar el registro, intente de vuelta",
            });
        }
        })
        .then((data) => {
        console.log(data);
        });
    });
