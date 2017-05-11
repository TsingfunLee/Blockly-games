var cipher = function() {
  function e(a, d, b) {
    var c, f, g, h;
    b == a.length ? k.animationComplete = !0 : (g = d.innerHTML, h = Math.floor(21 * Math.random() + 5), c = 32 === a[b] ? 32 : a[b] - h, f = setInterval(function() {
      d.innerHTML = g + String.fromCharCode(c);
      c == a[b] ? (clearInterval(f), c = 32, b++, setTimeout(function() {
        e(a, d, b);
      }, 200)) : c++;
    }, 5));
  }
  var k = {};
  return k = {animationComplete:!1, text:function(a) {
    this.animationComplete = !1;
    a = document.getElementById(a);
    for (var d = a.innerHTML, b = [], c = 0;c < d.length;c++) {
      b.push(d.charCodeAt(c));
    }
    a.innerHTML = "";
    e(b, a, 0);
  }};
}();


$( 'document' ).ready(function() {
  
  // Hide header
  $( '.header' ).hide();
  // Transition background
  $( '.cont_top' ).ready(function() {

  // Timeout for crypto text
  setTimeout( function() { 
    $( '.header' ).fadeIn( 'slow' );
      cipher.text( 'op' );
  }, 0);    
    
    
  });
   
});


jQuery(document).ready(function($){
 
    // Define a blank array for the effect positions. This will be populated based on width of the title.
    var bArray = [];
    // Define a size array, this will be used to vary bubble sizes
    var sArray = [1,3,5,10,12,14];
 
    // Push the header width values to bArray
    for (var i = 0; i < $('.cont_top').width(); i++) {
        bArray.push(i);
    }
     
    // Function to select random array element
    // Used within the setInterval a few times
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
 
    // setInterval function used to create new bubble every 350 milliseconds
    setInterval(function(){
         
        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray);
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.cont_top').append('<div class="individual-header" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
         
        // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
        // Callback function used to remove finsihed animations from the page
        $('.individual-header').animate({
            'bottom': '100%',
            'opacity' : '-=0.5'
        }, 1500, function(){
            $(this).remove()
        }
        );
 
 
    }, 200);
 
});
//图片hover
function is_touch_device() {
  return !!('ontouchstart' in window) 
      || !!('onmsgesturechange' in window); 
};

$(document).ready(function() {
  if (is_touch_device()) {
    $('span').unbind('mousenter mouseleave touchend touchstart');
    $('span').bind('touchstart', function() {
      $('span').removeClass('hover');
      $(this).addClass('hover');
    });
  }
});