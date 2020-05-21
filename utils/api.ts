import { NuxtAxiosInstance } from '@nuxtjs/axios'

let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  axiosInstance.setHeader('x-api-key', process.env.API_KEY)
  axiosInstance.setBaseURL('https://api.thedogapi.com/v1')
  $axios = axiosInstance
}

export { $axios }
