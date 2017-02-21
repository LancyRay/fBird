/*
* @Author: LL
* @Date:   2017-02-21 19:41:02
* @Last Modified by:   LL
* @Last Modified time: 2017-02-21 20:51:11
*/

(function(Fly){
	var Game = function(id){
		this.obj=Fly.createCv(id);
		this.cv = this.obj.cv;
		this.btn = this.obj.btn;
		this.ctx=this.cv.getContext("2d");
		this.bird=null;
		this.isStart = true;
		//上一帧的时间
        this.lastFrameTime = new Date;
        this.curFrameTime = 0;
        this.imgArr = ['birds' , 'land' , 'pipe1' , 'pipe2' , 'sky'];
        this.roleList = [];

	}
	Game.prototype = {
		constructor:Game,
		//初始化
		init:function(imgList){	
        	//创建天空
        	for(var i=0; i < 2;i++){
        		var sky = new Fly.Sky({
	        		ctx:this.ctx,
	        		img:imgList["sky"],
	        		x:imgList["sky"].width * i
	        	});
	        	this.roleList.push(sky);
        	}
        	
        	//创建管道对象
        	for(var i = 0; i < 6; i++) {
        		var pipe = new Fly.Pipe({
        			ctx:this.ctx,
        			imgUp:imgList["pipe2"],
        			imgDown:imgList["pipe1"],
        			x:imgList["pipe1"].width*3 * i+300
        		});
        		this.roleList.push(pipe);
        	}
        	//创建陆地
        	for(var i =0; i < 4;i++){
        		var land = new Fly.Land({
        			ctx:this.ctx,
        			img:imgList["land"],
        			x:imgList["land"].width * i,
        			y:this.cv.height - imgList["land"].height
        		});
        		this.roleList.push(land);
        	}
        	//创建小鸟对象
        	
        	 this.bird = new Fly.Bird({
        	 	ctx:this.ctx,
        	 	img:imgList["birds"]
        	 });
		},
		//开始游戏
		gameStart:function(){
			var that=this;
			Fly.loadImgs(this.imgArr, function( imgList ){
				that.init(imgList);
				that.draw(imgList);
				that.bandEvent(that.cv);
			})
		},
		//结束游戏
		gameOver:function(){
			this.isStart = false;

		},
		//渲染
		draw:function(imgList){
			var that=this;
			(function render(){
    			//当前的时间
                that.curFrameTime = new Date;
                //两帧的时间间隔
                var delta = that.curFrameTime - that.lastFrameTime;
                //需修改上一帧的时间，才能够保证每一次的间隔保持在 60HZ 左右
                that.lastFrameTime = that.curFrameTime;

    			that.ctx.save();
    			that.ctx.beginPath();
    			that.ctx.clearRect(0, 0, that.cv.width, that.cv.height);
    			
    			//绘制
    			that.roleList.forEach(function(role){
    				role.draw(delta);
    			})
    			//绘制小鸟对象
    			that.bird.draw(delta);

    			//检测碰撞
    			if(that.bird.y < 0 || that.bird.y > that.cv.height - imgList["land"].height || that.ctx.isPointInPath(that.bird.x+10, that.bird.y+10)) {
    				that.isStart = false;
    			}
    			
                that.ctx.restore();
                if(that.isStart){
                	 window.requestAnimationFrame( render );
                }else{
                	that.btn.style.display = 'block';
                }
               
    		})();
		},
		//绑定
		bandEvent:function(d){
			var that=this;
			//给canvas绑定单击事件
            that.cv.addEventListener('click', function(){
                //修改小鸟速度为：负值，即可
                that.bird.v = -0.3;
            });

            that.btn.addEventListener('click', function(){
            	document.querySelector('#cv').innerHTML = '<button></button>';
            	var game = new Fly.Game('cv');
       	 		game.gameStart();
            })
		}
	}
	Fly.Game = Game;
})(Fly);