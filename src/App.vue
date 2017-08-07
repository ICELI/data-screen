<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        nextPage: '',
        firstScreen: ['page1', 'page2', 'page3', 'page4'],
        secondScreen: ['page5', 'page6', 'page7', 'page8']
      };
    },
    components: {},
    watch: {
      $route() {
        let isFirstScreen = this.firstScreen.indexOf(this.$route.name) > -1;
        let currentPage = isFirstScreen ? this.firstScreen.indexOf(this.$route.name) : this.secondScreen.indexOf(this.$route.name);
        this.nextPage = !isFirstScreen ? this.firstScreen[currentPage] : this.secondScreen[currentPage];

        console.log(this.$route.name, this.nextPage);
      },
    },
    computed: {},
    methods: {
      goNext(name) {
        this.$router.push(name);
        console.log('goNext', name);

      }
    },
    created() {
      console.dir(this.Api);
    },
    mounted() {
      localStorage.isFirstScreen = this.firstScreen.indexOf(this.$route.name) > -1;

      console.log('isFirstScreen', localStorage.isFirstScreen, this.$route.name);

      window.addEventListener('storage', (event) => {
        console.log(event.key + "=" + event.newValue);
        if (event.key === 'isFirstScreen') {
          this.goNext(this.nextPage);
        }
      }, false);

      document.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode === 38 || event.keyCode === 40) {
          localStorage.setItem('isFirstScreen', localStorage.isFirstScreen === 'false' ? 'true' : 'false');
          this.goNext(this.nextPage);
        }
      });


    }
  };

</script>
