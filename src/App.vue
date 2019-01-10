<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    background-color: #F7F7F7;
    width: 100%;
    overflow-x: hidden;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
  .picker {
    position: fixed;
    background-color: rgba(0, 0, 0, .2);
    width: 100%;
    height: 100%;
    top: 0;
  }
  .picker-items {
    background: #fff;
    bottom: 0;
    position: absolute;
    color: #ccc;
    width: 100%
  }
</style>
