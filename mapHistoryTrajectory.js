/**
 * Created by fan on 2017/6/13.
 */
//加载某个订单车辆轨迹点的信息
var markerArr = new Array();
var startLat,startLon,endLon,endLat
var timer=null;
var i=0;
var carmarker
function findcartrackpoint(plateNumber,loadingEmpTime,unloadingEmpTime){
    //alert(plateNumber+":"+loadingEmpTime+":"+unloadingEmpTime)

    $.ajax({
        url:"<%=basePath%>management/orderinfo/findcartrackpoint",
        type:"POST",
        data:{plateNumber:plateNumber,loadingEmpTime:loadingEmpTime,unloadingEmpTime:unloadingEmpTime},
        dataType:"json",
        async: false,
        cache : false,
        success:function(data){
            //console.log(data)
            $.each(data, function(i, item){
                $.each(item,function(key,val){

                    startLon=item[0].lon;startLat=item[0].lat; //起点  中心点
                    centerPoint = new BMap.Point(startLon,startLat);
                    map.centerAndZoom(centerPoint, 6);
                    //添加折线
                    markerArr.push(new BMap.Point(val.lon,val.lat));
                    map.addOverlay(new BMap.Polyline(markerArr,
                        {strokeColor:"#0091d4", strokeWeight:3, strokeOpacity:1}   ));

                })
            });
            var pt = markerArr[0];
            var myIcon = new BMap.Icon("<%=basePath%>/styles/images/start.png", new BMap.Size(20,20));
            var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注起点
            map.addOverlay(marker2);

            var ptend = markerArr[markerArr.length-1];
            var myIconend = new BMap.Icon("<%=basePath%>/styles/images/end.png", new BMap.Size(20,20));
            var markerend = new BMap.Marker(ptend,{icon:myIconend});  // 创建标注终点
            map.addOverlay(markerend);
            // historyPlay();
        },
        error:function () {
            console.log("服务器错误!");
        }
    });
}

function historyPlay(){
    //remove_overlay();
    map.removeOverlay(carmarker)

    timer=setInterval(function(){
        i<markerArr.length;
        if(!(i==markerArr.length-1)){
            map.removeOverlay(carmarker)
            var carpt = markerArr[i];
            var carIcon = new BMap.Icon("<%=basePath%>/styles/images/carIcon.png", new BMap.Size(56,30));
            carmarker = new BMap.Marker(carpt,{icon:carIcon});  // 创建标注小车
            map.addOverlay(carmarker);
        }else{
            clearInterval(timer);
            i=0;
            $(".hisStart").removeClass("hisStop")
        }
        i++;
    },500)
}