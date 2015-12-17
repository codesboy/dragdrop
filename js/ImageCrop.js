function ImageCrop(listener) {
	this.canvasX = 0;
	this.canvasY = 0;
	this.sx =0;
	this.sy =0;
	this.sw = 0;
	this.sh = 0;
	this.view = null;
	this.data = null;
	this.listener = listener;
	this.canvas = null;
	var that = this;
	this._onSelect = function(e) {
		that.onSelect(this);
	}
	this._onCrop = function(e) {
		that.onCrop(e);
	}


	this.init();
}

ImageCrop.prototype.getViewRes = function() {

	return "<div class='ImageCrop'>" + "<div class='ImageCrop-area'>"

	+"<canvas class='ImageCrop-canvas'></canvas>" + "<div class='ImageCrop-drop'>" + "<div class='ImageCrop-drop-scale'>" + "</div>" + "</div>" + "</div>" + "<div class='ImageCrop-action-bar'>" + "<input type='button' value='选择图片' class='file-select'/>" + "<input type='file' class='file-hide'/>" + "<input type='button' value='裁剪' class='crop'/>" + "<input type='button' value='上传'class='upload' />" + "</div>" + "<div class='ImageCrop-zoom-bar'><b class='slider-block'></b>" + "</div>" + "<div class='ImageCrop-close'></div>" + "</div>";
}

ImageCrop.prototype.init = function() {

	this.view = $(this.getViewRes());
	
	this.canvas = this.view.find("canvas");

	var fileSelect = this.view.find(".file-select");

	var fileHide = fileSelect.next();

	var crop = fileHide.next();

	var upload = crop.next();

	fileSelect.on("click", function() {
		fileHide.trigger("click");
	});

	fileHide.on("change", this._onSelect);
	
	var canvas = this.view.find("canvas");
	
	this.dragImage=new DragDrop(canvas.get(0));
	this.dragCrop =new RangDragDrop("xy", this.view.find(".ImageCrop-drop").get(0));
	this.dragScale=	new ResizeDragDrop("scale", this.view.find(".ImageCrop-drop-scale").get(0));


	crop.on("click",this._onCrop);
	
	var block = this.view.find(".slider-block");
	this.slider=new RangDragDrop('xy',block.get(0),this);


}

ImageCrop.prototype.onCrop = function() {
	var canvas = this.view.find("canvas").get(0);
	var data = canvas .toDataURL("png");
	console.log(data);
}
ImageCrop.prototype.onMouseMoveImp=function(slider){
	var zoomIn = (slider.x/140) *100
	this.dragImage.target.width =  this.dragImage.mRect.width+ zoomIn *5;
	this.dragImage.target.height = this.dragImage.mRect.height+ zoomIn*5;
}

ImageCrop.prototype.onSelect = function(select) {
	this.value = "";
	var that = this;
	var file = new FileReader();

	file.readAsDataURL(select.files[0]);

	file.onload = function(e) {

		var data = e.target.result;

		var image = new Image();

		image.src = data;
		file = null;


		var canvas = that.view.find("canvas");
		var ctx = canvas.get(0).getContext("2d");
		canvas.attr("width", image.width).attr("height", image.height);
		ctx.drawImage(image, 0, 0, image.width, image.height);
		
		that.slider.target.style.top=0;

		image = null;

		




	}

}