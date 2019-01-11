import axios from '@/libs/api.request'

export const getProjects = params => {
  return axios.request({
    url: 'get_projects',
    data: params
  })
}

export const getSamples = params => {
  return axios.request({
    url: 'get_samples',
    data: params
  })
}

export const getSampleRegs = params => {
  return axios.request({
    url: 'get_sampleRegs',
    data: params
  })
}