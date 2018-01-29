var pa={};
pa.msg="测试输出内容";
pa.title="测试标题"
$(document).ready(function(){
    $("#alert").click(function(){        
        pa.ok={
            action:function(msg){
                alert("alert")
            }
        }
        // 即使定义了cancel也会被卡掉
        // pa.cancel={
        //     title:"我要取消",
        //     action:function(msg){
        //         $.ui.alert(msg)
        //     }
        // }    
        $.ui.alert(pa);
    })
    $("#confirm").click(function(){
        pa.ok={
            action:function(msg){
                alert("confirm")
            }
        }
        // 不定义cancel 则默认为点击移除confirm框
        pa.cancel={
            title:"我要取消",
            action:function(msg){
                alert("cancel")
            }
        }
        $.ui.confirm(pa)
    })
    $("#loading").click(function(){
        //可自定义加载中的gif图片
        //$.ui.loading.imgpath("./load.gif")
        pa.showtime=2000;
        pa.callback=function(){
            alert("loading")
        }
        $.ui.loading.show(pa)
    })
    $("#toast").click(function(){
        pa.showtime=2000;
        pa.callback=function(){
            alert("toast")
        }
        $.ui.toast.show(pa,"ok")
    })
    $("#toast_ok").click(function(){
        pa.showtime=2000;
        pa.callback=function(){
            alert("toast_ok")
        }
        $.ui.toast.ok(pa)
        //$.ui.toast.show(pa,"ok")
    })
    // npa={}
    // npa.msg="dfadfa";
    // npa.callback=function(){
    //     //alert('callback')
    // }
    // $.ui.loading.show("fasdfaaf");
})
function myalert(){
    alert("adafdaf")
}