export default function(selector, speed = -1) {
  const scrollList = typeof selector === 'string' ? document.querySelectorAll(
    selector) : selector;
  const timerArray = [];

  for (let i = 0, l = scrollList.length; i < l; i++) {
    timerArray.push(scroll(scrollList[i]));
  }

  function scroll(selector) {
    let oUl = selector;
    let timer = null;
    let sTimer = setTimeout(function() {
      oUl.innerHTML += oUl.innerHTML;
      move();
    }, 1500); // 先看两眼再滚动
    oUl.onmouseover = function() {
      clearInterval(timer);
    };
    oUl.onmouseout = function() {
      move();
    };
    function move() {
      timer = setInterval(() => {
        oUl.style.top = `${oUl.offsetTop + speed}px`;
        if (oUl.offsetTop <= -oUl.offsetHeight / 2) {
          oUl.style.top = '0';
        } else if (oUl.offsetTop >= 0) {
          oUl.style.top = `${-oUl.offsetHeight / 2}px`;
        }
      }, 30);
      console.log('move', timer, sTimer);
    }

    function stop() {
      clearInterval(timer);
      clearTimeout(sTimer);
      console.log('stop', timer, sTimer);
    }

    console.log('return', timer, sTimer);
    return stop;
  }

  function clearScrollInterval() {
    timerArray.forEach(function(v) {v();});
  }

  return clearScrollInterval;
}
