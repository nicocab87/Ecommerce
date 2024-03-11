const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData (loginForm);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    fetch('/api/session/login',{ 
    method: 'post',
    body: JSON.stringify(obj),
    headers: {
        'Content-Type': 'application/json'
    }
    }).then(res=>{
        if(res.status == 200) {
            window.location.replace('/products')
        }
    }).then(response=>{
        console.log(response)
    })
})