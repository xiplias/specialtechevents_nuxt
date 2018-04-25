<template>
  <div>
    <top />
    <div class="column is-three-fifths is-offset-one-fifth">
      <div class="timeline is-centered">
        <!-- <div class="timeline-item is-primary">
          <div class="timeline-marker is-primary"></div>
          <div class="timeline-content">
            <p class="heading">January 2016</p>
            <p>Timeline content - Can include any HTML element</p>
          </div>
        </div> -->
        <div class="timeline-item" v-for="event in allEvents()" v-bind:key="event.id">
          <div v-bind:class="`${event.icon} timeline-marker is-image is-32x32`">
            <img v-bind:src="`/logos/${event.icon}.svg`">
          </div>
          <div class="timeline-content">
            <p class="heading">{{date(event.startsAt)}}</p>
            <p>
              <nuxt-link v-bind:to="`/event?id=${event.id}`">{{event.name}}</nuxt-link>
            </p>
          </div>
        </div>
        <!-- <header class="timeline-header">
          <span class="tag is-primary">2017</span>
        </header> -->
      </div>
      <div v-for="event in allEvents" v-bind:key="event.id">

      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/top";
import graphql from "../lib/graphql";
import format from "date-fns/format";

export default {
  components: {
    top
  },
  fetch({ store, query }) {
    return graphql(
      `
        query {
          allEvents(orderBy: startsAt_DESC) {
            id
            name
            icon
            startsAt
          }
        }
      `,
      { id: query.id }
    ).then(data => {
      store.commit("setEvents", data);
    });
  },
  methods: {
    date(date) {
      return format(date, "D MMMM YYYY");
    },
    allEvents() {
      return this.$store.state.events;
    }
  }
};
</script>

<style>
.timeline .timeline-item .timeline-marker.is-image.is-32x32 {
  padding: 5px;
}

.timeline .timeline-item .timeline-marker.is-image.is-32x32.apple {
  padding: 4px 5px 6px;
}
</style>
