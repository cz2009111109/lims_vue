import Mock from 'mockjs'

const projects = []
// eslint-disable-next-line padded-blocks
for (let i = 0; i < 100; i++) {

  projects.push(Mock.mock({
    id: 'whfs-xs-18' + Mock.Random.guid(),
    date: Mock.Random.date('yyyy-MM-dd'),
    name: 'xxxx大学或科研机构' + Mock.Random.cname() + '老师xxxx项目',
    starttime: Mock.Random.date('yyyy-MM-dd'),
    endtime: Mock.Random.date('yyyy-MM-dd'),
    address: Mock.mock('@county(true)'),
    project: '项目名称' + 'whfs-xs-18' + Mock.Random.guid()
  }))
}

const ProjectCol = ['', '', '', '']

export const getProjectData = req => {
  return projects
}
export const getProjectCol = req => {
  return ProjectCol
}
