function handleOrientation(e){var a=e.absolute,t=e.alpha,n=e.beta,o=e.gamma;console.log(a,t,n,o),document.getElementsByTagName("textarea")[0].value=t}window.addEventListener("deviceorientation",handleOrientation,!0),document.getElementsByTagName("textarea")[0].value="start";