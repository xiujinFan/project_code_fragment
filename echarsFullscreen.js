/**
 * Created by fan on 2017/6/13.
 */
/* 内蒙古自治区 */
var dataNeimenggu=[
    {name: '呼伦贝尔市',value: randomData() },
    {name: '兴安盟',value: randomData() },
    {name: '锡林郭勒盟',value: randomData() },
    {name: '通辽市',value: randomData() },
    {name: '赤峰市',value: randomData() },
    {name: '乌兰察布市',value: randomData() },
    {name: '呼和浩特市',value: randomData() },
    {name: '包头市',value: randomData() },
    {name: '巴彦淖尔市',value: randomData() },
    {name: '鄂尔多斯市',value: randomData() },
    {name: '乌海市',value: randomData() },
    {name: '阿拉善盟',value: randomData() }

]
cityMap('<%=basePath%>styles/js/map/neimenggu.json','neimenggu','neimengguJson','内蒙古自治区数据','echartsNeimenggu','optionNeimenggu',dataNeimenggu);


var echarsNames
var echarsNamesArr={}
function cityMap(url,cityName,nameJson,title,echarsName,optionName,cityData){
    var url=url||'<%=basePath%>styles/js/map/china.json';
    var cityName=cityName||'china';
    var nameJson=nameJson||'chinaJson';
    var echarsName=echarsName||'echartsChina';
    var optionName=optionName||'option';

    $.get(url, function (nameJson) {
        echarts.registerMap(cityName, nameJson);
        echarsName = echarts.init(document.getElementById(cityName));
        echarsName.resize({
            width: document.getElementById('content-nav').clientWidth+'px',
            height: document.getElementById('content-nav').clientHeight+'px'
        });
        optionName={
            title: {
                text: '车源和货源监控',
                subtext: title,
                left: 'center',
                top:20
            },
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    var res = params.name+'<br/>';
                    var myseries = optionName.series;
                    for (var i = 0; i < myseries.length; i++) {
                        for(var j=0;j<myseries[i].data.length;j++){
                            if(myseries[i].data[j].name==params.name){
                                res+=myseries[i].name +' : '+myseries[i].data[j].value+'</br>';
                            }
                        }
                    }
                    return res;
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['货源','车源','货物吞吐量']
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '货源',
                    type: 'map',
                    mapType: cityName,
                    // geoIndex: 0,
                    roam: true,
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:cityData
                },
                {
                    name: '车源',
                    type: 'map',
                    mapType: cityName,
                    // geoIndex: 0,
                    roam: true,
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:cityData
                },
                {
                    name: '货物吞吐量',
                    type: 'map',
                    mapType: cityName,
                    // geoIndex: 0,
                    roam: true,
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:cityData
                }
            ]
        };

        echarsName.setOption(optionName);
        var key=cityName;
        echarsNamesArr[key]=echarsName;
        $("#toolUp").click(function () {
            if($("#basicOperation").height()!=0){
                $("#basicOperation").stop().animate({height:0},600);
                $(".content-nav").stop().animate({height:$(window).height()-70},600);
                $(this).css({"transform":"rotate(180deg)"});
                $(".content-map").stop().animate({height:$(window).height()-70},600);
                echartsChina.resize({
                    height: window.innerHeight-70+'px'
                });
                echarsName.resize({
                    height: window.innerHeight-70+'px'
                });
            }else {
                $("#basicOperation").stop().animate({height:140},600);
                $(".content-nav").stop().animate({height:$(window).height()-140-70},600);
                $(this).css({"transform":"rotate(0deg)"});
                $(".content-map").stop().animate({height:$(window).height()-140-70},600);
                echartsChina.resize({
                    height: window.innerHeight-70-140+'px'
                });
                echarsName.resize({
                    height: window.innerHeight-70-140+'px'
                });
            }
        });
        $(".sider-nav").click(function () {
            if($(".content-siderBar-n").width()!=0){
                $(".content-siderBar-n").stop().animate({width:0},200);
                $(".content-right").stop().animate({width:$(window).width()},200);
                $(this).css({"transform":"rotate(90deg)"});
                $(".content-map").stop().animate({width:$(window).width()},200);
                echartsChina.resize({
                    width: window.innerWidth+'px'
                });
                echarsName.resize({
                    width: window.innerWidth+'px'
                });
            }else {
                $(".content-siderBar-n").stop().animate({width:"15%"},200);
                $(".content-right").stop().animate({width:"85%"},200);
                $(this).css({"transform":"rotate(270deg)"});
                $(".content-map").stop().animate({width:"100%"},200);
                echartsChina.resize({
                    width: echarsWidth
                });
                echarsName.resize({
                    width: echarsWidth
                });

            }
        });//console.log(echarsName)
        return echarsName
    });
}
if($.support.fullscreen){
    $('#fullScreen').click(function(e){
        $('.fullContent_platform').fullScreen();
        $('.fullContent_platform').width("100%");
        $('.fullContent_platform').height("100%");
        $(".content-map").height("100%");
        $(".content-map").width("100%");
        $(".fullContent_platform").parent().css("overflow","hidden")
    });

}
var flag=false;
document.addEventListener("webkitfullscreenchange", function(e) {
    //console.log("webkitfullscreenchange", e);
    //var echarsNames=echarsNames;
    //console.log(echarsNames)
    if(!flag){
        echartsChina.resize({
            width:window.innerWidth+'px',
            height:window.innerHeight+'px'
        });
        echarsNames.resize({
            width:window.innerWidth+'px',
            height:window.innerHeight+'px'
        });
        flag=true;
    }else{
        echartsChina.resize({
            width: document.getElementById('content-nav').clientWidth+'px',
            height: document.getElementById('content-nav').clientHeight+'px'
        });
        echarsNames.resize({
            width: document.getElementById('content-nav').clientWidth+'px',
            height: document.getElementById('content-nav').clientHeight+'px'
        });
        $('.fullContent_platform').width($(".content-nav").width());
        $('.fullContent_platform').height($(".content-nav").height());
        $(document).css({ "overflow": "hidden" });
        flag=false;

    }
});