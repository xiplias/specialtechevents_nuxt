<template>
  <div>
    <top />
    <div class="column is-three-fifths is-offset-one-fifth">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-for="event in allEvents" v-bind:key="event.id">
        <nuxt-link v-bind:to="`/event?id=${event.id}`">{{event.name}}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/top";
import gql from "graphql-tag";

export default {
  components: {
    top
  },
  data: () => ({
    allEvents: []
  }),
  apollo: {
    allEvents: {
      query: gql`
        query {
          allEvents {
            id
            name
            startsAt
            file {
              url
            }
          }
        }
      `
    }
  }
};
</script>
