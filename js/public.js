
$(function() {
	
	//顶部右边点击出现弹框
	$('.u-header').find('.u-guild').click(function() {
		$('.u-top-bounced').toggleClass('active');
	})



	//底部点击效果
	$('.m-footer').find('li').click(function() {
		$('.m-footer li').removeClass('active')
		var index = $(this).index();
		$('.m-footer li').eq(index).addClass('active');
	})
	//		…………………………………………………………………………………………………………………………
	//计价页面底部点击计价 弹出，报价页面
	$(".u-Calculate-box").click(function() {
		$('.m-quote-results').addClass('active');
	})
	//		  <!--报价结果弹出页面-->
	$('.m-results-center .u-pcb-price-center .u-pcb-center-inner').click(function() {
		$('.m-results-center .u-pcb-price-center .u-pcb-center-inner').find('.u-radio').removeClass('active');
		$(this).find('.u-radio').addClass('active');
	})
	$('.u-comparison').click(function() {
		$('.g-slide-mask').show();
		$('.m-Price-Comparison').addClass('active');
	})
	//      报价结果页面 点击Price Comparison Matrix弹出的页面js
	$('.m-Price-Comparison .u-center .u-center-list li').click(function() {
		$('.m-Price-Comparison .u-center .u-center-list li').find('.u-radio').removeClass('active');
		$(this).find('.u-radio').addClass('active');
	})
	
	$('.u-ship-to').click(function(){
		$('.g-slide-mask').show();
		$('.m-state-select').addClass('active');
	})
	//		…………………………………………………………………………………………………………………………	

	//	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&		
	//点击弹出页面叉号的js	
	$('.g-main .m-top .u-close').click(function() {
//		$('.g-slide-mask').hide();
//		$('.m-inch-box').removeClass('active');
//		$('.m-quantity-box').removeClass('active');
//		$('.m-select-order-box').removeClass('active');
//		$('.m-layer-order-box').removeClass('active');
//		$('.m-Price-Comparison').removeClass('active');
//		$('.m-state-select').removeClass('active');
//		$('.m-city-select').removeClass('active');
//		$('.m-postcode-select').removeClass('active');
//		$('.m-step-details').removeClass('active');	
//		$('.m-address-select').removeClass('active');
//		$('.m-address-add').removeClass('active');
//		$('.m-combine-shipping').removeClass('active');
        $(this).parent().parent().removeClass('active');
	    if (!$('.u-close').parent().parent().hasClass('active'))
	        $('.g-slide-mask').hide();
	})
	//	&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

	//		*******************************************
	//点击遮罩触发的JS
	$('.g-slide-mask').click(function() {
		$('.g-slide-mask').hide();
		$('.u-tishi').hide();
		//首页侧滑导航
		$('.g-main .g-swipe-wrapper').removeClass('g-moved');
		$('.u-detail-center').css('overflow','scroll');
		//inch'↔mm弹出页
		$('.m-inch-box').removeClass('active');
		//Quantity点击弹出的页面
		$('.m-quantity-box').removeClass('active');
		//<!--点击SMD Select PCBWay's PCB Order# YES的弹出页面-->
		$('.m-select-order-box').removeClass('active');
		//点击报价结果页面Price Comparison Matrix弹出的页面
		$('.m-Price-Comparison').removeClass('active');
		//点击国家弹出国家选择页面
		$('.m-state-select').removeClass('active');
		//删除框消失
		$('.u-del-bounced').removeClass('active');
		//上传文件提示框消失
		$('.u-file-bounced').removeClass('active');
		//订单审核的提示消失
		$('.u-reviewed-bounced').removeClass('active');
		//确认收货弹框消失
		$('.u-receiving-bounced').removeClass('active');
		//失败的弹框消失
		$('.u-reviewed-error').removeClass('active');	
		//城市选择的弹框消失
		$('.m-city-select').removeClass('active');
		//邮编选择的弹框消失
		$('.m-postcode-select').removeClass('active');
		//政策弹出页面消失
		$('.m-policy-js').removeClass('active');
		//pcb-service.html页面列表点击弹出页面消失
		$('.m-step-details').removeClass('active');
		//submit_shipping.html页面问号点击弹出页面消失
		$('.m-popupcontent').removeClass('active');
		//点击4.6.8弹出的页面
		$('.m-layer-order-box').removeClass('active');	
		//submit_shipping.html页面问号右侧箭头点击弹出页面消失
		$('.m-combine-shipping').removeClass('active');
		//submit_shipping.html页面顶部个人信息点击弹出页面消失
		$('.m-address-select').removeClass('active');
		//submit_shipping.html页面顶部添加信息点击弹出页面消失
		$('.m-address-add').removeClass('active');
		//点击支付方式标题Payment method问号弹出的页面消失
		$('.m-payment-sm').removeClass('active');
		//sponsor_detail.html评论输入框消失
		$('.u-import-container').removeClass('active');
	})
	//		**********************************************
	//国家搜索的js
	$('.u-close-icon').click(function() {
		$('.u-search-input').val('');
	})
	$(' .u-state-list-box .u-state-list li').click(function() {		
		if($(this).find('.u-state-center').hasClass('tick')){
			$(this).find('.u-state-center').removeClass('tick');
		}else{
			$('.u-state-list-box .u-state-list li .u-state-center').removeClass('tick');
			$(this).find('.u-state-center').addClass('tick');
		}
})
//	$('.m-state-select .u-state-list-box').on('scroll', function() {
//		var that = this;
//		
//		//      	var stateWindow=$('.m-state-select').height();//浏览器当前窗口可是区域高度
//		//      	var tops = $('.m-state-select .u-state-list-box').scrollTop();//滚动条高度
//		var heights = $(".u-state-list").offset().top; //当前盒子到顶部的高度 
//		//      	alert(stateWindow);
//		$('.tit').each(function(i, v) {
//			if(($(that).scrollTop() + heights + $('.tit').eq(0).outerHeight()) > $(v).offset().top) {
//				var text = $(v).text();
//				$('.tit_fixed').addClass('active').find('p').text(text)
//			}
//		})
//	})
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^	
		//点击Confirm Received弹出确认收货弹出框
		$('.u-cr-btn').click(function() {
			$('.g-slide-mask').show();
			$('.u-receiving-bounced').addClass('active');
		})
		

		//点击no
		$('.u-receiving-bounced .u-select-box .u-no').click(function() {
			$('.g-slide-mask').hide();
			$('.u-receiving-bounced').removeClass('active');
		})
		//点击Yes
		$('.u-receiving-bounced .u-select-box .u-yes').click(function() {
			$('.g-slide-mask').hide();
			$('.u-receiving-bounced').removeClass('active');
		})
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
		
		
	//右边字母点击跳转到相应位置       

//   $('.key').click(function(){
//   	miao($('.skip'+$(this).html()));
//   })
//	function miao(els) {
//		var heights = $(".u-state-list").offset().top;
//		var el_top = els.offset().top - heights;
//		$(".u-state-list-box").animate({
//			scrollTop: el_top
//		}, 800)
//	}


$('.key').click(function () {
	    var a = $(this).parent('ul').parent('div').prev('.u-state-list-box');
	    var b = a.children('.skip' + $(this).html());
	    var c = a.children('.u-state-list');
	    miao(b, a, c);
	})
	function miao(a, b, c) {
	    var heights = c.offset().top;
	    var el_top = a.offset().top - heights;
	    b.animate({
	        scrollTop: el_top
	    }, 800)
	}
	
//order_list_01,02页面顶部点击js
		$('.u-select-header').click(function(){
			$('.u-top-list').show();
		})
		$('.u-top-list li a').bind('click',function(){
			$('.u-input').text($(this).attr('title'));			
			$('.u-top-list').hide();
		})
   //点击order_list_02页面u-car-content弹出的页面产品详情页
   $('.u-payment-li .u-car-content').click(function(){
   	     $('.u-hint').text('Product Detail')
         $('.g-product-Detail').addClass('active');
   })	
  //点击order_list_01页面u-car-content弹出的页面产品详情页
   $('.u-car-li .u-car-content').click(function(){
   	     $('.u-hint').text('Product Detail')
         $('.g-product-Detail').addClass('active');
   })	
//点击order_detail页面u-car-content弹出的页面产品详情页
   $('.u-product-details .u-car-content').click(function(){
   	     $('.u-hint').text('Product Detail')
         $('.g-product-Detail').addClass('active');
   })
   		//点击Technological process弹出fab_progress页面
		$('.u-Techn-process-btn').click(function() {
			$('.u-hint').text('Technological process')			
			$('.g-fab-progress').addClass('active');
		})

		//点击Repeat Order弹出返单页面
		$('.u-Repeat-Order-btn').click(function(){
			$('.u-hint').text('Repeat Order')			
			$('.g-Repeat-Order').addClass('active');
		})
})

//国家页面国旗懒加载
var $wd=$('.m-state-select .u-state-list-box'),
$img = $('.m-state-select .u-state-list-box .u-state-list li img'),
imgTop,//图片距顶部的高度哦
scTop,//滚动条高度
wH,//窗口高度
wH=$wd.height();//浏览器可视高度
$wd.scroll(function(){
	scTop=$wd.scrollTop();//滚动条到顶部的高度
	$img.each(function(){
		imgTop=$(this).offset().top;//当前盒子到顶部的高度
		if(imgTop-wH<scTop&&		
		$(this).attr('src')!=$(this).data('url')){//排除已经加载过的
			$(this).attr({
				src:$(this).data('url')
			})
		}
	})
})
//loading动态图
function addLoading() {
    var loadingWrapper = document.createElement('div');
    loadingWrapper.setAttribute('id', 'loadingWrapper');
    var loadingGIF = document.createElement('img');
    loadingGIF.src = 'img/loading.gif';
    loadingGIF.setAttribute('class', 'loadingGIF');
    loadingWrapper.appendChild(loadingGIF);
    document.body.appendChild(loadingWrapper);
    document.body.style.overflow = 'hidden';
}
function delLoading() {
    var loadingWrapper = document.getElementById('loadingWrapper');
    document.body.removeChild(loadingWrapper);
}

//上下页的JS
$(function(){
	$(".paging-box .u-paging div").click(function(){
		$(".paging-box .u-paging div").removeClass("active");
		var index = $(this).index();
		$(".paging-box .u-paging div").eq(index).addClass("active");
	})
	//返回顶部按钮显示隐藏js
    var height = $('.goTop').height();
	$('.u-detail-center').scroll(function(){
		if ($('.u-detail-center').scrollTop()>height) {
			$('.goTop').fadeIn();
		} else{
			$('.goTop').fadeOut();
		}
	})
	//点击返回顶部
    $('.goTop').click(function(){
    	$('.u-detail-center').animate({scrollTop:0},1000);
    	return false;
    })
    
    
    //百分比进度js
        var percent=0;  
    var loading=setInterval(function(){  
        if(percent>=100){  
            percent=0;  
            $('.circle').removeClass('clip-auto');  
            $('.right').addClass('wth0');  
        }else if(percent>=50){  
            $('.circle').addClass('clip-auto');  
            $('.right').removeClass('wth0');  
        }  
        $('.left').css("-webkit-transform","rotate("+(18/5)*percent+"deg)");  
        $('.num>span').text(percent);  
        percent++;  
    },200);     
})
