<template>
<div id="cursor-container" :class="classes">
  <!-- <div id="orbit"></div> -->
  <div id="attach" ref="attach"></div>
  <div id="cursor" ref="cursor">
    <div id="base" ref="base" :style="{ backgroundImage: 'url(' + this.cursorimages + ')' }"></div>
  </div>

</div>
</template>

<script>
import {
  TweenMax
} from 'gsap';

import touchevents from '~/mixins/touchevents';
export default {
  props: {},
  mixins: [
    touchevents
  ],
  data() {
    return {
      coords: [0, 0],
      elmsData: [],
      elms: [],
      hover: false,
      defaultSize: 25
    };
  },
  computed: {
    touchevents() {
      return (
        'ontouchstart' in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    },
    mCoords() {
      return [this.coords[0], this.coords[1]];
    },
    activate() {
      return this.$store.state.mouseStatus.active;
    },
    classes() {
      return {
        'cursor-hover': this.activate,
      };
    },
    elm() {
      return this.$store.state.mouseStatus.elm
    },
    cursor() {
      return {
        size: parseInt(this.$store.state.mouseStatus.size)
      };
    },
    cursorimages() {
      return this.$store.state.mouseStatus.cursorImage;
    }
  },
  watch: {
    elm(oldVal, newVal) {},
    activate(oldVal, newVal) {},
    mCoords() {
      this.$data.elmsData.forEach((elm, i, arr) => {
        /// Updates List of Elements object of data
        this.disperseMouseData(i, arr, elm.node);
        // this.magnet(elm.node, elm.node.dataset.distance)
      });
      this.gsapCursor(this.$refs.cursor, this.$refs.attach)

    }
  },
  methods: {
    middleCircle(elm) {
      let top = elm.getBoundingClientRect().top + (elm.getBoundingClientRect().height / 2);
      let left = elm.getBoundingClientRect().right - (elm.getBoundingClientRect().width / 2);
      let center = (position, mouse) => (1 - 0.1) * position + 0.1 * mouse;
      let x = center(left, this.mCoords[0]);
      let y = center(top, this.mCoords[1]);
      console.log(x, y)
      return {
        x: x,
        y: y
      }
    },
    lerp: function(start, end, amt) {
      return (1 - amt) * start + amt * end
    },
    magnet: function(elm, distance) {
      // console.log(this.hypotenuse(elm) < distance)
      if (this.hypotenuse(elm) < distance && this.activate) {
        TweenMax.to(elm, 0, {
          x: -((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2),
          y: -((Math.cos(this.angle(elm)) * this.hypotenuse(elm)) / 2)
        });
        TweenMax.to(this.$refs.attach, 0, {
          x: this.middleCircle(this.$refs.cursor).x,
          y: this.middleCircle(this.$refs.cursor).y
        });
      } else {
        // TweenMax.to(elm, 0, {
        //   x: 0,
        //   y: 0
        // });
        // TweenMax.to(this.$refs.attach, 0, {
        //   x: this.mCoords[0],
        //   y: this.mCoords[1]
        // });
      }
    },
    gsapCursor: function(cursor, attach) {
      TweenMax.to(cursor, 0.25, {
        x: this.mCoords[0] - (this.cursor.size / 2),
        y: this.mCoords[1] - (this.cursor.size / 2),
        width: this.cursor.size,
        height: this.cursor.size,
      });
      TweenMax.to(attach, 0.25, {
        x: this.lerp(cursor.getBoundingClientRect().left - 8, this.mCoords[0], 0.1),
        y: this.lerp(cursor.getBoundingClientRect().top - 8, this.mCoords[1], 0.1),
        width: this.cursor.size + 10,
        height: this.cursor.size + 10,
      });
    },
    request: function() {
      let reqAnimationId;
      let degrees = 25;
      let radians = 25 * (Math.PI / 180);
      let earthSpeed = .05;
      let smoothAnimation = () => {
        radians += earthSpeed;
        // console.log(this.radians)
        var x = Math.cos(radians) * 30;
        var y = Math.sin(radians) * 30;
        TweenMax.to("#orbit", 0.2, {
          x: x,
          y: y
        });
        reqAnimationId = requestAnimationFrame(smoothAnimation)
      }

      function start() {
        reqAnimationId = requestAnimationFrame(smoothAnimation)
      }
      start()

      function end() {
        cancelAnimationFrame(reqAnimationId)
      }
    },
    hypotenuse(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.mCoords[0],
        y: (element.top + element.height / 2) - this.mCoords[1]
      };
      return Math.sqrt(distance.x * distance.x + distance.y * distance.y);
    },
    angle: function(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.mCoords[0],
        y: (element.top + element.height / 2) - this.mCoords[1]
      };
      return Math.atan2(distance.x, distance.y)
    },
    disperseMouseData(i, arr, elm) {
      // Apply Data to element
      this.setAttributes(elm, {
        hypotenuse: this.hypotenuse(elm),
        index: i,
      });
      /// Apply list
      Object.assign(arr[i], {
        hypotenuse: this.hypotenuse(elm),
      });
    },
    onMouseMove(e) {
      this.$data.coords = [e.clientX, e.clientY];
      this.$store.commit('mouseStatus/updateCoords', [e.clientX, e.clientY]);
    },
    onMouseEnter(e) {
      this.$store.commit('mouseStatus/elm', e.target);
      this.$store.commit('mouseStatus/activate', true);
      this.$store.commit('mouseStatus/addImages', e.target.dataset.img);
      this.$store.commit('mouseStatus/updateSize', e.target.dataset.size)
    },
    onMouseLeave(e) {
      this.$store.commit('mouseStatus/elm', '');
      this.$store.commit('mouseStatus/deactivate', false);
      this.$store.commit('mouseStatus/addImages', '/img/default.jpg');
      this.$store.commit('mouseStatus/updateSize', this.defaultSize)
    },
    setAttributes(el, attrs) {
      Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
    },
  },

  mounted: function() {
    if (!this.touchevents) {
      // document.body.style.cursor = 'none';
      // Attach Mouse Listener
      document.querySelector('body').addEventListener('mousemove', (e) => this.onMouseMove(e));
      // Grab Elements
      this.$data.elms = [...document.querySelectorAll('[data-cursor-hover]')];
      // Add Mouse Listners to grab elements
      this.$data.elms.forEach((elm, i) => {
        elm.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
        elm.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
        // this.magnet(elm, elm.dataset.distance);

        // this.magnet(elm, elm.dataset.distance);
        // Form Data array about grab elements
        this.$data.elmsData.push({
          index: i,
          node: elm,
          data: elm.dataset,
        });
      });
      // this.request();
    }
  },
  beforeDestroy: function() {
    document.removeEventListener('mouseout', this.onMouseLeave);
    document.removeEventListener('mouseover', this.onMouseEnter);
  }
};
</script>

<style lang="scss">
$size: 25px;
#cursor-container {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99999999;
    pointer-events: none;

    &.cursor-hover {
        height: $size + 10;
        width: $size + 10;
        // background-color: red;
    }
    #cursor {
        width: $size;
        height: $size;
    }

    #attach {
        position: absolute;
        top: 0;
        left: 0;
        width: $size;
        height: $size;
        border-radius: 50%;
        border: 1px solid red;
        opacity: 1;
    }
    #base {
        width: 100%;
        height: 100%;
        background-repeat: none;
        background-size: cover;
        overflow: hidden;
        border-radius: 50%;
        background-color: gray;
    }
}

#orbit {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: green;
}
</style>
