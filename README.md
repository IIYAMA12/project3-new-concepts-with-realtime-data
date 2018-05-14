# project3: How did I get on your plate?
This experimental application is created to inspire the De Ceuvel company on how they can inform the clients about how their food did end up on their plate.


## Table of contents



![Cover](readme-content/cover.svg)

## Concept of navigating
Let the user go through the water-cycle/life-cycle of their food, 
by using the orientation of a mobile device. 

### Source
`Water-cycle > water flow > direction > device orientation`

![Concept](readme-content/concept.svg)

### Zero-state

`In order to navigate, you have to tilt the device a small amount to the left or right. Max 45° to the left or right.`

`Keep it in the same position until the page has been changed. Return the device orientation back to it's original state to stop the page from changing.`


![Split content](readme-content/split-content.svg)


## Experiment with animation types

### CSS animation. 

```CSS
@keyframes waves-animation-show {
    0% {
        transform: translateY(-50vh);
        visibility: visible;
    }
    100% {
        transform: translateY(0px);
        visibility: visible;
    }
}
animation: waves-animation-show 0.5s;
animation-fill-mode: forwards;
```

Used mostly for hiding and showing content.


### SVG animation.
```XML
<animateTransform attributeName="transform"
    attributeType="XML"
    type="translate"
    from="0 -60"
    to="0 200"
    dur="1.23s"
    begin="0s;op.end+4.36s"
    repeatCount="indefinite"/>
```

Used for animating background images.



### JS + CSS animation.
```JS
const handleOrientation = function (event) {
    
    /* 
        ... 
    */

    const absolute = event.absolute;
    const alpha    = Math.floor(event.alpha + 0.5);
    let beta     = Math.floor(event.beta + 0.5);
    let gamma    = Math.floor(event.gamma + 0.5);
    
    /* 
        ... 
    */

    document.getElementById("main-background").style.transform = "rotate(" + -gamma + "deg)";

    const deviceOrientationSVG = document.getElementById("device-orientation-indicator").getElementsByTagName("svg")[0];

    deviceOrientationSVG.style.transform = "translate(calc(" + (gamma + 90 / 180 * 100) + "vw - 1.5rem)";
    /* 
        ... 
    */
}    
window.addEventListener("deviceorientation", handleOrientation, true);
```



Used for applying the device orientation to the html components.


## Todo
- [ ] Performance update for CSS + SVG + JS animations. 
- [ ] Build for landscape orientation as well.
- [ ] Support tablets.
- [ ] Improve progressive enhancement.
- [ ] Update code events for the future.
