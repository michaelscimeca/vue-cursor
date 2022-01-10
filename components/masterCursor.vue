<template>
<div id="cursor" ref="cursor" :class="{ active, 'close-icon': closeIcon, 'default': forceDefault, 'hidden': !showCursor}">
  <div id="base" ref="base"></div>
</div>
</template>

<script>
import {
  TweenMax
} from 'gsap';
export default {
  props: {
    coords: Array,
    mX: Number,
    mY: Number,
  },
  data() {
    return {
      distance: 30,
    };
  },
  computed: {
    mCoords() {
      return [this.coords[0] - 6, this.coords[1] - 20];
    },
  },
  watch: {
    mCoords() {
      const mX = this.mCoords[0];
      const mY = this.mCoords[1];

      const items = Array.prototype.slice.call(document.querySelectorAll('.project-one-blist'));
      const list = [];

        items.forEach((elm, i) => {
          list.push({
            elm: {
              index: i,
              node: elm,
              position: elm.getBoundingClientRect(),
              distance: getDistance(elm, mX, mY)
            }
          })
        }),

        TweenMax.to(this.$refs.container, 0.25, {
          x: mX,
          y: mY,
          width: '10px',
          height: '10px',
        });
        // list.forEach((elm, i) => {
        //
        // })
        // console.log(list[0].elm, list[0].distance)
      }
    },
    methods: {
    getDistance: (elm, mX, mY) => {
        return Math.floor(Math.sqrt(Math.pow(mX - (elm.getBoundingClientRect().left + (elm.getBoundingClientRect().width / 2)), 2) + Math.pow(mY - ((elm.getBoundingClientRect().top + window.scrollY) + (elm
          .getBoundingClientRect().height /
          2)), 2)));
      },
      onMouseLeave() {},
      onMouseEnter() {
        this.$data.active = true;
      }
    },
    mounted: () => {
      document.body.style.cursor = 'none';


    },
    beforeDestroy: function() {
      document.removeEventListener('mouseout', this.onMouseLeave);
      document.removeEventListener('mouseover', this.onMouseEnter);
    }
  };
  </script>

  <style lang="scss" scoped>
  section#cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
  }

  #cursor-section {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }
  #cursor-container {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2;
    // opacity: 0;
    transition: opacity 300ms;

    &.active {
      opacity: 1;
    }

    &.close-icon {
      #trail {
        // opacity: 0;
      }

      .base {
        transform: scale(4);
        &:after,
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          background-color: red;
          transform: scale(0.25) rotate(45deg);
        }

        &:before {
          width: 14px;
          height: 2px;
          margin-top: -1px;
          margin-left: -7px;
        }

        &:after {
          width: 2px;
          height: 14px;
          margin-top: -7px;
          margin-left: -1px;
        }
      }

      &.default {
        #trail {
          display: block;
          opacity: 1;
        }

        .base {
          transform: scale(1);
          &:after,
          &:before {
            display: none;
          }

          &.deflate {
            background-color: red;
            transform: scale(0.5);
          }
        }
      }
    }

    &.hidden {
      // opacity: 0;
    }

    .touchevents & {
      display: none;
    }

  }

  #base {
    background-color: red;
    position: absolute;
    width: 25px;
    height: 25px;
    top: 15px;
    pointer-events: none;
    &.deflate {
      background-color: red;
      transform: scale(0.5);
    }

    &.blue {
      background-color: #2e4eeb !important;
    }
  }
  </style>
