var keyfrom = "listen-2-the-world";
var key = "1667067819";
var translation = null;
document.onmouseup = document.ondbclick= function(event){
    if(translation) {
        translation.boxRemove();
        translation.contentRemove();
    }
    translation = null;
    var txt = "";
    txt = window.getSelection().toString();
    if(txt){
        translation = new transBox(txt);
        var pos = {
            left:event.pageX,
            top:event.pageY
        };
        translation.setStyle(pos);
        translation.showBox();
    }
};
var transBox = function (txt){
    this.txt = txt;
    this.isTranslated = false;
    this.translatedObj = {};
    this.box = document.createElement("div");
    this.content = document.createElement("div");
    this.init();
};
transBox.prototype = {
    init:function(){
        this.box.innerHTML = "译";
        this.content.innerHTML = "loading...";
        this.setDefaultStyle();
        this.listenHandler();
        document.body.appendChild(this.box);
        document.body.appendChild(this.content);
    },
    
    setDefaultStyle:function(){
        this.box.style.position = "absolute";
        this.box.style.display = "none";
        this.box.style.border = "1px solid black";
        this.box.style.background = "#fff";
        this.box.style.cursor = "pointer";
        this.box.style.padding = "5px 10px";
        this.box.style.zIndex = "99";
        
        this.content.style.position = "absolute";
        this.content.style.display = "none";
        this.content.style.border = "3px solid black";
        this.content.style.background = "#fff";
        this.content.style.padding = "5px 10px";
        this.content.style.zIndex = "100";
          
    },
    setStyle:function(styleOb){
        $(this.box).css({
            left:styleOb.left+5+"px",
            top:styleOb.top+5+"px",
        });
        $(this.content).css({
            left:styleOb.left+5+"px",
            top:styleOb.top+35+"px"
        });
    },
    listenHandler:function(){
        var t = this;
        var showData = function(){
            t.showContent();
            getData(t.txt,function(d){
                t.translatedObj = d;
                t.isTranslated = true;
                var txt = "";
                if(d.basic) {
                    var explains = d.basic.explains;
                    explains.forEach(function(item){
                        txt += item+"<br>";
                    })
                }else {
                    var translation = d.translation;
                    translation.forEach(function(item){
                        txt += item+"<br>";
                    })
                }
                t.emptyData();
                t.addData(txt);
            });
        };
        var timer = null;
        this.box.onmouseover = function(){
            timer = setTimeout(showData,500);
        };
        this.box.onmouseout = function(){
            clearTimeout(timer)
        }
    },
    addData:function(txt){
        this.content.innerHTML = txt;
    },
    emptyData:function(txt){
        this.content.innerHTML = '';
    },
    contentHide:function(){
        this.content.style.display = "none";
    },
    boxHide:function(){
        this.box.style.display = "none";
    },
    contentRemove:function(){
        document.body.removeChild(this.content);
    },
    boxRemove:function(){
        document.body.removeChild(this.box);
    },
    showBox:function(){
        this.box.style.display = "block";
    },
    showContent:function(){
        this.content.style.display = "block";
    },

    // not used
    isMouseInBox:function(e){
        var rect = this.box.getBoundingClientRect();
        console.log(rect);
        console.log(e);
        mouseLeft = e.pageX;
        mouseTop = e.pageY;
        var rect_left = rect.left + document.body.scrollLeft,
            rect_right = rect.right + document.body.scrollLeft,
            rect_top = rect.top + document.body.scrollTop,
            rect_bottom = rect.bottom + document.body.scrollTop;
        console.log(rect_top +','+ rect_bottom);
        console.log(mouseTop);
        console.log(document.body.scrollTop);
        console.log(mouseLeft < rect_right && mouseLeft > rect_left);
        console.log(mouseTop < rect_bottom && mouseTop > rect_top);
        
        if(mouseLeft < rect_right && mouseLeft > rect_left && mouseTop < rect_bottom && mouseTop > rect_top) {
            return true;
        } else {
            return false;
        }
    },


}

function getData(str,cb){
    $.ajax({
        url:"https://fanyi.youdao.com/openapi.do?keyfrom="+keyfrom+"&key="+key+"&type=data&doctype=json&version=1.1&q="+str,
        success:cb
    })
}

// not used
function showExtension(img){
    var imgURL = chrome.extension.getURL("images/test.png");
    img.src = imgURL;
        };