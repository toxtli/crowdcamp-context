function getConfigFile(callback) {
	chrome.storage.local.get(['config'],(conf)=>{
		if (!conf.hasOwnProperty('config')) {
			conf.config = {'attributes':[{
				'attribute_name': 'font',
				'attribute_current': 1,
				'attribute_proposed': null,
				'is_confirmed': true
			}]};
			chrome.storage.local.set({config:conf.config});
		}
		callback(conf.config);
	});
}

function setConfigFile(config) {
	chrome.storage.local.set({config:config});
}

function yourFunction(zoom) {
	getConfigFile((config=>{
		console.log(config);
		for (var attribute of config.attributes) {
			if (attribute.attribute_name == 'font') {
				attribute.attribute_proposed = 1 - zoom;
				attribute.is_confirmed = false;
			}
		}
		setConfigFile(config);
		console.log(config);
	}));
	console.log(zoom);
}

var startWidth = document.body.offsetWidth;
var currentWidth = startWidth;
setInterval(()=>{
	var newWidth = document.body.offsetWidth;
	if (newWidth != currentWidth) {
		currentWidth = newWidth;
		var deltaWidth = startWidth - newWidth;
		var zoomRate = deltaWidth/startWidth;
		if (zoomRate != 0) {
			yourFunction(zoomRate);
		}
	}
},1000);
