const htmlTitle = (x) => { return '<span style="color: #22a3df;">' + x.slice(0, 1) + '</span>' + x.slice(1).toUpperCase() };
const nick = (x) => { return '<span style="color: #22a3df;">' + x.slice(0, 1) + '</span>' + x.slice(1).toUpperCase() };

const mainHost = {
  'title': '爱猫家',
  'nick': nick('imaojia'),
  'recordNo': '粤ICP备16057746号',
  'beianUrl': 'https://beian.miit.gov.cn/'
}

export default {
  mainHost,
  htmlTitle
}
