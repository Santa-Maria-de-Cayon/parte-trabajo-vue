<template>
  <div class="content-wrapper">
    <div class="row">

      <div class="col-md-12 stretch-card">
        <div class="card">
          <div class="card-body">
            <p class="card-title">
              <i class="fa fa-plus" v-if="showPlus" v-on:click="showFormCreatePart()"></i>
              <i class="fa fa-minus" v-if="showMenos" v-on:click="showFormCreatePart()"></i>
              {{ work_name }} | {{ work_address }}  <input type="text" v-model="insertData" placeholder=" Fecha" class="name_works" />
              <br>Partes {{ parts }} | Horas: <span class="numbreWorkss">{{ works_hours }}</span> </p>
          </div>
        </div>
      </div>

      <!-- new parts form -->
      <div class="col-12 grid-margin stretch-card" v-if="showMenos">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Crear nuevo parte</h4>
            <p class="card-description">
              Gerente, rellene datos necesarios
            </p>
            <form class="forms-sample">
              <div class="form-group">
                <label>Fecha</label>
                <input type="date" class="form-control" placeholder="Name" required v-model="date">
              </div>
              <div class="form-group">
                <label>Horas</label>
                <input type="number" class="form-control" placeholder="Horas" v-model="hours">
              </div>
              <div class="form-group">
                <label>Material</label>
                <textarea type="text" class="form-control" placeholder="Material" v-model="material" ></textarea>
              </div>
              <div class="form-group">
                <label>Trabajo realizado</label>
                <textarea type="text" class="form-control" placeholder="Trabajo realizado" v-model="todo" ></textarea>
              </div>
              <input class="btn btn-primary mr-2" v-on:click="savePart" value="Guardar" type="button">
            </form>
          </div>
        </div>
      </div>

      <!-- PARTS Table-->
      <div class="col-md-12 stretch-card" v-if="allDataParts.length > 0">
        <div class="card">
          <div class="table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th>Fecha</th><th>Nombre</th><th>Tiempo</th><th>Material</th><th>Trabajo realizado</th><th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(value, index) in filteredAssets" v-bind:key="index">
                <td>{{ value.data }}</td>
                <td>{{ value.user }}</td>
                <td>{{ value.time}}</td>
                <td>{{value.material}}</td>
                <td>{{ value.todo }}</td>
                <th><input  v-if="value.createdfor === this.id_worker" value="Eliminar" v-on:click="deleteMyPart(value.id, value.data)" class="delete" type="button"/></th>
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
import admin_api from "@/api/admin_api";
import manager_api from "@/api/manager_api";

export default {
  name : "AdminPart",
  data(){
    return{
      id_worker: window.localStorage.id_worker,
      insertData : "",
      showPlus : true,
      showMenos: false,
      work_name: window.localStorage.work_name,
      work_address: window.localStorage.address,
      allDataParts : [],
      works_hours: ' Cargando ... ',
      date: "", hours: "", todo: "", material : "",
      parts : 0
    }
  },
  created() {
    this.work_name    =  window.localStorage.work_name ? window.localStorage.work_name.substring(0, 17) : "NaN";
    this.work_address = window.localStorage.address ? window.localStorage.address.substring(0, 17) :  "NaN";
    this.getAllParts();
  },
  methods:{
    showFormCreatePart(){ this.showPlus = ! this.showPlus; this.showMenos = ! this.showMenos;
    },
    savePart(){
      this.showFormCreatePart(); // date, user, time, material,todo, workid, createdfor
      manager_api.saveNewPart(this.date, window.localStorage.user, this.hours, this.material, this.todo, window.localStorage.work_id, window.localStorage.id_worker)
          .then(res => {
            console.log(res); window.localStorage.hours_work_workrsAdmin = res.timer;  this.getAllParts();
            this.$store.dispatch("getGloballWorks");
            this.date = ""; this.hours = ""; this.material = "";  this.todo = ""; this.$store.dispatch("getGloballWorks");
          });
    },
    getAllParts(){
      admin_api.adminGetCustomParts( window.localStorage.work_id )
          .then(res => {
            this.allDataParts = res.reverse(); this.parts = res.length;
            this.works_hours = window.localStorage.hours_work_workrsAdmin;
          });
    },
    deleteMyPart(id_part, data_part){
      let nameProyect = prompt('Eliminar el parte, escribe la fecha') ;
      if(! nameProyect ) return ;
      if (nameProyect === data_part){
        Promise.all([manager_api.deletePartId(id_part)])
            .then(([response]) => {
              window.localStorage.hours_work_workrsAdmin = response.hours;  this.$store.dispatch("getGloballWorks"); // устанавливаем часы для обры в значение с сервера
              this.getAllParts();
            });
      } else{ alert(nameProyect + ' no existe') ; }
    }
  },
  computed: {
    filteredAssets() {
      return  this.allDataParts.filter( a => a.data.toLowerCase().includes(this.insertData.toLowerCase()));
    }
  }

}
</script>


<style scoped>
.numbreWorkss{
  background: greenyellow;
  padding: 3px;
}
.numbreWorkss{
  background: greenyellow;
  padding: 3px;
}
.name_works{
  margin-left: 28px;
}
@media screen and (max-width: 640px) {
  .name_works{
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
.delete{
  border: none;
  padding: 5px;
  font-size: 16px;
}
</style>