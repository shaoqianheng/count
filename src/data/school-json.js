import school from './school';

import beigong from './academy/beigong';
import beihang from './academy/beihang';
import beike from './academy/beike';
import beili from './academy/beili';
import beilin from './academy/beilin';
import zhongnong from './academy/zhongnong';
import beiyou from './academy/beiyou';
import duiwaijingmao from './academy/duiwaijingmao';
import hegongda from './academy/hegongda';
import nankaida from './academy/nankaida';
import qinghua from './academy/qinghua';
import tiancai from './academy/tiancai';
import tianwai from './academy/tianwai';
import zhongcai from './academy/zhongcai';

let arr = [
  beigong,
  beihang,
  beike,
  beili,
  beilin,
  zhongnong,
  beiyou,
  duiwaijingmao,
  hegongda,
  nankaida,
  qinghua,
  tiancai,
  tianwai,
  zhongcai
];
let result = [];

arr.forEach(item => {
  let schName = '';
  let schId = item[0].schId;
  let schTotal = '';

  school.forEach(item => {
    if (item.id == schId) {
      schName = item.name;
      schTotal = item.total;
    }
  })
  result.push({
    schId: schId,
    name: schName,
    value: schTotal,
    children: item
  })
})

export default result;
