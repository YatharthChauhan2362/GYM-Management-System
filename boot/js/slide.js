$(document).ready(function(){
$('.bxslider').bxSlider({
  auto: true,
  autoControls: true,
  adaptiveHeight: true,
mode: 'horizontal',
  useCSS: false,
  infiniteLoop: true,
  hideControlOnEnd: false,
  easing: 'easeOutElastic',
  speed: 2000
  /* if dont like the effect and want simple fade effect add mode: fade, and delete mode: 'horizontal',
  useCSS: false,
  infiniteLoop: false,
  hideControlOnEnd: true,
  easing: 'easeOutElastic',
  speed: 2000*/
 
});

});