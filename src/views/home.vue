<template>
  <div class="home">
    <button type="button" @click="openWindow">孔雀开屏</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goHomeTimeout: null,
      };
    },
    created() {
      this.goHomeTimeout = setTimeout(() => this.$router.push('/'), 5000);
    },
    methods: {
      openWindow: function () {
        window.open(
          "/page1",
          "_blank",
          "left=0,top=0,width=500,height=700,fullscreen, resizable=no,scrollbars=no,status=no"
        );
        window.open(
          "/page2",
          "_blank",
          "left=500,top=0,width=500,height=700,fullscreen, resizable=no,scrollbars=no,status=no"
        );
        window.open(
          "/page3",
          "_blank",
          "left=1000,top=0,width=500,height=700,fullscreen, resizable=no,scrollbars=no,status=no"
        );
        window.open(
          "/page4",
          "_blank",
          "left=1500,top=0,width=500,height=700,fullscreen, resizable=no,scrollbars=no,status=no"
        );
      }
    },
    beforeRouteLeave(to, from, next) {
      clearTimeout(this.goHomeTimeout);
      next();
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
.home {
  button {
    margin: 20px;
    padding: 5px 10px;
    color: #2788e8;
    background-color: #fff;
  }
}
</style>
