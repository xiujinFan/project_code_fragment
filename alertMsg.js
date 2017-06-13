/**
 * Created by fan on 2017/6/13.
 */
//弹框的封装
function widthHeight(id) {
    var divOut=document.getElementById(id);
    var divInner=divOut.getElementsByTagName('div')[0];
    var del=divInner.getElementsByTagName('a')[0];
    var width=divInner.offsetWidth;
    var height=divInner.offsetHeight;
    var widthC=document.documentElement.clientWidth||document.body.clientWidth;
    var heightC=document.documentElement.clientHeight||document.body.clientHeight;
    var left=(widthC-width)/2;
    var top=(heightC-height)/2;

    divInner.style.left=left+'px';
    divInner.style.top=top+'px';
    del.onclick=function () {
        divOut.style.display='none';
    }
}