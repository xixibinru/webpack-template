
<template>
    <div class="timeTable"> 
        <div class="timeTable-outer" @click="show_timeTable = !show_timeTable">{{timeTitle}}</div>
        <div class="timeTable-main" v-if="show_timeTable"> 
            <div class="timeTitle" @click="changeDate($event)"> 
                <i class="prevYear"></i> 
                <i class="prevMonth"></i> 
                <span class="timeTitle">{{timeTitle}}</span> 
                <i class="nextYear"></i> 
                <i class="nextMonth"></i> 
            </div> 
            <div class="timeContent"> 
                <div class="week"> 
                    <span>周日</span> 
                    <span>周一</span> 
                    <span>周二</span> 
                    <span>周三</span> 
                    <span>周四</span> 
                    <span>周五</span> 
                    <span>周六</span> 
                </div> 
                <div class="day"> 
                    <div v-for="(day,index) in render_before"><span class="otherMonth">{{day}}</span></div>
                    <div class="render-main" @click="selectDate($event)"  v-for="(day,index) in render_main"><span :class="{current_day: y == current_y && m == current_m && day == current_d, select_day: select_y == y && select_m == m && day == select_d}">{{day}}</span></div>
                    <div v-for="(day,index) in render_after"><span class="otherMonth">{{day}}</span></div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
// import nextMonth from "./nextMonth.png";
// import nextYear from "./nextYear.png";
// import prevMonth from "./prevMonth.png";
// import prevYear from "./prevYear.png";
export default {
  props: ["date"],
  data: function() {
    return {
      show_timeTable: false,
      y: 0,
      m: 0,
      d: 0,
      current_y: 0,
      current_m: 0,
      current_d: 0,
      select_y: 0,
      select_m: 0,
      select_d: 0,
      render_before: [],
      render_main: [],
      render_after: []
    };
  },
  computed: {
    year: function() {
      return this.y;
    },
    month: function() {
      return (this.m + 1).toString()[1] ? this.m + 1 : "0" + (this.m + 1);
    },
    day: function() {
      return this.d.toString()[1] ? this.d : "0" + this.d;
    },
    timeTitle: function() {
      return this.year + "-" + this.month + "-" + this.day;
    }
  },
  watch: {
    timeTitle: function() {
      var startWeek = new Date(this.y, this.m, 1).getDay(), //当月第一天是周几
        fullDay = new Date(this.y, this.m + 1, 0).getDate(), //当月有多少天
        lastDay = new Date(this.y, this.m, 0).getDate(), //上月最后一天是几号
        total =
          (fullDay + startWeek) % 7 == 0 ? 0 : 7 - (fullDay + startWeek) % 7; //总共需要渲染的天数
      var render_before = [],
        render_main = [],
        render_after = [];
      for (var i = lastDay - startWeek + 1; i <= lastDay; i++) {
        render_before[render_before.length] = i;
      }
      this.render_before = render_before;
      for (var i = 1; i <= fullDay; i++) {
        render_main[render_main.length] = i;
      }
      this.render_main = render_main;
      for (var i = 1; i <= total; i++) {
        render_after[render_after.length] = i;
      }
      this.render_after = render_after;
      this.giveTimes();
    }
  },
  methods: {
    giveTimes: function() {
      var timestamp = new Date(this.y, this.m, this.d) / 1000; //以秒为单位
      this.$emit("giveTimes", timestamp);
    },
    //时间表上方点击事件
    changeDate: function(e) {
      var className = e.target.className;
      switch (className) {
        case "prevYear":
          this.y -= 1;
          break;
        case "prevMonth":
          if (this.m - 1 < 0) {
            this.y -= 1;
            this.m = 11;
          } else {
            this.m -= 1;
          }
          break;
        case "nextYear":
          this.y += 1;
          break;
        case "nextMonth":
          if (this.m + 1 > 11) {
            this.y += 1;
            this.m = 0;
          } else {
            this.m += 1;
          }
          break;
        default:
          break;
      }
      var fullDay = new Date(this.y, this.m + 1, 0).getDate();
      this.d = fullDay < this.d ? fullDay : this.d;
    },
    //点击日期返还当前选择的时间戳
    selectDate: function(e) {
      var select_date = e.target.innerText;
      this.d = select_date;
      this.select_y = this.y;
      this.select_m = this.m;
      this.select_d = this.d;
      this.show_timeTable = false;
    }
  },
  created: function() {
    var now = new Date();
    this.y = this.current_y = now.getFullYear();
    this.m = this.current_m = now.getMonth();
    this.d = this.current_d = now.getDate();
    if (this.date) {
      var date = new Date(this.date * 1000);
      this.y = date.getFullYear();
      this.m = date.getMonth();
      this.d = date.getDate();
    }
    this.giveTimes();
  }
};
</script>
    
<style>
/*时间表样式*/
.timeTable {
  display: inline-block;
}
.timeTable-outer {
  width: 100px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  background-color: #e3e1ec;
  color: #333;
}
.timeTable-main {
  position: absolute;
  z-index: 1;
  width: 300px;
  border: 1px solid #40d0a7;
  background-color: #fff;
}

.timeTable-main .timeTitle {
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 24px;
  background-color: #40d0a7;
}

.timeTable-main .timeTitle i {
  position: absolute;
  width: 36px;
  height: 40px;
  background: url(prevYear.png) no-repeat center center / 100% 100%;
  cursor: pointer;
}

.timeTable-main .timeTitle .prevYear {
  left: 0;
  background-image: url(prevYear.png);
}

.timeTable-main .timeTitle .prevMonth {
  left: 40px;
  background-image: url(prevMonth.png);
}

.timeTable-main .timeTitle .nextYear {
  right: 0;
  background-image: url(nextYear.png);
}

.timeTable-main .timeTitle .nextMonth {
  right: 40px;
  background-image: url(nextMonth.png);
}
.timeTable-main .timeContent {
    font-size: 0;
}
.timeTable-main .timeContent .week span {
  display: inline-block;
  width: 14.28%;
  /* height: 42.83px; */
  line-height: 42.83px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}
.timeTable-main .timeContent .day div {
  float: left;
  width: 14.28%;
  line-height: 42.83px;
  text-align: center;
  font-size: 16px;
  /* padding: 6px; */
}
.timeTable-main .timeContent .day span {
  display: block;
  height: 100%;
  line-height: 42.83px;
  border-radius: 50%;
  color: #333;
}
.timeTable-main .timeContent .render-main span:hover {
  background-color: #40d0a7;
  color: #fff;
  cursor: pointer;
}
.timeTable-main .timeContent .day .otherMonth {
  /*其他月份的字体显示灰色*/
  color: #ccc;
}
.timeTable-main .timeContent .day .current_day {
  /*初始化后当前天样式*/
  background-color: #28aeff;
  color: #fff;
}
.timeTable-main .timeContent .day .select_day {
  /*当前点击后选择的日期*/
  background-color: #40d0a7;
  color: #fff;
}
</style>