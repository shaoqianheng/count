import info from './info/school'


let schoolArr = [
  {"id":"1",name:"北京工业大学",total:"3277"},
  {"id":"2",name:"北京航空航天大学",total:"3135"},
  {"id":"3",name:"北京科技大学",total:"3116"},
  {"id":"4",name:"北京理工大学",total:"3552"},
  {"id":"5",name:"北京林业大学",total:"3259"},
  {"id":"6",name:"北京邮政大学",total:"3260"},
  {"id":"7",name:"对外经济贸易大学",total:"1928"},
  {"id":"8",name:"河北工业大学",total:"3404"},
  {"id":"9",name:"南开大学",total:"3217"},
  {"id":"10",name:"清华大学",total:""},
  {"id":"11",name:"天津财经大学",total:"2977"},
  {"id":"12",name:"天津外国语大学",total:"1695"},
  {"id":"13",name:"中央财经大学",total:"2792"},
  {"id":"14",name:"中国农业大学",total:"2456"},
]

schoolArr.forEach(item => {
  info.forEach(innerItem => {
    if (innerItem.schId == item.id) {
      item.info = innerItem.info || '';
    }
  })
})

export default schoolArr
