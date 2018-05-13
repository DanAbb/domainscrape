<template>
  <vue-fullpage-calendar
    :leftArrow="img.leftArrow"
    :rightArrow="img.rightArrow"
    @dateClicked="dateClicked">
  </vue-fullpage-calendar>
</template>

<script>
import leftArrow from 'img/left-arrow.png'
import rightArrow from 'img/right-arrow.png'

export default {
  created () {
  },
  mounted () {
  },
  data () {
    return {
      img: {
        leftArrow,
        rightArrow
      }
    }
  },
  computed: {
  },
  methods: {
    dateClicked (dateArr) {
      this.$router.push({
        name: 'EventDate',
        params: {
          day: dateArr[0],
          month: dateArr[1],
          year: dateArr[2]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';
</style>
