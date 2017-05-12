//圆点上升
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

//文字打印
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
// 修正FF浏览器兼容
function getOffset(e) {
    var target = e.target;
    if (target.offsetLeft == undefined) {
        target = target.parentNode;
    }
    var pageCoord = getPageCoord(target);
    var eventCoord = {
        x: window.pageXOffset + e.clientX,
        y: window.pageYOffset + e.clientY
    };
    var offset = {
        offsetX: eventCoord.x - pageCoord.x,
        offsetY: eventCoord.y - pageCoord.y
    };
    return offset;
}

function getPageCoord(element) {
    var coord = {
        x: 0,
        y: 0
    };
    while (element) {
        coord.x += element.offsetLeft;
        coord.y += element.offsetTop;
        element = element.offsetParent;
    }
    return coord;
}

$(document).ready(function(){
	
	$(".multi-hover").hover(function(e){
		
		var _this  = $(this), //闭包
		_desc  = _this.find(".desc").stop(true),
		width  = _this.width(), //取得元素宽
		height = _this.height(), //取得元素高
		left   = (e.offsetX == undefined) ? getOffset(e).offsetX : e.offsetX, //从鼠标位置，得到左边界，利用修正ff兼容的方法
		top    = (e.offsetY == undefined) ? getOffset(e).offsetY : e.offsetY, //得到上边界
		right  = width - left, //计算出右边界
		bottom = height - top, //计算出下边界
		rect   = {}, //坐标对象，用于执行对应方法。
		_min   = Math.min(left, top, right, bottom), //得到最小值
		_out   = e.type == "mouseleave", //是否是离开事件
		spos   = {}; //起始位置
	
		rect[left] = function (epos){ //鼠从标左侧进入和离开事件
			spos = {"left": -width, "top": 0};
			if(_out){
				_desc.animate(spos, "fast"); //从左侧离开
			}else{
				_desc.css(spos).animate(epos, "fast"); //从左侧进入
			}
		};
	
		rect[top] = function (epos) { //鼠从标上边界进入和离开事件
			spos = {"top": -height, "left": 0};
			if(_out){
				_desc.animate(spos, "fast"); //从上面离开
			}else{
				_desc.css(spos).animate(epos, "fast"); //从上面进入
			}
		};
	
		rect[right] = function (epos){ //鼠从标右侧进入和离开事件
			spos = {"left": left,"top": 0};
			if(_out){
				_desc.animate(spos, "fast"); //从右侧成离开
			}else{
				_desc.css(spos).animate(epos, "fast"); //从右侧进入
			}
		};
	
		rect[bottom] = function (epos){ //鼠从标下边界进入和离开事件
			spos = {"top": height, "left": 0};
			if(_out){
				_desc.animate(spos, "fast"); //从底部离开
			}else{
				_desc.css(spos).animate(epos, "fast"); //从底部进入
			}
		};
	
		rect[_min]({"left":0, "top":0}); // 执行对应边界 进入/离开 的方法
	
	});

});