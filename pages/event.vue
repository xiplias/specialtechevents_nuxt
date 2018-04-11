<template>
  <div>
    <top />
    <div class="column is-three-fifths is-offset-one-fifth">
      <h2 class="title">{{Event.name}}
        <span v-if="$apollo.loading">Loading...</span>
      </h2>
      <div class="topInfo">
        {{totalRumorCount}} votes casts | {{rumorCount}} votes | {{verifiedRumors}} votes verified
      </div>
      <div class="list" v-for="rumor in rumors" v-bind:key="rumor.id">
        <div class="vote">
          <article class="media">
            <figure class="media-left">
              <div class="vote-bottom">
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
              <div class="vote-description">{{rumor.verified ? 'Verified' : 'Unverified'}} | Added by Anders</div>
            </div>
          </article>
        </div>
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
  computed: {
    rumors() {
      return this.Event.rumors;
    },
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
    }
  }
};
</script>

<style>
.topInfo,
.vote-description {
  color: #999;
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
</style>