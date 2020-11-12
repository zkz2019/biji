import Storages from '@/utils/Storage.js'
import { ajax } from '@/request/http.js'
import { Message } from 'element-ui'
import downloadjs from 'downloadjs'

export function getuploadrate(val, $this, out, url) {
  if (out) {
    clearTimeout($this.times)
  }
  let tNum = Storages.getStorage('Atimesnum')
  let num = Storages.getStorage('Auploadnum')
  if (val == '') {
    return
  }
  ajax(
    url,
    {
      uploadid: val,
    },
    '0',
  ).then((res) => {
    $this.uploadtotal = res.result
    let newtotal =
      Number(res.result.uploadnocount) + Number(res.result.uploadokcount)
    let total = Number(res.result.uploadallcount)
    if (num != newtotal) {
      Storages.setStorage('Auploadnum', newtotal)
      Storages.setStorage('Atimesnum', 0)
    } else {
      Storages.setStorage('Atimesnum', 1 + Number(tNum))
    }
    if (tNum > 300) {
      $this.$notify({
        title: '超时',
        message: '请前往导入历史查看记录!',
        type: '',
      })
      Storages.setStorage('Atimesnum', 0)
      $this.uploadText = '导入超时!'
      clearTimeout($this.times)
      return
    }
    $this.percentage = Math.floor((newtotal / total) * 100)
    $this.textShow = false
    $this.progressShow = true
    if (newtotal != total) {
      clearTimeout($this.times)
      $this.times = setTimeout(() => {
        getuploadrate(val, $this, false, url)
      }, 1000)
    } else {
      $this.$notify({
        title: '成功',
        message: $this.fileName + '导入完成！',
        type: 'success',
      })
      setTimeout(() => {
        $this.prcolor = '#67C23A'
      }, 300)
      // $this.fileList = [];
      $this.uploadText = '导入完成!'
      Storages.setStorage('Auploadid', '')
      clearTimeout($this.times)
      $this.progressShow = false
      $this.textShow = true
    }
  })
}

let timers = []
export function timerDownload(val, url, $this, name, type = '0') {
  let t = null
  let timerFun = () => {
    ajax(
      url,
      {
        rows: '10',
        page: '1',
        eeid: val,
      },
      type,
    ).then((res) => {
      let result = res.result
      let data = result.data
      let li = data[0]
      if (li) {
        if (li.eecount == li.eeokcount + li.eenocount) {
          clearInterval(t)
          if (li.eefilepath) {
            // window.location = "https://test.keenzy.cn/downzip/" + li.eefilename;
            downloadjs(window.location.origin + '/downzip/' + li.eefilename)
            //           window.location =
            // window.location.origin + '/downzip/' + li.eefilename
          } else {
            Message({
              message: name + '失败',
              type: 'error',
            })
          }
          if ($this) {
            $this.downloadLoading = false
          }
        }
      }
    })
  }
  let i = 0
  t = setInterval(() => {
    i++
    if (i < 30) {
      timerFun()
    } else {
      clearInterval(t)
      Message({
        message: name + '文件生成时间过长，请到导出历史记录中下载！',
      })
    }
  }, 5000)
  timers.push(t)
}
export function clearDownload() {
  timers.forEach((key) => {
    clearInterval(key)
  })
  timers = []
}
