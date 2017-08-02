	$(function(){
		    //关注、收藏的js
    $('.u-collect-btn').click(function(){
    	$(this).toggleClass('u-active-btn');
    })
        $('.u-attention-btn').click(function(){
    	$(this).toggleClass('u-active-btn');
    })
//		    /*banner轮播*/
	var gallery = mui('.mui-slider');
    gallery.slider({
    interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    

      
	})