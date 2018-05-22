<template>
   <div class="carousel" :style="`width: ${w};height: ${h}`"
   >
       <transition-group 
           :name="carouselStatus"
           tag="ul"
       >
         <li v-for="(img,index) in imgs"
             :key="img"
             v-show="currentIndex == index"
         >
           <img :src="img" alt="">
         </li>
       </transition-group>
       <ol>
         <li v-for="(n,index) in len"
             :key="index"
             @click="userClick(index)"
         >
         </li>

       </ol>
   </div>
</template>

<script>
export default {
  props: {
    w: {
      type: String,
      default: "100%"
    },
    h: {
      type: String,
      default: "3.6rem"
    },
    imgs: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      carouselStatus: 'carousel1',
      currentIndex: 0,
      timer: null
    }
  },
  computed: {
    len(){
      return this.imgs.length;
    }
  },
  methods: {
    autoPlay(){
      this.currentIndex++;
      this.currentIndex %= this.len;
       console.log(this.currentIndex);
    },
    play(){
      this.timer = setInterval(this.autoPlay,3000)
    },
    userClick(index){
      let self = this;
      clearInterval(this.timer);
      setTimeout(()=>{
        clearInterval(self.timer);
        self.carouselStatus = 'carousel1';
        self.play();
      },5000);
      this.carouselStatus = index >= this.currentIndex
      ? 'carousel1'
      : 'carousel2';
      this.currentIndex = index;
    }
  },
  mounted(){
    this.play();
  }
};
</script>

<style>
.carousel1-enter-active,.carousel2-enter-active {
    transform: translateX(0);
    transition: transform 0.6s ease;
}

.carousel1-leave-active {
    transform: translateX(-100%);
    transition: transform 0.6s ease;
}
.carousel2-leave-active {
  transform: translateX(100%);
    transition: transform 0.6s ease;
}

.carousel1-enter {
    transform: translateX(100%);
}
.carousel2-enter {
    transform: translateX(-100%);
}
.carousel1-leave,.carousel2-leave {
    transform: translateX(0);
}

.carousel {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.carousel ul li {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.carousel img {
  width: 100%;
  height: 100%;
  display: block;
}
.carousel ol {
  position: absolute;
  top:90%;
  left: 50%;
  transform: translateX(-50%);
}
.carousel ol li {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #000;
  float: left;
}
.carousel ol li+li {
  margin-left: 10px;
}
</style>
