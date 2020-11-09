<template>
  <div class="calendar-box">

    <!-- 年份 月份 -->
    <div class="months">
      <ul class="month-list">
        <li class="arrow prev" @click="pickPre(currentYear, currentMonth)">❮</li>
        <li class="year-month">
          <strong class="choose-year">
            <span>{{ currentYear }}</span>
            <span>年</span>
            <span>{{ currentMonth }}</span>
            <span>月</span>
            <span>{{ currentDay }}</span>
            <span>日</span>
          </strong>
        </li>
        <li class="arrow next" @click="pickNext(currentYear, currentMonth)">❯</li>
      </ul>
    </div>

    <ul class="weekdays">
      <li :key="index" v-for="(day, index) in weeksZh">{{ day }}</li>
    </ul>

    <ul class="days">
      <li ref="dayLi" :style="{ height: dayLiHeight + 'px' }" :key="index" v-for="(day, index) in days">
        <span v-if="day.getMonth() + 1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
        <span
          :style="{ height: dayLiHeight + 'px' }"
          v-else
          class="item"
          :class="{
            'active':
              day.getFullYear() == new Date().getFullYear() &&
              day.getMonth() == new Date().getMonth() &&
              day.getDate() == new Date().getDate()
          }"
        >
          <span>
            {{ day.getDate() }}
          </span>
        </span>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: 'Calendar',
    data() {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        weeksZh: ['一', '二', '三', '四', '五', '六', '日'],
        weeksEn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

        dayLiHeight: 0
      }
    },
    mounted() {
      const d = new Date()
      this.initData(
        this.formatDate(d.getFullYear(), d.getMonth() + 1, 1)
      ).then(() => {
        this.dayLiHeight = this.$refs.dayLi[0].clientWidth
      })
    },
    computed: {

    },
    methods: {
      initData(cur) {
        return new Promise((resolve, reject) => {
          const date = cur ? new Date(cur) : new Date()

          this.currentDay = date.getDate() // 转化为 日
          this.currentYear = date.getFullYear() // 转化为 年
          this.currentMonth = date.getMonth() + 1 // 转化为 月
          this.currentWeek = date.getDay() // 转化为 星期N

          if (this.currentWeek == 0) this.currentWeek = 7

          const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)

          this.days.length = 0

          // 今天是周日，放在第一行第7个位置，前面6个
          for (let i = this.currentWeek - 1; i >= 0; i--) {
            const d = new Date(str)
            d.setDate(d.getDate() - i)

            console.log("y:" + d.getDate())

            this.days.push(d)
          }

          for (let i = 1; i <= 42 - this.currentWeek; i++) {
            const d = new Date(str)
            d.setDate(d.getDate() + i)
            this.days.push(d)
          }

          resolve('执行完毕')
        })
      },

      pickPre(year, month) {
        //  setDate(0); 上月最后一天
        //  setDate(-1); 上月倒数第二天
        //  setDate(dx) 参数dx为 上月最后一天的前后dx天
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(0)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },

      pickNext(year, month) {
        const d = new Date(this.formatDate(year, month, 1))
        d.setDate(35)
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      },

      // 返回 类似 2016-01-02 格式的字符串
      formatDate(year, month, day) {
        const y = year
        let m = month
        if (m < 10) m = '0' + m
        let d = day
        if (d < 10) d = '0' + d
        return y + '-' + m + '-' + d
      }
    }
  }
</script>

<style lang="scss" scoped>
.calendar-box {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 0.75rem;
  background-color: rgba(255, 255, 255, 0.6);
  padding: .8rem .3em;
  border-radius: 3px;
  > .months {
    margin-bottom: 0.8rem;
    > .month-list {
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-around;
      > li {
        transition: all .3s;
        &.arrow {
          width: 1.6rem;
          height: 1.6rem;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #ccc;
          color: #666;
          border-radius: 6px;
          cursor: pointer;
          &:hover {
            background-color:#8d8d8d;
          }
        }
      }
    }
  }

  > .days,
  > .weekdays {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;

    > li {
      width: calc(100% / 7);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  > .weekdays {
    margin-bottom: .5em;
  }

  > .days-loading {
    width: 100%;
    height: 14rem;
  }

  > .days {
    position: relative;

    > li {
      > .other-month {
        opacity: .3;
        cursor: initial;
      }

      > .item {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        width: 100%;
        cursor: default;
        &.active {
          background-color: #ccc;
        }
      }
    }
  }
}
</style>
