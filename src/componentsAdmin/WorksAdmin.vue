<template>
  <div class="content-wrapper">
    <div class="row">

      <div class="col-md-12 stretch-card">
        <div class="card">
          <div class="card-body">
            <p class="card-title">
              <i class="fa fa-plus" v-if="showPlus" v-on:click="showFormCreateWork()"></i>
              <i class="fa fa-minus" v-if="showMenos" v-on:click="showFormCreateWork()"></i>
              Obras - proyectos <span class="numbreWorkss">{{ numbrerWorks }}</span> <input type="text" v-model="inputNameWorks" class="name_search" placeholder="Buscar el proyecto">
              </p>
          </div>
        </div>
      </div>

      <div class="col-12 grid-margin stretch-card" v-if="showMenos">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Crear nueva obra - proyecto</h4>
            <p class="card-description">
              Rellene datos necesarios
            </p>
            <form class="forms-sample">
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control" placeholder="Name" required v-model="nameWork">
              </div>
              <div class="form-group">
                <label>Dirección</label>
                <input type="text" class="form-control"  placeholder="Dirección" required v-model="adressWork">
              </div>
              <div class="form-group">
                <label>Presupuesto</label>
                <input type="text" class="form-control" placeholder="Presupuesto" v-model="priceWork">
              </div>
              <input class="btn btn-primary mr-2" v-on:click="saveWork" value="Guardar" type="button">
            </form>
          </div>
        </div>
      </div>

      <exit-save v-if="showGuardado" />
      <exit-save-red v-if="showErrorGurdado" />

    <div class="col-md-12 stretch-card" v-if="filteredAssets.length > 0">
        <div class="card">
          <div class="table-responsive">
            <table  class="table">
              <thead>
              <tr>
                <th>Nombre</th><th>Direccion</th><th>Presupuesto</th><th>Total horas</th><th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in filteredAssets" v-bind:key="index">
                <td><a href="#" v-on:click="showCustomWorkParts(value.id, value.name, value.adress, value.hours)">{{ value.name }}</a></td>
                <td>{{ value.adress }}</td>
                <td>{{ value.price }}</td>
                <td>{{ value.hours}}</td>
                <td><input value="Eliminar" type="button" class="delete" v-on:click="deleteWork(value.id, value.name)"/></td>
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
import { mapState } from "vuex";
import api_admin from "@/api/admin_api";
import ExitSave from "@/componentsAdmin/ExitSave";
import ExitSaveRed from "@/componentsAdmin/ExitSaveRed";
export default {
  name: 'WorksAdmin',
  components: { ExitSave, ExitSaveRed },
  data(){
    return{
      showPlus: true,
      showMenos: false,
      nameWork : "",
      adressWork: "",
      priceWork: "",
      showGuardado: false,
      showErrorGurdado: false,
      allWorks : [],
      inputNameWorks: ''
    }
  },
  props: {},
  methods:{
    getDataFromSon(info_from_son) { console.log(info_from_son);
      this.$emit("tiktak", false);
    },
    showFormCreateWork(){
         this.showPlus = ! this.showPlus; this.showMenos = ! this.showMenos;
    },
    showAndHideGuardado(x){
      if (x === 'ok'){this.showGuardado = true; setTimeout( () => {this.showGuardado = false;}, 5000); this.nameWork = ""; this.adressWork = ""; this.priceWork = ""; this.$store.dispatch("getGloballWorks"); }
      else {this.showErrorGurdado = true; setTimeout( () => {this.showErrorGurdado = false;}, 5000)}
    },
    saveWork(){
      this.showFormCreateWork();
      Promise.all([api_admin.bossSaveNewWork(window.localStorage.id, this.nameWork, this.adressWork, this.priceWork, "")])
      .then(([response]) => {
        this.showAndHideGuardado(response);
      });
    },
    showCustomWorkParts(work_id, work_name, work_address, hours){
      window.localStorage.work_id = work_id;    // сохраняем ID проекта, что бы вытянуть все его partes
      window.localStorage.work_name = work_name;
      window.localStorage.address = work_address;
      window.localStorage.hours_work_workrsAdmin = hours;
      this.$emit("tiktak222", false);
    },
    deleteWork(id, name){
      let nameProyect = prompt('Eliminar el proyecto, escribe el nombre') ;
      if(! nameProyect ) return ;
      if (nameProyect === name){
        Promise.all([api_admin.deleteWorkId(id)])
            .then(([response]) => {
              this.$store.dispatch("getGloballWorks");
              console.log('deleteWorkId', response);
            });
      } else{ alert(nameProyect + ' no existe') ; }
    }
  },
  created() {
    this.$store.dispatch("getGloballWorks");
  },
  computed:{
    ...mapState(["numbrerWorks","allWorksGlobal"]),
    filteredAssets(){
      return this.$store.state.allWorksGlobal.filter( a => a.name.toLowerCase().includes(this.inputNameWorks.toLowerCase()));
    }
  },
}
</script>


<style scoped>
.fa{
  font-size: 25px;
  color: #2768FF;
  float: right;
}
.name_works{
  margin-left: 22px;
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
.name_search{
  margin-left: 30px;
}
@media screen and (max-width: 640px) {
  .name_search{
    margin-left: 0; margin-top: 11px; display: block;
  }
}
</style>
