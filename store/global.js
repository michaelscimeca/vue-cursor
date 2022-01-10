export const state = () => ({
  touchevents: false,
  viewportHeight: 0,
  fromServer: true,
});

export const mutations = {
  setTouchEvents(state, val) {
    state.touchevents = val;
  },
  setViewportHeight(state, val) {
    state.viewportHeight = val;
  },
  setFromServer(state, val) {
    state.fromServer = val;
  }
}
