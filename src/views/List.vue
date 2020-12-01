<template>
  <div class="container">
    <h2>Task List</h2>
    <div class="list-row" v-for="(item, index) in list" :key="index">
      <div class="name" v-html="item"></div>
      <div class="action">
        <router-link :to="{ path: '/', query: { edit: index + 1 } }">Edit</router-link>
        <router-link :to="`/view/${index + 1}`">View</router-link>
        <button class="btn-delete" href="#" @click="deleteItem($event, index)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      list: []
    }
  },
  methods: {
    deleteItem (event, index) {
      event.preventDefault()
      this.list.splice(index, 1)
      localStorage.setItem('taskList', JSON.stringify(this.list))
    }
  },
  mounted () {
    this.list = JSON.parse(localStorage.getItem('taskList'))
  }
}
</script>

<style></style>
