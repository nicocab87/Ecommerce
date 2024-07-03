document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    let data;

    async function fetchCurrentSession() {
        try {
            const response = await fetch('/api/session/current');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            data = await response.json();
            console.log(data.user.id);
        } catch (error) {
            console.error('Hubo un problema con la solicitud fetch:', error);
        }
    }

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const file = fileInput.files[0];
        if (!file) {
            alert('Por favor selecciona un archivo.');
            return;
        }
        
        const formData = new FormData();
        formData.append('resume', file);

        try {
            await fetchCurrentSession(); 
            if (!data) {
                throw new Error('No se pudo obtener la sesión actual.');
            }

            const response = await fetch(`/api/user/${data.user.id}/profilePicture`, {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Archivo subido exitosamente:', result);
        } catch (error) {
            console.error('Hubo un problema con la solicitud fetch:', error);
        }
    });
});
