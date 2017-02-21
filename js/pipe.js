/*
* @Author: LL
* @Date:   2017-02-21 18:33:25
* @Last Modified by:   LL
* @Last Modified time: 2017-02-21 19:39:58
*/

(function(Fly){
	var Pipe = function(config){
		this.ctx = config.ctx;
		this.imgUp = config.imgUp;
		this.imgDown = config.imgDown;
		this.imgW = this.imgUp.width;
		this.imgH = this.imgUp.height;
		this.x = config.x;
		this.upY = 0;
		this.downY = 0;
		this.v = -0.2;
		this.Random();
	};
	Pipe.prototype = {
		constructor:Pipe,
		draw:function(delta){
			//绘制管道
			this.ctx.drawImage(this.imgUp, this.x, this.upY,this.imgW,this.imgH);
			this.ctx.drawImage(this.imgDown, this.x, this.downY,this.imgW,this.imgH);
			//绘制路径
			this.ctx.rect(this.x, this.upY, this.imgW, this.imgH);
			this.ctx.rect(this.x, this.downY, this.imgW, this.imgH);
			//位移公式
			this.x += this.v * delta;

			if(this.x <= -this.imgW) {
				this.x += this.imgW * 6 * 3;
				this.Random();
			}


		},
		Random:function(){
			var r = Math.random() * 200 + 50;
			this.upY = r - this.imgH;
			this.downY = r + 150;
		}


	};

	Fly.Pipe = Pipe;


})(Fly);