let navbar = document.querySelector('.navbar');

navbar.onclick = () =>{
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
}

var items = document.querySelectorAll('.soccer .item');
var goPreBtn = document.querySelector('.soccer #Prev');
var goNextBtn = document.querySelector('.soccer #Next');
var pointLists = document.querySelectorAll('.soccer .point');
var wrap = document.querySelector('.soccer .wrap');

var index = 0;
var time = 0;
var timer = null;
var lock = true; 
function clearIndex() {
    for (var i = 0; i < items.length; i++) {
        items[i].className = 'item';
        pointLists[i].className = 'point';
    }
}

function goIndex() {
    clearIndex();
    items[index].className = 'item active';
    pointLists[index].className = 'point current';
}
goIndex();

function goNext() {
    index++;
    if (index > 5) {
        index = 0;
    }
    goIndex();
}

function goPre() {
    index--;
    if (index < 0) {
        index = 5;
    }
    goIndex();
}

function rest() {
    time++;

    if (time == 20) {
        time = 0;
        goNext();
    }
}

function openLock() {
    lock = true;
}

goNextBtn.addEventListener('click', function() {
    if (!lock) return; 
    goNext();
    time = 0;
    lock = false;
    setTimeout(openLock, 1000)

});
goPreBtn.addEventListener('click', function() {
    if (!lock) return;
    goPre();
    lock = false;
    time = 0;

    setTimeout(openLock, 1000);
});

for (var j = 0; j < pointLists.length; j++) {
    pointLists[j].setAttribute('pointIndex', j);

    pointLists[j].addEventListener('click', function() {
        var pIndex = this.getAttribute('pointIndex');
        index = pIndex;
        goIndex();
        time = 0;
    })
}

wrap.addEventListener('mouseover', function() {
    clearInterval(timer);
    time = 0;
})
wrap.addEventListener('mouseout', function() {
    time = 0;
    timer = setInterval(rest, 150);
})
timer = setInterval(rest, 150)