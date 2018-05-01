<template>
  <div>
    <top />
    <div class="column is-three-fifths is-offset-one-fifth">
      <div class="timeline is-centered">
        <div class="timeline-item" v-for="event in allEvents" v-bind:key="event.id">
          <div v-bind:class="`${event.icon} timeline-marker is-image is-32x32`">
            <img v-bind:src="`/logos/${event.icon}.svg`" alt="logo">
          </div>
          <div class="timeline-content">
            <p class="heading">{{date(event.startsAt)}}</p>
            <p>
              <nuxt-link v-bind:to="`/event?id=${event.id}`">{{event.name}}</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/top";
import format from "date-fns/format";
import gql from "graphql-tag";

export default {
  components: {
    top
  },
  data() {
    return {
      allEvents: []
    };
  },
  apollo: {
    allEvents: {
      query: gql`
        query {
          allEvents(orderBy: startsAt_DESC) {
            id
            name
            icon
            startsAt
          }
        }
      `
    }
  },
  methods: {
    date(date) {
      return format(date, "D MMMM YYYY");
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
