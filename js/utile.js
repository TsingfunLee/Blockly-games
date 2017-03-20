'use strict';

goog.provide('App.util');

goog.require('App');

App.util.clamp = function(min, val, max) {
	if(val < min){
		val = min;
	}else if(val > max){
		val = max;
	}
	
	return val;
};
