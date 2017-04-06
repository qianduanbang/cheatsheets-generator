<template>
<div class="cmd-wrap">
  <card v-for="(cmd, index) in cmds" :key="cmd.name" :file="cmd.file" :title="cmd.title" :description="cmd.description" :bgColor="colorsMap[colors[index%colorsLength]]"></card>
</div>
</template>

<script>

import Card from './Card.vue'

export default {
  components: { Card },
  props: {
    cmds: {
      type: Array,
      default: []
    }
  },
  data () {
    var colorsMap = {
        red:         "#f44336",
        pink:        "#e91e63",
        blank:       "#374046",
        purple:      "#9c27b0",
        deepPurple:  "#673ab7",
        indigo:      "#3f51b5",
        blue:        "#2196f3",
        lightBlue:   "#03a9f4",
        cyan:        "#00bcd4",
        teal:        "#009688",
        green:       "#4caf50",
        lightGreen:  "#8bc34a",
        lime:        "#cddc39",
        yellow:      "#ffeb3b",
        amber:       "#ffc107",
        orange:      "#ff9800",
        deepOrange:  "#ff5722",
        brown:       "#795548",
        grey:        "#9e9e9e",
        blueGrey:    "#607d8b"
      };
    var colors = Object.keys(colorsMap);

    return {
      colors: colors,
      colorsLength: colors.length,
      colorsMap: colorsMap
    }
  }
}
</script>

<style lang="scss">
.cmd-wrap {
  text-align: center;

  $colors: (
    red:         #f44336,
    pink:        #e91e63,
    blank:       #374046,
    purple:      #9c27b0,
    deepPurple:  #673ab7,
    indigo:      #3f51b5,
    blue:        #2196f3,
    lightBlue:   #03a9f4,
    cyan:        #00bcd4,
    teal:        #009688,
    green:       #4caf50,
    lightGreen:  #8bc34a,
    lime:        #cddc39,
    yellow:      #ffeb3b,
    amber:       #ffc107,
    orange:      #ff9800,
    deepOrange:  #ff5722,
    brown:       #795548,
    grey:        #9e9e9e,
    blueGrey:    #607d8b
  );

  @each $key, $value in $colors {
    .#{$key} {
      background-color: $value;
    }
  }
}
</style>
