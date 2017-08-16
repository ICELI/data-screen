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
        let times = 5;// 切屏时长 分钟
        let isFirstScreen = this.firstScreen.indexOf(this.$route.name) > -1;
        let currentPage = isFirstScreen ? this.firstScreen.indexOf(this.$route.name) : this.secondScreen.indexOf(this.$route.name);
        this.nextPage = !isFirstScreen ? this.firstScreen[currentPage] : this.secondScreen[currentPage];
        // 每屏的第一个窗口执行定时切换大屏任务
        if(this.$route.name === this.firstScreen[0] || this.$route.name === this.secondScreen[0]) {
          console.info(`======大屏定时切换主控页面======== ${this.$route.name} 至 ${this.nextPage}，间隔${times}分钟`);

          this.timer = setTimeout(() => {
            localStorage.setItem('isFirstScreen', localStorage.isFirstScreen === 'false' ? 'true' : 'false');
            this.goNext(this.nextPage);
          }, times * 60 * 1000);
        }

        console.log('watch $route', this.$route.name, this.nextPage);
      },
    },
    computed: {},
    methods: {
      goNext(name) {
        window.clearTimeout(window._time0);
        window.clearTimeout(window._time7);
        window.clearTimeout(window._time02);
        window.clearTimeout(window._time);
        window.clearTimeout(window._time2);
        window.clearTimeout(window._time21);
        window.clearTimeout(window._time3);

        this.$router.push(name);
        clearTimeout(this.timer);
        console.log('goNext', name);
      }
    },
    created() {
      console.dir(this.Api);
    },
    mounted() {
      localStorage.isFirstScreen = this.firstScreen.indexOf(this.$route.name) > -1;

//      console.log('isFirstScreen', localStorage.isFirstScreen, this.$route.name);

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

<style>
  #app > div {
    padding: 0 10px;
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
  }
</style>
