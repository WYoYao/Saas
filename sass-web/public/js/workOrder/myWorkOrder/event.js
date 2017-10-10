$(function () {
    controller.init();//controller.js初始化
    //------------------------------------------ydx__start------------------------------------------


    //------------------------------------------ydx__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //普通事件，组件
    setTimeout(function () {
        $("#work-already").psel(0, false);
        $("#work-type").psel(0, false);
        yn_method.scrollLoad();//滚动加载

    }, 300);

    yn_method.freedomOrRegular()
    $(".textarea-prop").click(function (event) {
        event.stopPropagation();
    });
    $(".aite-bubble").click(function (event) {
        event.stopPropagation();
    });
    $(".hashtag-bubble").click(function (event) {
        event.stopPropagation();
    });
    yn_method.getDateTime();
    //------------------------------------------yn__end------------------------------------------
});
var yn_method = {
    delConfirm: function (index, content, event) {
        event.stopPropagation();
        myWorkOrderModel.del_plan_id = content;
        $("#del-confirm").pshow({title: '确定删除吗？', subtitle: '删除后不可恢复'});
    },

    cancelConfirm: function () {
        $("#del-confirm").phide();
    },
    scrollLoad: function () {
        var userId = myWorkOrderModel.user_id;
        var proId = myWorkOrderModel.project_id;
        if ($("#work-already").psel()) {
            myWorkOrderModel.workAlreadyID = myWorkOrderModel.workAlready[$("#work-already").psel().index].id;
        }
        if ($("#work-type").psel()) {
            var orderType = myWorkOrderModel.workTypeL[$("#work-type").psel().index].code;
        }
        //判断url
        var url = myWorkOrderModel.workAlreadyID == "0" ? "restMyWorkOrderService/queryMyDraftWorkOrder" : myWorkOrderModel.workAlreadyID == "1" ? "restMyWorkOrderService/queryMyPublishWorkOrder" : "restMyWorkOrderService/queryMyParticipantWorkOrder";
        orderType = orderType == "all" ? "" : orderType;
        var nScrollHight = 0; //滚动距离总长
        var nScrollTop = 0;   //滚动到的当前位置
        var nDivHight = $(".myWork-table-body").height();
        $(".myWork-table-body").scroll(function () {
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + nDivHight >= nScrollHight) {
                // alert("到底部了")
                myWorkOrderModel.pageNum += 1;
                var conditionSelObj = {
                    user_id: userId,                        //员工id-当前操作人id，必须
                    project_id: proId,                     //项目id，必须
                    order_type: orderType,                      //工单类型编码
                    page: myWorkOrderModel.pageNum,                       //当前页号，必须
                    page_size: 50                        //每页返回数量，必须
                };
                controller.queryWorkOrder(url, conditionSelObj);//查询所有工单

            }

        });
    },
    /*创建页面*/
    createShow: function () {
        myWorkOrderModel.LorC = false;
        $("#work-urgency").psel(0);
        $("#time-combobox").psel(0);
        yn_method.getDateTime();
    },
    /*回到列表页*/
    listShow: function () {
        myWorkOrderModel.LorC = true;
    },
    getDateTime: function () {
        myWorkOrderModel.starYear = new Date().getFullYear();
        myWorkOrderModel.endYear = myWorkOrderModel.starYear + 3;
    },
    radioChange: function (event) {
        event.stopPropagation();
        myWorkOrderModel.fixedRadio = $("#fixed-radio").psel();
        var starttime = $("#ask_start_time").psel().startTime;
        var hours = parseInt(starttime.substr(-5, 2));

        $("#ask_end_time").psel({h: hours + 2}, false);

    },
    starTimeTypeSel: function (obj, event) {
        event.stopPropagation();
        if (obj.id == "1") {
            myWorkOrderModel.timeTypeSel = true;
        } else {
            myWorkOrderModel.timeTypeSel = false;
        }

    },
    /*事项名称计数*/
    matterNameCounter: function (dom, value) {
        $(dom).next(".counter").find("b").text(value.length);
    },
    freedomOrRegular: function () {
        myWorkOrderModel.regular = $("#switch-slide").psel();
        if (myWorkOrderModel.regular) {
            var text = $(".freedom-textarea").val();
            if (!text || text == '') return;
            var textRemain = text;
            var reg = /(@[^\s]+\s?)|(#[^\s]+\s?)/gi;//f分割字符
            var objSopArr = text.match(reg);
            var objs = "";
            var sops = "";
            objSopArr.forEach(function (value, index, arr) {
                var i = value.indexOf("@");
                if (i != -1) {
                    objs += value + " ";
                } else {
                    sops += value + " ";
                }
                textRemain = textRemain.replace(value, "");
            });
            sops += textRemain;
            // $(".regular-obj-text").find("textarea").val(objs);
            // $(".regular-sop-text").find("textarea").val(sops);
            myWorkOrderModel.singleMatters.desc_forepart = objs;
            myWorkOrderModel.singleMatters.desc_aftpart = sops;
        } else {
            var reObjs = $(".regular-obj-text").find("textarea").val();
            var reSops = $(".regular-sop-text").find("textarea").val();
            myWorkOrderModel.description = reObjs + reSops;
        }
    },
    /*结构输入两者相加计数*/
    bothCountNum: function (dom, value) {
        var totalNum = 0;
        var bothP = $(dom).parents(".regular-text-div")
        var textareas = $(bothP).find("textarea");
        $(textareas).each(function (index, vdom) {
            totalNum += $(vdom).val().length;
        });
        var remainNum = 1000 - totalNum;
        $(bothP).find(".counter b").text(totalNum);
        if (totalNum == 1000) {
            var max1 = textareas[0].value.length;
            var max2 = textareas[1].value.length;
            textareas[0].maxLength = max1;
            textareas[1].maxLength = max2;
        }
        /*else if(totalNum<1000){
         textareas[0].setAttribute("maxlength","1000");
         textareas[1].setAttribute("maxlength","1000");
         }*/


        var textwrap = $(event.srcElement);
        var textpdiv = $(event.srcElement).parents(".textarea-div");
        var textdiv = $(textwrap).siblings(".textareadiv");
        var textareapop = $(textwrap).siblings(".textarea-prop");
        var focusIndex = textwrap[0].selectionStart;
        var firstPartStr = value.substring(0, focusIndex);
        var secondPartStr = value.substring(focusIndex);
        var lastQuanIndex = firstPartStr.lastIndexOf('@');
        var lastJingIndex = firstPartStr.lastIndexOf('#');
        var lastQuanjingIndex = Math.max(lastQuanIndex, lastJingIndex);
        var lastSpaceIndex = firstPartStr.lastIndexOf(' ');
        if (lastQuanjingIndex != -1) {
            if (lastQuanIndex > lastJingIndex) {
                myWorkOrderModel.aite = true;
                // yn_method.upDownSelect(true);
            } else if (lastQuanIndex < lastJingIndex) {
                myWorkOrderModel.aite = false;
                myWorkOrderMethod.selAllTags();
                //where--自由输入方式/结构输入，who--@/#，which--手动输入浮窗/点击浮窗
                yn_method.upDownSelecting(null, null, true);
            }
            var h1 = '<span>' + firstPartStr.substring(0, lastQuanjingIndex) + '</span>';
            var h2 = '<span>' + firstPartStr.substr(lastQuanjingIndex, 1) + '</span>';
            var htmlValue = h1 + h2;
            htmlValue = htmlValue.replace(/\n/g, '<br/>');
            htmlValue = htmlValue.replace(/\s/g, '&nbsp;');
            textdiv[0].innerHTML = htmlValue;
            textdiv[0].scrollTop = textwrap.scrollTop;
            var span = $(textdiv).find('span:last');
            var divpos = $(textpdiv).offset();
            var pos = span.offset();
            var left = pos.left - divpos.left + 18;
            var top = pos.top - divpos.top + 25;
            $(textareapop).css({position: 'absolute', left: left + 'px', top: top + 'px', 'z-index': '15'});
            $(textareapop).show();

        }


    },
    /*添加工作内容界面*/
    /*编辑框出现并聚焦*/
    editable: function (event) {
        event.stopPropagation();
        $(event.currentTarget).parent().hide().next().show();
        var slideDiv = $(event.currentTarget).parents(".prev-title").next();
        $(slideDiv).slideDown();
        $(slideDiv).find("textarea").focus()
    },
    /*清空bubble出现*/
    delBubbleShow: function (event) {
        event.stopPropagation();
        var bubbleDiv = $(event.currentTarget).parent(".clear-div").next();
        $(bubbleDiv).pshow({
            "title": "确定删除此条工作内容？",
            "subtitle": "删除会使内容丢失",
            "position": "absolute",
            "top": "40px",
            "left": "-310px",
            "z-index": "5"
        });
    },
    /*清空bubble消失*/
    delBubbleHide: function (event) {
        event.stopPropagation();
        var bubbleDiv = $(event.currentTarget.offsetParent.offsetParent);
        $(bubbleDiv).phide();


    },
    /*清空内容框*/
    clearAll: function (event) {
        event.stopPropagation();
        var textDiv = $(event.currentTarget).parents(".prev-title").next();
        var a = $(textDiv).find("textarea").length;
        switch ($(textDiv).find("textarea").length) {
            case 0:
                if ($(textDiv).find(".major-sel").length) {
                    $("#add-major").precover("选择专业");
                }
                if ($(textDiv).find(".obj-div").length) {
                    $(textDiv).find(".objs").empty();
                }
                break;
            case 1:
                $(textDiv).find("textarea").val("").css("border", "none");
                $(textDiv).find(".counterNum").text("0");
                $(textDiv).slideUp();
                break;
            default:
                break;
        }
        var bubbleDiv = $(event.currentTarget.offsetParent.offsetParent);
        $(bubbleDiv).phide();
        $(bubbleDiv).prev().hide().prev().show();


    },
    /*计数textarea*/
    counterNum: function (event) {
        var num = $(event).val().length;
        if (num > 100) {
            $(event).css("border", "1px solid red");
            $(event).next().css("color", "#ef6767");
        } else {
            $(event).css("border", "none");
            $(event).next().css("color", "#cacaca");
        }
        $(event).next().find(".counterNum").text(num)
    },
    quanjingInputEvent: function (event, isReply) {
        var textwrap = isReply == true ? event.currentTarget : document.getElementById('textwrap');
        var textdiv = isReply == true ? $(textwrap).next()[0] : document.getElementById('textdiv');
        var textareapop = isReply == true ? $(textdiv).next()[0] : document.getElementById('textarea-pop');
        var value = textwrap.value;//.ptrimHeadTail();


        workController.focusIndex = textwrap.selectionStart;
        var firstPartStr = value.substring(0, workController.focusIndex);
        var secondPartStr = value.substring(workController.focusIndex);
        var lastQuanIndex = firstPartStr.lastIndexOf('@');
        var lastJingIndex = firstPartStr.lastIndexOf('#');
        var lastDaoIndex = firstPartStr.lastIndexOf('$');
        var lastQuanjingIndex = Math.max(lastQuanIndex, lastJingIndex);
        lastQuanjingIndex = Math.max(lastQuanjingIndex, lastDaoIndex);
        var lastSpaceIndex = firstPartStr.lastIndexOf(' ');

        if (lastSpaceIndex >= lastQuanjingIndex || lastQuanjingIndex == -1) {
            $(textareapop).hide();
            workModel.instance().textSearchs([]);
            workController.focusIndex = -1;
            if (workController.quanjingAjax) workController.quanjingAjax.abort();
            return;
        }

        //0 @用户    1 #设备    2 $分项
        var isQuan = lastQuanIndex > lastJingIndex && lastQuanIndex > lastDaoIndex ? 0 :
            lastJingIndex > lastQuanIndex && lastJingIndex > lastDaoIndex ? 1 :
                lastDaoIndex > lastQuanIndex && lastDaoIndex > lastJingIndex ? 2 : -1;
        workController.isQuan = isQuan;

        var keyWord = firstPartStr.substring(lastQuanjingIndex + 1, workController.focusIndex);
        workController.searchUsersOrEqu(keyWord, isQuan, function () {
            var jqtextareapop = $(textareapop);
            //if (workModel.instance().textSearchs().length == 0) return jqtextareapop.hide();

            var text = workModel.instance().textSearchs().length == 0 ? '点击空格完成输入' :
                isQuan == 0 ? '选择用户姓名或点击空格完成输入' :
                    isQuan == 1 ? '选择设备或点击空格完成输入' :
                        isQuan == 2 ? '选择分项或点击空格完成输入' : '';

            isReply != true ? $('#liresultre').text(text) : jqtextareapop.find('li:first').text(text);
            jqtextareapop.show();
        });

        var h1 = '<span>' + firstPartStr.substring(0, lastQuanjingIndex) + '</span>';
        var h2 = '<span>' + firstPartStr.substr(lastQuanjingIndex, 1) + '</span>';
        var htmlValue = h1 + h2;
        htmlValue = htmlValue.replace(/\n/g, '<br/>');
        htmlValue = htmlValue.replace(/\s/g, '&nbsp;');
        textdiv.innerHTML = htmlValue;
        textdiv.scrollTop = textwrap.scrollTop;

        var span = $(textdiv).find('span:last');
        var divpos = $(textdiv).offset();
        var pos = span.offset();

        var left = pos.left - divpos.left;
        if (isReply == true) {
            left = left - textwrap.scrollLeft;
            var maxLeft = $(textwrap).width();
            left = Math.min(left, maxLeft);
        }
        var top = pos.top - divpos.top;

        $(textareapop).css({left: left + 'px', top: top + 'px'});
    },
    /*#筛选条件展开折叠*/
    unfold: function (dom, unfold) {
        if (unfold) {
            $(dom).hide().next().show();
            $(dom).parents(".hashtag-sop").next().show();
        } else {
            $(dom).hide().prev().show();
            $(dom).parents(".hashtag-sop").next().hide();
        }
    },
    /*删除照片*/
    removeImage: function (dom) {
        $(dom).parent().remove();
    },
    /*添加工作内容*/
    addContent: function (open) {
        if (open) {
            myWorkOrderModel.addContent = true;
            controller.queryGeneralDictByKey();

        } else {
            myWorkOrderModel.addContent = false;

        }

    },
    //转换成父级链字符串形式
    getParentsLinks: function (parents) {
        if (!parents.length) return '';
        var str = '(';
        for (var i = 0; i < parents.length; i++) {
            str += parents[i].parent_names.join('-');
            if (i != parents.length - 1) str += '/';
        }
        return str + ')';
    },
    //转换控件文字
    contolTransfer: function (num) {
        var str = "";
        str = num == 1 ? "文本" : num == 2 ? "单选" : num == 3 ? "多选" : num == 4 ? "无单位的数字" : "有单位的数字"
        return str;
    },
    /*#浮窗中上下键选择*/
    upDownSelect: function (where, who, which) {//where--自由输入方式/结构输入，who--@/#，which--手动输入浮窗/点击浮窗
        var num = 0;
        var hashtagBubble = null;
        /*  完善中
         *   var bubble=null;
         *   if(where && who && which){//自由方式输入时@浮窗
         *   bubble=$(".matter-freedom .textarea-prop .aite-bubble");
         *   }else if(where && who && !which){//自由方式点击@浮窗
         *   bubble=$(".matter-freedom .add-obj .aite-bubble");
         *   }else if(where && !who && which){//自由方式输入时#浮窗
         *   bubble=$(".matter-freedom .textarea-prop .hashtag-bubble")
         *   }else if(where && !who && !which) {//自由方式点击时#浮窗
         *   bubble=$(".matter-freedom .add-sop .hashtag-bubble")
         *   }else if(!where && who && which){//结构化方式输入时@浮窗
         *   bubble=$(".matter-regular .textarea-prop .aite-bubble");
         *   }
         * */


        if (which) {//输入时的#浮窗
            hashtagBubble = $(".matter-freedom .textarea-prop .hashtag-sop")
        } else {
            // hashtagBubble=$(".add-sop .sop-list .aite-list")
            hashtagBubble = $(".matter-freedom .add-sop .hashtag-sop")

        }
        $(document).keyup(function (e) {
            var code = e.keyCode;
            // e.preventDefault();
            if (code == 40 && num == 0) {
                if (!myWorkOrderModel.aite) {
                    // $(".sop-list .aite-list:first-of-type").addClass("updownmove");
                    // $(hashtagBubble).eq(0).addClass("updownmove");
                    $(hashtagBubble).find(".aite-list").eq(0).addClass("updownmove");
                }
                num++;
            } else {
                if ($(".updownmove")[0]) {
                    var prev = $(".updownmove")[0].previousElementSibling;//选中元素前置位元素是否存在,以此判断元素是否还可以上下移动
                    var next = $(".updownmove")[0].nextElementSibling;//选中元素后置位元素是否存在,以此判断元素是否还可以上下移动
                    switch (code) {
                        case 38://上
                            // e.preventDefault();
                            if (prev) {
                                if (!myWorkOrderModel.aite) {
                                    $(hashtagBubble).find(".aite-list").each(function () {
                                        $(this).removeClass("updownmove");
                                    });
                                    $(prev).addClass("updownmove");
                                    // $(".sop-body .sop-list").animate({
                                    //     scrollTop: "-=40px"
                                    // })
                                }
                            }
                            break;
                        case 40://下
                            if (!myWorkOrderModel.aite) {
                                if (next) {
                                    $(hashtagBubble).find(".aite-list").each(function () {
                                        $(this).removeClass("updownmove");
                                    });
                                    $(next).addClass("updownmove");
                                    // $(".sop-body .sop-list").animate({
                                    //     scrollTop: "+=40px"
                                    // })
                                }
                            }


                            break;
                        case 32://空格选中
                            if (!myWorkOrderModel.aite) {
                                // var id = $(".sop-list .aite-list.updownmove>div:last-of-type>div").attr("id");
                                var id = $(hashtagBubble).find(".aite-list.updownmove>div:last-of-type>div").attr("id");
                                $(hashtagBubble).find("#" + id).psel(true);//空格选中
                                $(hashtagBubble).find("#able-btn").pdisable(false);
                            }
                            break;
                        case 13://回车确定
                            if (!myWorkOrderModel.aite) {
                                var checks = $(hashtagBubble).find(".aite-list>div:last-of-type").children("div");
                                var sop = "";
                                checks.each(function (i, dom, arr) {
                                    var check = $(hashtagBubble).find("#" + dom.id).psel();
                                    if (check) {
                                        sop += "#" + $(hashtagBubble).find(dom).parent().prev().children().text() + " ";
                                    }
                                });
                                myWorkOrderModel.description += sop;
                                // $(".matter-freedom textarea").

                            }
                            break;
                        default:
                            break;
                    }
                }

            }
        })
    },
    /*#浮窗中上下键选择*/
    upDownSelecting: function (where, who, which) {//where--自由输入方式/结构输入，who--@/#，which--手动输入浮窗/点击浮窗
        var num = 0;
        // var hashtagBubble = null;
        var bubble = null;
        // var searchList = null;
        var timely=null;
        /*完善中*/
        if (where && who && which) {//自由方式输入时@浮窗
            // bubble = $(".matter-freedom .textarea-prop .aite-bubble");
            timely=$(".matter-freedom .textarea-prop .aite-bubble .timely-checkbox");
            if(timely.css("visibility")=="visible"){
                bubble=timely;
            }
        } else if (where && who && !which) {//自由方式点击@浮窗
            // bubble = $(".matter-freedom .add-obj .aite-bubble");
            timely=$(".matter-freedom .add-obj .aite-bubble .timely-checkbox");
            if(timely.css("visibility")=="visible"){
                bubble=timely;
            }
        } else if (where && !who && which) {//自由方式输入时#浮窗
            bubble = $(".matter-freedom .textarea-prop .hashtag-bubble")
        } else if (where && !who && !which) {//自由方式点击时#浮窗
            bubble = $(".matter-freedom .add-sop .hashtag-bubble")
        } else if (!where && who && which) {//结构化方式输入时@浮窗
            // bubble = $(".matter-regular .textarea-prop .aite-bubble");
            timely=$(".matter-regular .textarea-prop .aite-bubble .timely-checkbox");
            if(timely.css("visibility")=="visible"){
                bubble=timely;
            }
        } else if (!where && who && !which) {//结构化方式点击时@浮窗
            // bubble = $(".matter-regular .add-obj .hashtag-bubble");
            timely=$(".matter-regular .add-obj .aite-bubble .timely-checkbox");
            if(timely.css("visibility")=="visible"){
                bubble=timely;
            }
        } else if (!where && !who && which) {//结构化方式输入时#浮窗
            bubble = $(".matter-regular .textarea-prop .hashtag-bubble");
        } else if (!where && !who && !which) {//结构化方式点击时#浮窗
            bubble = $(".matter-regular .add-sop .hashtag-bubble");
        }


        /*if (which) {//输入时的#浮窗
         hashtagBubble = $(".matter-freedom .textarea-prop .hashtag-sop")
         } else {
         // hashtagBubble=$(".add-sop .sop-list .aite-list")
         hashtagBubble = $(".matter-freedom .add-sop .hashtag-sop")

         }*/
        $(document).keyup(function (e) {
            var code = e.keyCode;
            // e.preventDefault();
            if (code == 40 && num == 0) {
                // if (!myWorkOrderModel.aite) {
                    // $(hashtagBubble).eq(0).addClass("updownmove");
                    if (!who || who && timely) {
                        $(bubble).find(".aite-list").eq(0).addClass("updownmove");
                    }
                // }
                num++;
            } else {
                if ($(".updownmove")[0]) {
                    var prev = $(".updownmove")[0].previousElementSibling;//选中元素前置位元素是否存在,以此判断元素是否还可以上下移动
                    var next = $(".updownmove")[0].nextElementSibling;//选中元素后置位元素是否存在,以此判断元素是否还可以上下移动
                    switch (code) {
                        case 38://上
                            // e.preventDefault();
                            if (prev) {
                                if (!myWorkOrderModel.aite) {
                                    $(bubble).find(".aite-list").each(function () {
                                        $(this).removeClass("updownmove");
                                    });
                                    $(prev).addClass("updownmove");
                                    // $(".sop-body .sop-list").animate({
                                    //     scrollTop: "-=40px"
                                    // });
                                }
                            }
                            break;
                        case 40://下
                            if (!myWorkOrderModel.aite) {
                                if (next) {
                                    $(bubble).find(".aite-list").each(function () {
                                        $(this).removeClass("updownmove");
                                    });
                                    $(next).addClass("updownmove");
                                    // $(".sop-body .sop-list").animate({
                                    //     scrollTop: "+=40px"
                                    // })
                                }
                            }


                            break;
                        case 32://空格选中
                            // if (!myWorkOrderModel.aite) {
                                // var id = $(".sop-list .aite-list.updownmove>div:last-of-type>div").attr("id");
                                var id = $(bubble).find(".aite-list.updownmove>div:last-of-type>div").attr("id");
                                $(bubble).find("#" + id).psel(true);//空格选中
                                $(bubble).find("#able-btn").pdisable(false);
                            // }
                            break;
                        case 13://回车确定
                            // if (!myWorkOrderModel.aite) {
                                var checks = $(bubble).find(".aite-list>div:last-of-type").children("div");
                                var sop = "";
                                checks.each(function (i, dom, arr) {
                                    var check = $(bubble).find("#" + dom.id).psel();
                                    if (check) {
                                        sop += "#" + $(bubble).find(dom).parent().prev().children().text() + " ";
                                    }
                                });
                                myWorkOrderModel.description += sop;
                            // }
                            break;
                        default:
                            break;
                    }
                }

            }
        })
    },
    /*sop选中chedckbox*/
    checkSop: function () {
        // event.stopPropagation();
        if (!myWorkOrderModel.aite) {
            // var id=$(".sop-list .aite-list.updownmove>div:last-of-type div").attr("id");
            // $("#able-btn").pdisable(false);
        }
    },
    /*回车确定*/
    /*enterSop: function (e, which) {
        var timely=$(".textarea-prop .aite-bubble .timely-checkbox");
        // var timely=$(".add-obj .aite-bubble .timely-checkbox");
        if(timely.css("visibility")=="visible"){
            hashtagBubble=timely;
        }
        if (which) {//输入时的#浮窗
            // hashtagBubble=$(".textarea-prop .sop-list .aite-list")
            hashtagBubble = $(".textarea-prop .hashtag-sop")
        } else {
            // hashtagBubble=$(".add-sop .sop-list .aite-list")
            hashtagBubble = $(".add-sop .hashtag-sop")

        }
        if (!myWorkOrderModel.aite) {
            // var checks = $(".sop-list .aite-list>div:last-of-type").children("div");
            var checks = $(e.target).parents(".hashtag-bubble").find(".sop-list .aite-list>div:last-of-type").children("div");

            var sop = "";
            checks.each(function (i, dom, arr) {
                var check = $(e.target).parents(".hashtag-bubble").find("#" + dom.id).psel();
                if (check) {
                    sop += "#" + $(e.target).parents(".hashtag-bubble").find("#" + dom.id).parent().prev().children().text() + " ";
                }
            });
            if (which) {//输入时的#浮窗
                sop = sop.substring(1);
            }
            myWorkOrderModel.description += sop;
            // $(".matter-freedom textarea").

        }
    },*/
    /*回车确定*/
    enterSop: function (e, which) {
        var timely=$(".textarea-prop .aite-bubble .timely-checkbox");
        // var timely=$(".add-obj .aite-bubble .timely-checkbox");
        if(timely.css("visibility")=="visible"){
            hashtagBubble=timely;
        }
        if (which) {//输入时的#浮窗
            // hashtagBubble=$(".textarea-prop .sop-list .aite-list")
            hashtagBubble = $(".textarea-prop .hashtag-sop")
        } else {
            // hashtagBubble=$(".add-sop .sop-list .aite-list")
            hashtagBubble = $(".add-sop .hashtag-sop")

        }
        if (!myWorkOrderModel.aite) {
            // var checks = $(".sop-list .aite-list>div:last-of-type").children("div");
            var checks = $(e.target).parents(".hashtag-bubble").find(".sop-list .aite-list>div:last-of-type").children("div");

            var sop = "";
            checks.each(function (i, dom, arr) {
                var check = $(e.target).parents(".hashtag-bubble").find("#" + dom.id).psel();
                if (check) {
                    sop += "#" + $(e.target).parents(".hashtag-bubble").find("#" + dom.id).parent().prev().children().text() + " ";
                }
            });
            if (which) {//输入时的#浮窗
                sop = sop.substring(1);
            }
            myWorkOrderModel.description += sop;
            // $(".matter-freedom textarea").

        }
    },
    clickLeftItem: function (content) {
        if (myWorkOrderModel.curObjType == "floor" || myWorkOrderModel.curObjType == "system") {
            myWorkOrderModel.lastLevel = [];
            myWorkOrderModel.lastLevel = content.contentCopy;
        } else if (myWorkOrderModel.curObjType == "space") {
            if (!content.content) {
                controller.querySpace(content.obj_id, "floor", false)
            } else if (content.content && content.content.length == 0) {
                controller.querySpace(content.obj_id, "build", false)
            }
        } else if (myWorkOrderModel.curObjType == "equip") {
            if (content.parents || content.content && content.content.length == 0) {
                var id = content.obj_type == "build" ? "build_id" : content.obj_type == "floor" ? "floor_id" : "space_id"
                var obj = {
                    user_id: myWorkOrderModel.user_id,
                    project_id: myWorkOrderModel.project_id,
                    need_back_parents: true,
                }
                obj[id] = content.obj_id;
                controller.queryEquip(obj)
            }
        }

    },
    defaultPage: function (dom) {
        $(dom).parents(".aite-bubble").find(".none-both").show().siblings().hide();
    },
    closeBubble: function () {

        $(document).click(function () {
            $(".textarea-prop").hide();
            $(".add-obj .aite-bubble").hide();
            $(".add-sop .hashtag-bubble").hide();
            myWorkOrderModel.clickAiteShow = false;
            myWorkOrderModel.clickHashShow = false;
        })
    },
    btnAble: function (index, obj, $event) {
        if (event.pEventAttr.state) {
            $("#able-btn").pdisable(false);
        } else {
            var checks = $(event.target).parents(".last-level-box").find(".aite-list>div:last-of-type").children();
            $(checks).some(function (i, dom, arr) {
                // var check = $("#"+dom.id).psel();
                $("#" + dom.id).psel()
                // if(check){
                //     return check;
                // }
            });
        }
    },
    clickAiteShowFn: function (e, aite, event) {
        event.stopPropagation();
        if (aite) {
            myWorkOrderModel.clickAiteShow = true;
            myWorkOrderModel.clickHashShow = false;
        } else {
            myWorkOrderModel.clickAiteShow = false;
            myWorkOrderModel.clickHashShow = true;
        }
        $(e).children("div").show();
        //where--自由输入方式/结构输入，who--@/#，which--手动输入浮窗/点击浮窗
        yn_method.upDownSelecting(true,false,false);
    },
    delObjs: function (dom) {
        $(dom).parents(".obj-div").remove();
    },
    /*添加工作内容中的专业*/
    addMajor: function (majors) {
        myWorkOrderModel.workContent.domain = majors.code;
        myWorkOrderModel.workContent.domain_name = majors.name;

    },
    /*添加工作内容中，需确认的操作结果添加选项*/
    addSel: function (dom) {
        var sel = "<div class='info-dot'> <input type='text' /> <img src='../images/info_close.png' alt='删除图标x' onclick='yn_method.removeImage(this)'/> </div>"
        $(dom).parent().before(sel)
    },
    /*添加工作内容中，需确认的操作结果添加信息点*/
    infoBubbleShow: function (dom, event) {
        event.stopPropagation();
        $(dom).next().show();
        // var sel="<div class='info-dot'> <input type='text' /> <img src='../images/info_close.png' alt='删除图标x' onclick='yn_method.removeImage(this)'/> </div>"
        // $(dom).parent().siblings(".obj-info").append("")
    },
    /*添加工作内容中，需确认的操作结果添加信息点中的关键字*/
    addKey: function (e) {
        var str = $(e).parent().prev().val();
        if (str) {
            var strHtml = "<div class='key-div'> <span>" + str + "</span> <i onclick='yn_method.removeKey(this)'>x</i> </div>";
            $(e).parent().prev().before(strHtml);
            $(e).parent().prev().val("");
            var length = $(".key-div").length;
            // if(length>1){
            var inpWidth = $(e).parent().prev().width();
            // }else{
            //     var inpWidth = $(e).parent().prev().width() - 48;
            // }
            var prevWidth = $(e).parent().prev().prev().width();
            var neWidth = inpWidth - prevWidth - 20;
            if (neWidth > 45) {

                $(e).parent().prev().width(neWidth + "px");
            } else {
                $(e).parent().prev().width("100%");
            }
        }
    },
    removeAllKey: function (e) {
        $(e).parents(".info-search-box").find(".key-div").remove();
    },
    removeKey: function (e) {
        $(e).parents(".key-div").remove();
    },
    selContent: function (content) {
        myWorkOrderModel.seltype = content.type;
    },
    /*自定义页面*/
    customShow: function (e) {
        e.stopPropagation();
        $(e.target).parents(".aite-footer").prev().find(".customize").show().siblings().hide();
    },
    /*忽略报错*/
    ignoreError: function (dom) {
        $(dom).parent().hide();
    },
    /*转换时间*/
    transferTime: function (time) {
        time = time.substring(0, 16);
        time = time.replace(/-/g, '/');
        var timestamp = new Date(time).getTime();
        return timestamp;
    },
    /*验证时间*/
    verifyTime: function () {
        var ask_start_time = $("#ask_start_time").psel();
        var ask_end_time = $("#ask_end_time").psel();
        var end_timestamp = yn_method.transferTime(ask_end_time.startTime);
        var start_timestamp = yn_method.transferTime(ask_start_time.startTime);
        if (start_timestamp > end_timestamp) {
            $("#ask_end_time").find(".per-combobox-title").css({
                "border": "1px solid #ed6767"
            });
            $(".time-error-tips").show();
        } else {
            $("#ask_end_time").find(".per-combobox-title").css({
                "border": "1px solid #cacaca"
            });
            $(".time-error-tips").hide();
        }

    },
    /*删除事项*/
    deleteMatter: function (dom) {
        $(dom).parents(".matter-all").remove();
    },
    /* /!*选中checkbox*!/
     selCheck:function (content,index,event) {
     console.log(content,index,event)
     var state = event.pEventAttr.state;
     var info_points = commonData.infoPoint_obj.info_points;
     commonData.info_pointsCopy = JSON.parse(JSON.stringify(info_points));
     if (state) {
     commonData.info_pointsCopy.push(content);
     } else {
     for (var i = 0; i < commonData.info_pointsCopy.length; i++) {
     if (commonData.info_pointsCopy[i].obj_id == content.obj_id) {
     commonData.info_pointsCopy.splice(i, 1);
     break;
     }
     }
     }
     }*/
    workContent: function () {
        // if(myWorkOrderModel.workContent.work_name==""){
        //     myWorkOrderModel.workContent.work_name="未命名工作内容"
        // }
        // myWorkOrderModel.workContent.work_id=new Date().getTime();
        // console.log(myWorkOrderModel.workContent.work_id);
        myWorkOrderModel.desc_works.push(myWorkOrderModel.workContent);
        console.log(myWorkOrderModel.desc_works);
        myWorkOrderModel.addContent = false;

    }
}
yn_method.closeBubble();






