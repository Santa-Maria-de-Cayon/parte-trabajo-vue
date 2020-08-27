<template>
  <div class="content-wrapper">
    <div class="row">

      <div class="col-md-12 stretch-card">
        <div class="card">
          <div class="card-body">
            <p class="card-title">
              Obras - proyectos <span class="numbreWorkss">{{ numbrerWorks }}</span> <input type="text" v-model="inputNameWorks" class="name_search" placeholder="Buscar el proyecto">
            </p>
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
                <th>Nombre</th><th>Direccion</th><th>Presupuesto</th><th>Total horas</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in filteredAssets" v-bind:key="index">
                <td><a href="#" v-on:click="showCustomWorkParts(value.id, value.name, value.adress, value.hours)">{{ value.name }}</a></td>
                <td>{{ value.adress }}</td>
                <td>{{ value.price }}</td>
                <td>{{ value.hours}}</td>
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
import ExitSave from "@/componentsAdmin/ExitSave";
import ExitSaveRed from "@/componentsAdmin/ExitSaveRed";
import {mapState} from "vuex";

export default {
  components: {ExitSave, ExitSaveRed},
  data(){
    return {
      showGuardado: false,
      showErrorGurdado: false,
      inputNameWorks : ""
    }
  },
  created() {
    this.$store.dispatch("getGloballWorks");
  },
  computed: {
    ...mapState(["numbrerWorks","allWorksGlobal"]),
    filteredAssets() {
      return this.$store.state.allWorksGlobal.filter( a => a.name.toLowerCase().includes(this.inputNameWorks.toLowerCase()));
    }
  },
  methods:{
    showCustomWorkParts(work_id, work_name, work_address, hours){
      window.localStorage.work_id = work_id;    // сохраняем ID проекта, что бы вытянуть все его partes
      window.localStorage.work_name = work_name;
      window.localStorage.address = work_address;
      window.localStorage.hours_work_workrsAdmin = hours;
      this.$emit("tiktakworker", false);
    },
  }
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
  float: right;
  margin-left: 30px;
}
@media screen and (max-width: 640px) {
  .name_search{
    margin-left: 0; margin-top: 11px; display: block;
  }
}
</style>