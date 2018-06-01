$(function(){
    $('.swipe>.wrap-nav-img>li').each(function(i){
        $(this).css('background','url(img/nav'+i+'.jpg) no-repeat center');
    });
    $('#btn_for_login').on('click',function(){
        $('#login').stop().fadeIn(300);
    });
    $('#close_login').on('click',function(){
        $('#login').stop().fadeOut(300);
    });
    var index = 0;
    // $('.swipe .nav-img0').clone().appendTo('.swipe>.wrap-nav-img');
    var timer = setInterval(swipe(false),2000);

    $('.swipe').hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(swipe(false),2000);
    });

    $('.swipe>.arrow-r').on('click',function(){
        swipe(false)();
    });

    $('.swipe>.arrow-l').on('click',function(){
        swipe(true)();
    });

    $('.dots').on('click','li',function(){
        if (index == $(this).index()){
            return;
        }else{
            var $index = $(this).index();
            // console.log($index)
            swipeClick($index);
        }       
    });

    //左右切换可以通过flag来控制变量切换，而后续的点击则会是当前的index值与所点击的index之间的切换。
    //点击的index值与当前值之间的切换方便操作。
    //flag为true为上一张，为false时为下一张。
    function swipe(flag){
        //轮播动画变为下一张调整到这张的右边，两张一起向左滚动。箭头下一张的逻辑与此相同。
        //箭头上一张的逻辑也是如此，只是从index++变为index--，index= index == -1 ？4 ：index。
        return function (){ 
            var chgI = 0;
            var disX = 100;    
            if (flag){
                chgI = index--;
                index = index == -1 ? $('.swipe .wrap-nav-img li').length-1 : index;

            }else{
                chgI = index++;
                disX = -disX;
                index = index == $('.swipe .wrap-nav-img li').length ? 0 : index;
            }
            $('.swipe .nav-img'+chgI).stop().animate({'left':disX+'%'},600,'linear');
            // console.log(index,$('.swipe .wrap-nav-img li').length);
            $('.swipe .nav-img'+index).css('left',-disX+'%');
            $('.swipe .nav-img'+index).stop().animate({'left':0},600,'linear');
            $('.swipe .dots li').eq(index).addClass('active').siblings().removeClass('active');
            flag = undefined;
        };    
    }

    function swipeClick($index){
        //轮播动画变为下一张调整到这张的右边，两张一起向左滚动。箭头下一张的逻辑与此相同。
        //箭头上一张的逻辑也是如此，只是从index++变为index--，index= index == -1 ？4 ：index。
        var disX = 100;
        disX =  $index > index ? -disX : disX;
        $('.swipe .nav-img'+index).stop().animate({'left':disX+'%'},600,'linear');
        // index = index == $('.swipe .wrap-nav-img li').length ? 0 : index;
        // console.log(index);
        $('.swipe .nav-img'+$index).css('left',-disX+'%');
        $('.swipe .nav-img'+$index).stop().animate({'left':0},600,'linear');
        $('.swipe .dots li').eq($index).addClass('active').siblings().removeClass('active');
        index = $index;
    }

    $('.tab-fade .wrap-img').each(function(){
        $(this).find('li:first-child').clone().appendTo($(this).find('ul'));
    });
        
    // $('.tab-fade .tab .wrap-img:last-child ul').each(function(){
    //     $(this).css({'width':$(this).find('li').outerWidth()*$(this).find('li').length});
    // });
    var $ul = $('.tab-fade .tab .wrap-img:last-child ul');
    $('.tab-fade .tab .wrap-img:last-child ul').css({'width':$ul.find('li').outerWidth()*$ul.find('li').length});
    // 淡入淡出选项卡
    var timer2 = setInterval(moveRound(),2000);
    
    $('.tab-fade .tab-title>li').on('click',function(){
        clearInterval(timer2);
        $(this).addClass('active').siblings().removeClass('active');
        $('.tab-fade .tab').eq($(this).index()).fadeIn(700).addClass('active').siblings('.tab').fadeOut(700).removeClass('active');
        timer2 = setInterval(moveRound(),2000);
    });

    //选项卡中的图片走马灯，利用回调函数来达到无缝轮播的目的；
    function moveRound(){
        var num = 0;
        var $ul1 = $('.tab-fade .tab.active .wrap-img:eq(0) ul'); 
        var $ul2 = $('.tab-fade .tab.active .wrap-img:eq(1) ul'); 
        $ul1.css('margin-top',0);
        $ul2.css('margin-left',0);
        return function(){
            num++; 
            $ul1.animate({'margin-top':-$ul1.find('li').outerHeight()*num},700,'linear',function(){
                if (num == $ul1.find('li').length-1){
                    num = 0;
                    $ul1.css('margin-top',0);
                    // console.log($ul2.css('margin-left'));
                    
                }
            });
            $ul2.animate({'margin-left':-$ul2.find('li').outerWidth()*num},700,'linear',function(){
                if(num == 0) $ul2.css('margin-left',0);
                
            });
            // console.log(num);
            
        };
        
    }
    //左右滑动选项卡，逻辑与slideDown和slideUp类似通过改变width来实现。
    $('.tab-slide .wrap-tab-slide>div').mouseenter(function(){
        if (!$(this).find('.tab').hasClass('active')){
            $(this).find('.tab').addClass('active').css('width',0).stop().animate({'width':656},300,'linear');
            $(this).siblings().find('.tab').stop().removeClass('active').animate({'width':0},300,'linear');
        }
    });

    var color = '';
    var timer3 = setInterval(buble, 1000);
    $('.animate-buble').hover(function () {
        clearInterval(timer3);
    }, function () {
        timer3 = setInterval(buble, 1000);
    });
    var timer4 = 0;
    var flag = false;
    $('.animate-buble').on('click', function () {
        // console.log(color)
        $('.lt-animate').css('background-color', color);
        $('.rt-animate').css('background-color', color);
        $('.rt-animate').animate({
            'left': 750,
            'border-radius': '50%',
            'opacity': 1,
        }, 1000);
        $('.lt-animate').animate({
            'left': 250,
            'border-radius': '50%',
            'opacity': 1,
        }, 1000);
        flag = true;
        // timer3 = setInterval(buble, 1000);
        // timer4 = setInterval(biu_biu_biu, 1000);
        // $(this).hover(function(){},function(){});
        $(this).off('click');
    });

    function biu_biu_biu() {
        $('.lt-animate').animate({
            'left': 0,
            'width': 200,
            'height': 200,
            'line-height': 200,
            'opacity': 1,
        }, 500).animate({
            'left': 600,
            'width': 0,
            'height': 0,
            'line-height': 0,
            'opacity': 0,
        }, 500);

        $('.rt-animate').animate({
            'left': 1000,
            'width': 200,
            'height': 200,
            'line-height': 200,
            'opacity': 1,
        }, 500).animate({
            'left': 600,
            'width': 0,
            'height': 0,
            'line-height': 0,
            'opacity': 0,
        }, 500);
        $('.lt-animate,.rt-animate').css('background-color', color);

        
    }

    function buble() {
        color = randomColor();
        $('.animate-buble').animate({ 'width': 300, 'height': 300 }, 500).animate({ width: 200, height: 200 }, 500, function () {
            $(this).css('background', color);
        });
        $('#box').animate({ 'width': 400, 'height': 400, 'opacity': 0 }, 500).animate({
            'width': 200, 'height': 200
        }, 500, function () {
            $(this).css('opacity', 1);
            $(this).css('border-color', color);
        }
        );
        if (flag){
            biu_biu_biu();
        }
    }
    function randomColor() {
        var str = '';
        var num = 0;
        for (var i = 0; i < 3; i++) {
            num = Math.floor(Math.random() * 256);
            str += str ? ',' + num : num;
        }
        return 'rgb(' + str + ')';
    }
});
