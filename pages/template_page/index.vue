<template>
<div id="template-page" :class="introClasses">
</div>
</template>

<script>
// mixins
import introAnimation from '~/mixins/introAnimation.js';
import meta from '~/mixins/meta.js';
// components

export default {
  components: {},
  mixins: [
    introAnimation,
    meta
  ],
  // Data from API / CMS
  async asyncData({
    from
  }) {
    // Prismic example is commented out below, do not forget to pass needed data into the return object

    return {
      from,
      seo_title: 'Custom page title',
      seo_description: 'Custom page description',
      seo_og_image: 'custom/page/og/image.png'
    };
  },
  // data specific to the page and not from the API / CMS
  data() {
    return {};
  },
  computed: {},
  destroyed: function() {},
  mounted: function() {
    // setTimeout(() => {
    this.animateIn(this.finishedAnimating);
    // }, 100);

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
