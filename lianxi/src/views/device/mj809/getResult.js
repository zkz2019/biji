export function getAccessOrderResult(id, $this) {
  $this
    .$ajax('/access/v2.0/main/n/getAccessOrderResult', { orderid: id }, '9')
    .then((res) => {
      if (res.result.state == '0') {
        if ($this.count > 0) {
          setTimeout(() => {
            $this.loadText = `等待后台响应,预计${--$this.count}秒...`
            getAccessOrderResult(id, $this)
          }, 800)
          console.log('$this.count', $this.count)
        } else {
          $this.loadingBody = false
          $this.count = 60
          $this.$message({
            type: 'error',
            message: '请求超时!',
          })
        }
      } else if (res.result.state == '1') {
        $this.loadingBody = false
        $this.count = 60
        if ($this && $this.updateResult) {
          $this.updateResult()
        }
        $this.$message({
          type: 'success',
          message: '下发成功!',
        })
      } else if (res.result.state == '-1') {
        $this.loadingBody = false
        $this.count = 60
        $this.$message({
          type: 'error',
          message: `下发失败, 失败原因:${res.result.errormsg}`,
        })
      }
      console.log('res', res)
    })
    .catch((err) => {
      $this.loadingBody = false
      $this.count = 60
      $this.$message({
        type: 'error',
        message: `[${err.resultCode}] ` + err.resultMsg || '下发失败!',
      })
    })
}
