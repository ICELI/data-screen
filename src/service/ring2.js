import CountUp from './number'

/**
 * 多级环形图标
 * @param para
 * @param doc
 * @constructor
 */
export default function Rings(para, doc){
  this.config = {
    size: para.size || 100, //圆环最外层尺寸(肯定是正方形)
    colors: para.colors || '#2589e9', //颜色列表(必须大于等于数据数组长度)
    bgColor: para.bgColor || '#ffffff',
    width: para.width || 20,  //每一个内环的宽度
    alph: 0.2  //内环底色透明度
  }
  this.vNodes = [];
  this.el = para.el || '';
  this.render = render;
  this.formatColor = formatColor;
  this.setData = function(data){
    this.data = data;
    this.render();
    //this.updateNumber();
  }

  function render(){
    var self = this;
    var config = self.config;
    var str = '';
    var id = Math.random() + '';
    if(this.el){
      if(typeof this.el == 'string'){
        this.el = doc.getElementById(this.el)
      }
    }
    str += '<div class="test" style="width:' + config.size + 'px; height:' + config.size + 'px; position:relative;">';
    str += '<div style="width:100%; height:' + config.size + 'px; top:0; left:0; line-height:' + (config.size - 40) + 'px; font-size:14px; text-align:center; position:absolute; z-index:100">' + this.data.name + '</div>'
    str += '<div style="width:100%; height:' + config.size + 'px; top:0; left:0; line-height:' + (config.size + 40) + 'px; font-size:14px; text-align:center; position:absolute; z-index:100">2017</div>';
    str += '<canvas id="can_' + id + '" width="' + config.size + '" height="' + config.size + '" style="background:transparent; transform:rotate(90deg) rotateY(180deg)"></canvas>';
    str += '</div>';

    this.el.innerHTML = str;

    window.setTimeout(function(){
      var canvas = document.getElementById('can_' + id);
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(config.size * 0.5, config.size * 0.5, config.size*0.4, 0, 2 * Math.PI, false);
      ctx.lineWidth = 12;
      ctx.strokeStyle = formatColor(config.bgColor, config.alph);
      ctx.stroke();
      ctx.closePath();
      var color = self.data.color;

      (function __move(start, curr, dist){
        curr = curr + 0.06;
        window.setTimeout(function(){
          ctx.beginPath();
          ctx.arc(config.size * 0.5, config.size * 0.5, config.size*0.4, start * Math.PI, curr * Math.PI, false);
          ctx.strokeStyle = formatColor(color, 1);
          ctx.stroke();
          ctx.closePath();
          if(curr <= dist){
            __move(start, curr, dist);
          }
        }, 10);
      })(0, 0, self.data.value);
    }, 0);
  }

  function VNode(para){
    this.value = para.value || 0;
    this.display = String(para.display || 0) || '0';
    this.unit = para.unit || '';
    this.ide = String(para.ide) || '';
    this.id = String(para.id) || '';
    this.nodes = {
      el: 'ring' + (this.ide + this.id),
      left: 'sp' + (this.ide + this.id) + '_left',
      right: 'sp' + (this.ide + this.id) + '_right',
      point: 'sp' + (this.ide + this.id) + '_pointer'
    }
    var decimals = (this.display.indexOf('.') > -1) ? this.display.substring(this.display.indexOf('.') + 1, 20).length : 0;
    this.number = new CountUp(this.id, 0, (this.display), decimals, 3, {
      useEasing : true,
      useGrouping : true,
      separator : '',
      decimal : '.',
      suffix: this.unit
    });
    this.translate = function(){
      this.nodes.el = _$(this.nodes.el);
      this.nodes.left = _$(this.nodes.left);
      this.nodes.right = _$(this.nodes.right);
      this.nodes.point = _$(this.nodes.point);
      this.number.d = _$(this.id).querySelectorAll('[number]')[parseInt(this.ide)];
      this.number.start();
    }
    this.render = function(config){
      var lo = this.nodes.left;
      var ro = this.nodes.right;
      var point = this.nodes.point;
      var col = this.value;
      var dir = config.dir[this.ide];
      var odd = (dir == 'DIR') ? (this.ide % 2 == 0) : (dir == 'LEFT') ? false : true;
      point && (point.style.webkitTransitionDuration = config.duration + 's');
      if(odd){
        point && (point.style.transform = 'rotate(' + col * 360 + 'deg)');
        if(col > 0.5){
          var _timer = parseFloat(0.5 / col) * config.duration;
          ro.style.webkitTransitionDuration = _timer + 's';
          ro.style.transform = 'rotate(180deg)';
          window.setTimeout(function(){
            lo.style.webkitTransitionDuration = parseFloat((col - 0.5) / col) * config.duration + 's';
            lo.style.transform = 'rotate(' + (col - 0.5) * 360 + 'deg)';
          }, _timer * 1000);
        }else{
          ro.style.webkitTransitionDuration = config.duration + 's';
          ro.style.transform = 'rotate(' + col * 360 + 'deg)';
        }
      }else{
        point && (point.style.transform = 'rotate(-' + col * 360 + 'deg)');
        if(col > 0.5){
          var _timer = parseFloat(0.5 / col) * config.duration;
          lo.style.webkitTransitionDuration = _timer + 's';
          lo.style.transform = 'rotate(-180deg)';
          window.setTimeout(function(){
            ro.style.webkitTransitionDuration = parseFloat((col - 0.5) / col) * config.duration + 's';
            ro.style.transform = 'rotate(-' + (col - 0.5) * 360 + 'deg)';
          }, _timer * 1000);
        }else{
          lo.style.webkitTransitionDuration = config.duration + 's';
          lo.style.transform = 'rotate(-' + col * 360 + 'deg)';
        }
      }
    }
    this.update = function(value, config){
      if(value == this.value)  return ;
      var self = this;
      var oldVal = this.value;
      var lo = this.nodes.left;
      var ro = this.nodes.right;
      var point = this.nodes.point;
      var dir = config.dir[this.ide];
      var odd = (dir == 'DIR') ? (this.ide % 2 == 0) : (dir == 'LEFT') ? false : true;
      if(odd){
        if(value > 0.5){
          if(oldVal > 0.5){
            point && (point.style.webkitTransitionDuration = config.duration + 's');
            point && (point.style.transform = 'rotate(' + value * 360 + 'deg)');
            lo.style.webkitTransitionDuration = config.duration + 's';
            lo.style.transform = 'rotate(' + (value - 0.5) * 360 + 'deg)';
            self.value = value;
          }else{
            var sub = value - oldVal;
            point && (point.style.webkitTransitionDuration = (parseFloat((0.5 - oldVal) / sub)) * config.duration + 's');
            point && (point.style.transform = 'rotate(180deg)');
            ro.style.webkitTransitionDuration = (parseFloat((0.5 - oldVal) / sub)) * config.duration + 's';
            ro.style.transform = 'rotate(180deg)';
            window.setTimeout(function(){
              point && (point.style.webkitTransitionDuration = (parseFloat((sub - (0.5 - oldVal)) / sub)) * config.duration + 's');
              point && (point.style.transform = 'rotate(' + value * 360 + 'deg)');
              lo.style.webkitTransitionDuration = (parseFloat((sub - (0.5 - oldVal)) / sub)) * config.duration + 's';
              lo.style.transform = 'rotate(' + (value - 0.5) * 360 + 'deg)';
              self.value = value;
            }, (parseFloat((0.5 - oldVal) / sub)) * config.duration * 1000);
          }
        }else{
          if(oldVal > 0.5){
            var sub = oldVal - value;
            point && (point.style.webkitTransitionDuration = (parseFloat((oldVal - 0.5) / sub)) * config.duration + 's');
            point && (point.style.transform = 'rotate(0)');
            lo.style.webkitTransitionDuration = (parseFloat((oldVal - 0.5) / sub)) * config.duration + 's';
            lo.style.transform = 'rotate(0)';
            window.setTimeout(function(){
              point && (point.style.webkitTransitionDuration = (config.duration - parseFloat((oldVal - 0.5) / sub) * config.duration) + 's');
              point && (point.style.transform = 'rotate(' + value * 360 + 'deg)');
              ro.style.webkitTransitionDuration = (config.duration - parseFloat((oldVal - 0.5) / sub) * config.duration) + 's';
              ro.style.transform = 'rotate(' + value * 360 + 'deg)';
              self.value = value;
            }, (parseFloat((oldVal - 0.5) / sub)) * config.duration * 1000);
          }else{
            point && (point.style.webkitTransitionDuration = config.duration + 's');
            point && (point.style.transform = 'rotate(' + value * 360 + 'deg)');
            ro.style.webkitTransitionDuration = config.duration + 's';
            ro.style.transform = 'rotate(' + value * 360 + 'deg)';
            self.value = value;
          }
        }
      }else{
        if(value > 0.5){
          if(oldVal > 0.5){
            point && (point.style.webkitTransitionDuration = config.duration + 's');
            point && (point.style.transform = 'rotate(-' + value * 360 + 'deg)');
            ro.style.webkitTransitionDuration = config.duration + 's';
            ro.style.transform = 'rotate(-' + (value - 0.5) * 360 + 'deg)';
            self.value = value;
          }else{
            var sub = value - oldVal;
            point && (point.style.webkitTransitionDuration = (parseFloat((0.5 - oldVal) / sub)) * config.duration + 's');
            point && (point.style.transform = 'rotate(-180deg)');
            lo.style.webkitTransitionDuration = (parseFloat((0.5 - oldVal) / sub)) * config.duration + 's';
            lo.style.transform = 'rotate(-180deg)';
            window.setTimeout(function(){
              point && (point.style.webkitTransitionDuration = (parseFloat((sub - (0.5 - oldVal)) / sub)) * config.duration + 's');
              point && (point.style.transform = 'rotate(-' + value * 360 + 'deg)');
              ro.style.webkitTransitionDuration = (parseFloat((sub - (0.5 - oldVal)) / sub)) * config.duration + 's';
              ro.style.transform = 'rotate(-' + (value - 0.5) * 360 + 'deg)';
              self.value = value;
            }, (parseFloat((0.5 - oldVal) / sub)) * config.duration * 1000);
          }
        }else{
          if(oldVal > 0.5){
            var sub = oldVal - value;
            point && (point.style.webkitTransitionDuration = (parseFloat((oldVal - 0.5) / sub)) * config.duration + 's');
            point && (point.style.transform = 'rotate(0)');
            ro.style.webkitTransitionDuration = (parseFloat((oldVal - 0.5) / sub)) * config.duration + 's';
            ro.style.transform = 'rotate(0)';
            window.setTimeout(function(){
              point && (point.style.webkitTransitionDuration = (config.duration - parseFloat((oldVal - 0.5) / sub) * config.duration) + 's');
              point && (point.style.transform = 'rotate(-' + value * 360 + 'deg)');
              lo.style.webkitTransitionDuration = (config.duration - parseFloat((oldVal - 0.5) / sub) * config.duration) + 's';
              lo.style.transform = 'rotate(-' + value * 360 + 'deg)';
              self.value = value;
            }, (parseFloat((oldVal - 0.5) / sub)) * config.duration * 1000);
          }else{
            point && (point.style.webkitTransitionDuration = config.duration + 's');
            point && (point.style.transform = 'rotate(-' + value * 360 + 'deg)');
            lo.style.webkitTransitionDuration = config.duration + 's';
            lo.style.transform = 'rotate(-' + value * 360 + 'deg)';
            self.value = value;
          }
        }
      }
    }
  }

  function formatColor(color, alph){
    if(color && color.length >= 6){
      color = color.replace('#', '');
      return 'rgba(' + parseInt(color.substring(0, 2), 16) + ',' + parseInt(color.substring(2, 4), 16) + ',' + parseInt(color.substring(4, 6), 16) + ',' + (alph || 1.0) + ')';
    }
  }
}
