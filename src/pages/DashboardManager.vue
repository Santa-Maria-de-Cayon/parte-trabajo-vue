<template>
  <section>
    <div class="container-scroller">
      <!-- top menu -->
      <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="navbar-brand-wrapper d-flex justify-content-center">
          <div class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
            {{ company }}
          </div>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item nav-profile dropdown">
              Encargado <br> {{ email }}
            </li>
            <li class="nav-item nav-profile dropdown">
              <i class="fa fa-briefcase menu-icon" v-on:click="showCustomElement('obra')"></i>
            </li>
            <li class="nav-item nav-profile dropdown" v-on:click="showCustomElement('trabajador')">
              <i class="fa fa-wrench menu-icon"></i>
            </li>
          </ul>
        </div>
      </nav>
      <!-- left menu -->
      <div class="container-fluid page-body-wrapper">
        <nav class="sidebar sidebar-offcanvas">
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" href="#" v-on:click="showCustomElement('obra')">
                <i class="fa fa-briefcase menu-icon"></i>
                <span class="menu-title"> Obras - proyectos </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" v-on:click="showCustomElement('trabajador')">
                <i class="fa fa-wrench menu-icon"></i>
                <span class="menu-title">Trabajadores </span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="main-panel">

          <work-manager v-show="showWorks" v-on:hide-my-works="hiddenAllComponent"/>
          <workers-manager v-show="showWorkers" />
          <parts-manager v-if="showParts"/>
          <footer-admin />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FooterAdmin from "@/componentsAdmin/FooterAdmin";
import WorkersManager from "@/componentsManager/WorkersManager";
import WorkManager from "@/componentsManager/WorkManager";
import PartsManager from "@/componentsManager/PartsManager";
import api from "@/api/api";

export default {
  name : "DashboardManager",
  components:{ WorkManager, WorkersManager, PartsManager, FooterAdmin },
  data() {
    return {
      company : window.localStorage.company ? window.localStorage.company : "",
      showWorks  : true,
      showWorkers: false,
      email : window.localStorage.email,
      showParts : false,
    }
  },
  methods: {
    showCustomElement(tableName){ // this.showParts = false;
      switch (tableName){
        case 'obra': this.showWorks = true; this.showWorkers = false;  this.showParts = false; break;
        case 'trabajador': this.showWorks = false; this.showWorkers = true; this.showParts = false; break
      }
    },
    hiddenAllComponent(x){ console.log(x); // _id_work, _name_work, _adress_work, _hours_work this.works_hours = window.localStorage._hours_work;
      this.showWorks = false; this.showWorkers = false; this.showParts = true;
    }
  },
  created() {
    api.testAuthDasboad(window.localStorage.id_manager, window.localStorage.role, window.localStorage.email, window.localStorage.password);
  }
}
</script>
























