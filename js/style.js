//版权所有 @深圳联雅网络
$(document).ready(function(){

	$(window).on({
        scroll: function(){
            var h0=$(window).scrollTop(),h1,h2;
            if($('#header').length){
                if(h0>1){
                    $('#header').addClass('headerbg');
                }else{
                    $('#header').removeClass('headerbg');
                }
            }
        },
        resize: function(){
            qiehuan();
        },
    });

    $('.kefu .cha img').click(function(){
        $('.kefu').hide();
    });

	//广告切换图片
    function qiehuan(){
    	var ww=$(window).width();
		if(ww==1000 || ww<1000){
			var huantu=$('.top_bg .top_bg_con .swiper-slide img').attr('xiaotu');
		}else{
			var huantu=$('.top_bg .top_bg_con .swiper-slide img').attr('datu');
		}
		$('.top_bg .top_bg_con .swiper-slide img').attr('src',huantu);
    }
    qiehuan();

	//切换语言版本
	$('a[lang]').on('click',function(e){
		var l=$(this).attr('lang');
		$.get('/?do_action=lang.lang',{lang:l},function(d){
			if(d.re==1){
				window.location.href='';
			}
		},'json');
	});

	//导航切换
    $('#header .menu,#header .menu_bg').on('click', function(e){
        $('#header .nav,#header .menu_bg').toggleClass('on').I();
        e.stopPropagation();
        $('#header .sou,#header .menu_bg1').removeClass('on');
    });
    $('#header .sousuo,#header .menu_bg1').on('click', function(e){
        $('#header .sou,#header .menu_bg1').toggleClass('on').I();
        e.stopPropagation();
        $('#header .nav,#header .menu_bg').removeClass('on');
    });

    //首页产品轮播
    if($('.index_pro_con').length>0){
    	var swiper = new Swiper('.index_pro_con', {
      		nextButton: '.index_pro_con .swiper-button-next',
			prevButton: '.index_pro_con .swiper-button-prev',
    	});
    }

    //留言ajax
    /*if($('.submit_feedback').length>0){
        $('.submit_feedback').F({
            url:'/ajax/action.php',
            end: function(d,f){
                 if(d.status==1){
                    // f.reset();
                    $.T({str:d.msg,end:function(){
                        location.href="";
                    }});
                 }else{
                    $.T({str:d.msg});
                 }
                 f.issubmit(0);
            }
        });
    }*/

    //页脚友情链接
    var swiper = new Swiper('.link_con', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true
    });

    //关于我们--历史进程
    if($('.history').length>0){
        var galleryTop = new Swiper('.gallery-top', {
            loop:true,
            loopedSlides: 9,
            pagination: '.swiper-pagination2',
            nextButton: '.gallery-top .swiper-button-next',
            prevButton: '.gallery-top .swiper-button-prev',
            paginationClickable: true
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            slidesPerView: 9,
            touchRatio: 0.2,
            loop: true,
            loopedSlides: 9,
            slideToClickedSlide: true,
            centeredSlides: true,
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    }

    //新闻ajax加载
    if($('.info .con').length>0){
        var page_fn = {
            obj: $('.info .con'),
            url: '/ajax/info_ajax.php',
            page: 2,
            load: 0,
            get: function(){
                var p=page_fn;
                if(p.load) return 0;
                p.load=1;
                $.get(p.url, { page:p.page }, function(data){
                    p.load=0;
                    if(data){
                        p.page++;
                        p.obj.append(data);
                    }else{
                        $('.info_more').text($('.info_more').attr('gaibian'));
                    }
                }, 'html');
            }
        }
        $('.info_more').click(function(){
            page_fn.get();
        });
    }

    //产品ajax加载
    if($('.products .con').length>0){
        var page_fn = {
            obj: $('.products .con'),
            url: '/ajax/pro_ajax.php',
            page: 2,
            load: 0,
            get: function(){
                var p=page_fn, cateid=$('.pro_more').attr('cateid'), Keyword=$('.pro_more').attr('Keyword');
                if(p.load) return 0;
                p.load=1;
                $.get(p.url, { page:p.page, CateId:cateid ,Keyword:Keyword }, function(data){
                    p.load=0;
                    if(data){
                        p.page++;
                        p.obj.append(data);
                    }else{
                        $('.pro_more').text($('.pro_more').attr('gaibian'));
                    }
                }, 'html');
            }
        }
        $('.pro_more').click(function(){
            page_fn.get();
        });
    }

    //产品详情页参数滚动
    var product_nav_top = {
        i: function(){
            var tt=$('.products_detail .detail_text'),
                th=$('.products_detail'),
                t0=th.offset().top,
                t1= 0,
                st=$(window).scrollTop(),
                h1=$('#footer').offset().top,
                h2=tt.height()+t0;
            if(t0<=st+t1){
                if(h1-h2<=st){
                     tt.addClass('ap1').removeClass('fx1').css({top:h1-h2});
                     console.log(1);
                }else{
                    tt.removeClass('ap1').addClass('fx1');
                    console.log(2);
                }
            }else{
                tt.removeClass('ap1').addClass('fx1');
                console.log(3);
            }
        },
    }
    $(window).on({
        scroll: function(){
            if($('.products_detail').length>0){
                product_nav_top.i();
            }
        }
    });

});