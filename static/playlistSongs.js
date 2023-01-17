function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8080/api/playlistSongs', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_playlistSong").addEventListener("click", function(){
        console.log(this);
        let newData= {
            playlistID: document.getElementById("new_playlistSong_playlist").value,
            songID: document.getElementById("new_playlistSong_song").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/playlistSongs',
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
                fetch('http://localhost:8080/api/playlistSongs', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_playlistSong_playlist").value = '';
            document.getElementById("new_playlistSong_song").value = '';
    });

    document.getElementById("change_playlistSong").addEventListener("click", function(){
        console.log(this);
        let newData= {
            playlistID: document.getElementById("change_playlistSong_playlist").value,
            songID: document.getElementById("change_playlistSong_song").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/playlistSongs/change/' + document.getElementById("change_playlistSong_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/playlistSongs', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


            document.getElementById("change_playlistSong_id").innerHTML = '';
            document.getElementById("change_playlistSong_playlist").value = '';
            document.getElementById("change_playlistSong_song").value = '';
             
    });

    document.getElementById("delete_playlistSong").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/playlistSongs/delete/'+document.getElementById("delete_playlistSong_id").value, { method:"DELETE" , headers: {'Authorization':  `Bearer ${token}`}})
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/playlistSongs', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_playlistSong_id").value = '';
    });
    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_playlistSong_id").innerHTML = '';
            document.getElementById("change_playlistSong_playlist").value = '';
            document.getElementById("change_playlistSong_song").value = '';
    });

}

function fill(id, playlist, song){
    document.getElementById("change_playlistSong_id").innerHTML = id;
    document.getElementById("change_playlistSong_playlist").value = playlist;
    document.getElementById("change_playlistSong_song").value = song;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("playlistSongs");
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].playlistID+"\", \""+
                        tasks[i].songID+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].songID + `</td>
            <td>` + tasks[i].playlistID + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}