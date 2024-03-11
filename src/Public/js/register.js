const registerForm = document.getElementById("registerForm");

registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData (registerForm);
    const obj = {};

    console.log(data, 'data')

    data.forEach((value, key) => obj[key] = value);

    fetch('/api/session/register',{ 
    method: 'post',
    body: JSON.stringify(obj),
    headers: {
        'Content-Type': 'application/json'
    }
    }).then(res=>res.json()).then((data)=>{
        console.log(data, 'data en then')
    })
})