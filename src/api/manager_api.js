import global_url from "@/api/global_url";

function saveNewPart(date, user, time, material, todo, workid, createdfor) {
    let url = global_url.path + '/save_part';
    var formData = new FormData();

    if(time < 0 || time > 23 ) {
        alert('Formato horas incorrecto'); return ;
    }

    if(date == "") {
        alert('Formato fecha incorrecto'); return ;
    }
    if(material.length == 0) material = "";
    if(todo.length == 0) todo = "";

    formData.append('date', date);
    formData.append('user', user);
    formData.append('time', time);
    formData.append('material', material);
    formData.append('todo', todo);
    formData.append('workid', workid)
    formData.append('createdfor', createdfor)

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json())
}


function deletePartId(id_part){
    var formData = new FormData();
    formData.append('id_part', id_part);
    return  fetch('http://127.0.0.1:8000/delete_part', {method: 'POST', body: formData})
        .then(response => response.json())
}

export default {
    saveNewPart, deletePartId
}