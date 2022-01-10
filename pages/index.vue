<template>
<SmoothScroll id="home-page" :classes="introClasses">
  <!-- <div class="pb-64 lg:pb-128" data-scroll-section>
      <div id="nav" class="grid grid-cols-2 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-128">
        <div class="font-serif text-base">
          Irish Cowboy
        </div>
        <div class="flex justify-end">
          <ul class="flex">
            <li class="mx-8"><nuxt-link to="/about">About</nuxt-link></li>
            <li class="mx-8"><a href="">link 2</a></li>
            <li class="mx-8"><a href="">link 3</a></li>
          </ul>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
        <div class="col-span-12 lg:col-span-3 text-5xl">
          <h1 class="u-h1">Project</h1>
        </div>
        <div class="col-span-12 lg:col-span-9">
          <div class="slider bg-gray aspect-w-16 aspect-h-9">
            slider
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
        <div class="col-span-12 lg:col-span-9 order-2 lg:order-1">
          <div class="slider bg-gray aspect-w-16 aspect-h-9">
            slider
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3 order-1 lg:order-2">
          hargo
        </div>
      </div>
      <div class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mb-64 lg:mb-128">
        <div class="col-span-12 lg:col-span-3">
          hargo
        </div>
        <div class="col-span-12 lg:col-span-9">
          <div class="slider bg-gray aspect-w-16 aspect-h-9">
            slider
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-8 lg:gap-32 mx-8 lg:mx-64 mt-64 lg:mt-128">
        <div class="col-span-12 lg:col-span-9 order-2 lg:order-1">
          <div class="slider bg-gray aspect-w-16 aspect-h-9">
            slider
          </div>
        </div>
        <div class="col-span-12 lg:col-span-3 order-1 lg:order-2">
          hargo
        </div>
      </div>
    </div> -->
</SmoothScroll>
</template>

<script>
// mixins
import introAnimation from '~/mixins/introAnimation.js';
import meta from '~/mixins/meta.js';
// components
import SmoothScroll from '~/components/SmoothScroll'

export default {
  components: {
    SmoothScroll
  },
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
  watch: {},
  destroyed: function() {},
  mounted: function() {
    this.animateIn(this.finishedAnimating);
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
