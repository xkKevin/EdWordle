
	var cv = document.getElementById("canvas");
	cv.onmousedown = function(e){
  			var ev = window.event || e;
  			var mx = ev.layerX || ev.offsetX;
  			var my = ev.layerY || ev.offsetY;
  			document.getElementById("coordinate").innerHTML=mx+":"+my;
  			var i=0;
  			outerloop:
  			for(; i<len;i++){
  				var wordlen = wordlistTwoBox[i].word.length;
  				//alert(i+":"+wordlen)
  				if(wordlistTwoBox[i].word.search(' ')>=0){ //不存在为-1
  					wordlen--;
  				}
  				//alert(i+":"+wordlen);
  				for(var j=0;j<wordlen;j++){
  					//alert(i+": "+j)
  					var letter=wordlistTwoBox[i].box[j];
  					var x1=letter.border[0];
  					var x2=x1+letter.border[2];//x2=x1+wordw;
  					var y1=letter.border[1];
  					var y2=y1+letter.border[3];//y2=y1+wordh;
  					if(mx>=x1&&mx<=x2&&my>=y1&&my<=y2){
  						document.getElementById("word").innerHTML=list[i][0]+" : "+list[i][1];
  						showWord(i);
  						var mnx=wordlist[i].border[0]-1;
  						var mny=wordlist[i].border[1]-1;
  						var wordw=wordlist[i].border[2]+2;
  						var wordh=wordlist[i].border[3]+2;
  						
  						var dx=mx-mnx;
  						var dy=my-mny;
  						
  						var imageData = cxt.getImageData(mnx,mny,wordw,wordh);
  						mnx=mx;
  						mny=my;
  						//cxt.clearRect(mnx,mny,wordw,wordh);
  						cv.onmousemove = function(e){
  							cxt.clearRect(mnx-dx,mny-dy,wordw,wordh);
  			  				var ev = window.event || e;
  			  				mnx = ev.layerX || ev.offsetX;
  			  				mny = ev.layerY || ev.offsetY;
  			  				document.getElementById("coordinate").innerHTML=mnx+":"+mny;
  			  				
  			  				//var imageData = wordlist
  			  				cxt.putImageData(imageData,mnx-dx,mny-dy);
  			  				
  			  			}
  						
  						//cxt.putImageData(imageData,mnx,mny);
  						break outerloop;
  					}
  				}
  			}
  			
  			if(i>=len){
  				//alert(i+": if")
  				cxt.putImageData(imgData,0,0);
  				document.getElementById("word").innerHTML="";
  			}
  			/*
  			cv.onmousemove = function(e){
  				var ev = window.event || e;
  				var mnx = ev.layerX || ev.offsetX;
  				var mny = ev.layerY || ev.offsetY;
  				document.getElementById("coordinate").innerHTML=mnx+":"+mny;
  			}
  			*/
  	}
	cv.onmouseup = function(e){
			cv.onmousemove = null;
	}
		var cxt = cv.getContext('2d');
		//cxt.save();
		var back_font = "px Arial";
		//var list=[["Layout",346],["Xiong",105],["Kai",95],["Cloud",153],["Word",148], ["China", 246],["CAD", 180],["August", 85],["Knowledge",100],["key",69],["EdWordle",500],["Rigid Body",177],["method",102]];
		
		var list=[["Layout",846],["group",543],["Give up",336],["Pigs",999]];
		//var list=[["Layout",846]];
		//var list=[["A",846]];
		//alert(list.length)
		//alert(list[0][1]+":"+list[1][1]+":"+list[2][1]+":"+list[3][1]);
		list.sort(function(x,y){
			return y[1]-x[1];
		});
		//alert(list[0][1]+":"+list[1][1]+":"+list[2][1]+":"+list[3][1]);
		var cw = cv.width;
		var ch = cv.height;
		//alert(cw+";;;"+ch)
		var maxFontSize = 60;
		var minFontSize = 10;
		var size = 0;
		var color;
		var rotateDegree;
		
    var min = list[0][1];
    var max = 0;
    var len = list.length;
    for (var i = 0; i < len; i++) {
        if (min > list[i][1]) {
            min = list[i][1];
        }
        if (max < list[i][1]) {
            max = list[i][1];
        }
    }
    
    var switch_box=true;
    var switch_Letter=true;
    var switch_Word=true;
	var wordlist = [];
	var wordlistTwoBox = [];//所有单词的字母边界
	var imgData; //记录每次布局
	
    function originalWordle(){
    	
    	cxt.clearRect(0,0,cw,ch);
    	wordlist.length=0;
    	switch_box=true;
    	switch_Letter=true; 
    	switch_Word=true;
		cxt.textBaseline = 'top';
		cxt.textAlign='start';
		for(var i=0;i<len;i++){
			
			size = Math.floor((maxFontSize - minFontSize)/(max-min) * (list[i][1]-min/2) +minFontSize);
			size>1.6*maxFontSize?size=1.6*maxFontSize:'';
			cxt.font = size.toString()+back_font;
			//alert(size);
			color = randomColor();
			cxt.fillStyle = color;
			
			cxt.save();
			
			var x = Math.floor(Math.random()*cw);
			var y = Math.floor(Math.random()*ch);
			
			//var x=400;
			//var y=200;
			var wordw = Math.floor(cxt.measureText(list[i][0]).width);
			var wordh = Math.floor(cxt.measureText("Pk").width);
			var rotateRate = size/(maxFontSize+minFontSize);
			rotateRate = rotateRate>0.75?(Math.pow(rotateRate,1.6)>0.9?0.9:Math.pow(rotateRate,1.6)):(0.5+rotateRate/10+Math.pow(rotateRate,5));
			//alert(rotateRate);
			rotateDegree=Math.random()>rotateRate?(Math.random()>0.5?1:-1):0;
			//var rotateDegree=1;
			//alert(rotateDegree);
			//alert(x+":"+y+":"+wordw+":"+wordh); 
			
			if(rotateDegree){
				if(rotateDegree==1){
					(x-wordh<0)?x=wordh:'';
					(y+wordw>ch)?y=ch-wordw:'';
					//alert(x+":"+y+":"+wordw+":"+wordh); 
				}else{
					(x+wordh>cw)?x=cw-wordh:'';
					(y-wordw<0)?y=wordw:'';
					//alert(x+":"+y+":"+wordw+":"+wordh); 
				}
			}else{
				(x+wordw>cw)?x=cw-wordw:'';
				(y+wordh>ch)?y=ch-wordh:'';
				//alert(x+":"+y+":"+wordw+":"+wordh); 
			}
			
			//cxt.fillText(list[i][0],x,y);
			//cxt.fillRect(x,y,wordw,wordh);
			cxt.translate(x,y);
			
			cxt.rotate(rotateDegree*Math.PI/2);
			cxt.fillText(list[i][0],0,0);
			//cxt.fillRect(0,0,wordw,wordh);
			cxt.restore();
			
			//cxt.strokeRect(x-wordh,y,wordh,wordw);
			//cxt.strokeRect(x,y,wordw,wordh);
			//rotateDegree=0;
			
			//alert(x+":"+y+":"+wordw+":"+wordh); 
			if(rotateDegree){
				//alert(rotateDegree+" x:"+x+" y:"+y+":"+wordw+":"+wordh);
				var change;
				if(rotateDegree==1){
					x=x-wordh;
					change = wordh;
					wordh=wordw;
					wordw=change;
					//alert(x+":"+y+":"+wordw+":"+wordh); 
				}else{
					y=y-wordw;
					change = wordh;
					wordh=wordw;
					wordw=change;
				}
			}
			
			var border = getBorder(x,y,wordw,wordh);
			//wordlist.push([list[i][0],size,color,border,rotateDegree]);
			wordlist.push({
				word:list[i][0],
				size:size,
				color:color,
				border:border,
				rotateDegree:rotateDegree
			});
			//cxt.strokeStyle="red";
			//cxt.strokeRect(x,y,wordw,wordh);
			
			//alert(wordlist.length)
			//alert(wordlist[i][0]+":"+wordlist[i][1]+":"+wordlist[i][2]+":"+wordlist[i][3]+":"+wordlist[i][4]+":"+wordlist[i][5]+":"+wordlist[i][6]);
			//cxt.restore();
		}
		getTowLevelBorder();
		imgData=cxt.getImageData(0,0,cw,ch);
    }
   
    function centerWordle(){
    	cxt.clearRect(0,0,cw,ch);
    	wordlist.length=0;
    	switch_box=true;
    	switch_Letter=true; 
    	switch_Word=true;
    	//var wlist = list.reverse();
		cxt.textBaseline = 'middle';
		cxt.textAlign='center';
		for(var i=0;i<len;i++){
			
			size = Math.floor((maxFontSize - minFontSize)/(max-min) * (list[i][1]-min/2) +minFontSize);
			size>1.6*maxFontSize?size=1.6*maxFontSize:'';
			cxt.font = size.toString()+back_font;
			//alert(size);
			color = randomColor();
			cxt.fillStyle = color;
			
			cxt.save();
			
			var wordw = Math.floor(cxt.measureText(list[i][0]).width);
			var wordh = Math.floor(cxt.measureText("Pk").width);
			
			var x = cw/2;
			var y = ch/2;
			
			var rotateRate = size/(maxFontSize+minFontSize);
			rotateRate = rotateRate>0.75?(Math.pow(rotateRate,1.6)>0.9?0.9:Math.pow(rotateRate,1.6)):(0.5+rotateRate/10+Math.pow(rotateRate,5));
			//alert(rotateRate);
			rotateDegree=Math.random()>rotateRate?(Math.random()>0.5?1:-1):0;
			//var rotateDegree=Math.random()>0.5?1:-1;;
			//alert(rotateDegree);
			//alert(x+":"+y+":"+wordw+":"+wordh); 
			/*
			if(rotateDegree){
				if(rotateDegree==1){
					(x-wordh<0)?x=wordh:'';
					(y+wordw>ch)?y=ch-wordw:'';
					//alert(x+":"+y+":"+wordw+":"+wordh); 
				}else{
					(x+wordh>cw)?x=cw-wordh:'';
					(y-wordw<0)?y=wordw:'';
					//alert(x+":"+y+":"+wordw+":"+wordh); 
				}
			}else{
				(x+wordw>cw)?x=cw-wordw:'';
				(y+wordh>ch)?y=ch-wordh:'';
				//alert(x+":"+y+":"+wordw+":"+wordh); 
			}
			*/
			//cxt.fillText(list[i][0],x,y);
			//cxt.fillRect(x,y,wordw,wordh);
			cxt.translate(x,y);
			
			cxt.rotate(rotateDegree*Math.PI/2);
			cxt.fillText(list[i][0],0,0);
			//cxt.fillRect(0,0,wordw,wordh);
			cxt.restore();
			
			//cxt.strokeRect(x-wordh,y,wordh,wordw);
			//cxt.strokeRect(x,y,wordw,wordh);
			//rotateDegree=0;
			//alert(x+":"+y+":"+wordw+":"+wordh); 
			if(rotateDegree){
				//alert(rotateDegree+" x:"+x+" y:"+y+":"+wordw+":"+wordh);
				var change;
				if(rotateDegree){
					x=Math.floor((cw-wordh)/2);
					y=Math.floor((ch-wordw)/2);
					change = wordh;
					wordh=wordw;
					wordw=change;
					//alert(x+":"+y+":"+wordw+":"+wordh); 
				}
			}else{
				x=Math.floor((cw-wordw)/2);
				y=Math.floor((ch-wordh)/2);
			}
				
			var border = getBorder(x,y,wordw,wordh);
			wordlist.push({
				word:list[i][0],
				size:size,
				color:color,
				border:border,
				rotateDegree:rotateDegree
			});
			
			//alert(wordlist.length)
			//alert(wordlist[i][0]+":"+wordlist[i][1]+":"+wordlist[i][2]+":"+wordlist[i][3]+":"+wordlist[i][4]+":"+wordlist[i][5]+":"+wordlist[i][6]);
			//cxt.restore();
		}
		getTowLevelBorder();
		imgData=cxt.getImageData(0,0,cw,ch);
    }
    
    function rigidWordle(){
    	cxt.clearRect(0,0,cw,ch);
    	wordlist.length=0;
    	switch_box=true;
    	switch_Letter=true; 
    	switch_Word=true;
    	//var wlist = list.reverse();
		cxt.textBaseline = 'middle';
		cxt.textAlign='center';
		var distanceUp=0;
		var distanceDown=0;
		for(var i=0;i<len;i++){
			
			size = Math.floor((maxFontSize - minFontSize)/(max-min) * (list[i][1]-min/2) +minFontSize);
			size>1.6*maxFontSize?size=1.6*maxFontSize:'';
			cxt.font = size.toString()+back_font;
			//alert(size);
			color = randomColor();
			cxt.fillStyle = color;
			
			cxt.save();
			
			var wordw = Math.floor(cxt.measureText(list[i][0]).width);
			var wordh = Math.floor(cxt.measureText("Pk").width);
			
			var x = Math.floor(cw/2);
			var y = Math.floor(ch/2);
			/*
			if(i){
				if(i%2==0){
					y = y+distanceDown+Math.ceil(wordh/2);
					//distanceDown+=wordh;
				}else{
					y = y-distanceUp-Math.ceil(wordh/2);
					//distanceUp+=wordh;
				}
			}
			*/
			if(i){
				if(i%2==0){
					y = y+distanceDown+Math.ceil(wordh/2);
					distanceDown+=wordh;
				}else{
					y = y-distanceUp-Math.ceil(wordh/2);
					distanceUp+=wordh;
				}
			}else{
				 distanceUp+=Math.ceil(wordh/2);
				 distanceDown+=Math.ceil(wordh/2);
			}
			var rotateRate = size/(maxFontSize+minFontSize);
			rotateRate = rotateRate>0.75?(Math.pow(rotateRate,1.6)>0.9?0.9:Math.pow(rotateRate,1.6)):(0.5+rotateRate/10+Math.pow(rotateRate,5));
			
			//alert(rotateRate);
			rotateDegree=Math.random()>rotateRate?(Math.random()>0.5?1:-1):0;

			cxt.fillText(list[i][0],x,y);
			//cxt.fillRect(0,0,wordw,wordh);
			cxt.restore();
			
			//cxt.strokeRect(x-wordh,y,wordh,wordw);
			//cxt.strokeRect(x,y,wordw,wordh);
			//rotateDegree=0;

			x=Math.floor((cw-wordw)/2);
			//y=Math.floor((ch-wordh)/2);
			
			if(i){
				if(i%2==0){
					y=ch/2+distanceDown-wordh;
					//y=Math.floor((ch-wordh)/2);
				}else{
					y=ch/2-distanceUp;
					//y=Math.floor((ch-wordh)/2);
				}
			}else{
				y=Math.floor((ch-wordh)/2);
			}
				
			var border = getBorder(x,y,wordw,wordh);
			wordlist.push({
				word:list[i][0],
				size:size,
				color:color,
				border:border,
				rotateDegree:rotateDegree
			});
		}
		getTowLevelBorder();
		/*
		var first=list.shift();
    	shuffle(list);
    	list.unshift(first);
    	*/
		imgData=cxt.getImageData(0,0,cw,ch);
    }
    
    function compact(){
    	
    }
    
    function showWord(i){
    	cxt.putImageData(imgData,0,0);
    	cxt.strokeStyle="red";
    	cxt.strokeRect(wordlist[i].border[0],wordlist[i].border[1],wordlist[i].border[2],wordlist[i].border[3]);
    }
    
    function showBox(color){
    	if(switch_box){
    		//imgData=cxt.getImageData(0,0,cw,ch);
        	cxt.strokeStyle=color;
        	for(var i=0;i<len;i++){
        		cxt.strokeRect(wordlist[i].border[0],wordlist[i].border[1],wordlist[i].border[2],wordlist[i].border[3]);
        	}
        	switch_box=false;
    	}else{
    		//cxt.clearRect(0,0,cw,ch);
    		cxt.putImageData(imgData,0,0);
    		switch_box=true; 
    	}
    	
    	/*
    	cxt.save();
    	cxt.strokeStyle=color;
    	for(var i=0;i<wordlist.length;i++){
    		cxt.strokeRect(wordlist[i][3],wordlist[i][4],wordlist[i][5],wordlist[i][6]);
    	}
    	setTimeout(function(){
    		alert("3");
    		cxt.clearRect(0,0,cw,ch);
    		//cxt.restore();
    		cxt.putImageData(imgData,0,0);
    	},3000);
    	*/
    }
    
    function showTwoBox(color1,color2){
    	if(switch_TwoBox){
    		
    		//imgData=cxt.getImageData(0,0,cw,ch);
    		
    		//cxt.setLineDash([8,5]);
    		//cxt.setLineWidth=1;
    		//alert(wordlistTwoBox.length)
        	for(var i=0;i<len;i++){ //画每个单词
        		cxt.save();
        		cxt.strokeStyle=color1;
        		var lBorder=wordlistTwoBox[i].box;
        		for(var j in lBorder){ //画每个单词中的每个字母
        			cxt.strokeRect(lBorder[j].border[0],lBorder[j].border[1],lBorder[j].border[2],lBorder[j].border[3]);
        		}
        		//alert(wordlistTwoBox[i].box[0].border[0])
        		cxt.strokeStyle=color2;
        		cxt.setLineDash([8,5]);
        		cxt.setLineWidth=1;
        		cxt.strokeRect(wordlistTwoBox[i].minX,wordlistTwoBox[i].minY,wordlistTwoBox[i].minW,wordlistTwoBox[i].minH);
            	cxt.restore();
        	}
        	switch_TwoBox=false;
    	}else{
    		cxt.putImageData(imgData,0,0);
    		switch_TwoBox=true; 
    	}
    	
    	/*
    	var wordTwoBox;
    	for(var i=0;i<len;i++){
    		wordTwoBox[0] = wordlist[i];
    		alert(wordlistTwoBox.length)
    		var imageData=wordlist[i][7];
    	}
    	*/
    }
    
    function Word_levelBox(color){
    	if(switch_Word){
    		
        	for(var i=0;i<len;i++){ //画每个单词
        		cxt.save();
        		cxt.strokeStyle=color;
        		cxt.setLineDash([8,5]);
        		cxt.setLineWidth=1;
        		cxt.strokeRect(wordlistTwoBox[i].minX,wordlistTwoBox[i].minY,wordlistTwoBox[i].minW,wordlistTwoBox[i].minH);
            	cxt.restore();
        	}
        	switch_Word=false;
    	}else{
    		cxt.putImageData(imgData,0,0);
    		switch_Word=true; 
    	}
    	
    }
    
    function Letter_levelBox(color){
    	if(switch_Letter){
        	for(var i=0;i<len;i++){ //对于每个单词
        		cxt.save();
        		cxt.strokeStyle=color;
        		var lBorder=wordlistTwoBox[i].box;
        		for(var j in lBorder){ //画每个单词中的每个字母
        			cxt.strokeRect(lBorder[j].border[0],lBorder[j].border[1],lBorder[j].border[2],lBorder[j].border[3]);
        		}
        	}
        	switch_Letter=false;
    	}else{
    		cxt.putImageData(imgData,0,0);
    		switch_Letter=true; 
    	}
    }
    
    function getTowLevelBorder(){
    	wordlistTwoBox.length=0;
    	for(var i=0;i<len;i++){
    		var letterTotalBorder=[];//每个单词所有字母的边界
        	var border=wordlist[i].border;
        	//alert(border+":size:"+wordlist[0].size);
        	var word=wordlist[i].word;
        	//alert(word.length+":"+word[0]);
        	//var size=33;
        	cxt.font = wordlist[i].size.toString()+back_font;
        	var x=border[0];
        	var y=border[1];
    		
    		//cxt.fillText(word[0],x,y);
    		//var wordw=Math.floor(cxt.measureText(word[0]).width);
    		var wordh=border[3];
    		//cxt.strokeRect(x,y,wordw,wordh);
    		//var letterBorder=getBorder2(x,y,wordw,wordh);
    		//cxt.strokeRect(letterBorder[0],letterBorder[1],letterBorder[2],letterBorder[3]);
        	var minH=wordh;
        	var minY=y;
    		for(var j in word){
        		//alert(word[i]);
        		if(word[j]==' '){
        			continue;
        		}
        		var wordw=Math.floor(cxt.measureText(word[j]).width); //注意，像素一定要是整数，要不然会出错
        		//var wordh=border[3];
        		/*
        		if(wordlist[i].rotateDegree){
    				//alert(rotateDegree+" x:"+x+" y:"+y+":"+wordw+":"+wordh);
    				var change;
    				if(wordlist[i].rotateDegree==1){
    					x=x-wordh;
    					change = wordh;
    					wordh=wordw;
    					wordw=change;
    					//alert(x+":"+y+":"+wordw+":"+wordh); 
    				}else{
    					y=y-wordw;
    					change = wordh;
    					wordh=wordw;
    					wordw=change;
    				}
    			}
        		*/
        		var letterBorder=getBorder2(x,y,wordw,wordh);
        		
        		//cxt.strokeRect(letterBorder[0],letterBorder[1],letterBorder[2],letterBorder[3]);
        		//x+=letterBorder[0]+1;
        		x=letterBorder[0]+letterBorder[2]+1;
        		if(j==(word.length-1)){
        			letterBorder[2]=border[2]-(letterBorder[0]-border[0]);
        		}
        		letterTotalBorder.push({
        			letter:word[j],
        			border:letterBorder
        		});
        		if(minH>letterBorder[3]){
        			minH=letterBorder[3];
        			minY=letterBorder[1];
        		}
        	}
        	wordlistTwoBox.push({
    			word:word,
    			box:letterTotalBorder,
    			minX:border[0],
    			minY:minY,
    			minW:border[2],
    			minH:minH
    		});
    	}
    	//alert("wo skadhask")
    }
    
    function shuffle(a) {
    	var len=a.length;
        for (var i = 0; i < len - 1; i++) {
            var index = parseInt(Math.random() * (len - i));
            var temp = a[index];
            a[index] = a[len - i - 1];
            a[len - i - 1] = temp;
        }
    }
    
    function getBorder(x,y,wordw,wordh){
		var imageData;
		imageData = cxt.getImageData(x,y,wordw,wordh);
		//cxt.strokeStyle="blue";
		//cxt.strokeRect(x,y,wordw,wordh);
		//alert(x+":"+y+":"+wordw+":"+wordh)
		//alert(x+":"+y+":"+wordw+":"+wordh);
		//alert("imageData.data.length:"+imageData.data.length);
		//alert(wordw+":"+wordh);
		//alert("y:"+y+"  wordh:"+wordh);
		var h=wordh;
		var yyy=0;
		touterloop:
		for(var j=0;j<h;j++){
			for(var k=0;k<wordw;k++){
				var item= (j*wordw+k)*4;
				if(imageData.data[item]||imageData.data[item+1]||imageData.data[item+2]||imageData.data[item+3]){
					break touterloop;
				}
			}
			wordh--;
			y++;
			yyy++;
		}
		bouterloop:
		for(var j=h-1;j>0;j--){
			for(var k=0;k<wordw;k++){
				var item= (j*wordw+k)*4;
				if(imageData.data[item]||imageData.data[item+1]||imageData.data[item+2]||imageData.data[item+3]){
					//alert(imageData.data[65*wordw*4])
					//alert(yyy+":"+j+":"+k)
					break bouterloop;
				}
			}
			wordh--;
		}
		//alert(yyy);
		var w=wordw;
		louterloop:
		for(var j=0;j<w;j++){
			for(var k=yyy;k<wordh+yyy;k++){
				//alert(j*w*k*4);
				var item=(j+w*k)*4;
				//alert(item+":"+imageData.date.length);
				if(imageData.data[item]||imageData.data[item+1]||imageData.data[item+2]||imageData.data[item+3]){
					break louterloop;
				}
				
			}
			wordw--;
			x++;
		}
		//alert(wordw);
		routerloop:
			for(var j=w-1;j>0;j--){
				for(var k=yyy;k<wordh+yyy;k++){
					//alert(j*w*k*4);
					var item=(j+w*k)*4;
					//alert(item+":"+imageData.date.length);
					if(imageData.data[item]||imageData.data[item+1]||imageData.data[item+2]||imageData.data[item+3]){
						//alert(j);
						break routerloop;
					}
					
				}
				wordw--;
			}
		imageData = cxt.getImageData(x,y,wordw,wordh);//注意：如果参数值小于等于0，则程序运行出错
		//alert(x+":"+y+":"+wordw+":"+wordh)
		//alert(wordw+":"+wordh);
		//cxt.strokeStyle="red";
		//cxt.strokeRect(x,y,wordw,wordh);
		return [x,y,wordw,wordh,imageData];
		//wordlist.push([word,size,color,x,y,wordw,wordh,imageData,rotateDegree]);
    }
    
    function getBorder2(x,y,wordw,wordh){
		var imageData;
		imageData = cxt.getImageData(x,y,wordw,wordh);
		cxt.strokeStyle="blue";
		//cxt.strokeRect(x,y,wordw,wordh);
		var h=wordh;
		var yyy=0;
		touterloop:
		for(var j=0;j<h;j++){
			for(var k=0;k<wordw;k++){
				var item= (j*wordw+k)*4;
				if(imageData.data[item]||imageData.data[item+1]||imageData.data[item+2]||imageData.data[item+3]){
					break touterloop;
				}
			}
			wordh--;
			y++;
			yyy++;
		}
		bouterloop:
		for(var j=h-1;j>0;j--){
			for(var k=0;k<wordw;k++){
				var item= (j*wordw+k)*4;
				if(imageData.data[item]||imageData.data[item+1]||imageData.data[item+2]||imageData.data[item+3]){

					break bouterloop;
				}
			}
			wordh--;
		}
		//alert(yyy);
		var w=wordw;
		var xxx=0;
		louterloop:
		for(var j=0;j<w;j++){
			for(var k=yyy;k<wordh+yyy;k++){
				//alert(j*w*k*4);
				var item=(j+w*k)*4;
				//alert(item+":"+imageData.date.length);
				if(imageData.data[item]||imageData.data[item+1]||imageData.data[item+2]||imageData.data[item+3]){
					break louterloop;
				}
				
			}
			//wordw--;
			x++;
			xxx++;
			//alert("bottom");
		}
		//alert(wordw);
		routerloop:
			for(var j=xxx+1;j<w;j++){
				var col=0;
				for(var k=yyy;k<wordh+yyy;k++){
					//alert(j*w*k*4);
					var item=(j+w*k)*4;
					//alert(item+":"+imageData.date.length);
					if(imageData.data[item]+imageData.data[item+1]+imageData.data[item+2]+imageData.data[item+3]==0){
						//alert(j);
						//break routerloop;
						col++;
					}
					
				}
				if(col>=wordh){
					wordw=j-xxx;
					//alert(wordw+":"+wordh);
					break;
				}
				//wordw--;
			}
		imageData = cxt.getImageData(x,y,wordw,wordh);//注意：如果参数值小于等于0，则程序运行出错
		//alert(x+":"+y+":"+wordw+":"+wordh)
		//alert(wordw+":"+wordh);
		return [x,y,wordw,wordh,imageData];
		//wordlist.push([word,size,color,x,y,wordw,wordh,imageData,rotateDegree]);
    }
    
    function randomColor(){
	  	var hex = Math.floor(Math.random()*16777216).toString(16);
	  	while(hex.length<6){
	  		hex = '0' + hex;
	  	}
	  	return '#'+hex;
    }
	
    function test(){
    	setTimeout(function (){
    		var ww="hello world";
    		//if(' ' in ww){
    		if(ww.search(' ')>0){
    			alert(ww.search(' ')+"yes");
    		}else{
    			alert(ww.search(' ')+"no")
    		}
    	},0)
    }
    