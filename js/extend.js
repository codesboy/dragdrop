
Function.prototype.extend = function(base){
	
	this.prototype = Object.create(base.prototype);
	this.prototype.constructor = this;
	this.prototype.CLASS_NAME = this.prototype.constructor.name;
	this.prototype._super = base.prototype
	this.prototype._super_constructor = base;
	
}
