<template>
  <div>
    <top />
    <div class="container">
      <div class="column is-three-fifths is-offset-one-fifth">
        <h2 class="title is-3" style="text-align: center">
          <span v-if="$apollo.loading">Loading...</span>
          {{Event.name}}
        </h2>
        <div class="topInfo">
          <nav class="level is-mobile">
            <div class="level-item has-text-centered">
              <div>
                <p class="subtitle is-6">{{rumorCount}} rumors</p>
              </div>
            </div>
            <div class="level-item">
              |
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="subtitle is-6">{{totalRumorCount}} votes</p>
              </div>
            </div>

            <div class="level-item">
              |
            </div>
            <div class="level-item has-text-centered">
              <div>
                <p class="subtitle is-6">{{verifiedRumors}} confirmed</p>
              </div>
            </div>
          </nav>
        </div>
        <div class="list" v-for="(rumor, index) in rumors" v-bind:key="rumor.id">
          <div class="vote">
            <article class="media">
              <figure class="media-left">
                <div class="vote-bottom" v-on:click="login">
                  <div class="vote-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M7.406 15.422l-1.406-1.406 6-6 6 6-1.406 1.406-4.594-4.594z"></path>
                    </svg>
                  </div>
                  <div class="vote-indicator">{{rumor._votesMeta.count}}</div>
                </div>
              </figure>
              <div class="media-content">
                <div class="vote-text">{{rumor.title}}</div>
                <div class="vote-description">#{{index + 1}} | Added by Anders</div>
              </div>
              <div class="media-right">
                <div class="verfied_container">
                  <span class="verfied_tag" v-if="rumor.verified">Confirmed</span>
                </div>
              </div>
            </article>
          </div>
        </div>
        <rumorForm v-bind:eventId="$route.query.id" />
      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/top";
import rumorForm from "../components/rumor_form";
import gql from "graphql-tag";

export default {
  components: {
    top,
    rumorForm
  },
  data: () => ({
    Event: {
      rumors: []
    }
  }),
  apollo: {
    Event: {
      query: gql`
        query($id: ID!) {
          Event(id: $id) {
            id
            name
            startsAt
            endsAt
            rumors {
              id
              title
              verified
              _votesMeta {
                count
              }
              event {
                startsAt
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.query.id
        };
      }
    }
  },
  methods: {
    login() {
      this.$auth.loginWith("auth0");
    }
  },
  computed: {
    totalRumorCount() {
      return this.Event.rumors.reduce((prev, next) => {
        return prev + next._votesMeta.count;
      }, 0);
    },
    rumorCount() {
      return this.Event.rumors.length;
    },
    verifiedRumors() {
      return this.Event.rumors.filter(rumor => {
        return rumor.verified === true;
      }).length;
    },
    rumors() {
      return this.Event.rumors.slice(0).sort((a, b) => {
        return b._votesMeta.count - a._votesMeta.count;
      });
    }
  }
};
</script>

<style>
.topInfo,
.vote-description {
  color: #808080;
}

.topInfo {
  padding: 15px 0;
  border-top: 1px #eeeff3 solid;
  border-bottom: 1px #eeeff3 solid;
  font-size: 0.9em;
}

.vote-bottom {
  border: 1px #eeeff3 solid;
  width: 40px;
  padding: 5px;
  text-align: center;
  cursor: pointer;
}

.vote-bottom:hover {
  border: 1px #ccc solid;
}

.vote-icon {
  height: 22px;
}

.vote-text {
  font-weight: bold;
  line-height: 30px;
}

.vote-description {
  font-size: 0.9em;
}

.vote {
  padding: 20px 0;
  border-bottom: 1px #eeeff3 solid;
}

.vote .media-right {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  text-align: right;
}

.verfied_tag {
  background: #fff;
  border: 1px #ccc solid;
  color: #808080;
  font-size: 1em;
  font-weight: 400;
  border-radius: 2px;
  font-size: 0.9em;

  padding: 2px 8px;
}

.verfied_container {
  margin-top: 1em;
}
</style>