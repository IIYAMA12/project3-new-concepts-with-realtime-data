const frameRender={attachedFunctions:[],attachFunction:function(e){frameRender.attachedFunctions[frameRender.attachedFunctions.length]=e},func:function(e){let t;if(void 0!=frameRender.lastTimeStamp&&(t=e-frameRender.lastTimeStamp),frameRender.lastTimeStamp=e,frameRender.animationTimer=setTimeout(frameRender.func,300,(new Date).getTime()),void 0!=t)for(let n=0;n<frameRender.attachedFunctions.length;n++){(0,frameRender.attachedFunctions[n])(e,t)}},start:function(){void 0==this.animationFrameRequest&&(frameRender.animationTimer=setTimeout(frameRender.func,300,(new Date).getTime()))},stop:function(){void 0!=this.animationFrameRequest?(window.cancelAnimationFrame(this.animationFrameRequest),delete this.animationFrameRequest):void 0!=this.animationTimer&&(clearTimeout(this.animationTimer),delete this.animationTimer)}};window.addEventListener("load",function(){frameRender.start()});