<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {};
    },
    components: {
    },
    watch: {
      $route() {
      },
    },
    computed: {
    },
    methods: {
    },
    created() {
      console.dir(this.Api);
    },
  };

</script>
