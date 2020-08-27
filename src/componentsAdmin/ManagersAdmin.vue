<template>
  <div class="content-wrapper">
    <exit-save v-if="showGuardado" />
    <exit-save-red v-if="showErrorGurdado" />
    <div class="row">

      <div class="col-md-12 stretch-card">
        <div class="card">
          <div class="card-body">
            <p class="card-title">
              <i class="fa fa-plus" v-if="showPlus" v-on:click="showFormCreateManager()"></i>
              <i class="fa fa-minus" v-if="showMenos" v-on:click="showFormCreateManager()"></i>
              ENCARGADOS <span class="numbreWorkss">{{ numbrerManager }}</span> <input type="text" v-model="inputNameManager" class="name_search" placeholder="Buscar el encargado">
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 grid-margin stretch-card" v-if="showMenos">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Crear nuevo encargado</h4>
            <p class="card-description">
              Rellene datos necesarios
            </p>
            <form class="forms-sample">
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" placeholder="Name" required v-model="nameManager" aria-required="true">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control"  placeholder="Email" required v-model="emailManager">
              </div>
              <div class="form-group">
                <label>Contraseña</label>
                <input type="text" class="form-control" placeholder="Contraseña" v-model="passwordManager">
              </div>
              <input class="btn btn-primary mr-2" v-on:click="saveManager" value="Guardar" type="button">
            </form>
          </div>
        </div>
      </div>


      <div class="col-md-12 stretch-card" v-if="filteredAllManagers.length > 0">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Contraseña</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(manager, index) in filteredAllManagers" v-bind:key="index">
                  <td>{{ manager.name }}</td>
                  <td>{{ manager.email }}</td>
                  <td>{{ manager.password }}</td>
                  <td><input type="button" value="Eliminar" class="delete" v-on:click="deleteManager(manager.id, manager.name)"></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import ExitSave from "@/componentsAdmin/ExitSave";
import ExitSaveRed from "@/componentsAdmin/ExitSaveRed";
import admin_api from "@/api/admin_api";
import {mapState} from "vuex";
import api_admin from "@/api/admin_api";
export default{
  name : 'ManagerAdmin',
  components:{ExitSaveRed, ExitSave},
  data(){
    return{
      nameManager: '',
      emailManager: '',
      passwordManager: '',
      showPlus: true,
      showMenos: false,
      showGuardado: false,
      showErrorGurdado: false,
      inputNameManager: '',
    }
  },
  methods:{
    showAndHideGuardado(x){
      if (x === 'ok'){this.showGuardado = true; setTimeout( () => {this.showGuardado = false;}, 5000); this.nameManager = ""; this.emailManager = ""; this.passwordManager = ""; this.$store.dispatch("AdminGetGlobalManagersList"); }
      else {this.showErrorGurdado = true; setTimeout( () => {this.showErrorGurdado = false;}, 5000)}
    },
    showFormCreateManager(){
      this.showPlus = ! this.showPlus; this.showMenos = ! this.showMenos;
    },
    saveManager(){                                 //// company_id, company_name, name, email, password
      this.showFormCreateManager();
      try{
        Promise.all([ admin_api.bossSaveManager( window.localStorage.id, window.localStorage.company, this.nameManager, this.emailManager, this.passwordManager )])
            .then(() => {
              this.showAndHideGuardado('ok');
            });
      } catch (e){
        this.showAndHideGuardado('noooo');
      }
    },
    deleteManager(id, manager_name){
      let nameProyect = prompt('Eliminar el encargado, escribe el nombre') ;
      if(! nameProyect ) return ;
      if (nameProyect === manager_name){
        Promise.all([api_admin.bossDeleteManager(id)])
            .then(() => {
              this.$store.dispatch("AdminGetGlobalManagersList");
            });
      } else{ alert(nameProyect + ' no existe') ; }
    }
  },
  created() {
    this.$store.dispatch("AdminGetGlobalManagersList");
  },
  computed:{
    ...mapState(["numbrerManager","allManagers"]),
    filteredAllManagers(){
     return  this.$store.state.allManagers.filter( a => a.name.toLowerCase().includes(this.inputNameManager.toLowerCase()));
    }
  }
}
</script>



<style scoped>
.fa{
  font-size: 25px;
  color: #2768FF;
  float: right;
}
.delete{
  border: none;
  padding: 5px;
}
.name_works{
  margin-left: 22px;
}
.numbreWorkss{
  background: greenyellow;
  padding: 3px;
}
.name_search{
  margin-left: 30px;
}
@media screen and (max-width: 640px) {
  .name_search{
    margin-left: 0; margin-top: 11px; display: block;
  }
}
</style>


