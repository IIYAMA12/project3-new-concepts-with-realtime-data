function handleOrientation(e){e.absolute;const t=Math.floor(e.alpha+.5);let a=Math.floor(e.beta+.5),n=Math.floor(e.gamma+.5);if(window.innerHeight<window.innerWidth){const e=n;n=a,a=e}document.getElementsByTagName("textarea")[0].value="alpha: "+t+", beta: "+a+", gamma: "+n,a>5&&a<135&&n>-50&&n<50&&(n<-5?document.getElementsByTagName("textarea")[0].value+="yes1":n>5&&(document.getElementsByTagName("textarea")[0].value+="yes2"))}window.addEventListener("deviceorientation",handleOrientation,!0),document.getElementsByTagName("textarea")[0].value="start",document.getElementsByTagName("textarea")[0].value="?";