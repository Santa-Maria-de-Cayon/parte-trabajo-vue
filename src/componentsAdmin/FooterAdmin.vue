<template>
  <footer class="footer">
    <div class="d-sm-flex justify-content-center justify-content-sm-between">
      <span class="text-muted text-center text-sm-left d-block d-sm-inline-block"><router-link to="/info">Más info </router-link> {{ user }}.</span>
    </div>
  </footer>
</template>

<script>
export default {
  data(){
    return{
      user: window.localStorage.user ? window.localStorage.user : 'Admin'
    }
  }
}
</script>