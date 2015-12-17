var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息                                 
			trident: u.indexOf('Trident') > -1, //IE内核                                 
			presto: u.indexOf('Presto') > -1, //opera内核                                 
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                                 
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                                
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端                                 
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                 
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                                 
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                    
			iPad: u.indexOf('iPad') > -1, //是否iPad       
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			google: u.indexOf('Chrome') > -1
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


function DragDrop(target, listener, moveObj) {
	this.mouseX = 0;
	this.mouseY = 0;
	// mouseX - X
	this.offsetX = 0;
	// mouseY - Y
	this.offsetY = 0;
	// left 
	this.x = 0;
	// top
	this.y = 0;
	this.listener = listener;
	this.target = target;
	this.moveObj = moveObj;
	this.mRect = null;
	this.pRect = null;


	var that = this;
	this._onMousedDown = function(e) {
		that.onMouseDown(e);
	}
	this._onMouseMove = function(e) {
		that.onMouseMove(e);
	}
	this._onMouseUp = function(e) {
		that.onMouseUp(e);
	}


	this.init();
}
DragDrop.prototype.init = function() {
	if (!this.moveObj) this.moveObj = this.target;

	if (!this.target instanceof Element) {
		throw new Error("this.target must instance of Element");
	}

	this.target.addEventListener("mousedown", this._onMousedDown, false);

}
DragDrop.prototype.onMouseMove = function(e) {
	this.stopPropagation(e);
	this.x = e.clientX - this.pRect.left - this.offsetX;
	this.y = e.clientY - this.pRect.top - this.offsetY;


	this.setPosition(this.x, this.y);

	if (this.listener && this.listener.onMouseMoveImp) {
		this.listener.onMouseMoveImp(this)
	}

}
DragDrop.prototype.onMouseDown = function(e) {
	this.stopPropagation(e);

	this.target.removeEventListener("mousedown", this._onMousedDown, false);
	document.addEventListener("mousemove", this._onMouseMove, false);
	document.addEventListener("mouseup", this._onMouseUp, false);
	this.mouseX = e.clientX;
	this.mouseY = e.clientY;

	this.mRect = this.moveObj.getBoundingClientRect();
	this.pRect = this.moveObj.parentNode.tagName === "BODY" ? {
		width: window.innerWidth,
		height: window.innerHeight,
		left: 0,
		top: 0
	} : this.moveObj.parentNode.getBoundingClientRect();

	this.offsetX = e.clientX - this.mRect.left;
	this.offsetY = e.clientY - this.mRect.top;
	this.x = e.clientX - this.pRect.left - this.offsetX;
	this.y = e.clientY - this.pRect.top - this.offsetY;

	if (this.listener && this.listener.onMouseDownImp) {
		this.listener.onMouseDownImp(this, x, y)
	}

}
DragDrop.prototype.onMouseUp = function(e) {
	this.stopPropagation(e);
	this.target.addEventListener("mousedown", this._onMousedDown, false);
	document.removeEventListener("mousemove", this._onMouseMove, false);
	document.removeEventListener("mouseup", this._onMouseUp, false);

	if (this.listener && this.listener.onMouseUpImp) {
		this.listener.onMouseUpImp(this, x, y)
	}
}

DragDrop.prototype.setPosition = function(x, y) {

	if (typeof x !== "undefined")
		this.moveObj.style.left = x + "px";
	if (typeof y !== "undefined")
		this.moveObj.style.top = y + "px";
}

DragDrop.prototype.stopPropagation = function(e) {
	e.preventDefault();
	e.stopPropagation();
}