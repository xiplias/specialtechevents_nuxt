import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      events: [],
      currentEvent: {
        rumors: []
      }
    },
    mutations: {
      setEvents(state, data) {
        state.events = data.data.allEvents;
      },
      setCurrentEvent(state, data) {
        state.currentEvent = data.data.Event;
      }
    }
  });
};

export default createStore;
