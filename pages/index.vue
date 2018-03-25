<template>
  <div>
    <top />
    <div class="column is-three-fifths is-offset-one-fifth">
      <h2 class="title">Tasks</h2>
      <div class="topInfo">
        123 Votes | 26 Rumors | 12 Revealed
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
.topInfo {
  border-top: 1px #eeeff3 solid;
  border-bottom: 1px #eeeff3 solid;
}
</style>