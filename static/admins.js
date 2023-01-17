function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    
    fetch('http://localhost:8080/api/admins', {method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
        });  

}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("admins");
    table.innerHTML = "";
    for(i in tasks){
        let readHTML = `<tr>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}