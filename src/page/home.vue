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
          <img src="../assets/information.png" @click="infoAlert('school')" alt="info" width="17" height="17">
        </label>
        <div class="right-container" @click="togglePicker('school')">
          <div class="search-name">{{selectSchName}}</div>
        </div>
      </div>
      <div class="search-item-container">
        <label>
          学院
          <img src="../assets/information.png" @click="infoAlert('academy')" alt="info" width="17" height="17">
        </label>
        <div class="right-container" @click="togglePicker('academy')">
          <div class="search-name">{{selectAcademyName || '所有'}}</div>
        </div>
      </div>
    </div>
    <div class="data-count-container">
      <div class="data-count-title">
        <img src="../assets/data.png" alt="data" width="17" height="17">
        数据统计
      </div>
      <div class="graph" id="count1" v-show="isShowTreeGraph"></div>
      <div class="graph" id="count2"></div>
      <div class="graph" id="count3"></div>
    </div>
    <div class="data-count-container">
      <div class="data-count-title">
        <img src="../assets/table.png" alt="data" width="17" height="17">
        表格统计
      </div>
      <div class="graph-container">
        <table>
          <thead>
            <tr>
              <th>学院名称</th>
              <th>总人数</th>
              <th>留学人数</th>
              <th>留学率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="info in tableArr">
              <td>{{info.name}}</td>
              <td>{{info.total}}</td>
              <td>{{info.value}}</td>
              <td>{{info.rate}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="picker-container" v-if="schoolPicker" transition="modal">
      <mt-picker :slots="schoolSlots" @change="onSchItemChange" :showToolbar="true" value-key="name">
        <div class="tool-bar">
          <span class="cancel-btn" @click="schoolPicker=false">取消</span>
          <span class="title">请选择学校</span>
          <span class="sure-btn" @click="schoolItemClick">确定</span>
        </div>
      </mt-picker>
    </div>
    <div class="picker-container" v-if="academyPicker" transition="modal">
      <mt-picker :slots="academySlots" @change="onAcademyItemChange" :showToolbar="true" value-key="name">
        <div class="tool-bar">
          <span class="cancel-btn" @click="academyPicker=false">取消</span>
          <span class="title">请选择学院</span>
          <span class="sure-btn" @click="academyItemClick">确定</span>
        </div>
      </mt-picker>
    </div>
  </div>
</template>

<script>
  import { Actionsheet, Picker, MessageBox } from 'mint-ui';
  import school from '../data/school';
  import academy from '../data/academy/index';
  import major from '../data/major/index';
  import schoolJson from '../data/school-json';

  let echarts = require('echarts');
  export default {
    name: 'Home',
    data() {
      return {
        actions: [],
        changeAcademy: academy,
        schoolPicker: false,
        academyPicker: false,
        isShowTreeGraph: true,
        selectSchId: 0,
        selectSchName: '',
        selectAcademyId: 0,
        selectAcademyName: '',
        changeSchPickerItem: {},
        changeAcademyPickerItem: {},
        schoolSlots: [
          {
            flex: 1,
            values: [],
            textAlign: 'center',
          }
        ],
        academySlots: [
          {
            flex: 1,
            values: [],
            textAlign: 'center',
          }
        ],
        tableArr: []
      }
    },
    components: {

    },
    created() {
      this.selectSchName = this.changeSchPickerItem.name = school[0].name; // 默认选中第一个学校的名称
      this.selectSchId = this.changeSchPickerItem.id = school[0].id;

    },
    mounted () {
      this.schoolItemClick();
    },
    methods: {
      infoAlert(type) {
        let typeName = '',
          info = '';
        if (type == 'school') {
          typeName = '学校信息提示';
          school.forEach(item => {
            if (item.id == this.selectSchId) {
              info = item.info;
            }
          })

        } else if (type == 'academy' && this.selectAcademyId) {
          typeName = '学院信息提示';
          academy.forEach(item => {
            if (item.schId == this.selectSchId && item.id == this.selectAcademyId) {
              info = item.info;
            }
          })
        } else if (type == 'academy' && !this.selectAcademyId) {
          return false;
        }
        MessageBox.alert(info, typeName);
      },
      togglePicker(type) {
        let result = [];
        if (type == 'school') {
          this.schoolPicker = true;
          school.forEach(item => result.push({name: item.name, id: item.id}));
          this.schoolSlots[0].values = result;
        }
        if (type == 'academy') {
          let schId = this.selectSchId;
          this.academyPicker = true;
          academy.forEach(item => {
            if (item.schId == schId) {
              result.push({name: item.name, id: item.id})
            }
          })
          this.academySlots[0].values = result;
        }
      },
      onSchItemChange(picker, values) {
        this.changeSchPickerItem = values[0];
      },
      onAcademyItemChange(picker, values) {
        this.changeAcademyPickerItem = values[0];
      },
      schoolItemClick() {
        let selectSchInfo = this.changeSchPickerItem;
        // 设置学校信息
        this.selectSchName = selectSchInfo.name;
        this.selectSchId = selectSchInfo.id;

        this.selectAcademyName = '所有';
        this.selectAcademyId = 0;
        this.schoolPicker = false;
        this.isShowTreeGraph = true;
        // 渲染图形1
        this.renderCount1();
        // 渲染图形2
        let academyNameArr = [],
          totalArr = [],
          itemInfoArr = [],
          aboardArr = [];

        academy.forEach(item => {
          if (item.schId == this.selectSchId) {
            academyNameArr.push(item.name);
            totalArr.push(item.total);
            aboardArr.push(item.value);
            itemInfoArr.push(item);
          }
        });
        this.renderCount2(academyNameArr, totalArr, aboardArr);
        this.renderCount3(academyNameArr, itemInfoArr);
        this.renderTable(itemInfoArr);
      },
      academyItemClick() {
        let selectAcademyInfo = this.changeAcademyPickerItem;

        this.selectAcademyName = selectAcademyInfo.name;
        this.selectAcademyId = selectAcademyInfo.id;

        this.isShowTreeGraph = false;
        this.academyPicker = false;
        // 渲染数据
        let majorNameArr = [],
          totalArr = [],
          itemInfoArr = [],
          aboardArr = [];

        major.forEach(item => {
          if (item.schId == this.selectSchId && item.academyId == this.selectAcademyId) {
            majorNameArr.push(item.name);
            totalArr.push(item.total);
            aboardArr.push(item.value);
            itemInfoArr.push(item);
          }
        });
        this.renderCount2(majorNameArr, totalArr, aboardArr);
        this.renderCount3(majorNameArr, itemInfoArr);
        this.renderTable(itemInfoArr);
      },
      renderCount1() {
        let myChart = echarts.init(document.getElementById('count1'));
        let renderData = schoolJson.filter(item => item.schId == this.selectSchId)[0];

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
              data: [renderData],
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
      },
      renderCount2(nameArr, totalArr, aboardArr) {
        let myChart = echarts.init(document.getElementById('count2'));

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
            data: nameArr
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
      renderCount3(nameArr, aboardArr) {
        let myChart = echarts.init(document.getElementById('count3'));

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
            data : nameArr,
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
      renderTable(resultArr) {
        this.tableArr = resultArr;
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
        position: relative;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E2E2E2FF;
        height: 65px;
        padding: 0 35px 0 15px;
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
            display: flex;
            align-items: center;
          }
          ::after {
            border: 2px solid #c8c8cd;
            border-bottom-width: 0;
            border-left-width: 0;
            content: '';
            top: 32px;
            right: 20px;
            position: absolute;
            width: 8px;
            height: 9px;
            -webkit-transform: translateY(-50%) rotate(45deg);
            transform: translateY(-50%) rotate(45deg);
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
      .graph-container {
        margin-top: 15px;
        background: #fff;
        /*width: 100%;*/
        padding: 10px 8px;
        max-height: 450px;
        overflow-y: auto;
        table {
          width: 100%;
          th {
            color: #B1B1B1;
            height: 40px;
            line-height: 40px;
          }
          td {
            width: 25%;
            height: 35px;
            line-height: 35px;
            text-align: center;
          }
        }
      }
    }
  }
  .picker-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
  }
  .picker {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
  }
  .vote-mt-picker {
    background: #fff;
    margin-top: 10%;
    color: #999;
  }
  .tool-bar {
    display: flex;
    height: 49px;
    justify-content: space-around;
    align-items: center;
  }
  .tool-bar .cancel-btn {
    color: #999;
    font-size: 16px;
  }
  .tool-bar .title {
    color: #333;
    font-size: 16px;
  }
  .tool-bar .sure-btn {
    color: #6984F7;
    font-size: 16px;
  }
  .modal-transition {
    transition: all 1s ease;
    overflow: hidden;
  }
  .modal-enter {
    animation: bounce-in 1s;
  }
  .modal-leave {
    animation: bounce-out 1s;
  }
</style>
