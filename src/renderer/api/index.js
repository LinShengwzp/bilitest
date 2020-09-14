import { ipcRenderer } from 'electron'

export function test() {
  return '??????'
}

export function get(url, params) {
  // ipcRenderer.on("HttpGetBack", (error, result) => {
  //     if (error) throw error
  //     console.log(result, "结果在这")
  // })
  return new Promise((resolve, reject) => {
    const res = ipcRenderer.sendSync('callHttpGet', {
      'url': url,
      'data': params
    })
    const parse = JSON.parse(res)
    // console.log('请求参数', '请求结果', parse)
    resolve(parse)
  })
}

export function getImage(url) {
  const res = ipcRenderer.sendSync('callGetImage', url)

  // let blob = new Blob([res]);
  // let bloburl = window.URL.createObjectURL(blob);

  return `data:image/jpeg;base64,${res}`
}

/**
 * 网络图像文件转Base64
 */
export function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return 'data:image/jpeg;base64,' + window.btoa(binary)
}
