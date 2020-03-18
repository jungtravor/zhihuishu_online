(function(){
    var supportElem = document.createElement("script");
    supportElem.setAttribute("type","text/javascript");
    supportElem.setAttribute("src","//kefu.easemob.com/webim/easemob.js");
    document.body.appendChild(supportElem);

    var loginInfo = jQuery.parseJSON(getCookie('CASLOGC'));
    var userId = "",//userid
        uuId = "",//uuid
        realName = "",//真实姓名
        username = "",//用户名
        email = "",//邮箱
        createTime = "",//创建时间
        code = "",//学号
        schoolName = "",//学校名
        collegeName = "",//学院机构名
        enrollmentYear = "";//入学年份
       var isTeacher = false; //是否是老师

    if(loginInfo && loginInfo != null && loginInfo.uuid){
        uuId = loginInfo.uuid;
        userId = loginInfo.userId;
        $.ajax("//appcomm-user.zhihuishu.com/app-commserv-user/userInfo/getUserInfoAndAuthInfo?uuid="+uuId,{
            dataType:"jsonp",
            cache: false,
            jsonp: "callback" ,
            callback: "foo",
            success:function (json) {
                realName = json.realName;
                username = json.userName;
                email = json.email;
                createTime = new Date(json.createTime);
                createTime = createTime.toLocaleString();
                code = json.code;
                isTeacher = json.isTeacher;
                schoolName = json.schoolName;
                collegeName = json.collegeName;
                enrollmentYear = json.enrollmentYear;
                var desc = "id:"+userId+"\n用户名："+username+"\n注册时间："+createTime+"\n学校："+schoolName+"\r学号："+code+"\n入学年份："+enrollmentYear+"\r学院："+collegeName;
                window.easemobim = window.easemobim || {};
                easemobim.config = {
                    hide: true,
                    autoConnect: true,
                    domain:'//kefu.easemob.com',
                    visitor: {
                        trueName: realName,
                        userNickname: realName,
                        description: desc,
                        email: email
                    },
                    onready: function () {
                        $(".js-service-support").removeClass("clicked").addClass("loaded");
                    },
                 };
            }
        })
    }else{
        window.easemobim = window.easemobim || {};
        easemobim.config = {
            hide: true,
            autoConnect: true,
            domain:'//kefu.easemob.com',
            onready: function () {
                $(".js-service-support").removeClass("clicked").addClass("loaded");
            },
    };
    }

    //触发调用环信客服
    $("body").delegate(".js-service-support","click",function () {

        var $this = $(this);

        console.log("------点击客服按钮",isTeacher);

        if(isTeacher != undefined && isTeacher){
            if(typeof(appBaseJSContextObj) == "undefined"){
                if(!$this.hasClass("clicked") && !$this.hasClass("loaded")){
                    $this.addClass("clicked");
                    easemobim.bind({configId: "040d8ab7-f6f2-422e-9534-44d0360a739a"});
                    setTimeout($this.removeClass("clicked"),3000);
                }else if($this.hasClass("clicked") && !$this.hasClass("loaded")){
                    return;
                }else{
                    easemobim.bind({configId: "040d8ab7-f6f2-422e-9534-44d0360a739a"});
                }
            }else{
                appBaseJSContextObj.goBaseKefuInfo();
            }
        }else{
            if(typeof(appBaseJSContextObj) == "undefined"){
                if(!$this.hasClass("clicked") && !$this.hasClass("loaded")){
                    $this.addClass("clicked");
                    easemobim.bind({configId: "0f20ad75-4c07-40a8-94b1-79adf5995553"});
                    setTimeout($this.removeClass("clicked"),3000);
                }else if($this.hasClass("clicked") && !$this.hasClass("loaded")){
                    return;
                }else{
                    easemobim.bind({configId: "0f20ad75-4c07-40a8-94b1-79adf5995553"});
                }
            }else{
                appBaseJSContextObj.goBaseKefuInfo();
            }
        }

        // if(loginInfo && loginInfo != null && loginInfo.uuid){
        //     $.ajax("https://appcomm-user.zhihuishu.com/app-commserv-user/userInfo/getUserInfoAndAuthInfo?callback=12312&uuid="+uuId,{
        //     dataType:"jsonp",
        //     cache: false,
        //     jsonp: "callback" ,
        //     callback: "foo",
        //     success:function (json) {

        //             if(json.isTeacher != undefined && json.isTeacher){
        //                 console.log("老师身份");
        //                 if(typeof(appBaseJSContextObj) == "undefined"){
        //                     if(!$this.hasClass("clicked") && !$this.hasClass("loaded")){
        //                         $this.addClass("clicked");
        //                         easemobim.bind({configId: "040d8ab7-f6f2-422e-9534-44d0360a739a"});
        //                         setTimeout($this.removeClass("clicked"),3000);
        //                     }else if($this.hasClass("clicked") && !$this.hasClass("loaded")){
        //                         return;
        //                     }else{
        //                         easemobim.bind({configId: "040d8ab7-f6f2-422e-9534-44d0360a739a"});
        //                     }
        //                 }else{
        //                     appBaseJSContextObj.goBaseKefuInfo();
        //                 }
        //             }else{
        //                 console.log("学生身份");
        //                 if(typeof(appBaseJSContextObj) == "undefined"){
        //                     if(!$this.hasClass("clicked") && !$this.hasClass("loaded")){
        //                         $this.addClass("clicked");
        //                         easemobim.bind({configId: "0f20ad75-4c07-40a8-94b1-79adf5995553"});
        //                         setTimeout($this.removeClass("clicked"),3000);
        //                     }else if($this.hasClass("clicked") && !$this.hasClass("loaded")){
        //                         return;
        //                     }else{
        //                         easemobim.bind({configId: "0f20ad75-4c07-40a8-94b1-79adf5995553"});
        //                     }
        //                 }else{
        //                     appBaseJSContextObj.goBaseKefuInfo();
        //                 }
        //             }

        //         }
        //     })
        // }else{
        //     if(typeof(appBaseJSContextObj) == "undefined"){
        //         if(!$this.hasClass("clicked") && !$this.hasClass("loaded")){
        //             $this.addClass("clicked");
        //             easemobim.bind({configId: "0f20ad75-4c07-40a8-94b1-79adf5995553"});
        //             setTimeout($this.removeClass("clicked"),3000);
        //         }else if($this.hasClass("clicked") && !$this.hasClass("loaded")){
        //             return;
        //         }else{
        //             easemobim.bind({configId: "0f20ad75-4c07-40a8-94b1-79adf5995553"});
        //         }
        //     }else{
        //         appBaseJSContextObj.goBaseKefuInfo();
        //     }
        // }

        http://webim.kefu.easemob.com/webim/easemob.js?configId=0f20ad75-4c07-40a8-94b1-79adf5995553
{/* <script src='//kefu.easemob.com/webim/easemob.js?configId=040d8ab7-f6f2-422e-9534-44d0360a739a'></script> */}

        // var $this = $(this);
        // if(typeof(appBaseJSContextObj) == "undefined"){
        //     if(!$this.hasClass("clicked") && !$this.hasClass("loaded")){
        //         $this.addClass("clicked");
        //         easemobim.bind({configId: "0f20ad75-4c07-40a8-94b1-79adf5995553"});
        //         setTimeout($this.removeClass("clicked"),3000);
        //     }else if($this.hasClass("clicked") && !$this.hasClass("loaded")){
        //         return;
        //     }else{
        //         easemobim.bind({configId: "0f20ad75-4c07-40a8-94b1-79adf5995553"});
        //     }
        // }else{
        //     appBaseJSContextObj.goBaseKefuInfo();
        // }
    })

})();

/*获取cookie*/
function getCookie(c_name){
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1){
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return decodeURIComponent(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}