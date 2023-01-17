function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:8080/api/playlists', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_playlist").addEventListener("click", function(){
        console.log(this);
        let newData= {
            name: document.getElementById("new_playlist_title").value,
            listenerID: document.getElementById("new_playlist_listener").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/playlists',
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
                fetch('http://localhost:8080/api/playlists', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_playlist_title").value = '';
            document.getElementById("new_playlist_listener").value = '';
    });

    document.getElementById("change_playlist").addEventListener("click", function(){
        console.log(this);
        let newData= {
            name: document.getElementById("change_playlist_title").value,
            listenerID: document.getElementById("change_playlist_listener").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/playlists/change/' + document.getElementById("change_playlist_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/playlists', { method:"GET",headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


            document.getElementById("change_playlist_id").innerHTML = '';
            document.getElementById("change_playlist_title").value = '';
            document.getElementById("change_playlist_listener").value = '';
             
    });

    document.getElementById("delete_playlist").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/playlists/delete/'+document.getElementById("delete_playlist_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/playlists', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_playlist_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_playlist_id").innerHTML = '';
            document.getElementById("change_playlist_title").value = '';
            document.getElementById("change_playlist_listener").value = '';
    });

}

function fill(id, name, listener){
    document.getElementById("change_playlist_id").innerHTML = id;
    document.getElementById("change_playlist_title").value = name;
    document.getElementById("change_playlist_listener").value = listener;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("playlists");
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].name+"\", \""+
                        tasks[i].listenerID+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            <td>` + tasks[i].listenerID + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}