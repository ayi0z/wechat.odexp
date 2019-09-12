<template>
    <div id="chartcontainer"></div>
</template>
<script>
    import echarts from 'echarts'
    export default {
      name: 'fanschartline',
      props: ['data'],
      data () {
        return {
          chart: null
        }
      },
      watch: {
        data () {
          console.log(this.data)
          this.onBuildChart()
        }
      },
      methods: {
        onBuildChart () {
          if (!this.data) return

          let data = [...this.data]
          data = data.sort((a, b) => {
            const ats = new Date(a.ref_date).getTime()
            const bts = new Date(b.ref_date).getTime()
            return ats - bts
          })
          const xaxisdata = data.map(c => c.ref_date)
          const fanscumulate = data.map(c => c.cumulate_user)

          const dnc = data.map(c => {
            return c.data.reduce((a, b) => {
              return {
                new_user: a.new_user + b.new_user,
                cancel_user: a.cancel_user + b.cancel_user,
                cumulate: (a.cumulate || 0) + (b.cumulate || 0)
              }
            })
          })
          const newfans = dnc.map(c => c.new_user)
          const cancelfans = dnc.map(c => c.cancel_user)
          const dailyfans = dnc.map(c => c.new_user - c.cancel_user)

          this.chart.setOption({
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xaxisdata
            },
            series: [
              {
                name: '每日粉丝变化',
                smooth: true,
                type: 'line',
                data: dailyfans
              },
              {
                name: '新增粉丝',
                smooth: true,
                type: 'line',
                data: newfans
                // ,markLine: {
                //   data: [
                //     { type: 'average', name: '平均值' }
                //   ]
                // }
              },
              {
                name: '取关粉丝',
                smooth: true,
                type: 'line',
                data: cancelfans
              },
              {
                name: '累计粉丝数',
                smooth: true,
                type: 'line',
                data: fanscumulate
              }
            ]
          })
        }
      },
      mounted () {
        this.chart = this.chart || echarts.init(document.getElementById('chartcontainer'))
        this.chart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            selected: {
              '每日粉丝数': true,
              '新增粉丝': true,
              '取关粉丝': true,
              '累计粉丝数': false
            },
            data: ['每日粉丝变化', '新增粉丝', '取关粉丝', '累计粉丝数']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '0%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value'
          }
        })
        this.onBuildChart()
      }
    }
</script>

<style scoped>
</style>