// let mainRotation = 0;

(function () {
    // document.getElementsByTagName("textarea")[0].value = "start";
    
    const handleOrientation = function (event) {
        const absolute = event.absolute;
        const alpha    = Math.floor(event.alpha + 0.5);
        let beta     = Math.floor(event.beta + 0.5);
        let gamma    = Math.floor(event.gamma + 0.5);
        // console.log(absolute, alpha, beta, gamma);
        // document.getElementsByTagName("textarea")[0].value = alpha;
        // Do stuff with the new orientation data
        const threshold = 5;
        const range = 60;
    
        // mainRotation = gamma
        document.getElementById("main-background").style.transform = "rotate(" + -gamma + "deg)";

        if (gamma > 0) {
            document.getElementById("main-vis").style.transform = "rotate(" + -gamma + "deg) translateY(50vh)";
        } else {
            document.getElementById("main-vis").style.transform = "rotate(" + -gamma + "deg) translateY(50vh) scaleX(-1)";
        }
        document.getElementById("main-vis").classList.toggle("flip-h", gamma < 0);



        if(window.innerHeight < window.innerWidth) {
            const gamma2 = gamma;
            gamma = beta;
            beta = gamma2;
        }
    
        // document.getElementsByTagName("textarea")[0].value = "alpha: " + alpha + ", beta: " + beta + ", gamma: " + gamma;
    
        // https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
        
        
        

        cameraDirection = "stop"; 
        if (beta > 5 && beta < 135) {
            if (gamma > -range && gamma < range) {
                // document.getElementsByTagName("textarea")[0].value = alpha + "?";
                if (gamma < -threshold) {
                    // document.getElementsByTagName("textarea")[0].value += "yes1";
                    cameraDirection = "left";
                    // document.getElementsByTagName("textarea")[0].value = gamma + "left";
                } else if (gamma > threshold) {
                    // document.getElementsByTagName("textarea")[0].value += "yes2";
                    cameraDirection = "right";
                    // document.getElementsByTagName("textarea")[0].value = gamma + "right";
                }
            }
        }
        debug(cameraDirection);
    }    
    window.addEventListener("deviceorientation", handleOrientation, true);
})();

