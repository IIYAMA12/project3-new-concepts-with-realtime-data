let cameraDirection="stop";const slideControl=function(){const e=[{length:4,elementId:"intro",functions:{start:[function(){document.getElementById("main-crop").classList.add("on-screen"),document.getElementById("main-fish").classList.add("on-plate"),document.getElementById("main-crop").classList.add("on-plate")}],end:[function(){document.getElementById("main-fish").classList.remove("on-plate"),document.getElementById("main-crop").classList.remove("on-plate"),document.getElementById("main-crop").classList.remove("on-screen")}]}},{length:4,functions:{start:[function(){document.getElementById("main-fish").classList.add("on-bottom-section"),document.getElementById("main-crop").classList.add("on-bottom-section"),document.getElementById("main-crop").classList.add("on-screen"),document.getElementById("waves").classList.add("on-screen")}],end:[function(){document.getElementById("main-fish").classList.remove("on-bottom-section"),document.getElementById("main-crop").classList.remove("on-bottom-section"),document.getElementById("main-crop").classList.remove("on-screen"),document.getElementById("waves").classList.remove("on-screen")}]},elementId:"show-plate-content"},{length:2,elementId:""},{length:4,elementId:"toilet",functions:{start:[function(){document.getElementById("main-fish").classList.add("shitting"),document.getElementById("main-fish").classList.add("on-screen")}],end:[function(){document.getElementById("main-fish").classList.remove("shitting")}]}},{length:4,elementId:"nitrosomonas",functions:{start:[function(){document.getElementById("main-fish").classList.remove("on-screen")}]}},{length:4,elementId:"nitrospira"},{length:4,elementId:"plants"},{length:4,elementId:"clean-water"},{length:4,elementId:"fish-tank"},{length:1,elementId:"break",functions:{start:[function(){document.getElementById("main-fish").classList.remove("on-screen")}]}}],t={check:function(){const e=this.slides;this.slidePosition,this.totalSize;let n=0;for(let o=0;o<e.length;o++){const s=e[o];if(this.slidePosition<=n+s.length){t.show(o);break}n+=s.length}},show:function(e){const t=this.slides[e];let n;void 0!=t&&(n=t.elementId);const o=this.slideShown,s=o.elementId;if(n!==s){if(void 0!=o.functions&&void 0!=o.functions.end){const e=o.functions.end;for(let t=0;t<e.length;t++)e[t]()}if(void 0!=t.functions&&void 0!=t.functions.start){const e=t.functions.start;for(let t=0;t<e.length;t++)e[t]()}if(void 0!=s){const e=document.getElementById(s);void 0!=e&&e.classList.add("hide-article")}if(void 0!=n){const e=document.getElementById(n);void 0!=e&&(e.classList.remove("hide-article"),e.classList.add("active"))}}this.slideShown=t},slideShown:e[0],slides:e,totalSize:e.reduce(function(e,t){return e+t.length},0),slidePosition:e[0].length/2};return t}();!function(){let e=slideControl.slidePosition;const t=slideControl.totalSize;window.addEventListener("load",function(){let n;let o=0;frameRender.attachFunction(function(s){if(void 0!=n){const i=(s-n)/17;switch(cameraDirection){case"left":(e-=.03*i)<0&&(e=t);break;case"right":(e+=.03*i)>t&&(e=0)}const c=e/t;Math.abs(o-c)>.5&&(document.getElementById("main-background").classList.remove("background-transition"),setTimeout(function(){document.getElementById("main-background").classList.add("background-transition")},50)),o=c,slideControl.check();const d=200-200*(e%10/10)-50;document.getElementById("main-background").style.backgroundPosition=d+"vw calc(150vmax - 50vh)"}slideControl.slidePosition=e,n=s})})}();