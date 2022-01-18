<template>
<div id="cursor-container" :class="classes">
  <div v-if="this.$data.cursorStroke" id="stroke" ref="stroke"></div>
  <div id="cursor" ref="cursor">
    <div class="box" v-if="this.$data.gooeyCursor">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="filter-name">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="my-blur" />
            <feColorMatrix in="my-blur" mode="matrix" values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -8" result="my-gooey" />
          </filter>
        </defs>
      </svg>
    </div>
    <div v-if="this.$data.dotCursor" id="cursor-dot" :style="{width: `${this.cursor.size}px`, height: `${this.cursor.size}px`}"></div>
    <div v-if="this.$data.imageCursor" id="cursor-bg" :style="{ backgroundImage: 'url(' + this.cursorImage + ')' }"></div>
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
      elms: [],
      elmsData: [],
      defaultSize: 10,
      speed: 0.2,
      showMagnetProxy: true,
      imageCursor: false,
      dotCursor: true,
      cursorStroke: false,
      showCursorsProxyNum: true,
      effectAllElementsInArea: false

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
    elm() {},
    activate() {},
    mCoords() {
      this.$data.elmsData.forEach((elm, i, arr) => {
        /// Updates List of Elements object of data
        this.disperseMouseData(i, arr, elm.node);
      });
    }
  },
  methods: {
    startCursor: function() {
      let reqAnimationId;
      let smoothCursor = () => {
        // Cursor
        TweenMax.to(this.$refs.cursor, this.$data.speed, {
          x: this.mCoords[0] - (this.cursor.size / 2),
          y: this.mCoords[1] - (this.cursor.size / 2),
          width: this.cursor.size,
          height: this.cursor.size,
        });
        // If element is in proxy and hovered over
        if (!this.$data.effectAllElementsInArea) {
          // Grab closest element
          let closestToCursor = this.closestToCursor(this.$data.elms);
          this.$data.elms.forEach((elm) => {
            if (closestToCursor.elm === elm && elm.dataset.inproxy === "true") {
              elm.querySelector('[data-magnet]').style.transform = `translate(${-((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2)}px,${ -((Math.cos(this.angle(elm)) * this.hypotenuse(elm)) / 2)}px )`;
            } else {
              elm.querySelector('[data-magnet]').style.transform = `translate(0px,0px)`;
            }
          });
        } else {
          this.$data.elms.forEach((elm) => {
            if (elm.dataset.inproxy === "true") {
              elm.querySelector('[data-magnet]').style.transform = `translate(${-((Math.sin(this.angle(elm)) * this.hypotenuse(elm)) / 2)}px,${ -((Math.cos(this.angle(elm)) * this.hypotenuse(elm)) / 2)}px )`;
            } else {
              elm.querySelector('[data-magnet]').style.transform = `translate(0px,0px)`;
            }
          });
        }
        // If stroke turn on TweenMax
        if (this.$data.cursorStroke) {
          TweenMax.to(this.$refs.stroke, this.$data.speed, {
            x: this.lerp(cursor.getBoundingClientRect().left - 7, this.mCoords[0], 0.1),
            y: this.lerp(cursor.getBoundingClientRect().top - 7, this.mCoords[1], 0.1),
            width: this.cursor.size + 10,
            height: this.cursor.size + 10,
          });
        }
        reqAnimationId = requestAnimationFrame(smoothCursor)
      }

      (function() {
        reqAnimationId = requestAnimationFrame(smoothCursor)
      }());

      function end() {
        cancelAnimationFrame(reqAnimationId)
      }
    },
    middleCircle(elm) {
      let top = elm.getBoundingClientRect().top + (elm.getBoundingClientRect().height / 2);
      let left = elm.getBoundingClientRect().right - (elm.getBoundingClientRect().width / 2);
      let center = (position, mouse) => (1 - 0.1) * position + 0.1 * mouse;
      let x = center(left, this.mCoords[0]);
      let y = center(top, this.mCoords[1]);
      return {
        x: x,
        y: y
      }
    },

    disperseMouseData(i, arr, elm) {
      // console.log((elm.dataset.distance) ? this.hypotenuse(elm) <= elm.dataset.distance : 'proxyoff', elm)
      // Apply Data to element
      this.setAttributes(elm, {
        'data-hypotenuse': this.hypotenuse(elm),
        'data-index': i,
        'data-inProxy': (elm.dataset.distance) ? this.hypotenuse(elm) <= elm.dataset.distance : 'proxyoff'
      });
      // Developer Tool
      if (this.$data.showCursorsProxyNum) {
        elm.querySelector('.hypotenuse').innerHTML = Math.round(elm.dataset.hypotenuse);
      }
    },
    closestToCursor(elms) {
      let holdNums = [];
      elms.forEach((item) => {
        holdNums.push({
          /// Must parse number floating causes issues
          Cost: parseInt(item.dataset.hypotenuse),
          elm: item
        });
      });
      let closestToCursor = holdNums.reduce(function(prev, curr) {
        return prev.Cost < curr.Cost ? prev : curr;
      });
      return closestToCursor
    },
    onMouseMove(e) {
      //Track mouse position
      this.$data.coords = [e.clientX, e.clientY];
      this.$store.commit('mouseStatus/updateCoords', [e.clientX, e.clientY]);
    },
    onMouseEnter(e) {
      this.$store.commit('mouseStatus/elm', e.target);
      this.$store.commit('mouseStatus/activate', true);
      this.$store.commit('mouseStatus/updateSize', (e.target.dataset.size) ? e.target.dataset.size : this.$data.defaultSize)
      if (this.$data.imageCursor) {
        this.$store.commit('mouseStatus/addImages', e.target.dataset.img);
      }
    },
    onMouseLeave(e) {
      this.$store.commit('mouseStatus/elm', '');
      this.$store.commit('mouseStatus/deactivate', false);
      if (this.$data.imageCursor) {
        this.$store.commit('mouseStatus/addImages', '/img/default.jpg');
      }
      this.$store.commit('mouseStatus/updateSize', this.defaultSize)
    },
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end
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
    cursorLocation() {
      if (document.querySelectorAll('.hypotenuse').length !== this.$data.elms.length) {
        this.$data.elms.forEach((elm, i) => {
          let cursorProxyData = document.createElement("div");
          cursorProxyData.className = 'hypotenuse';
          cursorProxyData.innerHTML = Math.round(elm.dataset.hypotenuse);
          elm.appendChild(cursorProxyData);
        })
      }
    },
    createMagnetProxy(elm) {
      if (document.querySelectorAll('.magnetic-size').length !== this.$data.elms.length) {
        elm.forEach((elm) => {
          let magnetSize = document.createElement("div");
          magnetSize.className = 'magnetic-size';
          magnetSize.style.height = `${this.getMangetProxy(elm, elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
          magnetSize.style.width = `${this.getMangetProxy(elm, elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
          elm.appendChild(magnetSize);
        });
      }
    },
    updateMangetProxy(elm) {
      elm.forEach((elm) => {
        elm.querySelector('.magnetic-size').style.height = `${this.getMangetProxy(elm,elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
        elm.querySelector('.magnetic-size').style.width = `${this.getMangetProxy(elm,elm.getBoundingClientRect().width, elm.getBoundingClientRect().height)}px`;
      })
    },
    getMangetProxy(elm, width, height) {
      let distance;
      if (elm.dataset.distance) {
        distance = elm.dataset.distance * 2;
      } else if (distance === undefined) {
        distance = (height < width) ? width : height;
        distance = distance / 33;
      }
      return distance
    },
  },
  mounted: function() {
    if (!this.touchevents) {
      document.body.style.cursor = 'none';
      // Stroke Mouse Listener
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
      // Developer helper tool
      if (this.$data.showCursorsProxyNum) {
        this.cursorLocation();
      }
      // Start Cursor
      this.startCursor();

      // Developer helper tool
      if (this.$data.showMagnetProxy) {
        window.addEventListener('resize', () => this.updateMangetProxy(this.$data.elms));
        this.createMagnetProxy(this.$data.elms);
      }
    }
  },
  beforeDestroy: function() {
    document.querySelector('body').removeEventListener('mousemove', (e) => this.onMouseMove(e));
    this.$data.elms.forEach((elm, i) => {
      elm.removeEventListener('mouseout', this.onMouseLeave);
      elm.removeEventListener('mouseover', this.onMouseEnter);
    });
    if (this.$data.showMagnetProxy) {
      window.removeEventListener('resize', this.updateMangetProxy(this.$data.elms));
    }
  }
};
</script>

<style lang="scss">
$size: 10px;
$color: red;

$gooey: url("#filter-name");
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

        #cursor-dot {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            margin: auto;
            border-radius: 50%;
            background-color: $color;
        }
        /// Image Cursor image
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
        border: 1px solid $color;
    }
}
//Developer Tool
.magnetic-size {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 50%;
    border: 2px dashed $color;
    z-index: 1;
    pointer-events: none;
    animation: magnetic-size 120s infinite;
}

@keyframes magnetic-size {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
//Developer Tool
.hypotenuse {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px 10px;
    background-color: red;
    pointer-events: none;
}

/// Attributes in proxy
[data-inproxy='true'] {
    border: 5px solid red;
}

[data-cursor-hover] {
    [data-magnet] {
        transition: transform 200ms ease-out;
    }
}
</style>
