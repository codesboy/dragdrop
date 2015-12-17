
RangDragDrop.extend(DragDrop);
function RangDragDrop(type, target, listener) {
	
	this.type = type;
	this._super_constructor.call(this, target, listener);
}

RangDragDrop.prototype.onMouseMove = function(e) {
	this.stopPropagation(e);
	var x = e.clientX - this.pRect.left - this.offsetX;
	var y = e.clientY - this.pRect.top - this.offsetY;

	var maxWidth, maxHeight;

	if (this.type === "x") {
		x = this.limitX(x);
	} else if (this.type === "y") {
		y = this.limitY(y);
	} else {
		x = this.limitX(x);
		y = this.limitY(y);
	}
	
	
	this.x = x;
	this.y = y;
	this.setPosition(x, y);


   if(this.listener && this.listener.onMouseMoveImp){
   		this.listener.onMouseMoveImp(this,x,y);
   }
}

RangDragDrop.prototype.limitX = function(x) {
	var maxWidth;

	maxWidth = this.pRect.width - this.mRect.width;
	x = x <= 0 ? 0 : x;
	x = x >= maxWidth ? maxWidth : x;

	return x;

}

RangDragDrop.prototype.limitY = function(y) {
	var maxHeight;
	maxHeight = this.pRect.height - this.mRect.height;
	y = y <= 0 ? 0 : y;
	y = y >= maxHeight ? maxHeight : y;
	return y;
}


