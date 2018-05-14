// let mainRotation = 0;

let zeroState = true;
(function () {
    // document.getElementsByTagName("textarea")[0].value = "start";
    
    const handleOrientation = function (event) {
        if (zeroState) {
            return false;
        }
        const absolute = event.absolute;
        const alpha    = Math.floor(event.alpha + 0.5);
        let beta     = Math.floor(event.beta + 0.5);
        let gamma    = Math.floor(event.gamma + 0.5);
        // console.log(absolute, alpha, beta, gamma);
        // document.getElementsByTagName("textarea")[0].value = alpha;
        // Do stuff with the new orientation data
        const threshold = 14;
        const range = 60;
    
        // mainRotation = gamma
        document.getElementById("main-background").style.transform = "rotate(" + -gamma + "deg)";

        const deviceOrientationSVG = document.getElementById("device-orientation-indicator").getElementsByTagName("svg")[0];

        deviceOrientationSVG.style.transform = "translate(calc(" + (gamma + 90 / 180 * 100) + "vw - 1.5rem)";

        

        const rotateWithScreenElements = document.querySelectorAll(".rotate-with-screen .rotate-container");

        for (let index = 0; index < rotateWithScreenElements.length; index++) {
            const element = rotateWithScreenElements[index];
            // let transfromString = element.style.transform;
            
            // const transformStringParts = transfromString.split(" ");
            // transfromString = "";

            // for (let i = 0; i < transformStringParts.length; i++) {
            //     const string = transformStringParts[i];
            //     console.log("??", string)
            //     if ((string[0] != "r" && string[1] != "o") && (string[0] != "s" && string[1] != "c")) {
            //         transfromString += string;
                    
            //     }   
            // }
            

            if (gamma > 0) {
                element.style.transform =  "rotate(" + -gamma + "deg)";
            } else {
                element.style.transform = "rotate(" + -gamma + "deg) scaleX(-1)";
            }
            element.classList.toggle("flip-h", gamma < 0);
        }




        if(window.innerHeight < window.innerWidth) {
            const gamma2 = gamma;
            gamma = beta;
            beta = gamma2;
        }
    
        // document.getElementsByTagName("textarea")[0].value = "alpha: " + alpha + ", beta: " + beta + ", gamma: " + gamma;
    
        // https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
        
        
        

        cameraDirection = "stop"; 
        // deviceOrientationSVG.getElementsByTagName("g")[0].setAttribute("fill", "gray");
        if (beta > 5 && beta < 135) {
            if (gamma > -range && gamma < range) {
                // document.getElementsByTagName("textarea")[0].value = alpha + "?";
                if (gamma < -threshold) {
                    // document.getElementsByTagName("textarea")[0].value += "yes1";
                    cameraDirection = "left";
                    // deviceOrientationSVG.getElementsByTagName("g")[0].setAttribute("fill", "white");
                    deviceOrientationSVG.getElementsByTagName("g")[0].setAttribute("direction", "left");

                    // document.getElementsByTagName("textarea")[0].value = gamma + "left";
                    return true;
                } else if (gamma > threshold) {
                    // document.getElementsByTagName("textarea")[0].value += "yes2";
                    cameraDirection = "right";
                    // deviceOrientationSVG.getElementsByTagName("g")[0].setAttribute("fill", "white");
                    deviceOrientationSVG.getElementsByTagName("g")[0].setAttribute("direction", "right");
                    // document.getElementsByTagName("textarea")[0].value = gamma + "right";
                    return true;
                }
            }
        }
        deviceOrientationSVG.getElementsByTagName("g")[0].setAttribute("direction", "stop");
    }    
    window.addEventListener("deviceorientation", handleOrientation, true);
})();

(function() {
    document.getElementById("open-zero-state").addEventListener("click", function () {
        zeroState = true;
        document.getElementById("zero-state").classList.add("active");
    });
    const closeZeroStateElement = document.getElementById("close-zero-state");
    if (closeZeroStateElement != undefined) {
        closeZeroStateElement.addEventListener("click", function () {
            zeroState = false;
            document.getElementById("zero-state").classList.remove("active");
        });
    }
})();
