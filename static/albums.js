function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];    

    fetch('http://localhost:8080/api/albums', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
        });

    document.getElementById("add_album").addEventListener("click", function(){
        console.log(this);
        let newAlbum;
        if(document.getElementById('album_type_artist1').checked){
            newAlbum = {
                name: document.getElementById("new_album_title").value,
                artistID: document.getElementById("new_album_artist").value,
            };
        } else if(document.getElementById('album_type_artist2').checked){
            newAlbum = {
                name: document.getElementById("new_album_title").value,
                collaborationID: document.getElementById("new_album_artist").value,
            };
        }

        nt = JSON.stringify(newAlbum);
        fetch('http://localhost:8080/api/albums',
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
                fetch('http://localhost:8080/api/albums', { method:"GET" , headers: {'Authorization':  `Bearer ${token}`}})
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_album_id").value = '';
            document.getElementById("new_album_title").value = '';
            document.getElementById("new_album_artist").value = '';
            document.getElementById("album_type_artist1").checked = false;
            document.getElementById("album_type_artist2").checked = false;
    });

    document.getElementById("change_album").addEventListener("click", function(){
        console.log(this);
        let newAlbum;
        if(document.getElementById('CHalbum_type_artist1').checked){
            newAlbum = {
                name: document.getElementById("change_album_title").value,
                artistID: document.getElementById("change_album_artist").value,
            };
        } else if(document.getElementById('CHalbum_type_artist2').checked){
            newAlbum = {
                name: document.getElementById("change_song_title").value,
                collaborationID: document.getElementById("change_album_artist").value,
            };
        }

        nt = JSON.stringify(newAlbum);
        fetch('http://localhost:8080/api/albums/change/' + document.getElementById("change_album_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/albums', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


                document.getElementById("change_album_title").value = '';
                document.getElementById("change_album_artist").value = '';
                document.getElementById("CHalbum_type_artist1").checked = false;
                document.getElementById("CHalbum_type_artist2").checked = false;
             
    });

    document.getElementById("delete_album").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/albums/delete/'+ document.getElementById("delete_album_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/albums', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            }); 
        document.getElementById("delete_album_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_album_id").innerHTML = '';
        document.getElementById("change_album_title").value = '';
        document.getElementById("change_album_artist").value = '';
        document.getElementById("album_type_artist1").checked = false;
        document.getElementById("album_type_artist2").checked = false;
    });

}

function fill(id, name, artist, isSolo){
    document.getElementById("change_album_id").innerHTML = id;
    document.getElementById("change_album_title").value = name;
    document.getElementById("change_album_artist").value = artist;
    document.getElementById("CHalbum_type_artist1").checked = isSolo;
    document.getElementById("CHalbum_type_artist2").checked = !isSolo;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("albums");
    table.innerHTML = "";
    for(i in tasks){
        let boolAlb = true;
        var artist = tasks[i].artistID;
        if(artist == null){
            boolAlb = false;
            artist = tasks[i].collaborationID;
        }
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].name+"\", \""+
                        artist+"\", \""+
                        boolAlb+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            <td>` + tasks[i].createdAt + `</td>
            <td>` + artist + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}