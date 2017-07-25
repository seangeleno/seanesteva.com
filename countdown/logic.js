'use strict';

var countdown = new Date("August 8, 2017");

function getRemainingTime(endtime) {
    var milliseconds = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor(milliseconds / 1000 % 60);
    var minutes = Math.floor(milliseconds / 1000 / 60 % 60);
    var hours = Math.floor(milliseconds / (1000 * 60 * 60) % 24);
    var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return {
        'total': milliseconds,
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours,
        'days': days
    };
}

function initClock(id, endtime) {
    var counter = document.getElementById(id);
    var daysItem = counter.querySelector('.js-countdown-days');
    var hoursItem = counter.querySelector('.js-countdown-hours');
    var minutesItem = counter.querySelector('.js-countdown-minutes');
    var secondsItem = counter.querySelector('.js-countdown-seconds');

    function updateClock() {
        var time = getRemainingTime(endtime);

        daysItem.innerHTML = time.days;
        hoursItem.innerHTML = ('0' + time.hours).slice(-2);
        minutesItem.innerHTML = ('0' + time.minutes).slice(-2);
        secondsItem.innerHTML = ('0' + time.seconds).slice(-2);

        if (time.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

initClock('js-countdown', countdown);