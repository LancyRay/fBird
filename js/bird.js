/*
* @Author: LL
* @Date:   2017-02-21 16:39:48
* @Last Modified by:   LL
* @Last Modified time: 2017-02-21 20:30:12
*/

(function(Fly){
	var Bird = function(config){
		this.ctx=config.ctx;
		 this.a = 0.0005;
		 this.x = 100;
         this.y = 100;
         this.v = 0;
         this.index = 0;
         this.img = config.img;
         this.imgW = this.img.width / 3;
         this.imgH = this.img.height;
	}
	Bird.prototype = {
		constructor:Bird,
		draw:function(delta){
			var deg = this.v / 0.3 * 45;
			if(deg > 45){
				deg = 45;
			}else if (deg< -45) {
				deg = -45;
			}
			this.ctx.translate(this.x, this.y);
			this.ctx.rotate(Fly.toRadian(deg));
            //瞬时速度
            this.v = this.v + this.a * delta;
            //位移(路程)
            //Math.pow(x,y); 返回x 的 y 次方
            this.y += this.v * delta + 1/2 * this.a * Math.pow(delta , 2);

            this.ctx.drawImage(this.img, this.imgW * this.index++, 0, this.imgW, this.imgH, -this.imgW/2, -this.imgH/2, this.imgW, this.imgH);
            this.index %= 3;
		},

	}
	Fly.Bird = Bird;
})(Fly);