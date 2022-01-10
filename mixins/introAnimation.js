export default {
  data () {
    return {
      introClasses: {
        'intro-enter-active': false,
        'intro-enter': false
      },
      cb: null
    };
  },
  created: function () {
    this.$data.introClasses['intro-enter-active'] = true;
  },
  mounted: function () {
    this.$el.addEventListener('transitionend', this.onTransitionEnd);
  },
  methods: {
    animateIn: function (cb) {
      this.$data.cb = cb;
      setTimeout(() => {
        this.$data.introClasses['intro-enter'] = true;
      }, 20);
    },
    onTransitionEnd: function () {
      this.$el.removeEventListener('transitionend', this.onTransitionEnd);
      this.$data.introClasses['intro-enter-active'] = false;
      this.$data.introClasses['intro-enter'] = false;
      if (this.$data.cb) {
        this.$data.cb();
      }
    }
  },
  destroyed: function () {
    if (this.$el) {
      this.$el.removeEventListener('transitionend', this.onTransitionEnd);
    }

  }
};
