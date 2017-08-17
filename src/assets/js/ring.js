import CountUp from './number'

/**
 * 多级环形图标
 * @param para
 * @param doc
 * @constructor
 */
export default function Rings(para, doc){
  this.config = {
    title: para.title || '',
    size: para.size || 300, //圆环最外层尺寸(肯定是正方形)
    colors: para.colors || ['#2589e9','#08f6ff','#ff3273','#f3ff00','#fed267'], //颜色列表(必须大于等于数据数组长度)
    width: para.width || 14,  //每一个内环的宽度
    split: para.split || 8,   //内环与内环之间的间隔
    alph: 0.2,  //内环底色透明度
    duration: para.duration || 2.0,  //数据动画过渡时长
    dir: para.dir || 'DIR',  //是否要分左右方向转动: DIR=左右分; LEFT=只往左; RIGHT=只往右
    smooth: para.smooth,
    label: para.label,
    rotate: !!para.rotate
  }
  this.vNodes = [];
  this.el = para.el || '';
  this.render = render;
  this.formatColor = formatColor;
  this.setData = function(data){
    this.data = data;
    this.render();
    this.updateNumber();
  }
  this.updateNumber = function(){
    if(this.el && (typeof this.el  === 'object')){

    }
  }

  function _$(id){
    return (id != undefined) ? document.getElementById(id) : null;
  }

  function render(force){
    var self = this;
    var config = self.config;
    var str = '';
    var id = String(this.el || '');
    var obj = null;
    this.el && (Object.prototype.toString.call(this.el) == '[object String]') && (obj = doc.getElementById(this.el));
    this.vNodes = [];
    //如果数组个数没有变,则不重构document
    if(this.data && (this.data.length != this.vNodes.length || force)){
      this.data && config.colors && (config.colors.length >= this.data.length) && this.data.forEach(function(col, idx){
        self.vNodes.push(new VNode({
          value: col.value,
          unit: col.unit,
          display: col.display,
          ide: idx,
          id: id
        }));
        var top = (idx == 0) ? 0 : idx * (config.width + config.split);
        var size = (idx == 0) ? config.size : config.size - idx * (config.width + config.split) * 2;
        var inner_size = size - config.width * 2;
        var zIdx = idx * 10;
        str += '<div name="ring" id="ring' + (idx + id) + '" style="-webkit-transition: all 2s ease; transform-origin: center center; border-radius:' + config.size + 'px; z-index:' + zIdx + '; position:absolute; left:' + top + 'px; top:' + top + 'px; width:' + size + 'px; height:' + size + 'px; background:' + self.formatColor(config.colors[idx], config.alph) + '">';
        if(config.smooth){
          str += '<div id="sp' + (idx + id) + '_pointer" style="width:' + size + 'px; transition-property:all; transition-timing-function:linear; transform-origin:center center; height:' + size + 'px; position:absolute; z-index:' + (zIdx + 3) + ';">';
          str += '<span style="width:' + config.width + 'px; left:50%; margin-left:-' + config.width * 0.5 + 'px; height:' + config.width + 'px; border-radius:' + config.width + 'px; background:' + config.colors[idx] + '; position:absolute; z-index:"></span>';
          str += '</div>';
          str += '<span style="width:' + config.width + 'px; left:50%; margin-left:-' + config.width * 0.5 + 'px; height:' + config.width + 'px; z-index:' + (zIdx + 2) + '; border-radius:' + config.width + 'px; background:' + config.colors[idx] + '; position:absolute; z-index:"></span>';
        }

        str += '<div style="width:' + size * 0.5 + 'px; position:relative; float:left; height:' + size + 'px;" data-dir="左边">';
        str += '<span id="sp' + (idx + id) + '_left" style="transition-property:all; transition-timing-function:linear; transform-origin:left; width:' + size * 0.5 + 'px; height:' + size + 'px; border-radius:0 ' + size + 'px ' + size + 'px 0; background:' + self.formatColor(config.colors[idx]) + '; margin-left:' + size * 0.5 + 'px;"></span>';
        str += '</div>';

        str += '<div style="width:' + size * 0.5 + 'px; position:relative; float:left; height:' + size + 'px;" data-dir="右边">';
        str += '<span id="sp' + (idx + id) + '_right" style="transition-property:all; transition-timing-function:linear; transform-origin:right; width:' + size * 0.5 + 'px; height:' + size + 'px; border-radius:' + size + 'px 0 0 ' + size + 'px; background:' + self.formatColor(config.colors[idx]) + '; margin-left:-' + size * 0.5 + 'px;"></span>';
        str += '</div>';

        str += '<div style="width:' + inner_size + 'px; z-index:' + (zIdx + 5) + '; height:' + inner_size + 'px; position:absolute; border-radius:' + inner_size + 'px; background:#0E1F3B; margin:' + config.width + 'px;"></div>';
        str += '</div>';
      });
      var html = ''
      if(config.title && config.title.name){
        html += '<h1 class="' + config.title.className + '">' + config.title.name + '</h1>';
      }
      html += '<div style="width:100%; height:100%; position:relative;">';
      this.data && config.colors && (config.colors.length >= this.data.length) && this.data.forEach(function(col, idx){
        var name = col.name;
        var value = col.value;
        var color = config.colors[idx];
        var label = config.label.replace('{{name}}', name).replace('{{value}}', value * 100).replace('{{color}}', color).replace('{{$index}}', idx);
        if(idx % 2 == 0){
          html += '<li style="position:absolute; left:0; width:auto; height:auto; margin-top:' + (idx / 2) * 90 + 'px">' + label + '</li>';
        }else{
          html += '<li style="position:absolute; right:0; width:auto; height:auto; margin-top:' + ((idx - 1) / 2) * 90 + 'px">' + label + '</li>';
        }
      });
      html += '<div class="ring-content" style="display:inline-block; position:relative; width:' + config.size + 'px; height:' + config.size + 'px; transform-style:preserve-3d;">' + str + '</div></div>';
      obj.innerHTML = html;

      this.vNodes && this.vNodes.forEach(function(node){
        node.translate();
      });

      var rings = document.getElementsByName('ring');

      var flag = 0;
      if(config.rotate){
        window._ringTimer = window.setInterval(function(){
          var deg = 0;
          if(flag % 2 == 0){
            deg = 0;
          }else{
            deg = 360;
          }
          rings[0].style.transform = 'rotateY(' + deg + 'deg)';
          window.setTimeout(function(){
            rings[1].style.transform = 'rotateY(-' + deg + 'deg)';
          }, 100);
          rings[2].style.transform = 'rotateY(' + deg + 'deg)';
          flag = flag + 1;

        }, 5000);
      }

      self.data && self.data.forEach(function(col, idx){
        window.setTimeout(function(){
          //document.getElementById('ring' + (idx + id)).style.transform = 'scale(1.0, 1.0)';
          if(idx == self.data.length - 1){
            window.setTimeout(function(){
              self.vNodes && self.vNodes.forEach(function(node, idx2){
                node.render(self.config);
              });
            }, 500);
          }
        }, idx * 100)
      });
    }else{
      //没有变化
      this.data && self.vNodes && self.vNodes.forEach(function(node, idx){
        node.update(self.data[idx].value, self.config);
        node.number.update(self.data[idx].display)
      });
    }
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
