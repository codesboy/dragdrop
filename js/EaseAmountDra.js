
EaseAmountDrag.extend(DragDrop);
function EaseAmountDrag(target){
	this._super_constructor.call(this,target);
	
	this.easeAmount =0.5
	
	this.originX=0;
	this.originY=0;
	
	this.moveDistanceX =0;
	this.moveDistanceY =0;
	
	this.direction =-1 // -1 or 1  up or down
	
	this.directionY =0;
	
	this.wrapper= this.target.parentNode;
	
	this.overflowSize =this.wrapper.scrollHeight - this.wrapper.clientHeight;
	
	this.lastMouseDownTime= 0;
	
	
	// this.x = this.originX + this.moveDistanceX;
}

EaseAmountDrag.prototype.onMouseDown=function(e){
	this._super.onMouseDown.call(this,e);
	this.originX = this.x;
	this.originY = this.y;
	this.directionY = this.y;
	this.target.style.webkitTransition=undefined;
	
	this.lastMouseDownTime = Date.now();
}


EaseAmountDrag.prototype.onMouseMove=function(e){
	this.moveDistanceX = e.clientX - this.mouseX;
	this.moveDistanceY = e.clientY - this.mouseY;
	
	this.moveDistanceX *= this.easeAmount;
	this.moveDistanceY *= this.easeAmount;
	
	//this.x = this.originX + this.moveDistanceX;
	this.y = this.originY + this.moveDistanceY;
	// 简单的判断下滑动方向
	if(this.y- this.directionY<0){
		this.direction ="up";
	}else {
		this.direction ="down";
	}
	
	this.directionY = this.y;
	this.setPosition(undefined,this.y);	
}


EaseAmountDrag.prototype.onMouseUp=function(e){
	this._super.onMouseUp.call(this,e);
	this.target.style.webkitTransition="-webkit-transform 500ms";
	// 垃圾代码 开始
	var time = Date.now()- this.lastMouseDownTime;
	var timeDistance = Math.abs(this.y- this.originY );
	var td = timeDistance / (time/500);
	// 垃圾代码结束
	console.log(td);
	
	
	if(this.direction ==="up"){
	
		this.y -=td;
		
		var distance = this.overflowSize + this.y;
		
		if(distance <= 0){
			this.y = -this.overflowSize;
		}
		
	
	}else {
		this.y+=td;
		if(this.y>=0){
			this.y=0;
		}
	
	}
	
	
	
	
		this.setPosition(undefined,this.y);
	
}

EaseAmountDrag.prototype.setPosition=function(a,y){
	this.target.style.webkitTransform='translateY('+y+'px)';
}
