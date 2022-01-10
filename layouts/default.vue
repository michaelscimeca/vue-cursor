<template>
<div id="app">
  <CursorDot />

  <div id="layout">
    <nav id="main-nav">
      <div id="logo"></div>
      <div id="menu"></div>
      <div id="data"></div>
    </nav>

    <main id="main">
      <ul id="category-nav">
        <li>Design</li>
        <li>Ads</li>
        <li>Websites</li>
      </ul>

      <div id="project-content">
        <div v-for="item, i in items" class="project-one-blist" data-cursor-hover :data-img="item.img" :data-size="item.size" :data-distance="item.distance">
          <img :src="item.img" alt="img">
        </div>
      </div>
    </main>
  </div>
  <!-- :class="[{'touchevents': touchevents, 'no-touchevents': !touchevents }, `${browserClass}`]"> -->
  <nuxt />
</div>
</template>

<script>
import touchevents from '~/mixins/touchevents';
// import NavBar from '~/components/NavBar';
import CursorDot from '~/components/CursorDot';

export default {
  components: {
    CursorDot,
    // NavBar
  },
  mixins: [
    touchevents
  ],
  data() {
    return {
      browserClass: 'this.$ua.browser()',
      items: [{
          img: '/img/cat.jpg',
          size: 35,
          distance: 300,
        },
        {
          img: '/img/image.jpg',
          size: 45,
          distance: 300,
        },
        {
          img: '/img/image.jpg',
          size: 45,
          distance: 300,
        },
        {
          img: '/img/cat.jpg',
          size: 66,
          distance: 300,
        }
      ]
    };
  },
  computed: {
    // touchevents() {
    //   return this.$store.state.global.touchevents;
    // },
    // navBarReady() {
    //   return this.$store.state.global.navBarReady;
    // },
    // fromServer: function () {
    //   return this.$store.state.global.fromServer;
    // }
  },
  watch: {
    // $route () {
    //   document.body.classList.add('out');
    // },
    // fromServer (newVal) {
    //   if (!newVal) {
    //     this.$nuxt.$emit('startLoco');
    //   }
    // }
  },
  created: function() {},
  mounted: function() {
    this.$nuxt.$emit('stopLoco');
    window.addEventListener('resize', this.onResize);
    document.body.addEventListener('transitionend', this.bodyEnd);
    this.onResize();
    this.onOrientationChange();
    window.addEventListener('orientationchange', this.onOrientationChange);
  },
  destroyed: function() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onOrientationChange);
  },
  methods: {
    onResize() {
      this.$store.commit('global/setViewportHeight', window.innerHeight);
    },
    onOrientationChange: function() {
      if (window.orientation === 0 || window.orientation === 180) {
        document.body.classList.remove('landscape');
        this.$el.parentElement.style.height = '';
        setTimeout(() => {
          this.$nuxt.$emit('updateLoco');
          this.$store.commit('global/setViewportHeight', window.innerHeight);
        }, 100);
      } else {
        if (this.touchevents) {
          document.body.classList.add('landscape');
          setTimeout(() => {
            this.$el.parentElement.style.height = `${this.$store.state.global.viewportHeight}px`;
          }, 100);
        }
      }
    },
    bodyEnd(e) {
      if (e.target === document.body) {
        document.body.classList.remove('out');
        this.$nuxt.$emit('animateIn');
      }
    }
  }
};
</script>

<style lang="scss">
body {
    background-color: #161616;
    color: #fff;
}
// @import '@/assets/scss/imports';

#layout {
    display: flex;
    flex-direction: row;

    #main-nav {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 100px;
        height: 100vh;
        border-right: 1px solid #9e9e9e;

        #logo {
            height: 25px;
            width: 25px;
            background-color: red;
        }

        #menu {
            height: 25px;
            width: 25px;
            background-color: red;
        }
    }

    #main {
        margin-left: 100px;
        width: calc(100vw - 100px);
    }
}

#category-nav,
#main-nav,
#project-content {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    padding: 30px;
}

#category-nav {
    display: flex;
    border-bottom: 1px solid #9e9e9e;
    li {
        padding: 0 20px;
    }
}

#project-content {
    position: relative;
    // border-top: 1px solid red;
    height: calc(100vw - 100px);
    display: flex;
    flex-direction: row;
    padding: 30px;
    flex-wrap: wrap;

    .project-one-blist {
        position: relative;
        width: calc(50% - 40px);
        height: 25vh;
        margin: 20px;
        transition: all 350ms ease-in;
        box-sizing: border-box;
        background-color: green;

        img {
            height: 100%;
            width: 100%;
            overflow: hidden;
            object-fit: cover;
        }
    }
}
</style>
