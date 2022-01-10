<template>
  <div>
    <section>
      <div class="row align-center">
        <div class="small-11 large-10 columns">
          <h1 v-if="error.statusCode === 404">Page not found</h1>
          <h1 v-else>An error occurred</h1>
          <nuxt-link to="/">Home page</nuxt-link>
        </div>
      </div>

    </section>
    <!-- <Footer/> -->
  </div>
</template>

<script>
import meta from '~/mixins/meta.js';
import introAnimation from '~/mixins/introAnimation.js';
// import Footer from '~/components/Footer.vue';

export default {
  props: ['error'],
  mixins: [
    meta,
    introAnimation
  ],
  components: {
    // Footer
  },
  data () {
    return {
      introDuration: 400
    };
  },
  mounted: function () {}
};
</script>

<style lang="scss" scoped>
// @import '@/assets/scss/imports';
.container {
  height: 50vh;
  padding-top: 102px;
  padding-bottom: 40px;

  // @include breakpoint(medium) {
  //   padding-top: 170px;
  // }
  //
  // @include breakpoint(large) {
  //   padding-top: 130px;
  // }

  + footer {
    // @include breakpoint(medium) {
    //   padding-bottom: calc(10vh);
    // }
  }
}
</style>
