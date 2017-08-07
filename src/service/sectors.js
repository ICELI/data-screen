import CountUp from './number'

/**
 * 多级环形图标
 * @param para
 * @param doc
 * @constructor
 */
export default function Sectors(para, doc){
  this.config = {
    title: para.title || '',
    size: para.size || 150, //扇形半径最大值
    colors: para.colors || ['#2589e9','#08f6ff','#ff3273','#f3ff00','#fed267'], //颜色列表(必须大于等于数据数组长度)
    innerSize: para.innerSize,  //内环的宽度
    duration: para.duration || 3.0,  //数据动画过渡时长
    split: para.split || 20,
    offset: para.offset || 0
  }
  this.el = para.el || '';
  this.render = render;
  this.formatColor = formatColor;
  this.setData = function(data){
    this.data = data;
    this.render();
  }

  function render(){
    var self = this;
    var config = self.config;
    var id = this.el || '';
    this.el && (Object.prototype.toString.call(this.el) == '[object String]') && (this.el = doc.getElementById(this.el));
    this.el.style.textAlign = 'center';

    var str = '<div id="test" style="width:' + (config.size * 2) + 'px; height:' + (config.size * 2) + 'px; transform:rotate(-90deg); opacity:0; transition-duration:2s; transition-property:all; transition-timing-function:ease; position:relative; overflow:visible; display:inline-block; border:solid 1px #999; border-radius:' + config.size * 2 + 'px;">';
    var deg = 0 + config.offset;

    this.data && config.colors && (config.colors.length >= this.data.length) && this.data.forEach(function(col, idx){
      var _x = Math.sin(((0 - 360 * col.percent * 0.5) - deg) * (Math.PI / 180)) * (config.size) + (config.size) - 12;
      var _y = (config.size) - Math.cos(((0 - 360 * col.percent * 0.5) - deg) * (Math.PI / 180)) * (config.size) - 5;
      str += '<span name="sector_' + self.id + '_pointer" style="width:20px; transform:scale(0.5, 1); border-radius:40px; transition-duration:0.2s; transition-property:all; transition-timing-function:ease; height:10px; background:' + config.colors[idx] + '; top:' + _y + 'px; left:' + _x + 'PX; display:block; position:absolute; z-index:1000"></span>';
      if(_x < config.size){
        str += '<div name="sector_' + self.id + '_tip" style="height:24px; opacity:0; width:200px; color:#C9ECFF; position:absolute; top:' + (_y - 6) + 'px; font-size:14px; text-align:right; left:' + (_x - 208) + 'px;"><a num="' + '">' + col.industry + ' </a><a num="' + col.percent * 100 + '"></a></div>';
      }else{
        str += '<div name="sector_' + self.id + '_tip" style="height:24px; opacity:0; width:200px; color:#C9ECFF; position:absolute; top:' + (_y - 6) + 'px; font-size:14px; padding-left:32px; text-align:left; left:' + _x + 'px;"><a>' + col.industry + ' </a><a num="' + col.percent * 100 + '"></a></div>';
      }
      deg = deg + 360 * col.percent;
    });
    var deg = 0 + config.offset;
    this.data && config.colors && (config.colors.length >= this.data.length) && this.data.forEach(function(col, idx){
      var radius = col.radius * (config.size - config.split);
      var value = col.percent || 0;

      str += '<div deg="' + deg + '" name="sector" style="width:' + radius * 2 + 'px; z-index:' + (20 - idx) + '; transition-duration:1s; overflow:hidden; opacity:1; transition-property:all; transition-timing-function:ease; transform-origin:center center; transform:rotate(-' + deg + 'deg) scale(0,0); height:' + radius * 2 + 'px; border-radius:' + radius + 'px; position:absolute; margin:' + (config.size - radius) + 'px;">';
      if(value < 0.5){
        str += '<div style="width:' + radius + 'px; height:' + radius * 2 + 'px; float:left; overflow:hidden;">';
        str += '<span style="width:' + radius + 'px; height:' + radius * 2 + 'px; box-shadow:-2px 1px 16px #454545; display:block; transform-origin:left; transform:rotate(-' + 360 * col.percent + 'deg); margin-left:' + radius + 'px; border-radius:0 ' + radius + 'px ' + radius + 'px 0; background:' + config.colors[idx] + ';"></span>'
        str += '</div>';
      }else{
        str += '<div style="width:' + radius + 'px; height:' + radius * 2 + 'px; float:left;">';
        str += '<span style="width:' + radius + 'px; height:' + radius * 2 + 'px; display:block; transform-origin:left; transform:rotate(180deg); margin-left:' + radius + 'px; border-radius:0 ' + radius + 'px ' + radius + 'px 0; background:' + config.colors[idx] + ';"></span>'
        str += '</div>';
        str += '<div style="width:' + radius + 'px; height:' + radius * 2 + 'px; float:left;">';
        str += '<span style="width:' + radius + 'px; height:' + radius * 2 + 'px; display:block; transform-origin:right; transform:rotate(' + 360 * (col.percent - 0.5) + 'deg); margin-left:-' + radius + 'px; border-radius:' + radius + 'px 0 0 ' + radius + 'px; background:' + config.colors[idx] + ';"></span>'
        str += '</div>';
      }
      str += '</div>';
      deg = deg + 360 * col.percent;
    });
    str += '<div id="inner_' + this.id + '" style="width:' + config.innerSize * 2 + 'px; height:' + config.innerSize * 2 + 'px; transition-duration:0.6s; transition-timing-function:ease; transition-property:all; transform:scale(0,0); border-radius:' + config.innerSize * 2 + 'px; z-index:30; background:#0E1F3B; margin:' + (config.size - config.innerSize) + 'px; position:absolute;"></div>';
    str += '<span id="temp_' + this.id + '" style="display:none;"></span>';
    str += '</div>';
    this.el.innerHTML = str;

    var pointers = document.getElementsByName('sector_' + this.id + '_pointer');
    var tips = document.getElementsByName('sector_' + this.id + '_tip');

    window.setTimeout(function(){
      var ring = document.getElementById('test');
      ring.style.transform = 'rotate(0)';
      ring.style.opacity = 1.0;

      window.setTimeout(function(){
        if(pointers){
          for(var i=0; i<pointers.length; i++){
            pointers[i].style.transform = 'scale(1, 1)';
            pointers[i].style.borderRadius = 0;
          }
        }
        window.setTimeout(function(){
          if(tips){
            for(var i=0; i<tips.length; i++){
              tips[i].style.opacity = 1.0;
            }
          }
        }, 500);
      }, 2000);

      window.setTimeout(function(){
        var divs = document.getElementsByName('sector');
        for(var i=0; i<divs.length; i++){
          (function(){
            var div = divs[i];
            window.setTimeout(function(){
              div.style.opacity = 1.0;
              div.style.transform = 'rotate(-' + div.getAttribute('deg') + 'deg) scale(1,1)';
            }, 200 + i * 75);
          })();
        }
        var numbers = self.el.querySelectorAll('a[num]');
        for(var i=0; i<numbers.length; i++){
          if(numbers[i].getAttribute('num')){
            var num = new CountUp('temp_' + self.id, 0, parseFloat(numbers[i].getAttribute('num')), 1, 2, {
              useEasing : true,
              useGrouping : true,
              separator : '',
              decimal : '.',
              suffix: '%'
            });
            num.d = numbers[i];
            num.start();
          }
        }
        document.getElementById('inner_' + self.id).style.transform = 'scale(1, 1)'
      }, 100);

    }, 0);
  }

  function formatColor(color, alph){
    if(color && color.length >= 6){
      color = color.replace('#', '');
      return 'rgba(' + parseInt(color.substring(0, 2), 16) + ',' + parseInt(color.substring(2, 4), 16) + ',' + parseInt(color.substring(4, 6), 16) + ',' + (alph || 1.0) + ')';
    }
  }
}
