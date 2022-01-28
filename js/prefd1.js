$(document).ready(function($) {

  var steps = $('.steps');
  
  // Timer for delay, must same as CSS!
  var stepsTimer = 200,
      stepsTimerL = 400;
  
  // remove mini between current
  steps.addClass('is-mini');
  steps.each(function(i) {
    var self = $(this);
    if (self.hasClass('is-current')) {
      self.removeClass('is-mini');
      self.prev().removeClass('is-mini');
      self.next().removeClass('is-mini');
    }
  });

  // Bounce Animation
  steps.addClass('is-circle-entering');
  
  // Delay for BounceIn
  setTimeout(function() {
    steps.each(function(i) {
      var self = $(this),
          timer = (stepsTimer * 2) * i;
      setTimeout(function() {
        // Line Flow
        self.addClass('is-line-entering');
        if(self.hasClass('is-current')) {
          // Title FadeIn
          steps.addClass('is-title-entering');
        }
      }, timer);
    });
  }, stepsTimer);

});