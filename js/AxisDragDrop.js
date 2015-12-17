AxisDragDrop.extend(DragDrop);

function AxisDragDrop(axis, target, listener) {
	
	this.axis = axis;
	this._super_constructor.call(this,target,listener);
}

AxisDragDrop.prototype.onMouseMove = function(e) {
	this.stopPropagation(e);

	var x = e.clientX - this.pRect.left - this.offsetX;

	var y = e.clientY - this.pRect.top - this.offsetY;

	if (this.axis === 'x') {
		this.setPosition(x);
	} else if (this.axis === "y") {
		this.setPosition(undefined, y);
	} else {
		this.setPosition(x, y);
	}
	this.x = x;
	this.y = y;
	if(this.listener && this.listener.onMouseMoveImp){
		this.listener.onMouseMoveImp(this,x,y)
	};
}