/*
* @Author: LL
* @Date:   2017-02-21 18:10:59
* @Last Modified by:   LL
* @Last Modified time: 2017-02-21 20:45:26
*/

(function(window){
	var FlyObj = {};

	// 角度转弧度：web1120@sh.itcast.cn  ,583647
    FlyObj.toRadian = function( angle ) {
        return angle / 180 * Math.PI;
    };
    
    // 弧度转角度：
    FlyObj.toAngle = function( radian ) {
        return radian / Math.PI * 180;
    };


    //第一个参数：图片路径数组
    //第二个参数：回调函数，这个函数，会等到所有图片加载完成后执行
    FlyObj.loadImgs = function(srcList , callback){
        var 
            //记录加载完成的图片数量
            loadedCount = 0,
            //图片的总数量
            len = srcList.length,
            //最终要取出图片，so 使用对象存储图片
            //通过键拿到对应的图片
            retList = {};

        //遍历图片路径数组
        srcList.forEach(function(srcStr) {
            //创建图片对象
            var img = new Image();
            //设置图片的路径
            img.src = 'imgs/' + srcStr + '.png';

            //监听 load 事件，只要是图片加载完成了，回调函数就会执行
            img.addEventListener('load', function(){
                loadedCount++;
                //将图片对象存储到 retList 对象中
                retList[srcStr] = img;

                if(loadedCount >= len) {
                    //所有图片都加载完成了
                    callback( retList );
                }
            });
            
        });
    };

    FlyObj.createCv=function(id){
        var dv=document.querySelector("#"+id);
        var cv=document.createElement("canvas");
        var btn = document.createElement('button');
        btn.innerHTML = '重新开始';
        cv.width=800;
        cv.height=600;
        dv.appendChild(cv);
        dv.appendChild(btn);
        return {
            cv:cv,
            btn:btn
        };

    }


	window.Fly = FlyObj;
})(window);