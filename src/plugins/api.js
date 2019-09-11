import notification from './notification'
export default function ({ $axios, redirect, route }) {
  $axios.onRequest(config => {
    console.log('request to ', config.url)
  })
  $axios.onError(error => {
    console.log('request error ', error)
    const {
      response: { status, msg }
    } = error
    if (process.client) {
      notification.error({
        message: status,
        description: msg
      })
    }
    switch (error.code) {
      case 400: {
        redirect('/400')
        break
      }
    }
  })
  $axios.onResponse(response => {
    console.log('get response ', response.status)
    if (response.status === 200) {
      const { msg, code, result } = response.data
      if (code !== 0) {
      /* eslint prefer-promise-reject-errors:0 */
        return Promise.reject({ msg, code })
      } else {
        return result
      }
    }
  })
  $axios.onResponseError(error => {
    console.log('get response error ', error)
    const { code, msg } = error
    const commonCode = parseInt(code / 100)
    if (process.client) {
      notification.error({
        message: commonCode,
        description: msg
      })
    }
    switch (error.code) {
      case 40001: {
        redirect(route.path)
        break
      }
    }
  })
}
