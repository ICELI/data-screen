<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };

</script>

<style>
  #app > div {
    padding: 0 10px;
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
  }
</style>
