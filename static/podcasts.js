function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:8080/api/podcasts', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_podcast").addEventListener("click", function(){
        console.log(this);
        let newData;
        if(document.getElementById('podcast_type_artist1').checked){
            newData= {
                name: document.getElementById("new_podcast_title").value,
                artistID: document.getElementById("new_podcast_artist").value,
            };
        } else if(document.getElementById('podcast_type_artist2').checked){
            newData= {
                name: document.getElementById("new_podcast_title").value,
                collaborationID: document.getElementById("new_podcast_artist").value,
            };
        }

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/podcasts',
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
                fetch('http://localhost:8080/api/podcasts', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_podcast_title").value = '';
            document.getElementById("new_podcast_artist").value = '';
            document.getElementById("podcast_type_artist2").checked = false;
            document.getElementById("podcast_type_artist1").checked = false;
    });

    document.getElementById("change_podcast").addEventListener("click", function(){
        console.log(this);
        let newData;
        if(document.getElementById('CHpodcast_type_artist1').checked){
            newData= {
                name: document.getElementById("change_podcast_title").value,
                artistID: document.getElementById("change_podcast_artist").value,
            };
        } else if(document.getElementById('CHpodcast_type_artist2').checked){
            newData= {
                name: document.getElementById("change_podcast_title").value,
                collaborationID: document.getElementById("change_podcast_artist").value,
            };
        }

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/podcasts/change/' + document.getElementById("change_podcast_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/podcasts', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


            document.getElementById("change_podcast_id").innerHTML = '';
            document.getElementById("change_podcast_title").value = '';
            document.getElementById("change_podcast_artist").value = '';
            document.getElementById("CHpodcast_type_artist2").checked = false;
            document.getElementById("CHpodcast_type_artist1").checked = false;
             
    });

    document.getElementById("delete_podcast").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/podcasts/delete/'+document.getElementById("delete_podcast_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/podcasts', { method:"GET" , headers: {'Authorization':  `Bearer ${token}`}})
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_podcast_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_podcast_id").innerHTML = '';
            document.getElementById("change_podcast_title").value = '';
            document.getElementById("change_podcast_artist").value = '';
            document.getElementById("CHpodcast_type_artist2").checked = false;
            document.getElementById("CHpodcast_type_artist1").checked = false;
    });

}

function fill(id, name, artist, isSolo){
    document.getElementById("change_podcast_id").innerHTML = id;
    document.getElementById("change_podcast_title").value = name;
    document.getElementById("change_podcast_artist").value = artist;
    document.getElementById("CHpodcast_type_artist2").checked = isSolo;
    document.getElementById("CHpodcast_type_artist1").checked = !isSolo;
}

function updateTaskList(tasks){
    // console.log(tasks);
    // var table = document.getElementById("podcasts");
    // table.innerHTML = "";
    // for(i in tasks){
    //     let boolPod = true;
    //     var artist = tasks[i].artistID;
    //     if(artist == null){
    //         boolPod = false;
    //         artist = tasks[i].collaborationID;
    //     }
    //     let data = "\""+tasks[i].id+"\", \""+
    //                     tasks[i].name+"\", \""+
    //                     artist+"\", \""+
    //                     boolPod+"\""
    //     let readHTML = `<tr onclick='fill(` + data + `)'>
    //         <td>` + tasks[i].id + `</td>
    //         <td>` + tasks[i].name + `</td>
    //         <td>` + artist + `</td>
    //         </tr>`;
    //     table.innerHTML += readHTML;
    // }
}