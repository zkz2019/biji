import Storages from "@/utils/Storage.js";
import {
    ajax
} from "@/request/http.js";
//门锁状态,门锁复位,远程开门,记录读取,清空唯一ID,初始化门锁编号,授权同步,卡密清除,指纹清除
export function getinstructions(id, that) { //id为下发指令的id,that为调用方法处的this指向
    var txt = "";
    var url = "";
    let bool = false;
    if (id == "125") { // 根据id修改接口
        txt = "门锁状态";
        url = "/lock/order/1/getlockstatus";
        bool = true;
    } else if (id == "126") {
        txt = "门锁复位";
        url = "/lock/order/2/getlockreset";
    } else if (id == "129") {
        txt = "远程开门";
        url = "/lock/order/3/remoteopenlock";
    } else if (id == "130") {
        txt = "记录读取";
        url = "/lock/order/4/readlockrecord";
    } else if (id == "43") {

    } else if (id == "291") {
        txt = "清空唯一ID";
        url = "/lock/order/9/deleteroomcode";
    } else if (id == "198") {
        txt = "初始化门锁编号";
        url = "/lock/order/7/initroomcode";
    } else if (id == "139") {
        txt = "授权同步";
        url = "/lock/order/8/cardsync";
    } else if (id == "249") {
        txt = "指纹同步";
        url = "/lock/order/6/fingersync";
    } else if (id == "344") {
        txt = "卡密清除";
        url = "/lock/order/d/saveclearcp";
    } else if (id == "345") {
        txt = "指纹清除";
        url = "/lock/order/e/saveclearf";
    } else if (id == "608") {
        txt = "远程关门";
        url = "/lock/order/f/remotecloselock";
    } else if (id == "558") { } else if (id == "559") { }
    let $this = that;
    let data = {
        roomid: $this.layerParam.roomid
    };
    $this.loading2 = true;
    $this.$ajax(url, data, "1")
        .then(res => {
            if (res.result == "") {
                $this.$message({
                    showClose: true,
                    message: "指令码为0!",
                    type: "error"
                });
                $this.loading2 = false;
                return;
            }
            if (res.result.orderid == "" || res.result == "success") {
                $this.$notify({
                    title: "成功",
                    message: res.result.ordermsg,
                    type: "success"
                });
                $this.loading2 = false;
                $this.zlRefresh = new Date().getTime();
                return;
            }

            $this.count = 60;
            getorderresult(res.result.orderid, bool, that); //循环调用公共方法,直至后台返回下发结果
        })
        .catch(err => {
            console.log("失败", err);
            $this.count = 60;
            $this.loading2 = false;
            $this.$notify.error({
                title: "操作失败",
                message: `[${err.resultCode}] ` + err.resultMsg
            });
        });
}
//根据指令id获取指令结果     公共方法 ,orderid为已选中房间id ,x为判断指令是否为门锁状态,that为调用方法处的this
function getorderresult(orderid, bool, that) {
    let url = "/lock/order/c/getorderresult";
    let data = {
        orderid: orderid
    };
    let $this = that;
    $this.$ajax(url, data, "1")
        .then(res => {
            if (res.result.orderid == "") {
                $this.$notify({
                    title: "成功",
                    message: res.result.ordermsg,
                    type: "success"
                });
                $this.zlRefresh = new Date().getTime();
                $this.dialogAddpassword = false;
                // $this.onRefresh();
                return;
            }
            if (res.result.resultstate == 0) {
                if ($this.count > 0) {
                    console.log($this.count);
                    $this.count--;
                    $this.setvals = setTimeout(() => {
                        getorderresult(orderid, bool, that);
                    }, 1000);
                } else {
                    $this.loading2 = false;
                    clearInterval($this.setvals);
                    $this.$message({
                        showClose: true,
                        message: "获取指令结果超时，请去指令查询查看结果",
                        type: "error"
                    });
                    $this.count = 60;
                    return;
                }
            } else if (res.result.resultstate == 1) {
                $this.$alert(res.result.resultmsg || "下发成功", "指令结果", {
                    confirmButtonText: "确定",
                    type: "success",
                    callback: action => {
                        $this.zlRefresh = new Date().getTime();
                        if (bool) {
                            console.log('$this.layerParam.roomtype', $this.layerParam, $this.layerParam.roomtype);
                            if ($this.layerParam.roomtype != "2") {
                                $this.$store.commit("setfjg38dialogactiveName", "4");
                                $this.dialogVisible = true;
                            } else if ($this.layerParam.roomnexttype == "3" || $this.layerParam.roomnexttype == "4") {
                                $this.$store.commit("setfjg38dialogactiveName", "3");
                                $this.dialogVisible = true;
                            } else {
                                $this.$store.commit("setfjg38dialogactiveName", "2");
                                $this.dialogVisible = true;
                            }
                        }
                    }
                });
                $this.loading2 = false;
                clearInterval($this.setvals);
                $this.count = 60;
                return;
            } else {
                $this.$notify({
                    title: "失败",
                    message: res.result.resultmsg || "下发失败",
                    type: "error"
                });
                clearInterval($this.setvals);
                $this.count = 60;
                $this.loading2 = false;
                return;
            };
        })
        .catch(err => {
            clearInterval($this.setvals);
            $this.count = 60;
            $this.loading2 = false;
            $this.$message({
                showClose: true,
                message: `[${err.resultCode}] ` + err.resultMsg,
                type: "error"
            });
            console.log(err);
        });
}



export function savepswauth(val, that) {
    let $this = that;
    let txt = "密码授权";
    let url = "/lock/order/5/savepswauth"
    let data = {
        roomid: $this.layerParam.roomid,
        count: val.availability,
        edate: val.edate,
        etime: val.etime,
        stime: val.stime,
        password: val.mm,
        remark: val.bz
    };
    $this.loading2 = true;
    $this.$ajax(url, data, "1")
        .then(res => {
            if (res.result.orderid == "") {
                $this.dialogAddpassword = false;
                $this.$notify({
                    title: "成功",
                    message: res.result.ordermsg,
                    type: "success"
                });
                $this.loading2 = false;
                // $this.onRefresh();
                return;
            }
            $this.$notify({
                title: "成功",
                message: txt + "操作成功，正在下发，请稍候！",
                type: "success"
            });
            $this.count = 60;
            // $this.setvals = setInterval(() => {
            //     if ($this.count > 0) {
            //         $this.count--;
            getorderresult(res.result.orderid, false, that);
            //     } else {
            //         $this.loading2 = false;
            //         clearInterval($this.setvals);
            //         $this.$message({
            //             showClose: true,
            //             message: "获取指令结果超时，请去指令查询查看结果",
            //             type: "error"
            //         });
            //         // $this.count = 60;
            //     }
            // }, 1000);
        })
        .catch(err => {
            console.log(err);
            $this.loading2 = false;
            $this.count = 60;
            $this.$notify.error({
                title: "操作失败",
                message: `[${err.resultCode}] ` + err.resultMsg
            });
        });
}

export function updatelockAdd(val, that, type) {
    let $this = that;
    let txt = "";
    let url = "";
    let data = {};
    if (type == 1) {
        url = "/lock/order/4/updateforcelock"
        data = {
            roomid: $this.layerParam.roomid,
            forcelock: val.value
        };
    } else if (type == 0) {
        url = "/lock/order/2/updateworkmode";
        data = {
            roomid: $this.layerParam.roomid,
            workmode: val.value
        };
    }
    $this.loading2 = true;
    $this.$ajax(url, data, "1")
        .then(res => {
            if (res.result.orderid == "") {
                $this.updatelockAdd = false;
                $this.$notify({
                    title: "成功",
                    message: res.result.ordermsg,
                    type: "success"
                });
                $this.loading2 = false;
                return;
            }
            $this.count = 60;
            $this.loading2 = true;
            getorderresult(res.result.orderid, false, that);
        })
        .catch(err => {
            $this.loading2 = false;
            console.log(err);
            $this.$notify.error({
                title: "操作失败",
                message: `[${err.resultCode}] ` + err.resultMsg
            });
        });
}

// let times = null;
export function getuploadrate(val, $this, out) {
    if (out) {
        clearTimeout($this.times);
    }
    let tNum = Storages.getStorage("timesnum");
    let num = Storages.getStorage("uploadnum");
    if (val == "") {
        return;
    }
    ajax("/lock/upload/l/getuploadrate", {
        uploadid: val
    }, "0").then(
        res => {
            $this.uploadtotal = res.result;
            let newtotal =
                Number(res.result.uploadnocount) + Number(res.result.uploadokcount);
            let total = Number(res.result.uploadallcount);
            if (num != newtotal) {
                Storages.setStorage("uploadnum", newtotal);
                Storages.setStorage("timesnum", 0);
            } else {
                Storages.setStorage("timesnum", 1 + Number(tNum));
            }
            if (tNum > 300) {
                $this.$notify({
                    title: "超时",
                    message: "请前往导入历史查看记录!",
                    type: ""
                });
                Storages.setStorage("timesnum", 0);
                $this.uploadText = "导入超时!";
                clearTimeout($this.times);
                return;
            }
            $this.percentage = Math.floor((newtotal / total) * 100);
            $this.textShow = false;
            $this.progressShow = true;
            if (newtotal != total) {
                clearTimeout($this.times)
                $this.times = setTimeout(() => {
                    getuploadrate(val, $this);
                }, 1000);
            } else {
                $this.$notify({
                    title: "成功",
                    message: $this.fileName + "导入完成！",
                    type: "success"
                });
                setTimeout(() => {
                    $this.prcolor = "#67C23A";
                }, 300)
                // $this.fileList = [];
                $this.uploadText = "导入完成!";
                Storages.setStorage("uploadid", "");
                clearTimeout($this.times);
                $this.progressShow = false;
                $this.textShow = true;
            }
        }
    );
}