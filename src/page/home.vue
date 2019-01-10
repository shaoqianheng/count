<template>
  <div class="home-wrapper">
    <div class="search-text">
      <img src="../assets/search.png" alt="search" width="17" height="17">
      搜索
    </div>
    <div class="search-container">
      <div class="search-item-container">
        <label>
          学校
          <img src="../assets/information.png" alt="info" width="17" height="17">
        </label>
        <div class="right-container" @click="togglePicker('school')">
          <div class="search-name">{{selectSchName}}</div>
          <div class="right-arrow"></div>
        </div>
      </div>
      <div class="search-item-container">
        <label>
          学院
          <img src="../assets/information.png" alt="info" width="17" height="17">
        </label>
        <div class="right-container" @click="togglePicker('academy')">
          <div class="search-name">{{selectAcademyName || '所有'}}</div>
          <div class="right-arrow"></div>
        </div>
      </div>
    </div>
    <div class="data-count-container">
      <div class="data-count-title">
        <img src="../assets/data.png" alt="data" width="17" height="17">
        数据统计
      </div>
      <div class="graph" id="count5"></div>
      <div class="graph" id="count2"></div>
      <div class="graph" id="count4"></div>
    </div>
    <mt-picker :slots="slots" @change="pickerItemClick" :show-toolbar="true" value-key="name" v-show="sheetVisible"></mt-picker>
    <!--<mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>-->
  </div>
</template>

<script>
  import { Actionsheet, Picker } from 'mint-ui';
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
        selectSchId: 0,
        selectSchName: '',
        selectAcademyName: '',
        selectMajorName: '',
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center',
            name: '取消'
          }
        ]
      }
    },
    components: {

    },
    created() {
      school.forEach(item => item.method = this.schoolItemClick);
      academy.forEach(item => item.method = this.academyItemClick);
      major.forEach(item => item.method = this.majorItemClick);

      this.selectSchName = school[0].name; // 默认选中第一个学校的名称
      this.selectSchId = school[0].id;
    },
    mounted () {
      this.renderCount2();
      this.renderCount4();
      this.renderCount5();
    },
    methods: {
      togglePicker(type) {
        let result = [];
        if (type == 'school') {
          school.forEach(item => result.push({name: item.name, id: item.id}));
          this.slots[0].values = result;
        }
        if (type == 'academy') {
          this.actions = academy;
        }
        this.sheetVisible = !this.sheetVisible;
      },
      pickerItemClick(picker, values) {
        console.warn('picker：', picker, ' values：', values);
//        this.sheetVisible = false;
      },
      schoolItemClick(item) {
        this.selectSchName = item.name;
        this.selectSchId = item.id;
        this.renderCount2();
        this.renderCount4();
        this.renderCount5();
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
          if (item.schId == this.selectSchId) {
            let children = item.children;
            academyNameArr.push(children.name);
            totalArr.push(children.total);
            aboardArr.push(children.value);
          }
        });
        let option = {
          title: {
            text: '留学人数统计',
            top: '2%'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            right: '1%',
            top: '2%',
            data: ['学院总人数', '学院留学人数']
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
              name: '学院总人数',
              type: 'bar',
              data: totalArr
            },
            {
              name: '学院留学人数',
              type: 'bar',
              data: aboardArr
            }
          ]
        };
        myChart.setOption(option);
      },
      renderCount4() {
        let myChart = echarts.init(document.getElementById('count4'));
        let academyNameArr = [],
          totalArr = [],
          aboardArr = [];

        academy.forEach(item => {
          if (item.schId == this.selectSchId) {
            let children = item.children;
            academyNameArr.push(children.name);
            totalArr.push(children.total);
            aboardArr.push(children);
          }
        });
        let option = {
          color:  [
            '#c23531','#2f4554', '#61a0a8', '#d48265',
            '#91c7ae','#749f83',  '#ca8622', '#bda29a',
            '#6e7074', '#546570', '#c4ccd3'
          ],
          title : {
            text: '学院留学人数占比',
            top: '2%',
            'x': 'center'
          },
          legend: {
            // orient: 'vertical',
            top: '10%',
            left: '0',
            type: 'scroll'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}人 ({d}%)',
            data : academyNameArr,
          },
          series: [{
            name: '学院留学人数',
            type: 'pie',
            radius: '80%',
            center: ['55%', '60%'],
            data: aboardArr,
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
          title : {
            text: '学校树形图',
            top: '5%'
          },
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: [schoolJson],
              top: '1%',
              left: '17%',
              bottom: '1%',
              right: '20%',
              symbolSize: 9,
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
    .search-text {
      color: #999999FF;
      padding-left: 8px;
      font-size: 14px;
      height: 30px;
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
      }
    }
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
          display: flex;
          align-items: center;
          img {
            margin-left: 10px;
          }
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
      margin: 12px 8px 13px 8px;

      .data-count-title {
        color: #999999FF;
        font-size: 14px;
        display: flex;
        img {
          margin-right: 10px;
        }
      }
      .graph {
        width: 100%;
        min-height: 600px;
        background-color: #fff;
        margin-top: 15px;
      }
    }
  }
</style>
