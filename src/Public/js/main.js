const perfilDiv = document.getElementById("perfilDiv");

fetch('/api/session/current')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        perfilDiv.innerHTML =' '
        if (data.user) {
            perfilDiv.innerHTML = `
            <li class="nav-item dropdown navbar-end">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${data.user.name}
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/profile">Perfil</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/api/session/logout">Cerrar sesión</a></li>
                </ul>
            </li>
            `
        }else{
            perfilDiv.innerHTML=`
            <div>
                <div class="navbar-item">
                    <div class="buttons">
                        <a href="/register" class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a href="/login" class="button is-light">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
            `
        }
    })
    .catch(error => {
        console.error('Hubo un error:', error);
    });