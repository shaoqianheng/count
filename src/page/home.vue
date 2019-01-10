<template>
  <div class="home-wrapper">
    <div class="search-container">
      <div class="search-item-container">
        <label>学校</label>
        <div class="right-container" @click="toggleActionSheet('school')">
          <div class="search-name">{{selectSchName}}</div>
          <div class="right-arrow"></div>
        </div>
      </div>
      <div class="search-item-container">
        <label>学院</label>
        <div class="right-container" @click="toggleActionSheet('academy')">
          <div class="search-name">{{selectAcademyName}}</div>
          <div class="right-arrow"></div>
        </div>
      </div>
      <div class="search-item-container">
        <label>专业</label>
        <div class="right-container" @click="toggleActionSheet('major')">
          <div class="search-name">{{selectMajorName}}</div>
          <div class="right-arrow"></div>
        </div>
      </div>
    </div>
    <div class="data-count-container">
      <div class="data-count-title">分会场视角</div>
      <div class="graph" id="count5"></div>
      <div class="graph" id="count2"></div>
      <div class="graph" id="count3"></div>
      <div class="graph" id="count4"></div>
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
//      this.renderCount1();
      this.renderCount2();
      this.renderCount3();
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
        let option = {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis:  {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['周一','周二','周三', '周四', '周五', '周六', '周日']
          },
          series: [
            {
              name: '直接访问',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
        myChart.setOption(option);
      },
      renderCount3() {
        let myChart = echarts.init(document.getElementById('count3'));
        let option = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'视频广告',
              type:'line',
              stack: '总量',
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
        myChart.setOption(option);
      },
      renderCount4() {
        let myChart = echarts.init(document.getElementById('count4'));
        let option = {
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
          },
          series: [{
            type: 'pie',
            radius: 60,
            center: ['25%', '30%']
            // No encode specified, by default, it is '2012'.
          }, {
            type: 'pie',
            radius: 60,
            center: ['75%', '30%'],
            encode: {
              itemName: 'product',
              value: '2013'
            }
          }, {
            type: 'pie',
            radius: 60,
            center: ['25%', '75%'],
            encode: {
              itemName: 'product',
              value: '2014'
            }
          }, {
            type: 'pie',
            radius: 60,
            center: ['75%', '75%'],
            encode: {
              itemName: 'product',
              value: '2015'
            }
          }]
        };
        myChart.setOption(option);
      },
      renderCount5() {
        let myChart = echarts.init(document.getElementById('count5'));
        let option = {
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015'],
              ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
              ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
              ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
            ]
          },
          xAxis: [
            {type: 'category', gridIndex: 0},
            {type: 'category', gridIndex: 1}
          ],
          yAxis: [
            {gridIndex: 0},
            {gridIndex: 1}
          ],
          grid: [
            {bottom: '55%'},
            {top: '55%'}
          ],
          series: [
            // These series are in the first grid.
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            // These series are in the second grid.
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
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
        width: 96%;
        height: 400px;
        background-color: #fff;
        margin-top: 15px;
      }
    }
  }
</style>
