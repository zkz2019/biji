import Storages from "@/utils/Storage.js";
import {
    Message
} from 'element-ui';
import {
    ajax
} from "@/request/http.js";
import { download } from "@/utils/utils.js";

import downloadjs from "downloadjs"

export function getuploadrate(val, $this, out, url) {
    let times = Storages.getStorage("Auploadtimes");
    if (out) {
        clearTimeout(times);
    }
    let tNum = Storages.getStorage("Atimesnum");
    let num = Storages.getStorage("Auploadnum");
    if (val == "") {
        return;
    }
    ajax(url, {
        uploadid: val
    }, "0").then(
        res => {
            $this.uploadtotal = res.result;
            // $this.dispatch("setUploadtotal", res.result);
            let newtotal =
                Number(res.result.uploadnocount) + Number(res.result.uploadokcount);
            let total = Number(res.result.uploadallcount);
            if (num != newtotal) {
                Storages.setStorage("Auploadnum", newtotal);
                Storages.setStorage("Atimesnum", 0);
            } else {
                Storages.setStorage("Atimesnum", 1 + Number(tNum));
            }
            if (tNum > 300) {
                $this.$notify({
                    title: "超时",
                    message: "请前往导入历史查看记录!",
                    type: ""
                });
                Storages.setStorage("Atimesnum", 0);
                $this.uploadText = "导入超时!";
                clearTimeout(times);
                return;
            }
            $this.percentage = Math.floor((newtotal / total) * 100);
            $this.textShow = false;
            $this.progressShow = true;
            if (newtotal != total) {
                clearTimeout(times)
                let setTimes = setTimeout(() => {
                    getuploadrate(val, $this, false, url);
                }, 1000);
                Storages.setStorage("Auploadtimes", setTimes);
            } else {
                let fileName = Storages.getStorage("Auploadname");
                $this.$notify({
                    title: "成功",
                    message: fileName + "导入完成！",
                    type: "success"
                });
                setTimeout(() => {
                    $this.prcolor = "#67C23A";
                }, 300)
                // $this.fileList = [];
                $this.uploadText = "导入完成!";
                Storages.setStorage("Auploadid", "");
                let a = Storages.getStorage("Auploadid");
                clearTimeout(times);
                $this.progressShow = false;
                $this.textShow = true;
            }
        }
    );
}
//导出
export function inExport(url, name, $this, data = {}, obj = {}) {
    ajax(url, data, "8", obj, "文件导出中...", 60000)
        .then(res => {
            if (res.size) {
                download(res, name);
                $this.$notify({
                    title: "成功",
                    message: name + "文件导出成功！",
                    type: "success"
                });
            }
        })
        .catch(err => {
            $this.$message.error("文件导出失败！失败原因：" + err.resultMsg);
        });
}


let timers = [];
export function timerDownload(val, url, $this, name) {
    let t = null;
    let timerFun = () => {
        ajax(url, {
            rows: "1000",
            page: "1",
            eeid: val
        }, "0").then((res) => {
            let result = res.result;
            let data = result.data;
            let li = data[0];
            if (li) {
                if (li.eecount == li.eeokcount + li.eenocount) {
                    clearInterval(t);
                    if (li.eefilepath) {
                        downloadjs(window.location.origin + "/downzip/" + li.eefilename);
                        // window.location = "https://test.keenzy.cn/downzip/" + li.eefilename;
                        // window.location = window.location.origin + "/downzip/" + li.eefilename;
                    } else {
                        Message({
                            message: name + "失败",
                            type: "error"
                        });
                    }
                    if ($this) {
                        $this.downloadLoading = false;
                    }
                }
            }
        });
    };
    let i = 0;
    t = setInterval(() => {
        i++;
        if (i < 30) {
            timerFun();
        } else {
            clearInterval(t);
            Message({
                message: name + "文件生成时间过长，请到导出历史记录中下载！",
            });
        }
    }, 5000);
    timers.push(t);
}
export function clearDownload() {
    timers.forEach((key) => {
        clearInterval(key);
    })
    timers = [];
}