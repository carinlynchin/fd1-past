(function($){var aux={navigate:function(dir,$el,$wrapper,opts,cache){var scroll=opts.scroll,factor=1,idxClicked=0;if(cache.expanded){scroll=1;factor=3;idxClicked=cache.idxClicked;}if(dir===1){$wrapper.find('div.ca-item:lt('+scroll+')').each(function(i){$(this).clone(true).css('left',(cache.totalItems-idxClicked+i)*cache.itemW*factor+'px').appendTo($wrapper);});}else{var $first=$wrapper.children().eq(0);$wrapper.find('div.ca-item:gt('+(cache.totalItems-1-scroll)+')').each(function(i){$(this).clone(true).css('left',-(scroll-i+idxClicked)*cache.itemW*factor+'px').insertBefore($first);});}$wrapper.find('div.ca-item').each(function(i){var $item=$(this);$item.stop().animate({left:(dir===1)?'-='+(cache.itemW*factor*scroll)+'px':'+='+(cache.itemW*factor*scroll)+'px'},opts.sliderSpeed,opts.sliderEasing,function(){if((dir===1&&$item.position().left<-idxClicked*cache.itemW*factor)||(dir===-1&&$item.position().left>((cache.totalItems-1-idxClicked)*cache.itemW*factor))){$item.remove();}cache.isAnimating=false;});});},getWinPos:function(val,cache){switch(val){case 0:return 1;break;case cache.itemW:return 2;break;case cache.itemW*2:return 3;break;}}},methods={init:function(options){if(this.length){var settings={sliderSpeed:500,sliderEasing:'easeInOutCubic',scroll:1};return this.each(function(){if(options){$.extend(settings,options);}var $el=$(this),$wrapper=$el.find('div.ca-wrapper'),$items=$wrapper.children('div.ca-item'),cache={};cache.itemW=$items.width();cache.totalItems=$items.length;$('.ca-wrapper').css('margin-left',-(cache.totalItems*cache.itemW/2))
if(settings.scroll<1)settings.scroll=1;else if(settings.scroll>3)settings.scroll=3;var $navPrev=$el.find('.prev-featured'),$navNext=$el.find('.next-featured');$items.each(function(i){$(this).css({position:'absolute',left:i*cache.itemW+'px'});});$navPrev.bind('click.contentcarousel',function(event){if(cache.isAnimating)return false;cache.isAnimating=true;aux.navigate(-1,$el,$wrapper,settings,cache);});$navNext.bind('click.contentcarousel',function(event){if(cache.isAnimating)return false;cache.isAnimating=true;aux.navigate(1,$el,$wrapper,settings,cache);});});}}};$.fn.contentcarousel=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.contentcarousel');}};})(jQuery);