/******************
* This code and the idea used in generating the random images belongs
* to Alejandro Erickson.
*
* Anyone may use it under the Creative Commons Non Commercial 3.0
* Unported License described at
* http://creativecommons.org/licenses/by-nc/3.0/
*
* Date: February 28, 2012
* Author: Alejandro Erickson
* Title: Random Colour Wash
*******************/

window.onload = function(){
    smallDrawing();
}

function bigDrawing(){
    var c=document.getElementById("myCanvas");
    cwidth=1024;cheight=768;
    c.height = cheight;
    c.width = cwidth;
    newDrawing(cwidth,cheight);
}

function customDrawing(){
    var c=document.getElementById("myCanvas");
    var cwidth= Number(document.getElementById("cwidth").value);
    var cheight = Number(document.getElementById("cheight").value);
    if(cwidth==0 || cheight==0){ cwidth=680;cheight=680}
    c.height = cheight;
    c.width = cwidth;
    newDrawing(cwidth,cheight);
}

function smallDrawing(){
    var c=document.getElementById("myCanvas");
    cwidth=680;cheight=680;
    c.height = cheight;
    c.width = cwidth;
    newDrawing(cwidth,cheight);
}

function newDrawing(cwidth,cheight){
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var id=ctx.createImageData(cwidth,cheight);
    
    var i,iw4 = id.width*4, iw2 = id.width*2, iw = id.width;
    id.data[0]=Math.random()*255;
    id.data[1]=Math.random()*255;
    id.data[2]=Math.random()*255;
    id.data[3]=255;
    var dir,mv;
    var j;

    //change this to change the amount you move in each colour
    var amount = 10;
    
    for(i = 4; i < id.height*iw4;i+=4){
	//alpha
	id.data[i+3]=255;
	for(j=0;j<3;j++){
	    if(Math.random() <= 0.5){dir = -1;} else{ dir = 1;}
	    if(Math.random() > 0.95) mv = 1; else mv = 0;
	    id.data[i+j]= id.data[i+j-4] + amount*dir*mv;
	    //Math.max(0, Math.min( 255, id.data[i+j-4] + (0.5 + Math.random())*dir ) );
	    if(i>iw4+4){
		if(i%iw2 > iw || Math.random() > 0.6){
		    id.data[i+j] = ( id.data[i+j]+ id.data[i+j-iw4+4]+ id.data[i+j-iw4-4]+ id.data[i+j-iw4])/4 + Math.random() - 0.5;
		}
		else
		{
		    id.data[i+j] = ( id.data[i+j]+ id.data[i+j-iw4+4]+ id.data[i+j-iw4-4]+ id.data[i+j-iw4-4])/4 + Math.random() - 0.5;
		}

	    } else if(i >= iw2+iw && i < iw4 && Math.random() > 0.99){ //in the first row we want to come back to the first colour
		id.data[i+j] = ((iw4-i)*id.data[i+j] + (i-iw2-iw)*id.data[j])/iw + Math.random() - 0.5;

	    }
	}
    }
    ctx.putImageData(id,0,0,0,0,cwidth,cheight);
    var img = c.toDataURL("image/png");
   // window.location = img;
    var imagepng = document.getElementById("image");
    imagepng.src = img;
    var button = document.getElementById("save");
    button.onclick = function () { window.location.href = imagepng.src.replace('image/png','image/octet-stream');};
}

