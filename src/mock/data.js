import Mock from 'mockjs'
import {
  doCustomTimes
} from '@/libs/util'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getTableData1 = req => {
  let tableData = []

  tableData.push(Mock.mock({
    name: Random.cname(),
    email: Random.email(),
    createTime: Random.date('yyyy-MM-dd')
  }))

  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}
