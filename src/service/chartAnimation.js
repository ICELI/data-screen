/**
 * 图表定时动画
 * @param array
 * @param times
 * @param vm
 * @returns {clearTimers}
 */
export default function chartAnimation(array, times, vm) {
  let timeoutArray = [];
  let intervalArray = [];

  array.forEach((v, i) => {
    vm[v.chart].setOption(v.option); // 初始化绘制一次

    timeoutArray.push(setTimeout(() => {
      vm[v.chart].clear();
      vm[v.chart].setOption(v.option); // 第一次定时执行，间隔times时间（默认5秒）

      intervalArray.push(setInterval(() => {
        vm[v.chart].clear();
        vm[v.chart].setOption(v.option);
      }, times * 3 * 1000));

    }, times * (i + 1) * 1000));
  });

  return function clearTimers() {
    timeoutArray.forEach(function(v) {
      clearTimeout(v);
    });
    intervalArray.forEach(function(v) {
      clearInterval(v);
    });
  }
}
