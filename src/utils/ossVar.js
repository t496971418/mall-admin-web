import { currBranch } from '@/projects/menu/api/api.config.js'
/**
 * @param {Object} ossSts oss存储bucket和region
 */
export const ossSts = {
  bucket: 'pd-api-' + currBranch(),
  region: 'oss-cn-shenzhen'
}

export const ossStsExcuApk = {
  bucket: 'pd-auto-builds-apk',
  region: 'oss-cn-shenzhen'
}

export const ossStsFile = {
  bucket: 'pd-api-' + currBranch(),
  region: 'oss-cn-shenzhen'
}

export const tempAuthKey = {
  accessKeyId: 'LTAI0pGOzOcQSdpF',
  accessKeySecret: 'BzCXNiLIilYDbPT6WbyNBgUYbIdmxn'
}
/**
 * @param {String} defaultPath 默认存储文件夹路径
 */
export const defaultPath = `org/license`

/**
 * @param {String} PicPath 默认存储文件夹路径
 */
export const PicPath = `auth/headpic/`
/**
 * @param {String} uploadUrl 上传的url
 */
export const uploadUrl = `https://${ossSts.bucket}.${ossSts.region}.aliyuncs.com/`
