function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

 
    fetch('http://localhost:8080/api/follows', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_follow").addEventListener("click", function(){
        console.log(this);
        let newData= {
            listenerID: document.getElementById("new_follow_listener").value,
            artistID: document.getElementById("new_follow_artist").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/follows',
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
                fetch('http://localhost:8080/api/follows', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_follow_listener").value = '';
            document.getElementById("new_follow_artist").value = '';
    });

    document.getElementById("change_follow").addEventListener("click", function(){
        console.log(this);
        let newData= {
            listenerID: document.getElementById("change_follow_listener").value,
            artistID: document.getElementById("change_follow_artist").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/follows/change/' + document.getElementById("change_follow_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/follows', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


                document.getElementById("change_follow_id").innerHTML = '';
                document.getElementById("change_follow_listener").value = '';
                document.getElementById("change_follow_artist").value = '';
             
    });

    document.getElementById("delete_follow").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/follows/delete/'+document.getElementById("delete_follow_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/follows', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_follow_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_follow_id").innerHTML = '';
                document.getElementById("change_follow_listener").value = '';
                document.getElementById("change_follow_artist").value = '';
    });
}

function fill(id, listener, artist){
    document.getElementById("change_follow_id").innerHTML = id;
    document.getElementById("change_follow_listener").value = listener;
    document.getElementById("change_follow_artist").value = artist;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("follows");
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].listenerID+"\", \""+
                        tasks[i].artistID+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].listenerID + `</td>
            <td>` + tasks[i].artistID + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}