let cameraDirection="stop";!function(){let t=0;const n=[{length:30},{length:5},{length:30}].reduce(function(t,n){return t+n.length},0);window.addEventListener("load",function(){let e;let o=0;frameRender.attachFunction(function(c){if(void 0!=e){const a=(c-e)/17;switch(cameraDirection){case"left":(t+=.03*a)>n&&(t=0);break;case"right":(t-=.03*a)<0&&(t=n)}const i=t/n;Math.abs(o-i)>.5&&(document.getElementById("main-background").classList.remove("background-transition"),setTimeout(function(){document.getElementById("main-background").classList.add("background-transition")},50)),o=i,console.log(document.getElementsByTagName("main")[0].style.backgroundPosition);const s=200*(t%10/10)-50;document.getElementById("main-background").style.backgroundPosition=s+"vw calc(150vmax - 50vh)"}e=c})})}();