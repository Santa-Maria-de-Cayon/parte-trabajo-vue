<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
        <div class="row flex-grow">
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <div class="auth-form-transparent text-left p-3">
              <div class="brand-logo">
                <h2>Partes de trabajo - Registrarse</h2>
              </div>
              <h6 class="font-weight-light">¡Únase a nosotros hoy! Sólo se necesitan unos pocos pasos. <router-link to="/info">Más info</router-link></h6>
              <form class="pt-3">
                <div class="form-group">
                  <label>El nombre Empresa</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="fa fa-building text-primary"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-lg border-left-0" placeholder="Nombre Empresa" v-model="companyName">
                  </div>
                </div>
                <div class="form-group">
                  <label>El correo electrónico</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="fa fa-envelope text-primary"></i>
                      </span>
                    </div>
                    <input type="email" class="form-control form-control-lg border-left-0" placeholder="Correo electrónico" v-model="userMail">
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
                    <input type="text" class="form-control form-control-lg border-left-0"  placeholder="Contraseña" v-model="password">
                  </div>
                </div>
                <div class="form-group">
                  <label>Repite la contraseña</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="fa fa-key text-primary"></i>
                      </span>
                    </div>
                    <input type="text" class="form-control form-control-lg border-left-0"  placeholder="Repite contraseña" v-model="secondPassword">
                  </div>
                </div>
                <div class="mb-4">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      Estoy de acuerdo con todos los Términos y Condiciones
                    </label>
                  </div>
                </div>
                <div class="mt-3">
                  <div style="text-align: center;margin-bottom: 22px;" v-if="isLoading">
                    <img src="https://buscador.asisa.es/static/media/loader-icon.1.0.41.gif" alt="" class="img_loader">
                  </div>
                  <a v-if="!isLoading" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="#" v-on:click="startRegister">INSCRÍBETE</a>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  ¿Ya tengo una cuenta? <router-link to="/">Entrar</router-link>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-6 register-half-bg d-flex flex-row">
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
  created() {
      this.goToLoginOrgoToDashboad();
  },
  name: 'Register',
  components: {},
  data() {
    return {
      isLoading: false,
      companyName : "", userMail: "", password: "", secondPassword: ""
    }
  },
  methods:{
    startRegister(){ this.isLoading = true;
      this.makeFetch();
      console.log('= ', this.companyName + " " + this.userMail + " " + this.password);
    },
    async  makeFetch() {
      if(this.secondPassword !== this.password){ this.isLoading = false;
        alert('Las contraseñas no coinciden'); return;
      }
      if(this.companyName == ""){this.isLoading = false; alert('Nombre de la empresa vacio'); return; }
      if(this.userMail == ""){this.isLoading = false; alert('El email vacio'); return; }
      if(this.password == ""){ this.isLoading = false; alert('Contraseña'); return; }
      console.log('start request feth');
      var formData = new FormData();
      formData.append('company', this.companyName);
      formData.append('email', this.userMail);
      formData.append('password', this.password);
      try{
        let url = global_url.path + '/register'
        let response  = await fetch(url, {method: 'POST', body: formData});
        let result = await response.json();
        if(result['saved'] === 'ok'){
          window.localStorage.company = this.companyName;
          window.localStorage.email = this.userMail;
          alert('Registrado con exito');
          this.$router.push('/');
        } else { this.isLoading = false; alert('A ocurrdido un error enexplicable, intente otra vez por favor'); }
        this.isLoading = false;
      } catch (e) {  this.isLoading = false;
        alert('Nombre de la empresa o correo electronico ya existen, elige otro')
        console.log(e);
      }
    },
    goToLoginOrgoToDashboad(){
    //  if(window.localStorage.company && window.localStorage.email){
    //    this.$router.push('login');
    //  }
    }
  }
}
</script>

<style scoped>
.img_loader{
  width: 40px;
}
</style>