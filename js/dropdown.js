//Author: Sako Hartounian

//Markets Link
$("#markets-link").hover(function(){
  window.jQuery("#markets-dropdown").removeClass("hidden");
},function(){
  window.jQuery("#markets-dropdown").addClass("hidden");
});

//Productions Link
$("#productions-link").hover(function(){
  window.jQuery("#productions-dropdown").removeClass("hidden");
},function(){
  window.jQuery("#productions-dropdown").addClass("hidden");
});
