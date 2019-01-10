<template>
  <div class="home-wrapper">
    <div class="search-container">
      <div class="search-item-container">
        <label>学校</label>
        <div class="right-container" @click="toggleActionSheet('school')">
          <div class="search-name">{{selectSchName || '默认'}}</div>
          <div class="right-arrow"></div>
        </div>
      </div>
      <div class="search-item-container">
        <label>学院</label>
        <div class="right-container" @click="toggleActionSheet('academy')">
          <div class="search-name">{{selectAcademyName || '所有'}}</div>
          <div class="right-arrow"></div>
        </div>
      </div>
      <!--<div class="search-item-container">-->
        <!--<label>专业</label>-->
        <!--<div class="right-container" @click="toggleActionSheet('major')">-->
          <!--<div class="search-name">{{selectMajorName}}</div>-->
          <!--<div class="right-arrow"></div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
    <div class="data-count-container">
      <div class="data-count-title">分会场视角</div>
      <div class="graph" id="count2"></div>
      <div class="graph" id="count4"></div>
      <div class="graph" id="count5"></div>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import { Actionsheet } from 'mint-ui';
  import school from '../data/school';
  import academy from '../data/academy';
  import major from '../data/major';
  import schoolJson from '../data/school-json';

  let echarts = require('echarts');
  export default {
    name: 'Home',
    data() {
      return {
        actions: [],
        sheetVisible: false,
        selectSchName: '',
        selectAcademyName: '',
        selectMajorName: ''
      }
    },
    components: {

    },
    created() {
      school.forEach(item => item.method = this.schoolItemClick);
      academy.forEach(item => item.method = this.academyItemClick);
      major.forEach(item => item.method = this.majorItemClick);
    },
    mounted () {
      this.renderCount2();
      this.renderCount4();
      this.renderCount5();
    },
    methods: {
      toggleActionSheet(type) {
        if (type == 'school') {
          this.actions = school;
        }
        if (type == 'academy') {
          this.actions = academy;
        }
        if (type == 'major') {
          this.actions = major;
        }
        this.sheetVisible = !this.sheetVisible;
      },
      schoolItemClick(item) {
        this.selectSchName = item.name;
      },
      academyItemClick(item) {
        this.selectAcademyName = item.name;
      },
      majorItemClick(item) {
        this.selectMajorName = item.name;
      },
      renderCount2() {
        let myChart = echarts.init(document.getElementById('count2'));
        let academyNameArr = [],
          totalArr = [],
          aboardArr = [];
        academy.forEach(item => {
          academyNameArr.push(item.name);
          totalArr.push(item.total);
          aboardArr.push(item.value);
        });
        let option = {
          title: {
            text: 'xxx2',
            subtext: 'sub-xxxx3'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['总共', '参加']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: academyNameArr
          },
          series: [
            {
              name: '总共',
              type: 'bar',
              data: totalArr
            },
            {
              name: '参加',
              type: 'bar',
              data: aboardArr
            }
          ]
        };
        myChart.setOption(option);
      },
      renderCount4() {
        let myChart = echarts.init(document.getElementById('count4'));
        let option = {
          color:  [
            '#c23531','#2f4554', '#61a0a8', '#d48265',
            '#91c7ae','#749f83',  '#ca8622', '#bda29a',
            '#6e7074', '#546570', '#c4ccd3'
          ],
          title : {
            text: 'xxxx1',
            'x': 'center'
          },
          legend: {
            // orient: 'vertical',
            top: '10%',
            left: '5%',
            type: 'scroll'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
            data : academy ? academy.map((item) => {
              return item.name;
            }) : '',
          },
          series: [{
            name: '学院占比',
            type: 'pie',
            radius: '60%',
            center: ['55%', '50%'],
            data: academy,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        myChart.setOption(option);
      },
      renderCount5() {
        let myChart = echarts.init(document.getElementById('count5'));
        let option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',

              data: [schoolJson],

              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',

              symbolSize: 7,

              label: {
                normal: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 9
                }
              },

              leaves: {
                label: {
                  normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                }
              },

              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        };
        myChart.setOption(option);
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-wrapper {
    .search-container {
      .search-item-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E2E2E2FF;
        height: 65px;
        padding: 0 15px;
        background-color: #fff;
        label {

        }
        .right-container {
          display: flex;
          align-items: center;
          color: #999999FF;
          .search-name {
            margin-left: 10px;
          }
          .right-arrow {
            width: 7px;
            height: 7px;
            border-top: 2px solid #CCCCCCFF;
            border-right: 2px solid #CCCCCCFF;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
          }
        }
      }
    }
    .data-count-container {
      margin: 12px 18px 13px 18px;

      .data-count-title {
        color: #999999FF;
        font-size: 14px;
      }
      .graph {
        width: 100%;
        min-height: 400px;
        background-color: #fff;
        margin-top: 15px;
      }
    }
  }
</style>
