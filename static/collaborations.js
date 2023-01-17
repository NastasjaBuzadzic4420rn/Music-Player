function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8080/api/collaborations', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_collaboration").addEventListener("click", function(){
        console.log(this);
        let newCollaboration= {
            name: document.getElementById("new_collaboration_name").value,
        };


        nt = JSON.stringify(newCollaboration);
        fetch('http://localhost:8080/api/collaborations' ,
                {
                    method:"POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization':  `Bearer ${token}`
                    },
                    body: nt
        })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/collaborations', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_collaboration_name").value = '';
            
    });


    document.getElementById("change_collaboration").addEventListener("click", function(){
        console.log(this);
        let newCollaboration= {
            name: document.getElementById("change_collaboration_name").value,
        };

        nt = JSON.stringify(newCollaboration);
        fetch('http://localhost:8080/api/collaborations/change/' + document.getElementById("change_collaboration_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/collaborations', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


        document.getElementById("change_collaboration_id").innerHTML = '';
        document.getElementById("change_collaboration_name").value = '';
             
    });

    document.getElementById("delete_collaboration").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/collaborations/delete/'+document.getElementById("delete_collaboration_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/collaborations', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_collaboration_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_collaboration_id").innerHTML = '';
        document.getElementById("change_collaboration_name").value = '';
             
    });

}

function fill(id, name){
    document.getElementById("change_collaboration_id").innerHTML = id;
    document.getElementById("change_collaboration_name").value = name;

}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("collaborations");
   
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].name+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}