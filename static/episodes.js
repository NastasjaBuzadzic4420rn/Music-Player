function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://localhost:8080/api/episodes', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_episode").addEventListener("click", function(){
        console.log(this);
        let newEpisode= {
            name: document.getElementById("new_episode_name").value,
            guest: document.getElementById("new_episode_guest").value,
            podcastID: document.getElementById("new_episode_podcast").value,
        };
        

        nt = JSON.stringify(newEpisode);
        fetch('http://localhost:8080/api/episodes',
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
                fetch('http://localhost:8080/api/episodes', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_episode_name").value = '';
            document.getElementById("new_episode_guest").value = '';
            document.getElementById("new_episode_podcast").value = '';
    });

    document.getElementById("change_episode").addEventListener("click", function(){
        console.log(this);
        let newEpisode= {
            name: document.getElementById("change_episode_name").value,
            guest: document.getElementById("change_episode_guest").value,
            podcastID: document.getElementById("change_episode_podcast").value,
        };
        

        nt = JSON.stringify(newEpisode);
        fetch('http://localhost:8080/api/episodes/change/' + document.getElementById("change_episode_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/episodes', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


                document.getElementById("change_episode_id").innerHTML = '';
                document.getElementById("change_episode_name").value = '';
                document.getElementById("change_episode_guest").value = '';
                document.getElementById("change_episode_podcast").value = '';
             
    });

    document.getElementById("delete_episode").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/episodes/delete/'+document.getElementById("delete_episode_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/episodes', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_episode_id").value = '';
    });
    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_episode_id").innerHTML = '';
                document.getElementById("change_episode_name").value = '';
                document.getElementById("change_episode_guest").value = '';
                document.getElementById("change_episode_podcast").value = '';
    });
}

function fill(id, name, guest, podcast){
    document.getElementById("change_episode_id").innerHTML = id;
    document.getElementById("change_episode_name").value = name;
    document.getElementById("change_episode_guest").value = guest;
    document.getElementById("change_episode_podcast").value = podcast;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("episodes");
    
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].name+"\", \""+
                        tasks[i].guest+"\", \""+
                        tasks[i].podcastID+"\"";
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            <td>` + tasks[i].guest + `</td>
            <td>` + tasks[i].createdAt + `</td>
            <td>` + tasks[i].podcastID + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}