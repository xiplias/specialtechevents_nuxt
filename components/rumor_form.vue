<template>
  <div class="field is-grouped add-rumor-form">
    <p class="control is-expanded">
      <input class="input" type="text" placeholder="Add Rumor" v-model="rumor">
    </p>
    <p class="control">
      <a class="button is-info" v-on:click="addRumor">
        Add
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: "rumorForm",
  props: ["eventId"],
  data: () => ({
    rumor: ""
  }),
  methods: {
    addRumor() {
      const title = this.rumor;
      const eventId = this.eventId;

      // this.$apollo.mutate({
      //   mutation: gql`
      //     mutation($title: String!, $eventId: ID) {
      //       createRumor(title: $title, eventId: $eventId) {
      //         id
      //       }
      //     }
      //   `,
      //   variables: {
      //     title,
      //     eventId
      //   }
      // });
    }
  }
};
</script>

<style>
.add-rumor-form {
  margin-top: 20px;
}

.add-rumor-form .input {
  box-shadow: none;
}
</style>