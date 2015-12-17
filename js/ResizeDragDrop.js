ResizeDragDrop.extend(DragDrop);

function ResizeDragDrop(type, target, listener,width,height) {
	this.type = type;
	this.width = 0;
	this.height = 0;
	this.minWidth = width||150;
	this.minHeight = height||150;
	this._super_constructor.call(this, target, listener);

}

ResizeDragDrop.prototype.onMouseMove = function(e) {
	this.stopPropagation(e);

	var target = this.target.parentNode;
	this.width = e.clientX - this.pRect.left + (this.mRect.width - this.offsetX);
	if (this.type === "scale") {

		this.height = this.width;


	} else {
		// free mode
		this.height = e.clientY - this.pRect.top + (this.mRect.height - this.offsetY);
	}

	target.style.width = this.width<this.minWidth?this.minWidth:this.width + "px";
	target.style.height = this.height<this.minHeight?this.minHeight:this.height + "px";

	if (this.listener && this.listener.onResize) {
		this.listener.onResize(this.width, this.height);
	}
}