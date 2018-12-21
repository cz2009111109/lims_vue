import Mock from 'mockjs'

const _projects = []
const numToString = (param, num) => {
  let str = '';
  for (let i = 0; i < param - num.toString().length; i++) {
    str += '0';
  }
  return str + num.toString();

}

// eslint-disable-next-line padded-blocks
for (let i = 1; i < 1001; i++) {
  let _starttime = Mock.Random.date('yyyy-MM-dd');
  let _endtime = Mock.Random.date('yyyy-MM-dd');
  _projects.push(Mock.mock({
    id: 'whfs-xs-18' + numToString(4, i),
    date: Mock.Random.date('yyyy-MM-dd'),
    name: 'xxxx大学或科研机构' + Mock.Random.cname() + '老师xxxx项目' + numToString(4, i),
    starttime: _starttime,
    endtime: _endtime,
    address: Mock.mock('@county(true)'),
    project: '项目名称' + 'whfs-xs-18' + Mock.Random.guid()
  }))
}

const ProjectCol = ['', '', '', '']

export const getProjectData = req => {
  
  console.log(req);
  console.log(req.body);
  let {page,showTotal}= JSON.parse(req.body);
  console.log(page);
  let total = _projects.length;
  let projects = _projects.filter( (p,index) => index < showTotal * page && index >= showTotal * (page - 1));
  return {
    'total': total,
    'projects': projects
  };
}
export const getProjectCol = req => {
  return ProjectCol
}
