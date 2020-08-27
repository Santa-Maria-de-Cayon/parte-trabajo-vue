import global_url from "@/api/global_url";




async function testAuthDasboad(id, role, email, password) {
    let url = global_url.path + '/test/auth';
    try{
        console.log('testAuthDasboad = ', 'id='+ window.localStorage.id, 'id_manager='+ window.localStorage.id_manager,window.localStorage.company, window.localStorage.role, window.localStorage.email, window.localStorage.password);

        const response = await fetch(url +'?id='+id+'&role='+role+'&email='+email+'&password='+password);
        const res = await response.json();
        console.log('testAuthDasboad = true == ', res.data);

        if(res.data !== true ){
            window.localStorage.id = '';
            window.localStorage.company = '';
            window.localStorage.role = '';
            window.localStorage.email = '';
            window.localStorage.password = '';
            alert('No estas autorizado');
            window.location.href = '/';
        }


    } catch (e){
        console.log("EROROROROROROROR", e);
        window.location.href = '/';
    }
}

export default {
    testAuthDasboad
}