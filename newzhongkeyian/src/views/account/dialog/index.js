import Storages from "@/utils/Storage.js";
import {
    ajax
} from "@/request/http.js";

export function getuploadrate(val, $this, out,url) {
    console.log("kkkkkzz",url);
    if (out) {
        clearTimeout($this.times);
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
                clearTimeout($this.times);
                return;
            }
            $this.percentage = Math.floor((newtotal / total) * 100);
            $this.textShow = false;
            $this.progressShow = true;
            if (newtotal != total) {
                clearTimeout($this.times)
                $this.times = setTimeout(() => {
                    getuploadrate(val, $this,false,url);
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
                Storages.setStorage("Auploadid", "");
                clearTimeout($this.times);
                $this.progressShow = false;
                $this.textShow = true;
            }
        }
    );
}