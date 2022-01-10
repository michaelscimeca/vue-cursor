export default {
  mounted: function () {
    // Check for touchevents
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      this.$store.commit('global/setTouchEvents', true);
    }
  }
};
