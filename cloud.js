$(document).ready(function(){

    // setup
    var opacities = [1, 0.7, 0.4, 0.15, 0.12, 0.1];
    var colors = [];
    for(var i=0; i<6; i++) {
        var r = (i==0) ? 27 : Math.floor(i/5*120);
        var g = (i==0) ? 27 : Math.floor(i/5*208);
        var b = (i==0) ? 27 : Math.floor(i/5*236);
        colors[i] = 'rgb('+r+','+g+','+b+')';
    }
    var text = ["愁云惨雾", "十面霾伏", "雾暗云深", "厚德载雾, 自强不吸", "雾里看花", "开雾睹天"];
    var aqi = [300, 200, 150, 100, 50]; // AQI reference from here: http://beijing.usembassy-china.org.cn/070109air.html 

    function getIndex(number) {
        if(number > 150){
            if(number > 200) return (number > 300) ? 0 : 1;
            else return 2;
        } else {
            if(number > 100) return 3;
            else return (number > 50) ? 4 : 5;
        }
    }

    function update(i) {
        $('#main').css('background-color', colors[i]);
        $('#text').css('opacity', opacities[i]);
        $('h1').text(text[i]);
        $('.clouds').show();
    }

    $('input').change(function(){
        var value = $('input').attr('value');
    });

    // reading twitter
    // this v1 api will be depracated from 03/05/2013 :(
    var re = /;(\s*\d+);/;
    $.getJSON('http://api.twitter.com/1/statuses/user_timeline.json?callback=?&screen_name=BeijingAir&count=1', function(data){
        var number = parseInt(re.exec(data[0].text)[1]);
        console.log(number);
        var index = getIndex(number);
        update(index);
    });
});


