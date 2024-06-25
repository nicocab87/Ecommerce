const updateUser = (id) => {
    const newRole = document.getElementById(`select-${id}`).value;
    fetch(`http://localhost:8080/api/user/changeRol/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status == 200) {
            window.location.reload();
        }
    }).catch(err => {
        console.error('Error:', err);
    });
};

const deleteUser = (id)=>{
    fetch(`http://localhost:8080/api/user/deleteUser/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status == 200) {
            window.location.reload();
        }
    }).catch(err => {
        console.error('Error:', err);
    });
}