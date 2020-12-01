<template>
<div class="view">
  <h2 v-html="currentElement"></h2>
</div>
</template>
<script>
export default {
  name: 'ViewSingle',
  data () {
    return {
      currentElement: ''
    }
  },
  mounted () {
    // console.log(this.$route.params.tag[0])
    this.currentElement = JSON.parse(localStorage.getItem('taskList'))[
      this.$route.params.tag[0] - 1
    ]
  }
}
</script>
<style scoped>
.view{
  margin:  10rem auto;
}
</style>
