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
@font-face {
    font-family: 'webfont';
    /* font-display: swap; */
    src: url('http://at.alicdn.com/t/webfont_ijyzfe7rl4.eot'); /* IE9*/
    src: url('http://at.alicdn.com/t/webfont_ijyzfe7rl4.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('http://at.alicdn.com/t/webfont_ijyzfe7rl4.woff2') format('woff2'),
    url('http://at.alicdn.com/t/webfont_ijyzfe7rl4.woff') format('woff'), /* chrome、firefox */
    url('http://at.alicdn.com/t/webfont_ijyzfe7rl4.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('http://at.alicdn.com/t/webfont_ijyzfe7rl4.svg#after') format('svg'); /* iOS 4.1- */
}
#app {
  /* font-family: cursive; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app .web-font{
  font-family:"webfont" !important;
  font-size:30px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
