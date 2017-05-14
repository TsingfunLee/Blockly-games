var Lang = {};

Lang.LANGUAGE_NAME = {
	'zh' : '中文',
	'en' : 'English'
}

Lang.getStringParamFromUrl = function(name, defaultValue) {
	var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
	return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
	
};

Lang.getLang = function() {
	var lang = Lang.getStringParamFromUrl('lang', 'zh');
	if(Lang.LANGUAGE_NAME[lang] === undefined) {
		// Default to Chinese.
		lang = 'zh';
	}
	return lang;
}

Lang.LANG = Lang.getLang();


Lang.changeLanguage = function() {
	var languageMenu = document.getElementById('languageMenu');
	
	var newLang = encodeURIComponent(
		languageMenu.options[languageMenu.selectedIndex].value);

	var search = '?lang=' + newLang;

	console.log('asdfasfdsdf')

	window.location = window.location.protocol + '//' +
		window.location.host + window.location.pathname + search;
}

Lang.initLanguage = function() {
	// Set the HTML's language.
	document.head.parentElement.setAttribute('lang', Lang.LANG);
	// Sort languages alphabetically.
	var languages = [];
	for(var lang in Lang.LANGUAGE_NAME) {
		languages.push([Lang.LANGUAGE_NAME[lang], lang]);
	}

	// Populate the language selection menu.
	var languageMenu = document.getElementById('languageMenu');
	languageMenu.options.length = 0;
	for(var i = 0; i < languages.length; i++) {
		var tuple = languages[i];
		var lang = tuple[tuple.length - 1];
		var option = new Option(tuple[0], lang);
		if(lang == Lang.LANG) {
			option.selected = true;
		}
		languageMenu.options.add(option);
	}
	languageMenu.addEventListener('change', Lang.changeLanguage, true);

	// Inject language strings.
    var pathname = window.location.pathname;
    console.log(pathname)
    var reg1 = new RegExp("index","");
    var reg2 = new RegExp("Selectgame","");
    var reg3 = new RegExp("aboutus","");
    console.log(reg1);
    console.log(reg2);
    console.log(reg3);
    document.getElementById('html_index').textContent = INMSG['index'];
    document.getElementById('html_game').textContent = INMSG['selegame'];
	document.getElementById('html_about').textContent = INMSG['about'];
    if(reg1.exec(pathname)){
		document.getElementById('char1').textContent = INMSG['char1'];
		document.getElementById('char2').textContent = INMSG['char2'];
		document.getElementById('char3').textContent = INMSG['char3'];
		document.getElementById('senten1').textContent = INMSG['senten1'];
		document.getElementById('senten2').textContent = INMSG['senten2'];
		document.getElementById('senten3').textContent = INMSG['senten3'];
		document.getElementById('senten4').textContent = INMSG['senten4'];
		document.getElementById('game_01').textContent = INMSG['game_01'];
		document.getElementById('game_02').textContent = INMSG['game_02'];
		document.getElementById('game_03').textContent = INMSG['game_03'];
		document.getElementById('game_01_1').textContent = INMSG['game_01_1'];
		document.getElementById('game_01_2').textContent = INMSG['game_01_2'];
		document.getElementById('game_02_1').textContent = INMSG['game_02_1'];
		document.getElementById('game_03_1').textContent = INMSG['game_03_1'];
	}
    if(reg2.exec(pathname)){
		console.log('游戏选择页面');
		document.getElementById('text_1').textContent = SEMSG['text_1'];
		document.getElementById('game01').textContent = SEMSG['game02'];
		document.getElementById('game02').textContent = SEMSG['game01'];
		document.getElementById('game03').textContent = SEMSG['game03'];
	}
    if(reg3.exec(pathname)){
		document.getElementById('op').textContent = ABMSG['title'];
		document.getElementById('box1_1').textContent = ABMSG['box1_1'];
		document.getElementById('box1_2').textContent = ABMSG['box1_2'];
		document.getElementById('box1_3').textContent = ABMSG['box1_3'];
		document.getElementById('box1_4').textContent = ABMSG['box1_4'];
		document.getElementById('box1_5').textContent = ABMSG['box1_5'];
		document.getElementById('box1_6').textContent = ABMSG['box1_6'];
		document.getElementById('box1_7').textContent = ABMSG['box1_7'];
		document.getElementById('box1_8').textContent = ABMSG['box1_8'];
		document.getElementsByClassName('memname1')[0].textContent = ABMSG['memname1'];
		document.getElementsByClassName('memname2')[0].textContent = ABMSG['memname2'];
		document.getElementsByClassName('memname3')[0].textContent = ABMSG['memname3'];
		document.getElementsByClassName('memname4')[0].textContent = ABMSG['memname4'];
		document.getElementById('pa1_1').textContent = ABMSG['pa1_1'];
		document.getElementById('pa1_2').textContent = ABMSG['pa1_2'];
		document.getElementById('pa1_3').textContent = ABMSG['pa1_3'];
		document.getElementById('pa2_1').textContent = ABMSG['pa2_1'];
		document.getElementById('pa2_2').textContent = ABMSG['pa2_2'];
		document.getElementById('pa2_3').textContent = ABMSG['pa2_3'];
		document.getElementById('pa3_1').textContent = ABMSG['pa3_1'];
		document.getElementById('pa3_2').textContent = ABMSG['pa3_2'];
		document.getElementById('pa3_3').textContent = ABMSG['pa3_3'];
		document.getElementById('pa4_1').textContent = ABMSG['pa4_1'];
		document.getElementById('pa4_2').textContent = ABMSG['pa4_2'];
		document.getElementById('pa4_3').textContent = ABMSG['pa4_3'];
		
		document.getElementById('contact').textContent = ABMSG['contact'];
		document.getElementById('name').placeholder = ABMSG['name'];
		document.getElementById('email').placeholder = ABMSG['email'];
		document.getElementById('message').placeholder = ABMSG['message'];
		document.getElementById('submitbtn').value = ABMSG['submitbtn'];
	}
	
};

document.write('<script src="msg/index_' + Lang.LANG + '.js"></script>');
document.write('<script src="msg/select_' + Lang.LANG + '.js"></script>');
document.write('<script src="msg/about_' + Lang.LANG + '.js"></script>');
window.addEventListener('load', Lang.initLanguage);