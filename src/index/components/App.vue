<style src="@/assets/app.scss" lang="scss"></style>

<template>
  <div>
  <section class="header">
    <header>
      <h1 class="title">{{title}}</h1>
      <input class="search-cmd"
        autofocus
        autocomplete="off"
        placeholder="what you want to view ..."
        v-model="query">
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
      tempCmds: [],
      query: ''
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
        var _cmds = this.tempCmds || []
        var _queryArr = this.query.trim().split(' ');
        _cmds = _cmds.filter(item => {
          return _queryArr.some(_query => item.title.indexOf(_query) > -1)
        })
        return _cmds;
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
