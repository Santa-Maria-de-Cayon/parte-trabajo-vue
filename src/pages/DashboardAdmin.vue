<template>
  <section>
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
              Gerente <br> {{ email }}
            </li>
            <li class="nav-item nav-profile dropdown">
              <i class="fa fa-briefcase menu-icon" v-on:click="showCustomElement('obra')"></i>
            </li>
            <li class="nav-item nav-profile dropdown">
              <i class="fa fa-user menu-icon" v-on:click="showCustomElement('encargado')"></i>
            </li>
            <li class="nav-item nav-profile dropdown" v-on:click="showCustomElement('trabajador')">
              <i class="fa fa-wrench menu-icon"></i>
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
            <li class="nav-item">
              <a class="nav-link" href="#" v-on:click="showCustomElement('encargado')">
                <i class="fa fa-user menu-icon"></i>
                <span class="menu-title">Encargados </span>
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
          <works-admin v-show="showWorks" v-on:tiktak222="hiddenAllComponent" />
          <managers-admin v-show="showManagers" />
          <workers-admin v-show="showWorkers" />
          <admin-parts v-if="showParts"/>
          <footer-admin />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/api/api";
import WorksAdmin from "@/componentsAdmin/WorksAdmin";
import ManagersAdmin from "@/componentsAdmin/ManagersAdmin";
import WorkersAdmin from "@/componentsAdmin/WorkersAdmin";
import FooterAdmin from "@/componentsAdmin/FooterAdmin";
import AdminParts from "@/componentsAdmin/AdminParts";
export default {
  name : "DashboardAdmin",
  components:{WorksAdmin, ManagersAdmin, WorkersAdmin, AdminParts, FooterAdmin},
  data(){
    return{
      company: window.localStorage.company,
      showWorks : true,
      showManagers: false,
      showWorkers :false,
      showParts : false,
      customVariable: '',
      email : window.localStorage.email
    }
  },
  methods:{
    hiddenAllComponent(x){ console.log(x);
      this.showWorks = false; this.showManagers = false; this.showWorkers = false; this.showParts = true;
    },
    showCustomElement(tableName){ this.showParts = false;
      switch (tableName){
        case 'obra': this.showWorks = true; this.showManagers = false; this.showWorkers = false; break;
        case 'encargado': this.showWorks = false; this.showManagers = true; this.showWorkers = false; break;
        case 'trabajador': this.showWorks = false; this.showManagers = false; this.showWorkers = true; break;
      }
    }
  },
  created() {
   api.testAuthDasboad(window.localStorage.id, window.localStorage.role, window.localStorage.email, window.localStorage.password);
  }
}
</script>

<style>
.fa{
  margin-left: 11px;
  color:#2768FF;
  font-size: 22px;
}
.fa:hover{
  cursor: pointer; color: #0771b7;
}
</style>