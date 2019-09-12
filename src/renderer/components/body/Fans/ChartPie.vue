<template>
    <div id="chartpiecontainer">pie</div>
</template>

<script>
    import echarts from 'echarts'
    export default {
      name: 'fanschartpie',
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

          this.chart.setOption({
            series: [
              {
                name: '粉丝来源',
                type: 'pie',
                radius: '50%',
                center: ['50%', '60%'],
                data: this.data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        },
        onSeriesClick (ent) {
          console.log(ent)
        }
      },
      mounted () {
        this.chart = this.chart || echarts.init(document.getElementById('chartpiecontainer'))
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          }
        })
        this.onBuildChart()
      }
    }
</script>

<style scoped>
</style>