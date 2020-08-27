<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
        <div class="row flex-grow">
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <div class="auth-form-transparent text-left p-3">
              <div class="brand-logo">
               <h2>PARTES DE TRABAJO - ENTRAR</h2>
                <h3>¿Cómo funciona? <router-link to="/info">Más info</router-link></h3>
              </div>
              <form class="pt-3">
                <div class="form-group">
                  <label>El papel de la cuenta</label>
                  <select class="form-control form-control-lg" v-model="role" :required="true" @change="changeLocation">
                    <option>Gerente - administrador</option>
                    <option>Encargado</option>
                    <option>Trabajador</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>El correo electronico</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                         <i class="fa fa-envelope text-primary"></i>
                      </span>
                    </div>
                    <input type="email" class="form-control form-control-lg border-left-0"  placeholder="Email" v-model="userMail">
                  </div>
                </div>
                <div class="form-group">
                  <label>La contraseña</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                         <i class="fa fa-key text-primary"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-lg border-left-0" placeholder="Contraseña" v-model="password">
                  </div>
                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      Manténgame conectado
                    </label>
                  </div>
                  <router-link to="/">¿Olvidó la contraseña?</router-link>
                </div>
                <div class="my-3">
                  <div style="text-align: center;margin-bottom: 22px;" v-if="isLoading">
                    <img src="https://buscador.asisa.es/static/media/loader-icon.1.0.41.gif" alt="" class="img_loader">
                  </div>
                  <a v-if="!isLoading" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="#" v-on:click="startSesion">ENTRAR</a>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  No tengo una cuenta <router-link to="/register">Crear</router-link>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-6 login-half-bg d-flex flex-row">
            <p class="text-white font-weight-medium text-center flex-grow align-self-end">Copyright &copy; 2022  All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import global_url from "@/api/global_url";
export default {
  components:{  },
  name : "Login",
  data(){
    return{
      isLoading: false,
      role: "Gerente - administrador",
      roleToSent: "",
      companyName : '',
      userMail: window.localStorage.email ? window.localStorage.email : "",
      password: window.localStorage.password ? window.localStorage.password : "",
    }
  },
  methods:{
    startSesion(){                       this.isLoading = true;
      switch (this.role){
        case "Gerente - administrador": this.roleToSent = 'boss'; break;
        case "Encargado" : this.roleToSent = 'manager'; break;
        case "Trabajador" : this.roleToSent = "worker"; break;
      }
      this.tryStartSesion(this.roleToSent);
    },
    async tryStartSesion(user_role){
      if(this.userMail == ""){this.isLoading = false; alert('El email vacio'); return; }
      if(this.password == ""){ this.isLoading = false; alert('Contraseña'); return; }

      console.log('start request feth , and role = ', user_role);
      var formData = new FormData();
      formData.append('role', user_role);
      formData.append('email', this.userMail);
      formData.append('password', this.password);

      try{
        let url = global_url.path + '/login';
        let response  = await fetch(url, {method: 'POST', body: formData});
        let result = await response.json();
              window.localStorage.role = result['role']
              window.localStorage.id = result['id'];
              window.localStorage.id_manager = result['id_manager'] ? result['id_manager'] : '';
              window.localStorage.company = result['company'];
              window.localStorage.email = result['email'];
              window.localStorage.password = result['password'];
              window.localStorage.user = result['user'] ? result['user'] : "";
              window.localStorage.id_worker = result['id_worker'] ? result['id_worker'] : "";

        if(result['enter'] === 'ok'){                this.isLoading = false;
          switch (window.localStorage.role){
            case 'boss':    this.$router.push('/dashboard-admin/'+window.localStorage.company);  break;
            case 'manager': this.$router.push('/dashboard-manager/'+window.localStorage.company);break;
            case 'worker':  this.$router.push('/dashboard-worker/'+window.localStorage.company); break;
          }
        }  else { this.isLoading = false; alert ('A ocurrdido un error enexplicable, intente otra vez por favor');  }
      } catch (e) { this.isLoading = false;
        alert('Contraseña o correo electronico o el papel no valido');
      }
    },
    changeLocation(){}
  },
  created() {
    window.localStorage.role = '';
    window.localStorage.id = '';
    window.localStorage.id_manager = '';
    window.localStorage.company = '';
  }
}
</script>

<style scoped>
.img_loader{
  width: 40px;
}
</style>