function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:8080/api/artistCollaborations', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_artistCollaboration").addEventListener("click", function(){
        console.log(this);
        let  artistCollaboration= {
            artistID: document.getElementById("new_artiostCollaboration_artist").value,
            collaborationID: document.getElementById("new_artiostCollaboration_collaboration").value,
        };
        
        nt = JSON.stringify(artistCollaboration);
        fetch('http://localhost:8080/api/artistCollaborations' ,
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
                fetch('http://localhost:8080/api/artistCollaborations', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_artiostCollaboration_artist").value = '';
            document.getElementById("new_artiostCollaboration_collaboration").value = '';
    });

    document.getElementById("change_artistCollaboration").addEventListener("click", function(){
        console.log(this);
        let  newData= {
            artistID: document.getElementById("change_artiostCollaboration_artist").value,
            collaborationID: document.getElementById("change_artiostCollaboration_collaboration").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/artistCollaborations/change/' + document.getElementById("change_artiostCollaboration_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/artistCollaborations', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


                document.getElementById("change_artiostCollaboration_id").innerHTML = '';
                document.getElementById("change_artiostCollaboration_artist").value = '';
                document.getElementById("change_artiostCollaboration_collaboration").value = '';
             
    });

    document.getElementById("delete_artistCollaboration").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/artistCollaborations/delete/'+document.getElementById("delete_artistCollaboration_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/artistCollaborations', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_artistCollaboration_id").value = '';

    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_artiostCollaboration_id").innerHTML = '';
        document.getElementById("change_artiostCollaboration_artist").value = '';
        document.getElementById("change_artiostCollaboration_collaboration").value = '';
    });
}

function fill(id, artist, collaboration){
    document.getElementById("change_artiostCollaboration_id").innerHTML = id;
    document.getElementById("change_artiostCollaboration_artist").value = artist;
    document.getElementById("change_artiostCollaboration_collaboration").value = collaboration;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("artistCollaborations");
    
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].artistID+"\", \""+
                        tasks[i].collaborationID+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].artistID + `</td>
            <td>` + tasks[i].collaborationID + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}