import Mock from 'mockjs'

const _projects = []
const numToString = (param, num) => {
  let str = ''
  for (let i = 0; i < param - num.toString().length; i++) {
    str += '0'
  }
  return str + num.toString()

}

const _SampleRegesters=[]
const _Samples=[]
const SampleRegester=[]
for(let i = 0; i < 5; i++){
  let Sample=[]
  for(let j = 0; j < 6; j++) {
    let _createtime = Mock.Random.date('yyyy-MM-dd');
    let _sampletype=['组织','DNA','RNA'];
    let _species=['动物','植物','细菌'];
    Sample.push(Mock.mock({
      id: i*3+j,
      number:Mock.Random.float(0,100,2,2),
      sampletype:_sampletype[Mock.Random.integer(0,2)],
      species:_species[Mock.Random.integer(0,2)],
      createtime:_createtime,
      man:''
    }));
    _Samples.push(Sample);
  }
  SampleRegester.push(Mock.mock({
      id:i,
      name:'样本登记单'+i,
      createtime:Mock.Random.date('yyyy-MM-dd'),
      username:Mock.Random.cname(),
      reviewname:Mock.Random.cname(),
      samples:Sample
  }));
  _SampleRegesters.concat(SampleRegester);
}

// eslint-disable-next-line padded-blocks
for (let i = 1; i < 1001; i++) {
  let _starttime = Mock.Random.date('yyyy-MM-dd');
  let _endtime = Mock.Random.date('yyyy-MM-dd');
  let _nowstate=['未启动','检测','前期探索','实验中','建库测序','分析','结题','售后','已完成','作废','暂停'];
  _projects.push(Mock.mock({
    id: 'whfs-xs-18' + numToString(4, i),
    date: Mock.Random.date('yyyy-MM-dd'),
    name: 'xxxx大学或科研机构' + Mock.Random.cname() + '老师xxxx项目' + numToString(4, i),
    starttime: _starttime,
    endtime: _endtime,
    sampleRegester:SampleRegester,
    address: Mock.mock('@county(true)'),
    project: '项目名称' + 'whfs-xs-18' + Mock.Random.guid(),
    nowstate:_nowstate[Mock.Random.integer(0,10)]
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

export const getSampleData = req => {
  let {page,showTotal}= JSON.parse(req.body);
  console.log(page);
  let total = _Samples.length;
  let Samples = _Samples.filter( (p,index) => index < showTotal * page && index >= showTotal * (page - 1));
  return {
    'total': total,
    'samples': Samples
  };
}

export const getSampleRegsData = req => {

  let {page,showTotal}= JSON.parse(req.body);
  console.log(page);
  let total = _SampleRegesters.length;
  let SampleRegesters = _SampleRegesters.filter( (p,index) => index < showTotal * page && index >= showTotal * (page - 1));
  return {
    'total': total,
    'sampleRegesters': SampleRegesters
  }
}