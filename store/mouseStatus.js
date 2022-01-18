export const state = () => ({
  coords: [-30, -30],
  active: false,
  elm: {},
  cursorImage: 'img/default.jpg',
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
