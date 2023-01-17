function init(){

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8080/api/songs', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_song").addEventListener("click", function(){
        console.log(this);
        let newSong;
        if(document.getElementById('songIR1').checked){
            newSong = {
                name: document.getElementById("new_song_title").value,
                albumID: document.getElementById("new_song_album").value,
                artistID: document.getElementById("new_song_artist").value,
                song: document.getElementById("new_song_link").value
            };
        } else if(document.getElementById('songIR2').checked){
            newSong = {
                name: document.getElementById("new_song_title").value,
                albumID: document.getElementById("new_song_album").value,
                collaborationID: document.getElementById("new_song_artist").value,
                song: document.getElementById("new_song_link").value
            };
        }

        nt = JSON.stringify(newSong);
        console.log(nt);
        fetch('http://localhost:8080/api/songs/',
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
                fetch('http://localhost:8080/api/songs', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_song_title").value = '';
            document.getElementById("new_song_album").value = '';
            document.getElementById("new_song_artist").value = '';
            document.getElementById("new_song_link").value = '';
            document.getElementById("songIR1").checked = false;
            document.getElementById("songIR2").checked = false;
    });

    document.getElementById("change_song").addEventListener("click", function(){
        console.log(this);
        let newData;
        if(document.getElementById('CHsongIR1').checked){
            newData = {
                name: document.getElementById("change_song_title").value,
                albumID: document.getElementById("change_song_album").value,
                artistID: document.getElementById("change_song_artist").value,
                song: document.getElementById("change_song_link").value
            };
        } else if(document.getElementById('CHsongIR2').checked){
            newData = {
                name: document.getElementById("change_song_title").value,
                albumID: document.getElementById("change_song_album").value,
                collaborationID: document.getElementById("change_song_artist").value,
                song: document.getElementById("change_song_link").value
            };
        }

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/songs/change/' + document.getElementById("change_song_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/songs', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}  })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


        document.getElementById("change_song_title").value = '';
        document.getElementById("change_song_album").value = '';
        document.getElementById("change_song_artist").value = '';
        document.getElementById("change_song_link").value = '';
        document.getElementById("CHsongIR1").checked = false;
        document.getElementById("CHsongIR2").checked = false;
             
    });

    document.getElementById("delete_song").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/songs/delete/'+document.getElementById("delete_song_id").value , { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/songs', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_song_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById('change_song_id').innerHTML = id;
        document.getElementById("change_song_title").value = '';
        document.getElementById("change_song_album").value = '';
        document.getElementById("change_song_artist").value = '';
        document.getElementById("change_song_link").value = '';
        document.getElementById("CHsongIR1").checked = false;
        document.getElementById("CHsongIR2").checked = false;
    });
}

function fill(id, name, album, artist, song, isSinger){
    document.getElementById('change_song_id').innerHTML = id;
    document.getElementById("change_song_title").value = name;
    document.getElementById("change_song_album").value = album;
    document.getElementById("change_song_artist").value = artist;
    document.getElementById("change_song_link").value = song;
    document.getElementById("CHsongIR1").checked = isSinger;
    document.getElementById("CHsongIR2").checked = !isSinger;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("songs");
    table.innerHTML = "";
    for(i in tasks){
        let boolArt = true;
        var artist = tasks[i].artistID;
        if(artist == null){
            artist = tasks[i].collaborationID;
            boolArt = false;
        }
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].name+"\", \""+
                        tasks[i].albumID+"\", \""+
                        artist+"\", \""+
                        tasks[i].song+"\", \""+
                        boolArt+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            <td>` + tasks[i].albumID + `</td>
            <td>` + artist + `</td>
            <td>
                <iframe id="player" width="320" height="180" src="` + tasks[i].song + `" allow="fullscreen">
                </iframe>
            </td>
            </tr>`;
        table.innerHTML += readHTML;
    }

    

}