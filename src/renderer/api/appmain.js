import { get } from './index'
const domain = 'https://app.bilibili.com'

/**
 * 拿到tab数据
 * @returns {Promise<unknown>}
 */
export function getTab() {
  return new Promise((resolve, reject) => {
    get(`${domain}/x/resource/show/tab`, {
      'build': 6060600
    }).then(res => resolve(res)).catch(e => reject(e))
  })
}
