<template>
  <div :id="id" :class="classes" data-scroll-container>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    classes: {
      type: Object,
      default() {}
    }
  },
  data () {
    return {
      scroll: null
    };
  },
  beforeDestroy () {
    this.scroll.destroy()
  },
  mounted () {
    this.locomotiveScrollInit();
  },
  methods: {
    locomotiveScrollInit() {
      this.scroll = new this.$LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        getDirection: true
      })
    }
  }
}
</script>
