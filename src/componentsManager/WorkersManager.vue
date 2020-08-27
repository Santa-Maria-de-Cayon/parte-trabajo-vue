<template>
  <div class="content-wrapper">
    <exit-save v-if="showGuardado" />
    <exit-save-red v-if="showErrorGurdado" />
    <div class="row">
      <div class="col-md-12 stretch-card">
        <div class="card">
          <div class="card-body">
            <p class="card-title">
              <i class="fa fa-plus" v-if="showPlus" v-on:click="showFormCreateWorkers()"></i>
              <i class="fa fa-minus" v-if="showMenos" v-on:click="showFormCreateWorkers()"></i>
              Trabajadores <span class="numbreWorkss">{{ numbreWorkers }}</span>
              <input type="text" v-model="inputNameWorker" class="name_search" placeholder="Buscar el trabajador">
             </p>
          </div>
        </div>
      </div>

      <div class="col-12 grid-margin stretch-card" v-if="showMenos">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Crear nuevo trabajador</h4>
            <p class="card-description">
              Rellene datos necesarios
            </p>
            <form class="forms-sample">
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" placeholder="Name" required v-model="nameWorker" aria-required="true">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control"  placeholder="Email" required v-model="emailWorker">
              </div>
              <div class="form-group">
                <label>Contraseña</label>
                <input type="text" class="form-control" placeholder="Contraseña" v-model="passwordWorker">
              </div>
              <input class="btn btn-primary mr-2" v-on:click="saveWorker" value="Guardar" type="button">
            </form>
          </div>
        </div>
      </div>


      <div class="col-md-12 stretch-card" v-if="filteredAllWorkers.length > 0">
        <div class="card">
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
                <tr v-for="(worker, index) in filteredAllWorkers" v-bind:key="index">
                  <td>{{ worker.name }}</td>
                  <td>{{ worker.email }}</td>
                  <td>{{ worker.password }}</td>
                  <td><input v-if="worker.createdfor == this.id_manager" type="button" value="Eliminar" class="delete" v-on:click="deleteWorker(worker.id, worker.name)"></td>
                </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ExitSave from "@/componentsAdmin/ExitSave";
import ExitSaveRed from "@/componentsAdmin/ExitSaveRed";
import api_admin from "@/api/admin_api";
import admin_api from "@/api/admin_api";

export default {
  components:{ExitSave, ExitSaveRed},
  data(){
    return {
      id_manager : window.localStorage.id_manager,
      nameWorker : '',
      emailWorker: '',
      passwordWorker: '',
      inputNameWorker : "",
      showPlus : true,
      showMenos: false,
      showGuardado: false,
      showErrorGurdado: false,
    }
  },
  computed: {
    ...mapState(["numbreWorkers","allWorkers"]),
    filteredAllWorkers(){
      return  this.$store.state.allWorkers.filter( a => a.name.toLowerCase().includes(this.inputNameWorker.toLowerCase()));
    }
  },
  created() {
    this.$store.dispatch("AdminGetAllWorkers");
  },
  methods:{
    showFormCreateWorkers(){
      this.showPlus = ! this.showPlus; this.showMenos = ! this.showMenos;
    },
    showAndHideGuardado(x){
      if (x === 'ok'){this.showGuardado = true; setTimeout( () => {this.showGuardado = false;}, 5000); this.nameWorker = ""; this.emailWorker = ""; this.passwordWorker = ""; this.$store.dispatch("AdminGetAllWorkers"); }
      else {this.showErrorGurdado = true; setTimeout( () => {this.showErrorGurdado = false;}, 5000)}
    },
    saveWorker(){                                 //// company_id, company_name, name, email, password
      this.showFormCreateWorkers();
      try{
        Promise.all([ admin_api.bossSaveWorker ( window.localStorage.id, window.localStorage.company, this.nameWorker, this.emailWorker, this.passwordWorker, window.localStorage.id_manager )])
            .then(() => {
              this.showAndHideGuardado('ok');
            });
      } catch (e){
        this.showAndHideGuardado('noooo');
      }
    },
    deleteWorker(id, worker_name){
      let nameProyect = prompt('Eliminar el trabajador, escribe el nombre') ;
      if(! nameProyect ) return ;
      if (nameProyect === worker_name){
        Promise.all([api_admin.bossDeleteWorker(id)])
            .then(() => {
              this.$store.dispatch("AdminGetAllWorkers");
            });
      } else{ alert(nameProyect + ' no existe') ; }
    }
  }
}
</script>

<style scoped>
.name_search{
  margin-left: 30px;
}
@media screen and (max-width: 640px) {
  .name_search{
    margin-left: 0; margin-top: 11px; display: block;
  }
}
.fa{
  margin-left: 11px;
  color:#2768FF;
  font-size: 22px;
  float: right;
}
.fa:hover{
  cursor: pointer; color: #0771b7;
}
.numbreWorkss{
  background: greenyellow;
  padding: 3px;
}
a{
  text-decoration: none;
}
.delete{
  border: none;
  padding: 5px;
}
.name_works{
  margin-left: 28px;
}
</style>