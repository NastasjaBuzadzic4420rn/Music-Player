function init(){
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8080/api/admins', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   
    fetch('http://localhost:8080/api/albums', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   
    fetch('http://localhost:8080/api/artistCollaborations', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });  
    
    fetch('http://localhost:8080/api/artists', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   
        
    fetch('http://localhost:8080/api/collaborations', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/episodes', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/follows', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/index', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/listenerPodcasts', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });  
    fetch('http://localhost:8080/api/listeners', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });    

    fetch('http://localhost:8080/api/playlists', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/playlistSongs', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/podcasts', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/recordLabels', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/reviews', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

    fetch('http://localhost:8080/api/songs', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            
            data.forEach( el => {
                const lst = document.getElementById('admins');

                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
                });
            });
    });   

}