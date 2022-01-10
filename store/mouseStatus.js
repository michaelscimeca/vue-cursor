export const state = () => ({
  coords: [],
  size: 25,
  center: 25/ 2,
  active: false,
  elm: {},
  cursorImage: '',
});

export const mutations = {
  elm (state, val) {
    state.elm = val;
  },
  activate (state, val) {
    state.active = true;
  },
  deactivate (state, val) {
    state.active = false;
  },
  updateCoords (state, val) {
    state.coords = val;
  },
  updateSize (state, val) {
    state.size = val;
  },
  addImages (state, val) {
    state.cursorImage = val;
  },
};
