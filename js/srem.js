

/**************************************************
设定字体rem比例
**************************************************/
!function($){
	function SetFontRem(){
		var maxW=500, winW=$(window).width();
		var _w=winW>=maxW?maxW:winW;
		var fontPercent=winW>=maxW?50:_w/10;//16px;
		$('html').css('font-size',fontPercent);
	}
	SetFontRem();
	$(window).on('resize',function(){SetFontRem()});
}(jQuery);
