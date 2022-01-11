<template>
<div id="cursor-container" :class="classes">
  <div id="stroke" ref="stroke"></div>
  <div id="cursor" ref="cursor">
    <div id="cursor-bg" :style="{ backgroundImage: 'url(' + this.cursorImage + ')' }"></div>
  </div>
</div>
</template>


<script>
/*
Element

Select elements by using data-cursor-hover
Providing an background image for cursor  :data-img="item.img"
Change size of cursor :data-size="item.size"
Giving Proxy Distance :data-distance="item.distance"
Hypotenuse is the distance between center of element and cursor
InProxy Attbutes will be set to true if the elements is in distance givin

initial Mount

Select Body & add mouseMove Listener
Select Elements
Add mouseEnter & mouseLeave Listener to elements
Fire startCursor Function

Style

Element has [inproxy='true'] when cursor position is in proxy distance

*/
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
      coords: [-30, -30],
      elmsData: [],
      elms: [],
      defaultSize: 25,
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
    cursorImage() {
      return this.$store.state.mouseStatus.cursorImage;
    }
  },
  watch: {
    elm(oldVal, newVal) {
      // console.log(newVal, '1')
    },
    activate(oldVal, newVal) {},
    mCoords() {
      this.$data.elmsData.forEach((elm, i, arr) => {
        /// Updates List of Elements object of data
        this.disperseMouseData(i, arr, elm.node);
        // this.magnet(elm.node, elm.node.dataset.distance)
      });
    }
  },
  methods: {
    startCursor: function() {
      let reqAnimationId;
      let smoothCursor = () => {
        TweenMax.to(this.$refs.cursor, 0.25, {
          x: this.mCoords[0] - (this.cursor.size / 2),
          y: this.mCoords[1] - (this.cursor.size / 2),
          width: this.cursor.size,
          height: this.cursor.size,
        });

        TweenMax.to(this.$refs.stroke, 0.25, {
          x: this.lerp(cursor.getBoundingClientRect().left - 7, this.mCoords[0], 0.1),
          y: this.lerp(cursor.getBoundingClientRect().top - 7, this.mCoords[1], 0.1),
          width: this.cursor.size + 10,
          height: this.cursor.size + 10,
        });

        // TweenMax.to(this.node, 0, {
        //   x: -((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2),
        //   y: -((Math.cos(this.angle(elm)) * this.hypotenuse(elm)) / 2)
        // });
        // this.magnet(this.elm, this.elm.dataset.distance);

        reqAnimationId = requestAnimationFrame(smoothCursor)
      }

      (function() {
        reqAnimationId = requestAnimationFrame(smoothCursor)
      }());
      //
      // function end() {
      //   cancelAnimationFrame(reqAnimationId)
      // }
    },
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

    magnet(elm, distance) {
      // console.log(this.hypotenuse(elm) < distance)
      if (this.hypotenuse(elm) < distance && this.activate) {

      } else {
        TweenMax.to(elm, 0, {
          x: 0,
          y: 0
        });
      }
    },

    disperseMouseData(i, arr, elm) {
      // Apply Data to element
      this.setAttributes(elm, {
        hypotenuse: this.hypotenuse(elm),
        index: i,
        inProxy: this.hypotenuse(elm) <= elm.dataset.distance
      });
      /// Apply list
      Object.assign(arr[i], {
        hypotenuse: this.hypotenuse(elm),
        inProxy: this.hypotenuse(elm) <= elm.dataset.distance
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
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end
    },
    m(elm) {
      return {
        x: -((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2),
        y: -((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2)
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
    angle(elm) {
      let element = elm.getBoundingClientRect();
      let distance = {
        x: (element.left + element.width / 2) - this.mCoords[0],
        y: (element.top + element.height / 2) - this.mCoords[1]
      };
      return Math.atan2(distance.x, distance.y)
    },
    setAttributes(el, attrs) {
      Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
    },
  },

  mounted: function() {
    if (!this.touchevents) {
      document.body.style.cursor = 'none';
      // stroke Mouse Listener
      document.querySelector('body').addEventListener('mousemove', (e) => this.onMouseMove(e));
      // Grab Elements
      this.$data.elms = [...document.querySelectorAll('[data-cursor-hover]')];
      // Add Mouse Listners to grab elements
      this.$data.elms.forEach((elm, i) => {
        elm.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
        elm.addEventListener('mouseleave', (e) => this.onMouseLeave(e));
        // Form Data array about grab elements
        this.$data.elmsData.push({
          index: i,
          node: elm,
          data: elm.dataset,
        });
      });
      this.startCursor();
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
    // Js Vue Classes
    &.cursor-hover {
        height: $size + 10;
        width: $size + 10;
    }

    #cursor {
        width: $size;
        height: $size;
        overflow: hidden;
        #cursor-bg {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-repeat: none;
            background-size: cover;
        }
    }

    #stroke {
        position: absolute;
        top: 0;
        left: 0;
        width: $size;
        height: $size;
        border-radius: 50%;
        border: 1px solid red;
    }
}
/// Attributes in proxy
[inproxy='true'] {
    padding: 20px;
}
</style>
