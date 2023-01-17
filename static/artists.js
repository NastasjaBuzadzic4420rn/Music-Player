function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8080/api/artists', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
        });


    document.getElementById("add_artist").addEventListener("click", function(){
        console.log(this);
        let type;
        if(document.getElementById("type_artist1").checked){
            type = true;
        } else if (document.getElementById("type_artist2").checked){
            type = false;
        }
        let newArtrist = {
            name: document.getElementById("new_artist_name").value,
            password: document.getElementById("new_artist_passwords").value,
            isSinger: type,
            recordLabelID: document.getElementById("new_artist_recordLabel").value
        };

        nt = JSON.stringify(newArtrist);
        fetch('http://localhost:8080/api/artists', 
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
                fetch('http://localhost:8080/api/artists', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_artist_name").value = '';
            document.getElementById("new_artist_recordLabel").value = '';
            document.getElementById("new_artist_password").value = '';
            document.getElementById("type_artist1").checked = false;
            document.getElementById("type_artist2").checked = false;
    });

    document.getElementById("change_artist").addEventListener("click", function(){
        console.log(this);
        let type;
        if(document.getElementById("CHtype_artist1").checked){
            type = true;
        } else if (document.getElementById("CHtype_artist2").checked){
            type = false;
        }
        let newArtist = {
            name: document.getElementById("change_artist_name").value,
            isSinger: type,
            password: document.getElementById("change_artist_password").value,
            recordLabelID: document.getElementById("change_artist_recordLabel").value,
        };

        nt = JSON.stringify(newArtist);
        fetch('http://localhost:8080/api/artists/change/' + document.getElementById("change_artist_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/artists', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


                document.getElementById("change_artist_id").value = '';
                document.getElementById("change_artist_name").value = '';
                document.getElementById("change_artist_recordLabel").value = '';
                document.getElementById("change_artist_password").value = '';
                document.getElementById("CHtype_artist1").checked = false;
                document.getElementById("CHtype_artist2").checked = false;
             
    });

    document.getElementById("delete_artist").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/artists/delete/'+document.getElementById("delete_artist_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/artists', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_artist_id").value = '';

    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_artist_id").innerHTML = '';
        document.getElementById("change_artist_name").value = '';
        document.getElementById("change_artist_recordLabel").value = '';
        document.getElementById("change_artist_password").value = '';

        document.getElementById("CHtype_artist1").checked = false;
        document.getElementById("CHtype_artist2").checked = false;
    });
}

function fill(id, name,recordLabel, isSinger, password){
    document.getElementById("change_artist_id").innerHTML = id;
    document.getElementById("change_artist_name").value = name;
    document.getElementById("change_artist_recordLabel").value = recordLabel;
    document.getElementById("change_artist_password").value = password;
    document.getElementById("CHtype_artist1").checked = isSinger;
    document.getElementById("CHtype_artist2").checked = !isSinger;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("artists");
    table.innerHTML = "";
    for(i in tasks){
        let boolArt = true;
        var artist = "Singer";
        if(tasks[i].isSinger == false){
            boolArt = false;
            artist = "Podcaster";
        }
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].name+"\", \""+
                        tasks[i].recordLabelID+"\", \""+
                        boolArt+"\", \""+
                        tasks[i].password+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            <td>` + artist + `</td>
            <td>` + tasks[i].recordLabelID + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}