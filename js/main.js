/*
+------------------------------------------
| 应某人要求，将东西都用jQ封装
| By Zinn
+------------------------------------------
*/

$.extend({
/**************************************************
$.T({str:'', type:'btn', mask:1});
**************************************************/
T:function(v){
var a = $.extend({
		main: '.T-bo',
		bo: '.TIPs' + new Date().getTime() + Math.ceil(Math.random()*100),
		css: 'T-Bin',
		outcss: 'hide',
		bgoutcss: 'hide',
		str: '',
		url: '',
		mask: 1,
		type: 'btn',
		time: 0,
		title: '',
		at: 'body',
		of: '',
		close: 0,
		scroll: 'no',
		offset: '',
		color: '',
		bgcolor: '',
		icon: 0,
		icolor: '',
		wh: [],
		xy: [0,0],
		style: '',
		min: '',
		max: '',
		click: function(){}
	}, v),
	t = {
		init: function()
		{
			t.bo = a.bo.substr(1);
			t.main = a.main.substr(1);
			if(a.type=='loading'){
				a.close=0; a.type='bar'; a.mask=2; a.click='null';
			}
			if(a.type=='bar' && a.color=='') a.color='#fff';
			if(a.type=='tv' && a.close==0) a.close=4;
			if(a.type=='iframe' && a.close==0) a.close=2;
			if(a.title) a.type='';
			t.make(); t.view(); t.act();
			if(a.move) t.move($(a.bo).find('.T-Bd'));
			t.move($(a.bo).find('.T-Bd .T-Tit'));
			return t;
		},
		act: function(){
			var bo = $(a.bo),
				bc = bo.find('.close,.T-Close'),
				bg = bo.find('.T-Bg');
			t.obj  = bo;
			if(a.time>0) t.CloseTime = setTimeout(function(){t.close();}, a.time+700);
			setTimeout(function(){t.offset()}, 1);
			$(a.bo).find('.T-Bd').addClass(a.css);
			$(window).resize(function(){t.offset()});
			if($.IsIOS && a.position!='absolute'){
				$(window).scroll(function(){t.offset()});
			}
			if(a.click!='none'&&a.click!='null'){
				t.onclose(bg);
				$(document).on('keypress', function(e){    
				    var k=(e.keyCode ? e.keyCode : e.which);    
				    if(k=='13') bc.trigger('click');
				});
			}
			if(a.type=='img') t.onclose(bo);
			t.onclose(bc);
			if(typeof a.yes=='function') bo.find('.btnclose .yes').on('click', function(){a.yes()});
			if(typeof a.no=='function') bo.find('.btnclose .no').on('click', function(){a.no()});
			bo.find('.T-Con,.T-Tit,.btnclose,.T-Close,.T-Bg').I();
		},
		onclose: function(o){
			o.on('click',function(){
				t.close();
			});
		},
		str: function(str){
			$(a.bo).find('.T-Con > div').html(str);
			// t.act();
			return t;
		},
		view: function(){
			var cl='<div class="T-Close T-icon text-center ap pointer">&#xe6e9;</div>',
				ic=['','&#xe653;','&#xe6b1;','&#xe6b3;','&#xe6b6;','&#xe6b8;'],
				mi=a.min!='' ? ('<div class="T-Min">-</div>') : '',
				mx=a.max!='' ? ('<div class="T-Max">+</div>') : '',
				ht;
			ht = '' +
				(a.mask ? '<div class="T-Bg fp T-animate"></div>' : '') +
				'<div class="T-Bd fp T-animate">'
					+ mi + mx + cl +
					(a.type=='btn' ? '<div class="btnclose close ap text-center pointer">OK</div>' : '') +
					(a.type=='confirm' ? '<div class="btnclose tbox ap text-center">' : '') +
					(a.type=='confirm' ? '<a class="close tcell pointer yes">YES</a>' : '') +
					(a.type=='confirm' ? '<a class="close tcell pointer no">NO</a>' : '') +
					(a.type=='confirm' ? '</div>' : '') +
					(a.title ? '<div class="T-Tit rp">'+ a.title + mi + mx + cl + '</div>' : '') +
					'<div class="close fz0 hide"></div>' +
					'<div class="T-Bd-bg ap"></div>' +
					'<div class="T-Con rp">' +
						(a.icon ? '<div class="T-icon tipIcon">' + ic[a.icon] + '</div>':'' ) +
						(a.type=='iframe' || a.type=='tv'
						? '<iframe frameborder="0" src="' + a.url + '" scrolling="' + a.scroll + '"></iframe>'
						: '<div class="T-Msg rp">' + a.str + '</div>') +
					'</div>' +
				'</div>'
			;
			if(a.type=='img'){
				ht ='' +
					'<div class="T-Bg ap T-animate"></div>'  +
					'<div class="T-Bd fp T-animate m-Pic">'  +
						'<img src="' + a.url + '" /><b></b>' +
					'</div>'
				;
			}
			$(a.bo).html(ht);
			$(a.bo).find('.T-Bg').addClass('bg'+a.mask);
			$(a.bo).find('.T-Bd').addClass(a.type+(a.at!='body'?' isAp':'')+(a.title?' T-Tit':' NotT-Tit'));
			if(a.type=='bar'||a.type=='tip'||a.type=='btn'||a.type=='confirm'||a.title!='') a.close=0;
			else if(a.close==0) a.close=1;
			$(a.bo).find('.T-Close').addClass('c'+a.close);
			$(a.bo).find('.T-Min').addClass('c'+a.close);
			$(a.bo).find('.T-Msg, .close, .tip-icon, .T-Min').css({'color': a.color});
			if(a.bgcolor){
				$(a.bo).find('.T-Bd-bg').addClass('isbg');
				$(a.bo).find('.T-Bd-bg').css({'background': a.bgcolor});
			}
			if(a.icon){
				$(a.bo).find('.T-Con').addClass('T-Font T-Font'+a.icon);
			}
			$(a.bo).find('.T-Con').css({
				'width':    a.wh[0] ? a.wh[0] : '',
				'height':   a.wh[1] ? a.wh[1] : '',
				'overflow': a.scroll=='yes' ? 'auto' : (a.scroll=='no'&&a.type!='null' ? 'hidden' : '')
			});
		},
		offset: function(){
			a.wh[1] = parseInt(a.wh[1]);
			if((a.wh[1]=='auto' || !a.wh[1]) && a.type!='tv' && a.type!='iframe'){
				$(a.bo).find('.T-Con').css({height:'auto'});
			}
			var bd=$(a.bo).find('.T-Bd'),
				wW=parseInt($(window).width()),
				wH=parseInt($(window).height()),
				sT=document.body.scrollTop || document.documentElement.scrollTop,
				bw=parseInt(bd.outerWidth()),
				bh=parseInt(bd.outerHeight()),
				ht=parseInt(bd.find('.T-Tit').outerHeight()),
				hm=parseInt(bd.find('.T-Msg').outerHeight()),
				left,top;
			if(a.at!='body'){
				wW=$(a.at).outerWidth();
				wH=$(a.at).outerHeight();
			}
			hm=(a.wh[1]>hm||a.wh[1]<wH)&&a.wh[1]>0 ? a.wh[1] : hm;
			if(a.type!='tv'){
				bh = hm<=wH*0.94?hm:wH*0.94;
				bd.find('.T-Con').height(bh);
			}
			if(hm>bh) $(a.bo).find('.T-Con').css({'overflow':'auto'});
			top=wH*((wH/2.6>bh)?0.38:(wH/2>bh?0.46:0.5))-bh/2;
			left=wW/2-bw/2;
			if(a.top) top=a.top;
			if(a.left) left=a.left;
			if(a.bottom) top=wH-bh-ht-a.bottom;
			if(a.right) left=wW-bw-a.right;
			if(typeof a.xy=='object'){
				top+=a.xy[1]; left+=a.xy[0];
			}
			top=top<0?0:(top>(wH-bh)?(wH-bh):top);
			if(a.position=='absolute'||($.IsIOS&&a.type!='iframe'&&a.type!='tv'&&a.type!='img')){
				top=parseFloat(sT)+parseFloat(wH/2.5-bh/2);
				bd.css({'position':'absolute','max-height':''});
			}else{
				// $('input').blur();
			}
			bd.css({'top':top, 'left':left});
		},
		make: function(){
			$(a.at).append('<div class="'+t.main+' '+t.bo+'"></div>');
			if(a.type!='tv' && a.type!='iframe' && a.title==''){
				$(a.at).find(a.main+'.isAalert').attr({'isqiangzhi':'1'}).find('.close').click(); //将提示性弹窗去掉
				$(a.bo).addClass('isAalert');
			}
			if(a.type=='img') $(a.bo).find('.close').click();
		},
		move: function(obj){
			var bd=$(a.bo).find('.T-Bd'), x0, y0, x1, y1, t0, l0, left, top,
				w0, h0, w1, h1;
			obj.addClass('move notcopy').on('mousedown',function(e0){
				x0=e0.pageX;
				y0=e0.pageY;
				t0=parseInt(bd.css('top'));
				l0=parseInt(bd.css('left'));
				bd.addClass('notcopy');
				w0=$(window).width(), h0=$(window).height(), w1=bd.outerWidth(), h1=bd.outerHeight();
				if(a.at!='body'){
					w0=$(a.at).outerWidth();
					h0=$(a.at).outerHeight();
				}
				$(window).off('mousemove').on('mousemove', function(e1){
					x1=e1.pageX;
					y1=e1.pageY;
					left=l0+(x1-x0);
					top=t0+(y1-y0);
					if(left>0 && left<w0-w1) bd.css({left:left});
					if(top >0 && top <h0-h1) bd.css({top:top});
				}).on('mouseup', function(){
					$(this).off('mousemove');
					bd.removeClass('notcopy');
				});
			});
		},
		closeAll: function(){
			$(a.main).find('.justclose,.close').click();
		},
		close: function(){
			var q,
				bo = $(a.bo),
				bd = bo.find('.T-Bd'),
				bg = bo.find('.T-Bg');
			if(typeof t.CloseTime!='undefined') clearTimeout(t.CloseTime);
			if($.CSS3()){
				bd.addClass(a.outcss);
				bg.addClass(a.bgoutcss);
				setTimeout(function(){
					$(a.at).children(a.bo).remove();
				},400);
			}else{
				$(a.at).children(a.bo).remove();
			}
			bo.removeClass('isAalert');
			q = bo.attr('isqiangzhi');
			if(typeof a.end=='function' && q!='1') a.end(t);
		}
	};
	if(!v) return t;
	else return t.init();
},

/************************************************
CSS3 H5判断
************************************************/
CSS3:function(){
	var test=$("body")[0].style;
    if(typeof test.animation!="undefined"||typeof test.WebkitAnimation!="undefined") return 1;
    else return 0;
},
H5:function(){
	if(window.applicationCache) return 1;
    else return 0;
},
/************************************************
判断苹果手机
************************************************/
IsIOS:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
/**************************************************
移动设备判断
**************************************************/
Mobile:function(){
    var sUserAgent = navigator.userAgent.toLowerCase(),
    	bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
    	bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
    	bIsMidp = sUserAgent.match(/midp/i) == "midp",
    	bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
    	bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
    	bIsAndroid = sUserAgent.match(/android/i) == "android",
    	bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
    	bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
        return 0;//window.location.href=B页面;
    }else{
		return 1;
	}
}
});

$.fn.extend({
/************************************************
利用iframe实现普通表单提交，支持文件上传
$('form').F({
	url:'/',
	check:function(c, o){},
	end:function(data, f){}
});
************************************************/
F:function(v){
	var f = $.extend({
		obj: this,
		url: '',
		type: 'post',
		data: 'json',
		tip: {},
		issubmit: function(n){
			f.obj.attr('issubmit', n);
		},
		init: function(){
			f.obj.find('[submit]').on('click', function(e){
				$(this).parents('form').submit();
			});
			f.obj.find('[change-submit]').on('change', function(e){
				$(this).parents('form').submit();
			});
			f.obj.find('[reset]').on('click', function(e){
				$(this).parents('form')[0].reset();
			});
			f.obj.on('submit',function(){
				f.obj=$(this);
				var issubmit=f.obj.attr('issubmit'), c, c1;
				if(issubmit=='1') return false;	
				else f.issubmit(1);
				c = f.obj.C(f.tip);
				if(typeof f.check=='function') c1 = f.check(c, f);
				if(c || c1===false){
					f.issubmit(0); return false;
				}
				$('body').append(
					'<iframe src="about:blank" name="UFIframe" id="UFIframe" style="display:none;"></iframe>'
				);
				f.obj.attr({'target':'UFIframe','action':f.url,'method':f.type,'enctype':'multipart/form-data'});
				var iframe = $('#UFIframe')[0];
				if(iframe.attachEvent){
					iframe.attachEvent('onreadystatechange', function() {
						//此事件在内容没有被载入时候也会被触发，所以我们要判断状态
						//有时候会比较怪异 readyState状态会跳过 complete 所以我们loaded状态也要判断
						if (iframe.readyState==='complete' || iframe.readyState=='loaded') {
							//要清除掉事件
							iframe.detachEvent('onreadystatechange', arguments.callee);
							//这里是回调函数
							f.over(iframe.contentWindow.document.body.innerHTML);
						}
					});
				}else{
					iframe.addEventListener('load', function() {
						//代码能执行到这里说明已经载入成功完毕了
						this.removeEventListener('load', arguments.call, false);
						//这里是回调函数
						f.over(iframe.contentWindow.document.body.innerHTML);
					}, false);
				}
			});
			return false;
		},
		over: function(data){
			$('[name="UFIframe"]').remove();
			if(f.data=='json') data = $.parseJSON(data);
			if(typeof f.end=='function' && data) f.end(data, f);
		},
		reset: function(bool){
			if(bool) $(f.obj)[0].reset();
			else f.obj.find('input[type="text"],input[type="password"],input[check],textarea').val('');
		}
	}, v);
	f.init();
	return this;
},

/**************************************************
表单检查
$('form').C({});
**************************************************/
C:function(v){
	var check = [], v = v || {}, obj=this,
		email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
		mobile= /^1[0-9]{10}$/,
		phone = /^\d{7,8}$/;
	obj.find('[check]').each(function(i,e){
		var isgo, type, val, num, name,
		one = $(this),
		sty = one.attr('check'),
		val = one.val() || '',
		tip = one.attr('tip') && one.attr('tip').replace(/\{val\}/g, '"'+val+'"'),
		to  = one.attr('to') ? $('['+one.attr('to')+']') : '';
		if(sty){
			sty = sty.split('|');
			sty[0] = sty[0].split('-');
			sty[0].length>1 || sty[0].push(1);
			name = sty[1]||'';
			type = sty[0][0];
			num  = sty[0][1] = parseInt(sty[0][1]) || 1;
			if(type=='str')			isgo = val.length>=num || -1;
			else if(type=='email') 	isgo = email.test(val) || -1;
			else if(type=='mobile') isgo = mobile.test(val) || -1;
			else if(type=='phone') 	isgo = phone.test(val) || -1;
			else if(type=='pwd') 	isgo = val==obj.find('[name="'+name+'"]:last').val() || -1;
			else if(type=='tip') 	isgo = val.length>=num || -1;
			else if(type=='float') 	isgo = parseFloat(val)==val || -1;
			else if(type=='int') 	isgo = parseInt(val)==val || -1;
			if(one.attr('type')=='radio'||one.attr('type')=='checkbox'){
				isgo = $('[name="'+one.attr('name')+'"]:checked').length>=num || -1;
			}
			if(isgo==-1){
				check.push({'obj':one, 'tip':tip, 'to':to, 'type':type});
				to && to.html(tip).show();
			}
			if(one.attr('type')=='radio'||one.attr('type')=='checkbox'){
				one.parent().parent().on('click',function(){
					to && to.hide().html('');
				});
			}else{
				one.on('keyup',function(){
					to && to.hide().html('');
				});
			}
		}
	});
	if(check.length>0){
		v.of=check[0].obj;
		v.str=check[0].tip;
		if(check[0].to) check[0].to.html(check[0].tip);
		else $.T(v);
	}
	return check.length>0?check:0;
},

/**************************************************
数字累计(有待优化)
<div class="count-num" num-type="plus" num-start="0" num-end="1000" num-time="1000">0</div>
<div class="count-num" num-type="minus" num-start="0" num-end="1000" num-time="1000">1000</div>
$('.count-num').N({});
**************************************************/
N:function(v){
var a = $.extend({
		obj: this,
		multipleTime: 10,
		endTime: 10*1000,
		time: 1000,
		slpTime: '',
		over: 0
	}, v),
	g = {
		init:function(){
			if(a.obj.length<=0) return g;
			g.attr();
			a.obj.S({end:function(){}});
			g.num();
			a.slpTime=setInterval(g.num, a.multipleTime);

		},
		attr:function(){
			$(a.obj).each(function(i,e) {
                var s=parseInt($(this).attr('num-start')),
					e=parseInt($(this).attr('num-end')),
					t=parseInt($(this).attr('num-time'))||a.time;
				var multiple=Math.ceil(e/(t/a.multipleTime));
				$(this).attr({'num-multiple':multiple});
				if(a.maxTime<t) a.maxTime=t;
            });
		},
		num:function(){
			a.over=1;
			a.obj.each(function(i,e) {
                var o=$(this),
                	s=parseInt(o.attr('num-start'))||0,
					e=parseInt(o.attr('num-end'))||0,
					m=parseInt(o.attr('num-multiple'))||50,
					n=parseInt(o.html())||0,
					t=parseInt(o.attr('num-time')),
					run=o.attr('scDiv')||'',
					type=o.attr('num-type')||'plus'; //plus minus
				m=Math.floor(Math.random()*10)+(m>10?(m-10):0);
				if(type=='plus'&&run=='1'){
					var num=n+m;
					if(num>e){ num=e; }
					else a.over=0;
				}else if(type=='minus'&&run=='1'){
					var num=n-m;
					if(num<s){ num=s; }
					else a.over=0;
				}else{
					a.over=0;
					num=n;
				}
				o.html(num);
            });
			if(a.over){ clearInterval(a.slpTime); }
		}
	};
	g.init();
	return this;
},

/**************************************************
独自一人的滚动
$('.asd').I();
**************************************************/
I:function(){
var a = {
		obj: this,
		x: 0,
		y: 0
	},
	s = {
		i: function(){
			if(a.obj.length<=0) return 0;
			var $sj = $.Mobile()?'touchmove':'mousewheel';
			a.obj.on('touchstart',function(e){
				a.y = event.touches ? event.touches[0].clientY : 0;
			});
			a.obj.on($sj,function(){
				return s.m(event, this);
			});
		},
		m: function(event, scroller){
		    var k = event.wheelDelta? event.wheelDelta:-event.detail*10,
				y = event.touches ? event.touches[0].clientY : 0;
			k = k || y-a.y;
			a.y = y;
		    scroller.scrollTop = scroller.scrollTop - k;
		    return false;
		}
	}
	s.i();
	return this;
},

/**************************************************
日期下拉
<select name="RiQi[]"></select>
<select name="RiQi[]"></select>
<select name="RiQi[]"></select>
$('[name="RiQi[]"]').Date();
**************************************************/
Date:function(){
	var o=new Date('1900').format('yyyy'), n=new Date().format('yyyy'), y='', m='', d='', month,
		yy=this.eq(0), mm=this.eq(1), dd=this.eq(2), y3=yy.html(), m3=mm.html(), d3=dd.html();
	for(var i=o; i<=n; i++){
		y += '<option value="'+i+'" '+(y3==i?'selected':'')+'>'+i+'</option>';
	}
	for(var i=1; i<13; i++){
		m += '<option value="'+i+'" '+(m3==i?'selected':'')+'>'+i+'</option>';
	}
	for(var i=1; i<32; i++){
		d += '<option value="'+i+'" '+(d3==i?'selected':'')+'>'+i+'</option>';
	}
	yy.html(y).on('change', function(e){
		ymd();
	});
	mm.html(m).on('change', function(e){
		ymd();
	});
	dd.html(d);
	var ymd = function(){
		d=''; m3=mm.val(); y3=yy.val(); d3=dd.val();
		month=new Date(y3,m3,0).getDate();
		for(var i=1; i<=month; i++){
			d += '<option value="'+i+'" '+(d3==i?'selected':'')+'>'+i+'</option>';
		}
		dd.html(d);
	}
	return this;
},

/**************************************************
订单常用的数量选择器
<div class="q clean"><a minus></a><input type="text" name="Qty" min="1" max="10" value="1" /><a plus></a></div>
$('.q').Q();
**************************************************/
Q:function(v){
	return this.each(function(){
		var q = {
			m: $(this).find('[minus]'),
			p: $(this).find('[plus]'),
			i: $(this).find('input'),
			s: function(){
				q.min = parseInt(q.i.attr('min')) || 0;
				q.max = parseInt(q.i.attr('max')) || 0;
				q.m.addClass('notcopy').on('click', function(){
					q.n = parseInt(q.i.val());
					q.i.val(q.n>q.min?q.n-1:q.min).trigger('keyup');
				});
				q.p.addClass('notcopy').on('click', function(){
					q.n = parseInt(q.i.val());
					q.i.val(q.n<q.max?q.n+1:q.max).trigger('keyup');
				});
				q.i.on({
					keyup:function(e){
						q.n = parseInt(q.i.val()) || 0;
						q.i.val(q.n);
					},
					keydown:function(e){
						if(e.key.length==1 && /[a-zA-Z]/.test(e.key)) return false;
						q.n = parseInt(q.i.val()) || 0;
						q.r = parseInt(q.n.toString()+e.key);
						if(q.r>q.max){
							q.i.val(q.max);
							return false;
						}
						q.i.val(q.n<q.max?q.n:q.max);
					},
				});
			}
		}
		$.extend(q,v);
		q.s();
	})
},

/**************************************************
div滚动到可视区域
当标签属性 ‘scDiv="0"’时重置滚动响应 
$('.asd').S({top:10,end:function(){}});
**************************************************/
S:function(v){
var v = v || {},
	a = $.extend({
		obj: this,
		end: function(){},
		top: 0
	}, v),
	s = {
		i: function(){
			s.h();
			$(window).on("scroll", function(){s.h()});
		},
		h: function(){
			var h = $(window).height(),
				t = $(window).scrollTop();
			a.obj.each(function(){
				var fold = h + t,
					thsT = $(this).offset().top,
					thsS = $(this).attr('scDiv');
				if(fold >= thsT && thsS!='1'){
					$(this).attr({'scDiv':'1'});
					a.end(this);
				}
			});
		}
	}
	s.i();
	return this;
},

/**************************************************
加载分页
<div class="lsPro" load=".PAGEload" btn=".PAGEbtn">内容区域</div>
<div class="PAGEload hide"></div>
<div class="PAGEbtn" page="2" cate="<?=$CateId?>" url="/ajax/l.mobile.products.php"></div>
$('.lsPro').P({type:'scroll'}); //div滚动到可视区域,然后加载分页
$('.lsPro').P({type:'click'}); //点击,然后加载分页
**************************************************/
P:function(v){
	var a = $.extend({
			obj: this,
			type: ''
		}, v);
	btn = a.obj.attr('btn');
	if(a.type=='click'){
		btn.click(function(e){
			var e = this;
	    	a.obj.PAGEHtmlLoad(e);
	    });
	}else{
		btn.S({
			end:function(e){
	        	a.obj.PAGEHtmlLoad(e);
		    }
		});	
	}
	return this;
},
PAGEHtmlLoad:function(e){
    var e = $(e),
        u = e.attr('url')||'/default.html',
        p = e.attr('page'),
        c = e.attr('cate'),
        s = e.attr('sty'),
        k = e.attr('keyword'),
        z = $(this),
        load = z.attr('load');
    load.removeClass('n').slideDown();
    $.get(u, { page:p, CateId:c, sty:s, keyword:k }, function(data){
        if(data&&data!='1'){
            z.attr('page',parseInt(p)+1);
            z.append('<div class="clear"></div><div class="xPage-'+p+' clean hide">'+data+'</div>');
            setTimeout(function(){
                z.find('.xPage-'+p).slideDown(500);
                load.slideUp(500);
                e.attr({'scDiv':'0'}); // 初始化可视函数的判断属性
            },400);
        }else{
        	load.addClass('n').html('到尽头了');
        }
    }, 'html');
},

/**************************************************
短信验证码例子
$('div').SMS({url:'/ajax/w.sms.php', mobile:'', code:'sCode'});
返回json格式 ‘{r:0,t:100,m:'提示信息'}’ re是返回的状态， t是已经过去的秒数
**************************************************/
SMS:function(v){
	var m = /^(1+\d{10})$/,
		e = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
		setIntT='',
		obj = this,
		a = $.extend({
			time: 300,
			url: '/ajax/w.sms.php',
			mobile: '',
			email: '',
			type: 'mobile'
		}, v);
	if(a.type=='mobile' && !m.test(a.mobile)){
		$.T({str:'"'+a.mobile+'" is not a correct phone number!',mask:1});
		return false;
	}else if(a.type=='email' && !e.test(a.email)){
		$.T({str:'"'+a.email+'" is not a correct mailbox address!',mask:1});
		return false;
	}
	if(obj.attr('n')=='1'){
		return false;
	}
	obj.html('loading...');
	$.post(a.url, v, function(data){
		if(data){
			if(data.r==1 || data.r==-100){
				obj.attr({'t':data.r==-100?data.t:0, 'n':'1'});
				clearInterval(setIntT);
				setIntT=setInterval(function(){
					var t = parseInt(obj.attr('t'))||0;
					t++;
					var ht= a.time-t;
					if(ht<1){
						obj.attr({'t':'0', 'n':'0'}).html('Get the verifying code');
						clearInterval(setIntT);
					}
					else obj.html('Get back after '+ht+' seconds').attr('t',t);
				}, 1000);
			}else{
				obj.html('Please get it again');
				if(data.m) alert(data.m);
			}
		}else{
			obj.html('Please get it again');
			alert('Error!');
		}
	},'json');
	return this;
}
});


// 扩展格式化时间
Date.prototype.format=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };
    var week = {
    "0" : "日",
    "1" : "一",
    "2" : "二",
    "3" : "三",
    "4" : "四",
    "5" : "五",
    "6" : "六"        
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }
    return fmt;         
}