<template>
  <div class="card" :style="{backgroundColor: bgColor}">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: '',
    description: '',
    bgColor: {
      type: String,
      default: '#374046'
    }
  }
}
</script>

<style lang="scss">
  $cardWidth: 150px;
  $cardHeight: 150px;


  .card {
    display: inline-block;
    width: $cardWidth;
    height: $cardHeight;
    margin: 5px;
    color: #f2f2f2;
    font-weight: bold;
    text-align: center;
    font-size: 18px;
    box-sizing: border-box;
    padding-top: 70px;
    position: relative;
    transition: all 200ms ease;

    &:hover {
      transform: scale(0.9);
      cursor: pointer;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23), 0 3px 10px rgba(0, 0, 0, 0.16);
    }

  }
</style>
