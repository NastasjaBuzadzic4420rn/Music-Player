function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8080/api/listenerPodcasts', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_listenerPodcast").addEventListener("click", function(){
        console.log(this);
        let newData= {
            listenerID: document.getElementById("new_listenerPodcast_listener").value,
            podcastID: document.getElementById("new_listenerPodcast_podcast").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/listenerPodcasts',
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
                fetch('http://localhost:8080/api/listenerPodcasts', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_listenerPodcast_listener").value = '';
            document.getElementById("new_listenerPodcast_podcast").value = '';
    });

    document.getElementById("change_listenerPodcast").addEventListener("click", function(){
        console.log(this);
        let newData= {
            listenerID: document.getElementById("change_listenerPodcast_listener").value,
            podcastID: document.getElementById("change_listenerPodcast_podcast").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/listenerPodcasts/change/' + document.getElementById("change_listenerPodcast_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/listenerPodcasts', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


            document.getElementById("change_listenerPodcast_id").innerHTML = '';
            document.getElementById("change_listenerPodcast_listener").value = '';
            document.getElementById("change_listenerPodcast_podcast").value = '';
             
    });

    document.getElementById("delete_listenerPodcast").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/listenerPodcasts/delete/'+document.getElementById("delete_listenerPodcast_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/listenerPodcasts', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_listenerPodcast_id").value = '';
    });



    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_listenerPodcast_id").innerHTML = '';
        document.getElementById("change_listenerPodcast_listener").value = '';
        document.getElementById("change_listenerPodcast_podcast").value = '';
    });

}

function fill(id, listener, podcast){
    document.getElementById("change_listenerPodcast_id").innerHTML = id;
    document.getElementById("change_listenerPodcast_listener").value = listener;
    document.getElementById("change_listenerPodcast_podcast").value = podcast;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("listenerPodcasts");
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].listenerID+"\", \""+
                        tasks[i].podcastID+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].listenerID + `</td>
            <td>` + tasks[i].podcastID + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}