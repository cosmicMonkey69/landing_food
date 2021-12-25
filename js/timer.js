window.addEventListener('DOMContentLoaded', function () {

    const deadline = '2022-12-11';

    function getTimeRemaining (endtime) {
        const now = new Date(),
            t = Date.parse(endtime) - Date.parse(now),
            days = Math.floor(t/(1000*60*60*24)),
            hours = Math.floor(t/(1000*60*60)%24),
            min = Math.floor(t/(1000*60)%60),
            sec = Math.floor(t/1000%60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'min': min,
            'sec': sec
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(`${selector}`),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            min = timer.querySelector('#minutes'),
            sec = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            const t = getTimeRemaining(endtime);
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            min.textContent = addZero(t.min);
            sec.textContent = addZero(t.sec);
            
            if(t.total <= 0) clearInterval(timeInterval);

            function addZero (i) {
                if(i<10) return '0'+i;
                else return i;
            }
        }
    }

    setClock('.timer', deadline);
});