function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];



    fetch('http://localhost:8080/api/listeners', { 
        method:"GET",
        headers: {'Authorization':  `Bearer ${token}`}
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_listener").addEventListener("click", function(){
        console.log(this);
        let newData= {
            name: document.getElementById("new_listener_name").value,
            age: document.getElementById("new_listener_age").value,
            password: document.getElementById("new_listener_password").value,
            country: document.getElementById("new_listener_country").value,
        };

        // console.log(newData);

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/listeners',
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
                fetch('http://localhost:8080/api/listeners', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_listener_name").value = '';
            document.getElementById("new_listener_password").value = '';
            document.getElementById("new_listener_age").value = '';
            document.getElementById("new_listener_country").value = '';
    });

    document.getElementById("change_listener").addEventListener("click", function(){
        console.log(this);
        let newData= {
            name: document.getElementById("change_listener_name").value,
            password: document.getElementById("change_listener_password").value,
            age: document.getElementById("change_listener_age").value,
            country: document.getElementById("change_listener_country").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/listeners/change/' + document.getElementById("change_listener_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/listeners', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


            document.getElementById("change_listener_id").innerHTML = '';
            document.getElementById("change_listener_password").value = '';
            document.getElementById("change_listener_country").value = '';
            document.getElementById("change_listener_age").value = '';
            document.getElementById("change_listener_name").value = '';
             
    });

    document.getElementById("delete_listener").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/listeners/delete/'+document.getElementById("delete_listener_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/listeners', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_listener_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_listener_id").innerHTML = '';
        document.getElementById("change_listener_password").value = '';
            document.getElementById("change_listener_country").value = '';
            document.getElementById("change_listener_age").value = '';
            document.getElementById("change_listener_name").value = '';
    });
}



function fill(id, name, age, country, password){
    document.getElementById("change_listener_id").innerHTML = id;
    document.getElementById("change_listener_password").value = password;
    document.getElementById("change_listener_name").value = name;
    document.getElementById("change_listener_age").value = age;
    document.getElementById("change_listener_country").value = country;
}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("listeners");
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].name+"\", \""+
                        tasks[i].age+"\", \""+
                        tasks[i].country+"\", \""+
                        tasks[i].password+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            <td>` + tasks[i].age + `</td>
            <td>` + tasks[i].country + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}