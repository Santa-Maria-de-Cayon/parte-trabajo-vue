import { createStore } from 'vuex';
import admin_api from "@/api/admin_api";

export default createStore({
  state: {
    numbrerWorks : " Cargando ... ",
    numbrerManager : " Cargando ... ",
    allWorksGlobal : [],
    allManagers: [],
    numbreWorkers : " Cargando ... ",
    allWorkers : []
  },
  mutations: {
      setGlobalWorks(state, dataX) {
      state.numbrerWorks = dataX.length;
      state.allWorksGlobal = dataX;
    },
      setGlobalManagers(state, dataY){
          state.allManagers = dataY;
          state.numbrerManager = dataY.length
      },
      setGlobalWorkers(state, dataZ){
          state.allWorkers = dataZ;
          state.numbreWorkers = dataZ.length
      },
  },
  modules: {},
  actions: {
    getGloballWorks(context){
        return admin_api.getAllWorks( window.localStorage.id )
          .then(res => {
            context.commit("setGlobalWorks", res.reverse());
          })
    },
    AdminGetGlobalManagersList(context){
        return admin_api.bossGetAllManagers(window.localStorage.id)
            .then(res => {
                context.commit("setGlobalManagers", res.reverse());
            })
    },
    AdminGetAllWorkers(context){
        return admin_api.bossGetAllWorkers(window.localStorage.id)
            .then(res => {
                context.commit("setGlobalWorkers", res.reverse());
            })
    }
  },
  getters:{}
})
