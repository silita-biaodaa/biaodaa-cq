<template>
  <div id="app">
    <router-view v-if="isRouter"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      isRouter:true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouter = false
      this.$nextTick(function() {
        this.isRouter = true
      })
    },
  }
}
</script>

<style>
@import './base/base.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
