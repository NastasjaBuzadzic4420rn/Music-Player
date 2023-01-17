function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8080/api/reviews', { method:"GET", headers: {'Authorization':  `Bearer ${token}`}})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateTaskList(data);
    });

    document.getElementById("add_review").addEventListener("click", function(){
        console.log(this);
        let newData= {
            comment: document.getElementById("new_review_comment").value,
            rating: document.getElementById("new_review_rating").value,
            listenerID: document.getElementById("new_review_listener").value,
            songID: document.getElementById("new_review_song").value,
            
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/reviews' ,
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
                fetch('http://localhost:8080/api/reviews', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );
            });

            document.getElementById("new_review_comment").value = '';
            document.getElementById("new_review_rating").value = '';
            document.getElementById("new_review_listener").value = '';
            document.getElementById("new_review_song").value = '';
    });

    document.getElementById("change_review").addEventListener("click", function(){
        console.log(this);
        let newData= {
            comment: document.getElementById("change_review_comment").value,
            rating: document.getElementById("change_review_rating").value,
            listenerID: document.getElementById("change_review_listener").value,
            songID: document.getElementById("change_review_song").value,
            
        };

        nt = JSON.stringify(newData);
        fetch('http://localhost:8080/api/reviews/change/' + document.getElementById("change_review_id").innerHTML, { 
            method:"PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization':  `Bearer ${token}`
            },
            body: nt })
                .then( response=>response.json())
                .then( data => {
                    fetch('http://localhost:8080/api/reviews', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                        .then(response => response.json())
                        .then(data => updateTaskList(data));
                }); 

 
            document.getElementById("change_review_id").innerHTML = '';
            document.getElementById("change_review_comment").value = '';
            document.getElementById("change_review_rating").value = "5";
            document.getElementById("change_review_listener").value = '';
            document.getElementById("change_review_song").value = '';
             
    });

    document.getElementById("delete_review").addEventListener("click", function(){
        console.log(this);
        fetch('http://localhost:8080/api/reviews/delete/'+document.getElementById("delete_review_id").value, { method:"DELETE", headers: {'Authorization':  `Bearer ${token}`} })
            .then( response=>response.json())
            .then( data => {
                fetch('http://localhost:8080/api/reviews', { method:"GET", headers: {'Authorization':  `Bearer ${token}`} })
                    .then(response => response.json())
                    .then(data => updateTaskList(data) );

            });
            document.getElementById("delete_review_id").value = '';
    });

    document.getElementById("empty").addEventListener("click", function(){
        document.getElementById("change_review_id").innerHTML = '';
            document.getElementById("change_review_comment").value = '';
            document.getElementById("change_review_rating").value = "5";
            document.getElementById("change_review_listener").value = '';
            document.getElementById("change_review_song").value = '';
             
    });

}

function fill(id, comment, rating, listener, song){
    document.getElementById("change_review_id").innerHTML = id;
    document.getElementById("change_review_comment").value = comment;
    document.getElementById("change_review_rating").value = rating;
    document.getElementById("change_review_listener").value = listener;
    document.getElementById("change_review_song").value = song;

}

function updateTaskList(tasks){
    console.log(tasks);
    var table = document.getElementById("reviews");
    table.innerHTML = "";
    for(i in tasks){
        let data = "\""+tasks[i].id+"\", \""+
                        tasks[i].comment+"\", \""+
                        tasks[i].rating+"\", \""+
                        tasks[i].listenerID+"\", \""+
                        tasks[i].songID+"\""
        let readHTML = `<tr onclick='fill(` + data + `)'>
            <td>` + tasks[i].id + `</td>
            <td>` + tasks[i].songID + `</td>
            <td>` + tasks[i].listenerID + `</td>
            <td>` + tasks[i].comment + `</td>
            <td>` + tasks[i].rating + `</td>
            </tr>`;
        table.innerHTML += readHTML;
    }
}