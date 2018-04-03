<template>
  <div>
    <top />
    <div class="column is-three-fifths is-offset-one-fifth">
      <h2 class="title">Rumors</h2>
      <div class="topInfo">
        123 people voting | 1201 votes casts | 12 votes confirmed
      </div>
      <div class="list">
        <div class="vote">
          <article class="media">
            <figure class="media-left">
              <div class="vote-bottom">
                <div class="vote-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M7.406 15.422l-1.406-1.406 6-6 6 6-1.406 1.406-4.594-4.594z"></path>
                  </svg>
                </div>
                <div class="vote-indicator">12</div>
              </div>
            </figure>
            <div class="media-content">
              <div class="vote-text">New iPad Mini</div>
              <div class="vote-description">#22 | Created by Anders</div>
            </div>
          </article>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import top from "../components/top";

export default {
  components: {
    top
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