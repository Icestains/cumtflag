var totalHeight = 900,
    progressHeight, totalTime = 48,
    startY = 0,
    currentY = 0,
    finalY = 0;
var mousedown = false,
    mousemove = false;
var t, aroudPic;
var date1, date2;

function getFlagNum() {
    var num=0;
    $.ajax({
        url: 'https://homeapi.atcumt.com/num',
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(response) {
            var Pnum = response;
            num = Pnum.num;
        }
    })
    return num;
}

$("title").html("您是第"+getFlagNum()+"位致敬矿大109周年升旗的人");

$(function(){
    $('#Num').html(getFlagNum());
})

song = document.getElementById('bgm');
song.addEventListener('canplay', function(){
    window.onload = function() {
        $("#enterence").css('display', 'table');
        $("#loading").hide();
        $("#song_bar").height($(window).height());
        $("#control_bar").height($(window).height());
        progressHeight = $(window).height();
        $("body").height(window.innerHeight);
        $("#rising").children("div").eq(0).children("img").css("height", progressHeight);
    }
});

function eventDown(e) {
    event.preventDefault();
    mousedown = true;
    startY = e.touches[0].pageY;
}

function eventMove(e) {
    event.preventDefault();
    currentY = e.touches[0].pageY - startY;
    if (mousedown) {
        if (currentY > 0) {
            moveFlag(e);
        }
    }
}

function eventUp(e) {
    event.preventDefault();
    mousedown = false;
    finalY = e.changedTouches[e.changedTouches.length - 1].pageY - startY + finalY;
}

function moveFlag(e) {
    if (e.changedTouches) {
        var temp1 = e.changedTouches[e.changedTouches.length - 1];
        currentY = temp1.pageY - startY;
    }
    if ($("#control_bar").children("div").css("height").split("px")[0] >= progressHeight) {
        document.removeEventListener('touchstart', eventDown ,{passive: false});
        document.removeEventListener('touchend', eventUp ,{passive: false});
        document.removeEventListener('touchmove', eventMove ,{passive: false});
        document.removeEventListener('mousedown', eventDown, false);
        document.removeEventListener('mouseup', eventUp, false);
        document.removeEventListener('mousemove', eventMove, false);
        $("#lPic").show();
    } else {
        $("#control_bar").children("div").css({ "height": (finalY + currentY) / 15 + "px" });
        $("#flag").css("bottom", 12 + (finalY + currentY) / 26.2 + "px");
    }
}

function eBtn(obj) {
    $.ajax({
        url: 'https://homeapi.atcumt.com/gainnum',
        type: 'GET',
        dataType: 'json',
        complete: function(res) {
            if (res.responseJSON) {
                if (res.responseJSON.msg) { alert(res.responseJSON.msg); } else {
                    $("#raise").show();
                    $("#raise").bind("touchmove", function(e) {
                        e.preventDefault();
                        $("#p1").remove();
                        clearTimeout(t);
                        $("#raise").unbind("touchmove");
                        aroudPic = setInterval(removeOneTip, 1000);
                    })
                    $("#enterence").hide();
                }
            } else {
                alert("服务端发生错误")
            }
        }
    })
}

function removeOneTip() {
    $("#raise").children("div").eq($("#raise").children("div").length - 1).remove();
    if ($("#raise").children("div").length == 0) {
        clearInterval(aroudPic);
        $("#rasing").show();
        $("#raise").hide();
        changeRisePic();
    }
}

function changeRisePic() {
    finalY = 0;
    clearTimeout(t);
    $("#flag").show();
    $("#flag").css("bottom", "24px");
    $("#raising").show();
    $("#control_bar").children("div").css("height", "0px");
    $("#progressBar").show();
    audioAutoPlay('bgm');
    // $("#bgm")[0].play();
    // wx.config({
    //     debug: false,
    //     appId: '',
    //     timestamp: 1,
    //     nonceStr: '',
    //     signature: '',
    //     jsApiList: []
    // });
    // wx.ready(function() {
    //     $("#bgm")[0].play();
    // });
    $("#song_bar").children("div").css({ "animation": "rflag " + totalTime + "s" + " linear" });
    date1 = new Date();
    document.addEventListener('touchstart', eventDown ,{passive: false});
    document.addEventListener('touchend', eventUp ,{passive: false});
    document.addEventListener('touchmove', eventMove ,{passive: false});
    document.addEventListener('mousedown', eventDown, false);
    document.addEventListener('mouseup', eventUp, false);
    document.addEventListener('mousemove', eventMove, false);
    t = setTimeout(endSong, totalTime * 1000);
}

function audioAutoPlay(id){
    var audio = document.getElementById(id),
    play = function(){
        audio.play();
        document.removeEventListener("touchstart",play, false);
    };
    audio.play();
    wx.config({
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    wx.ready(function() {
        audio.play();
    });
    document.addEventListener("touchstart",play, false);
}

function endSong() {
    $("#flag").hide();
    $("#bgm")[0].load();
    date2 = new Date();
    var tTime = (date2 - date1) / 1000;
    $("#progressBar").hide();
    $("#ending").css('display', 'table');
    $("#ending").show();
    $("#raising").hide();
    if (tTime >= 43 && tTime <= 53) {
        $("#reward").text("最佳旗手");
    } else {
        $("#reward").text("升旗手");
    }
    document.removeEventListener('touchstart', eventDown ,{passive: false});
    document.removeEventListener('touchend', eventUp ,{passive: false});
    document.removeEventListener('touchmove', eventMove ,{passive: false});
    document.removeEventListener('mousedown', eventDown, false);
    document.removeEventListener('mouseup', eventUp, false);
    document.removeEventListener('mousemove', eventMove, false);
    clearTimeout(t);
}

function gotoShare() {
    $("#result").show();
    $("#ending").remove();
}