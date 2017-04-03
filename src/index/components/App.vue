<style src="@/assets/app.scss" lang="scss"></style>

<template>
  <div>
  <section class="header">
    <header>
      <h1 class="title">{{title}}</h1>
      <input class="search-cmd"
        autofocus
        autocomplete="off"
        placeholder="What you want view ..."
        @keyup.enter="search">
    </header>
    <donate></donate>
  </section>
  <section class="command">
    <cmd :cmds="cmds"></cmd>
  </section>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Donate from './Donate.vue'
import Cmd from './Cmd.vue'

export default {
  components: { Donate, Cmd },
  data () {
    return {
      title: 'cheat sheets',
      cmds: []
    }
  },
  methods: {
    search (e) {
      var text = e.target.value
      if (text.trim()) {
        this.$store.commit('addTodo', { text })
      }
      e.target.value = ''
    }
  }
}
</script>
