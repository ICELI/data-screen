export default function (selector) {
  // todo 重写 dom ready
  const scrollList = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;

  for (let i = 0, l = scrollList.length; i < l; i++) {
    scroll(scrollList[i]);
  }

  function scroll(selector, speed = -1) {
    const oUl = selector;
    let timer = null;
    oUl.innerHTML += oUl.innerHTML;
    setTimeout(move, 1500); // 先看两眼再滚动
    oUl.onmouseover = function () {
      cancelAnimationFrame(timer);
    };
    oUl.onmouseout = function () {
      move();
    };
    function move() {
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        oUl.style.top = `${oUl.offsetTop + speed}px`;
        if (oUl.offsetTop <= -oUl.offsetHeight / 2) {
          oUl.style.top = '0';
        } else if (oUl.offsetTop >= 0) {
          oUl.style.top = `${-oUl.offsetHeight / 2}px`;
        }
        timer = requestAnimationFrame(fn);
      });
    }
  }
}
