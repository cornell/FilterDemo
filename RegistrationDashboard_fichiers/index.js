// var parent = document.getElementById('parent');
// var child = document.getElementById('child');
// child.style.bottom = child.clientWidth - child.offsetWidth + "px";

import '/index.scss';

var elBefore = document.getElementById('js-before');
var elAfter = document.getElementById('js-after');
function moveAfter(e){
    var elContainer = document.getElementById('js-wrapper');
    
    if(!atTheEnd()) {
        var shift = elContainer.scrollLeft + 32;
        scrollTo(elContainer, shift);
    }
    if(!atTheStart()){
        elBefore.addEventListener('click', moveBefore);
        removeClass(elBefore, 'is-deactivate');
    }
    if(atTheEnd()) {
        elAfter.removeEventListener('click', moveAfter);
        elBefore.addEventListener('click', moveBefore);
        addClass(elAfter, 'is-deactivate');
        console.log('fin');        
    }

    function atTheEnd(){
        return elContainer.clientWidth + elContainer.scrollLeft === elContainer.scrollWidth;
    }

    function atTheStart() {
        return elContainer.scrollLeft === 0;
    }
}

function moveBefore(e){
    
    var elContainer = document.getElementById('js-wrapper');
    if(!atTheStart()) {
        var shift = elContainer.scrollLeft - 32;
        scrollTo(elContainer, shift);
    }
    if(!atTheEnd()){
        elAfter.addEventListener('click', moveAfter);
        removeClass(elAfter, 'is-deactivate');
    }
    if(atTheStart()) {
        elBefore.removeEventListener('click', moveBefore);
        elAfter.addEventListener('click', moveAfter);
        addClass(elBefore, 'is-deactivate');
        console.log('début');
    }

    function atTheEnd(){
        return elContainer.clientWidth + elContainer.scrollLeft === elContainer.scrollWidth;
    }

    function atTheStart() {
        return elContainer.scrollLeft === 0;
    }
}

function addClass(el, className){
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

function removeClass(el, className){
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

elAfter.addEventListener('click', moveAfter);
elBefore.addEventListener('click', moveBefore);

// https://gist.github.com/andjosh/6764939
function scrollTo(element, to) {
    var start = element.scrollLeft,
        change = to - start,
        currentTime = 0,
        increment = 3;
        
    var animateScroll = function(){        
        currentTime += increment;
        var duration = 100;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};