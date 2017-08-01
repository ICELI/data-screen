export default function (carouselData, barPolarStack) {
  // TODO: carousel
  const M = carouselData.length;
  const oDiv = document.getElementById('carousel');
  const aDiv = oDiv.getElementsByClassName('hid');
  const e4bInfo = document.querySelectorAll('.e4b-content .e4b-info');
  let x = -5;
  let y = 0;
  const delay = 5000;
  let speedX2 = 5;
  let l = 360 / M;

  let speedX = 0;
  let speedY = 0;

  for (let i = 1; i <= M; i++) {
    let oNewDiv = document.createElement('div');

    oNewDiv.className = 'hid';

    (function (oNewDiv, i) {
      setTimeout(() => {
        oNewDiv.style.transform = `rotateY(${360 * (i - 1) / M}deg) translateZ(400px)`;

        setTimeout(() => {
          if (i == M) fixAll();

          setTimeout(() => {
            oNewDiv.style.transition = 'none';
          }, 1000);
        }, 3000);
      }, (M + 3 - i) * 200);
    }(oNewDiv, i));

    oNewDiv.degY = 360 * (i - 1) / M;

    oNewDiv.innerHTML = '<div class="img"><div class="logo"></div></div>';
    oNewDiv = oNewDiv.getElementsByClassName('img')[0];

    oNewDiv.style.backgroundImage = `url(${carouselData[i - 1].bannerUrl})`;
    oNewDiv.getElementsByClassName('logo')[0].style.backgroundImage = `url(${carouselData[i - 1].logoUrl})`;

    oDiv.appendChild(oNewDiv.parentNode);
  }

  document.onmousedown = function (ev) {
    const oEvent = ev || event;
    const mouseStartX = oEvent.clientX;
    const mouseStartY = oEvent.clientY;

    const startX = x;
    const startY = y;

    let lastX = mouseStartX;
    let lastY = mouseStartY;

    speedX = speedY = 0;

    document.onmousemove = function (ev) {
      const oEvent = ev || event;

      y = startY + (oEvent.clientX - mouseStartX) / 10;
      x = startX - (oEvent.clientY - mouseStartY) / 10;

      speedX = (oEvent.clientX - lastX) / 5;
      speedY = (oEvent.clientY - lastY) / 5;

      fixAll();

      lastX = oEvent.clientX;
      lastY = oEvent.clientY;
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;

      startMove();
    };

    stopMove();

    return false;
  };

  let timer = null;

  function startMove() {
    clearInterval(timer);
    timer = setInterval(() => {
      x -= speedY;
      y += speedX;

      speedY *= 0.93;
      speedX *= 0.93;

      if (Math.abs(speedX) < 0.1 && Math.abs(speedY) < 0.1) {
        stopMove();
      }

      fixAll();
    }, 10);
  }

  function stopMove() {
    clearInterval(timer);
  }

  function fixAll() {
    oDiv.style.transform = `perspective(1000px) rotateX(0deg) rotateY(${y}deg)`;

    for (let i = 0; i < aDiv.length; i++) {
      const deg = aDiv[i].degY + y;
      let a = (deg % 360 + 360) % 360;

      a = Math.abs(180 - a);

      let d = 0.1 + (a / 180) * 0.9;

      if (d < 0.2) d = 0.2;

      aDiv[i].style.opacity = d;
      if (d > 0.99) {
        for (let j = 0; j < e4bInfo.length; j++) {
          e4bInfo[j].setAttribute('style', 'display:none!important');
        }
        e4bInfo[i].setAttribute('style', 'display:block!important');
        // if (i === 2 && !barPolarStack.isInit) {
        //   barPolarStack.resize();
        //   barPolarStack.isInit = true;
        // }
      }
    }
  }

  // todo
  let timer2 = null;

  setTimeout(play, delay);

  function play() {
    clearInterval(timer2);
    timer2 = setInterval(() => {
      y -= speedX2;
      l -= speedX2;

      speedX2 *= 0.93;

      if (Math.abs(speedX2) < 0.1 || l < 0.1) {
        clearInterval(timer2);
        speedX2 = 5;
        y -= l;
        l = 360 / M;
        setTimeout(play, delay);
      }
      fixAll();
    }, 30);
  }
}
