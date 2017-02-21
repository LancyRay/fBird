/*
* @Author: LL
* @Date:   2017-02-21 17:02:38
* @Last Modified by:   LL
* @Last Modified time: 2017-02-21 18:24:49
*/

(function(Fly){
	var Land = function(config){
		this.ctx = config.ctx;
		this.img = config.img;
		this.imgW = this.img.width;
		this.imgH = this.img.height;
        this.x = config.x;
        this.y = config.y;

        this.speed = -0.2;
	};
	Land.prototype = {
		constructor:Land,
		draw:function(delta){
			this.ctx.drawImage(this.img, this.x, this.y,this.imgW,this.imgH);
			if(this.x <= -this.imgW) {
				this.x += this.imgW * 4;
			}
			this.x += this.speed * delta;
		},
		
	}
	Fly.Land = Land;
})(Fly);