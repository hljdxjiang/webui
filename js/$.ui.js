;(function(){
    var imagepath="../images/loading.gif";
    var confirm={
        confirmBox:function(pa){
            var hide=function(){
                $(".ui_dialog_confirm").fadeOut(100,function(){
                    $(this).remove();
                })
            }
            if($(".ui_dialog_confirm").length>0){
                $(".ui_dialog_confirm").remove();
            }
            if(!pa||typeof(pa)=="undefined"){
                return;
            }
            if(!pa.title||typeof(pa.title)=="undefined"){
                pa.title='温馨提示';
            }
            pa.msg=pa.msg||(pa.message?pa.message:pa.text);
            if(!pa.msg){
                pa.msg=""
            }

            var btnshtm=""
            
            if(pa.ok){
                var bok=pa.ok;
                var btclass=bok["class"]?bok["class"]:"ok";
                var title=(bok["title"]?bok["title"]:bok["text"])||"OK";
                var bthtm='<a href="javascript:;" id="ui_dialog_ok" class="'+btclass+'">'+title+'</a>';
                btnshtm+=bthtm;
            }
            if(pa.cancel){
                var bcancel=pa.cancel;
                var btclass=bok["class"]?bcancel["class"]:"cancel";
                var title=(bcancel["title"]?bcancel["title"]:bcancel["text"])||"Cancel";
                var bthtm='<a href="javascript:;"  id="ui_dialog_cancel"  class="'+btclass+'">'+title+'</a>'
                btnshtm+=bthtm;
            }
            var htm='<div class="ui_dialog_confirm"><div class="ui_mask ui_mask_bk"></div>'
                        +'<div class="ui_dialog"><div class="ui_dialog_hd"><strong class="ui_dialog_title">'
                        +pa.title+'</strong></div><div class="ui_dialog_msg">'
            if(/MSIE/ig.test(navigator.userAgent)&&pa.ok&&pa.cancel){
                htm+=pa.msg+'</div><div class="ui_dialog_bt ui_dialog_bt_ie">'   
            }else{
                htm+=pa.msg+'</div><div class="ui_dialog_bt">'
            }
            htm+=btnshtm+'</div></div></div>'
            $(htm).hide().appendTo('body').fadeIn(100);
            $("#ui_dialog_ok").click(function(){
                hide();
                bok=pa.ok;
                if(bok["action"]==undefined){
                    try{
                        pa.ok(pa)
                    }
                    catch(ee){
                        $.ui.alert(ee.message)
                        return;
                    }
                }else{
                    bok.action(pa);
                }
            })
            $("#ui_dialog_cancel").click(function(){
                hide();
                bcancel=pa.cancel;
                if(bcancel["action"]==undefined){
                    try{
                        pa.cancel(pa)
                    }
                    catch(ee){
                        $.ui.alert(ee.message)
                        return;
                    }
                }else{
                    bcancel.action(pa);
                }
            })
        }
    };
    var toast={
        loading:function(ob){
            var img_exists=function(){
                var ret=false;
                if(!(imagepath==""||typeof(imagepath)=="undefined")){
                    $.ajax({
                        url:imagepath,
                        type:"get",
                        timeout:"1000",
                        async:false,
                        success:function(){
                            ret=true;
                        }
                    })   
                }
                return ret;
            }
            if(typeof(ob)=="undefined"||ob==null){
                ob=""
            }
            var pa={}
            if(typeof(ob)=="string"){
                pa.msg=ob;
            }else{
                pa=ob;
                if(typeof(pa.msg)=="undefined"){
                    pa.msg=""
                }
            }
            pa.msg=pa.msg||(pa.message?pa.message:pa.text);
            if($(".ui_loading_toast").length>0){
                $(".ui_loading_toast").remove();
            }
            var htm='<div class="ui_loading_toast"><div class="ui_mask"></div><div class="ui-toast">'
            htm+='<div class="ui-toast-fading-circle">'
            var imgexist=img_exists()
            if(imgexist){
                htm+='<img style="width:40px;width:40px;" src="'+imagepath+'"/>'
                htm+='</div><div class="ui-toast-content" style="margin-bottom:10px;">'+pa.msg+'</div>'
            }else{
                if(/MSIE/ig.test(navigator.userAgent)){
                    htm='<div class="ui_loading_toast"><div class="ui_mask"></div><div class="ui-toast-content-ie-noimag">'
                    htm+=pa.msg
                }else{
                    for(var i=0;i<=12;i++){
                       htm+='<div class="ui-toast-circle'+i+' ui-toast-circle"></div>'
                    }
                    htm+='</div><div class="ui-toast-content">'+pa.msg+'</div>'
                }
            }
            htm+='</div></div>';
            $(htm).hide().appendTo('body').fadeIn(100,function(){
                if(pa.showtime){
                    try{
                        setTimeout(function(){
                            $(".ui_loading_toast").remove();
                            pa.callback=pa.callback||pa.action;
                            if(pa.callback){
                                pa.callback(pa)
                            }
                        },pa.showtime)
                    }catch(ee){

                    }
                }
            });
            if(/MSIE/ig.test(navigator.userAgent)&&!imgexist){
                var i=0;
                var setTextForIE=function(){
                    var msg=pa.msg
                    i=i%3;
                    switch(i){
                        case 0:
                            msg+=" •"
                            break;
                        case 1:
                            msg+=" • •"
                            break;
                        case 2:
                            msg+=" • • •"
                            break;
                    }
                    if($('.ui-toast-content-ie-noimag').length>0){
                        $('.ui-toast-content-ie-noimag').html(msg)
                    }else{
                        return false;
                    }
                    i++;
                    setTimeout(function() {
                        setTextForIE();
                    }, 400);
                }
                setTextForIE()
            }
        },
        show:function(ob,cls){
             if($(".ui-show-toast").length>0){
                $(".ui-show-toast").remove();
            }
            if(typeof(ob)=="undefined"||ob==null){
                ob=""
            }
            var pa={}
            if(typeof(ob)=="string"){
                pa.msg=ob;
            }else{
                pa=ob;
                pa.msg=pa.msg||(pa.message?pa.message:pa.text);
                if(typeof(pa.msg)=="undefined"){
                    pa.msg=""
                }
            }
            pa.cls=cls?cls:"ok";
            pa.showtime=pa.showtime?pa.showtime:1000;
            var htm='<div class="ui-show-toast"><div class="ui_mask"></div><div class="ui-show">'
            htm+='<i class="ui-icon-prompt ui-icon-'+pa.cls+'"></i><p class="ui-show-content">'+pa.msg+'</p>'
            htm+='</div></div>'
            $(htm).hide().appendTo('body').fadeIn(100,function(){
                setTimeout(function () {
                    $('.ui-show-toast').remove();
                    try{
                        pa.callback=pa.callback||pa.action;
                        if(pa.callback){
                            pa.callback(pa)
                        }
                    }catch(ee){
                        $.ui.alert(ee.message)
                    }
                }, pa.showtime);
            });
        },
        hide:function(pa){
            $(".ui_loading_toast").fadeOut(100,function(){
                $(this).remove();
                if((typeof(pa)!="undefined")&&(typeof(pa)!="string")){
                    try{
                        pa.callback=pa.callback||pa.action;
                        if(pa.callback){
                            pa.callback();
                        }else{
                            pa()
                        }
                    }catch(ee){
                        $.ui.alert(ee.message)
                    }
                    
                }
            })
        }
    }
    $.ui=$.ui||{};
    $.extend($.ui,{
        alert:function(pa){
            var npa={};
            if(pa==null){
               pa=""
            }
            if(typeof(pa)=="string"){
                npa.msg=pa;
                npa.ok=function(){

                }
            }else{
                npa=pa;
            }
            if(typeof(npa.ok)=="undefined"){
                npa.ok=function(){

                }
            }
            npa.cancel=null;
            confirm.confirmBox(npa)
        },
        confirm:function(pa){
            if(pa==null){
                pa=""
            }
            npa={};
            if(typeof(pa)=="string"){
                npa.msg=pa;
                npa.ok=function(){};
                npa.cancel=function(){};
            }else{
                npa=pa;
                if(typeof(npa.ok)=="undefined"){
                    npa.ok=function(){}
                }
                if(typeof(npa.cancel)=="undefined"){
                    npa.cancel=function(){}
                }
            }
            confirm.confirmBox(npa)
        }
        ,prompt:function(){
            pa={};
            if(arguments.length>1){
                pa.title=arguments[0]
                pa.value=arguments[1]
            }else if(arguments.length=0){
                pa.title=""
                pa.value=""
            }else{
                pa=arguments[0]
                if(typeof(pa)=='string'){
                    pa.title="请输入";
                }else{
                    if(typeof(pa.title)=="undefined"||pa.title==undefined){
                        pa.title="请输入";
                    }
                    if(typeof(pa.value)=="undefined"||pa.value==undefined){
                        pa.value="";
                    }
                }
            }
            if(typeof(pa.type)=="undefined"||pa.type==undefined){
                pa.type="text"
            }else{
                if(!pa.type=="text"&&!pa.type=="password"){
                    pa.type="text"
                }
            }
            if(!pa.ok){
                pa.ok=function(){    
                }
            }
            if(!pa.cancel){
                pa.ok=function(){    
                }
            }
            confirm.confirmBox(pa);
            var htm='<input type="'+pa.type+'" class="ui-prompt-input"'
            if(pa.value!=""&&pa.value!=undefined){
                htm+='value='+pa.value;
            }
            htm+='/>'
            $('.ui_dialog_msg').empty().append(htm);
            $("#ui_dialog_ok").unbind().click(function(){
                pa.value=$(".ui-prompt-input").val();
                $(".ui_dialog_confirm").fadeOut(100,function(){
                    $(this).remove();
                })
                var bok=pa.ok;
                if(bok["action"]==undefined){
                    try{
                        pa.ok(pa.value)
                    }
                    catch(ee){
                        $.ui.alert(ee.message)
                        return;
                    }
                    
                }else{
                    bok.action(pa.value);
                }
            })

            $("#ui_dialog_cancel").unbind().click(function(){
                pa.value=null;
                $(".ui_dialog_confirm").fadeOut(100,function(){
                    $(this).remove();
                })
                var bok=pa.cancel;
                if(bok["action"]==undefined){
                    try{
                        pa.cancel(pa.value)
                    }
                    catch(ee){
                        $.ui.alert(ee.message)
                        return;
                    }
                    
                }else{
                    bok.action(pa.value);
                }
            })
        }
    })
    $.ui.loading=$.ui.loading||{}
    $.extend($.ui.loading,{
        imgpath:function(){
            if (arguments.length>0){
                imagepath=arguments[0]
            }
            return this;
        },
        show:function(msg){
            toast.loading(msg);
        },
        hide:function(pa){
            toast.hide(pa);
        }
    });
    $.ui.toast=$.ui.toast||{};
    $.extend($.ui.toast,{
        show:function(pa,cls){
            toast.show(pa,cls)
        },
        ok:function(pa){
            toast.show(pa,"ok");
        },
        info:function(pa){
            toast.show(pa,"info");
        },
        warn:function(pa){
            toast.show(pa,"warn");
        },
        download:function(pa){
            toast.show(pa,"download");
        }
    });
})(jQuery);