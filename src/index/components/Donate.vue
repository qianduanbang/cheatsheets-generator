<template>
<div class="donate-wrap">
  <div>{{titleText}}</div>
   <button class="donate-btn" @click="show=!show">
     <span>{{ buttonText }}</span>
   </button>
   <div class="qr-container" v-show="show">
     <div class="qr-block" v-for="pay in pays">
       <a :href="pay.qrUrl" class="fancybox">
         <img :src="pay.qrUrl" :alt="pay.text">
       </a>
       <p>{{pay.text}}</p>
     </div>
   </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      titleText: '如果您觉得受益，请打赏支持',
      buttonText: '赏',
      show: false,
      pays: [
        {
          qrUrl: 'http://p1.bqimg.com/567571/f0298109711fee2d.png',
          text: '微信打赏'
        },
        {
          qrUrl: 'http://p1.bqimg.com/567571/1d2b9db3cdf14891.png',
          text: '支付宝打赏'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.donate-wrap {
  padding: 10px 0; margin: 20px auto; width: 90%; text-align: center;
  .donate-btn {
    cursor: pointer;
    border: 0;
    outline: 0;
    border-radius: 100%;
    padding: 0;
    margin: 0;
    letter-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    background: none;

    span {
      display: inline-block;
      width: 80px;
      height: 35px;
      line-height: 35px;
      border-radius: 5px;
      color: #fff;
      font-weight: 400;
      font-style: normal;
      font-variant: normal;
      font-stretch: normal;
      font-size: 18px;
      font-family: "Microsoft Yahei";
      background: #f44336;

      &:hover {
        background: #f7877f;
      }
    }
  }
    .qr-container {
      padding-top: 20px;

      a {
        border: 0;
      }

      img {
        width: 180px;
        max-width: 100%;
        display: inline-block;
        margin: 0.8em 2em 0 2em;
      }

      .qr-block {
        display: inline-block;
        &:hover {
          p {
            animation: roll 0.1s infinite linear;
            -webkit-animation: roll 0.1s infinite linear;
            -moz-animation: roll 0.1s infinite linear;
          }
        }
      }
    }
}

@-moz-keyframes roll {
  from {
    -webkit-transform: rotateZ(30deg);
    -moz-transform: rotateZ(30deg);
    -ms-transform: rotateZ(30deg);
    -o-transform: rotateZ(30deg);
    transform: rotateZ(30deg);
  }
  to {
    -webkit-transform: rotateZ(-30deg);
    -moz-transform: rotateZ(-30deg);
    -ms-transform: rotateZ(-30deg);
    -o-transform: rotateZ(-30deg);
    transform: rotateZ(-30deg);
  }
}
@-webkit-keyframes roll {
  from {
    -webkit-transform: rotateZ(30deg);
    -moz-transform: rotateZ(30deg);
    -ms-transform: rotateZ(30deg);
    -o-transform: rotateZ(30deg);
    transform: rotateZ(30deg);
  }
  to {
    -webkit-transform: rotateZ(-30deg);
    -moz-transform: rotateZ(-30deg);
    -ms-transform: rotateZ(-30deg);
    -o-transform: rotateZ(-30deg);
    transform: rotateZ(-30deg);
  }
}
@-o-keyframes roll {
  from {
    -webkit-transform: rotateZ(30deg);
    -moz-transform: rotateZ(30deg);
    -ms-transform: rotateZ(30deg);
    -o-transform: rotateZ(30deg);
    transform: rotateZ(30deg);
  }
  to {
    -webkit-transform: rotateZ(-30deg);
    -moz-transform: rotateZ(-30deg);
    -ms-transform: rotateZ(-30deg);
    -o-transform: rotateZ(-30deg);
    transform: rotateZ(-30deg);
  }
}
@keyframes roll {
  from {
    -webkit-transform: rotateZ(30deg);
    -moz-transform: rotateZ(30deg);
    -ms-transform: rotateZ(30deg);
    -o-transform: rotateZ(30deg);
    transform: rotateZ(30deg);
  }
  to {
    -webkit-transform: rotateZ(-30deg);
    -moz-transform: rotateZ(-30deg);
    -ms-transform: rotateZ(-30deg);
    -o-transform: rotateZ(-30deg);
    transform: rotateZ(-30deg);
  }
}
</style>
