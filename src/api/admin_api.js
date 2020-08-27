import global_url from "@/api/global_url";


function bossSaveNewWork(id, nameWork, adressWork, priceWork, createdfor) {
    let url = global_url.path + '/admin_save_new_work';
        var formData = new FormData();
        formData.append('id', id);
        formData.append('name', nameWork);
        formData.append('adress', adressWork);
        formData.append('price', priceWork);
        formData.append('createdfor', createdfor);

            return  fetch(url, {method: 'POST', body: formData})
                .then(response => response.json())
                .then(res => res['saved']);
}


function getAllWorks(id){
    let url = global_url.path + '/all_works';
    var formData = new FormData();
    formData.append('id', id);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json())
        // .then(res => res['saved']);
}


function deleteWorkId(id){
    let url = global_url.path + '/delete_work';
    var formData = new FormData();
    formData.append('id', id);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json())
        .then(res => res['saved']);
}


function bossSaveManager(company_id, company_name, name, email, password){
    let url = global_url.path + '/save_new_manager';
    var formData = new FormData();
    formData.append('c_id', company_id);
    formData.append('c_name', company_name);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json())
        .then(res => res['saved']);
}


function bossGetAllManagers(company_id){
    let url = global_url.path + '/all_managers';
    var formData = new FormData();
    formData.append('c_id', company_id);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json())
}


function bossDeleteManager(manager_id){
    let url = global_url.path + '/delete_manager';
    var formData = new FormData();
    formData.append('id', manager_id);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json());
}


function bossSaveWorker(company_id, company_name, name, email, password, createdfor){
    let url = global_url.path + '/save_worker';
    var formData = new FormData();
    formData.append('c_id', company_id);
    formData.append('c_name', company_name);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('createdfor', createdfor);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json());
}

function bossGetAllWorkers(company_id){
    let url = global_url.path + '/all_workers';
    var formData = new FormData();
    formData.append('c_id', company_id);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json());
}

function bossDeleteWorker(worker_id){
    let url = global_url.path + '/delete_worker';
    var formData = new FormData();
    formData.append('id', worker_id);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json());
}

function adminGetCustomParts(work_id){
    let url = global_url.path + '/get_parts';
    var formData = new FormData();
    formData.append('id', work_id);

    return  fetch(url, {method: 'POST', body: formData})
        .then(response => response.json());
}

export  default {
    bossSaveNewWork,
    getAllWorks,
    bossSaveManager,
    deleteWorkId,
    bossGetAllManagers,
    bossDeleteManager,
    bossSaveWorker,
    bossGetAllWorkers,
    bossDeleteWorker,
    adminGetCustomParts
};