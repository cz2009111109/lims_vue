import axios from '@/libs/api.request'

export const getProjects = params => {
    return axios.request({
      url: 'get_project',
      data: params
    })
  }