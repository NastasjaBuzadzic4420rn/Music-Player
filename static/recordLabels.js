function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    
    fetch('http://localhost:8080/api/recordLabels', { method:"GET",headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_recordLabel").addEventListener("click", function(){
        console.log(this);
        let newData= {
            name: document.getElementById("new_recordLabel_name").value,
            dateFounded: document.getElementById("new_recordLabel_year").value,
            headquarters: document.getElementById("new_recordLabel_headquarter").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/recordLabels',
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
                fetch('http://localhost:8080/api/recordLabels', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_recordLabel_name").value = '';
            document.getElementById("new_recordLabel_year").value = '';
            document.getElementById("new_recordLabel_headquarter").value = '';
    });

    document.getElementById("change_recordLabel").addEventListener("click", function(){
        console.log(this);
        let newData= {
            name: document.getElementById("change_recordLabel_name").value,
            dateFounded: document.getElementById("change_recordLabel_year").value,
            headquarters: document.getElementById("change_recordLabel_headquarter").value,
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/recordLabels/change/' + document.getElementById("change_recordLabel_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/recordLabels', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 


            document.getElementById("change_recordLabel_id").innerHTML = '';
            document.getElementById("change_recordLabel_name").value = '';
            document.getElementById("change_recordLabel_year").value = '';
            document.getElementById("change_recordLabel_headquarter").value = '';
             
    });

    document.getElementById("delete_recordLabel").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/recordLabels/delete/'+document.getElementById("delete_recordLabel_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/recordLabels', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_recordLabel_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_recordLabel_id").innerHTML = '';
            document.getElementById("change_recordLabel_name").value = '';
            document.getElementById("change_recordLabel_year").value = '';
            document.getElementById("change_recordLabel_headquarter").value = '';
                 
    });

}

function fill(id, name, year, headquarters){
    document.getElementById("change_recordLabel_id").innerHTML = id;
    document.getElementById("change_recordLabel_name").value = name;
    document.getElementById("change_recordLabel_year").value = year;
    document.getElementById("change_recordLabel_headquarter").value = headquarters;

}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("recordLabels");
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].name+"\", \""+
                        tasks[i].dateFounded+"\", \""+
                        tasks[i].headquarters+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].name + `</td>
            <td>` + tasks[i].dateFounded + `</td>
            <td>` + tasks[i].headquarters + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}