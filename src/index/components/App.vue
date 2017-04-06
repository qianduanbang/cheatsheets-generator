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
import Vue from 'vue'
import { mapMutations } from 'vuex'
import Donate from './Donate.vue'
import Cmd from './Cmd.vue'

export default {
  components: { Donate, Cmd },
  data () {
    return {
      title: 'cheat sheets',
      tempCmds: []
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
  },
  computed: {
    cmds: {
      get () {
        return this.tempCmds || [];
      },
      set (cmds) {
        var _cmds = [];
        for (var cmd in cmds) {
          _cmds.push({
            file: cmd,
            title: cmds[cmd].title,
            description: cmds[cmd].description
          })
        }
        this.tempCmds = _cmds;
      }
    }
  },
  mounted () {
    Vue.http.get('static/js/cheat-record.json').then((data) => {
      this.cmds = data.data || {};
    }, (err) => {
      console.log(err);
    })
  }
}
</script>
