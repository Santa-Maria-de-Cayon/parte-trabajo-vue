<template>
    <div class="container-scroller">

      <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="navbar-brand-wrapper d-flex justify-content-center">
          <div class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
            {{ company }}
          </div>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item nav-profile dropdown">
              El trabajador <br> {{ email }}
            </li>
            <li class="nav-item nav-profile dropdown">
              <i class="fa fa-briefcase menu-icon" v-on:click="showCustomElement('obra')"></i>
            </li>
          </ul>
        </div>
      </nav>

      <div class="container-fluid page-body-wrapper">
        <nav class="sidebar sidebar-offcanvas">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" href="#" v-on:click="showCustomElement('obra')">
                <i class="fa fa-briefcase menu-icon"></i>
                <span class="menu-title"> Obras - proyectos </span>
              </a>
            </li>
          </ul>
        </nav>
        <div class="main-panel">
          <works-worker v-show="showWorks" v-on:tiktakworker="hiddenAllWorkCompnent"/>
          <worker-parts v-if="showParts"/>
          <footer-admin />
        </div>
      </div>
    </div>
</template>

<script>
import WorksWorker from "@/componentsWorker/WorksWorker";
import WorkerParts from "@/componentsWorker/PartsWorker";
import FooterAdmin from "@/componentsAdmin/FooterAdmin";
import api from "@/api/api";

export default {
  components:{WorksWorker, WorkerParts, FooterAdmin},
  data(){
    return {
      showWorks : true,
      showParts : false,
      showGuardado : false,
      showErrorGurdado: false,
      company: window.localStorage.company,
      email : window.localStorage.email,
      inputNameWorks: ""
    }
  },
  methods: {
    showCustomElement(tableName){ this.showParts = false;
      switch (tableName){
        case 'obra': this.showWorks = true;
      }
    },
    hiddenAllWorkCompnent(x){ console.log(x);
        this.showWorks = false; this.showParts = true
    }
  },
  created() {
    api.testAuthDasboad(window.localStorage.id_worker, window.localStorage.role, window.localStorage.email, window.localStorage.password);
  }
}
</script>


<style scoped>

</style>