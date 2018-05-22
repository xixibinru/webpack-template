
import '../../common-css/base.css';
import './index.css';
import baseDate from '../../component/base-date/base-date.vue'
import baseCarousel from '../../component/base-carousel/base-carousel.vue';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';

new Vue({
  el: '#div',
  data: {
    imgs:[img1,img2,img3]
  },
  components: {
    'base-carousel': baseCarousel,
    'base-date': baseDate
  }
})



// $.ajax({
//   url: '/api/agent/login.do',
//   data: {
//     phoneNumber: 13115850778,
//     pwd: 1
//   },
//   type: 'post',
//   success(data){
//       console.log(data);
//       console.log('成功'+this.url);
//   },
//   error(){
//     console.log('失败'+this.url);
//   }
// })