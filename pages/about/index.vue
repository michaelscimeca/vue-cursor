<template>
<div id="about-page" :class="introClasses">

  <!-- <canvas id="canvas"></canvas> -->

  <!-- <div id="track">
    <div v-for="project in projects" :key="project.id">
      <div class="item"> {{ project.projectTitle}}</div>
    </div>
  </div> -->

</div>
</template>

<script>
// mixins
import introAnimation from '~/mixins/introAnimation.js';
import meta from '~/mixins/meta.js';

// components
import {
  groq
} from '@nuxtjs/sanity';

import {
  sanityClient
} from '@sanity/client';

const query = groq`*[_type == "project"]`;

export default {
  components: {},
  mixins: [
    introAnimation,
    meta
  ],
  // Data from API / CMS
  async asyncData({
    $sanity
  }) {
    const projects = await $sanity.fetch(query);
    return {
      projects
    }
  },

  // data specific to the page and not from the API / CMS
  data() {
    return {};
  },
  computed: {},
  destroyed: function() {},
  mounted: function() {
    // const canvas = document.querySelector("#canvas");
    // const ctx = canvas.getContext('2d');

    const {
      projects
    } = this

    // function createProject(y, x, i) {
    //   ctx.fillStyle = 'rgb(0, 0, 0)';
    //   ctx.fillRect(i * y, i * x, 10, 10);
    // }
    //
    // projects.forEach((item, i) => {
    //   console.log(item)
    //   createProject(10, 10, i)
    // })

    const sanityClient = require('@sanity/client')
    const client = sanityClient({
      projectId: "22m0nlt9",
      dataset: "production",
    })

    const subscription = client.listen(query)
      .subscribe(update => {
        console.log(update)
        // if (update.transition === "appear") {
        //   console.log(update.result)
        // }
      })
    // setTimeout(() => {
    this.animateIn(this.finishedAnimating);
    // }, 100);

    // this.$refs.item.forEach((btn, i) => {
    //   btn.addEventListener('mouseover', (e) => {
    //     this.$store.commit('hits/changeSize', false);
    //     let {
    //       x,
    //       y,
    //       height,
    //       width
    //     } = e.target.getBoundingClientRect();
    //
    //     this.$store.commit('hits/addSize', {
    //       x: x,
    //       y: y,
    //       height: height,
    //       width: width,
    //     });
    //   })
    //
    //   btn.addEventListener('mouseout', (e) => {
    //     this.$store.commit('hits/changeSize', true);
    //   })
    //
    // });


  },
  created: function() {},
  methods: {
    finishedAnimating: function() {
      console.log('finishedAnimating');
    }
  }

};
</script>
<style src="./index.scss" lang="scss" scoped></style>
