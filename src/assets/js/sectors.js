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

  function _getRect(data, config){
    var list = {
      left: [],
      right: []
    };
    var deg = 0 + config.offset;
    data && data.forEach(function(ele){
      var _x = Math.sin(((0 - 360 * ele.percent * 0.5) - deg) * (Math.PI / 180)) * (config.size) + (config.size) - 12;
      var _y = (config.size) - Math.cos(((0 - 360 * ele.percent * 0.5) - deg) * (Math.PI / 180)) * (config.size) - 5;
      if(_x < config.size){
        list.left.push(_y)
      }else{
        list.right.push(_y)
      }
      deg = deg + 360 * ele.percent;
    });
    return list;
  }

  function __getMaxOrMin(list, idx, init, type){
    if(list.length < 2){
      return list[0]
    }else if(list.length == 2){
      return Math[type](list[0], list[1]);
    }else{
      var rs = Math[type](init, list[idx]);
      if(idx + 1 < list.length){
        rs = __getMaxOrMin(list, idx + 1, rs, type);
      }
      return rs;
    }
  }

  function render(){
    var self = this;
    var config = self.config;
    var id = this.el || '';
    this.el && (Object.prototype.toString.call(this.el) == '[object String]') && (this.el = doc.getElementById(this.el));
    this.el.style.textAlign = 'center';
    this.el.innerHTML = '';

    var str = '<div id="test" style="width:' + (config.size * 2) + 'px; backface-visibility:hidden; height:' + (config.size * 2) + 'px; margin: '+ (this.el.offsetHeight - config.size * 2)/2 +'px 20px 0 0; transform:rotate(-90deg); opacity:0; transition-duration:2s; transition-property:all; transition-timing-function:ease; position:relative; overflow:visible; display:inline-block; border:solid 1px #999; border-radius:' + config.size * 2 + 'px;">';
    var deg = 0 + config.offset;
    var list = _getRect(this.data, config);
    var left_max = __getMaxOrMin(list.left, 1, list.left[0], 'max');
    var left_min = __getMaxOrMin(list.left, 1, list.left[0], 'min');
    var right_max = __getMaxOrMin(list.right, 1, list.right[0], 'max');
    var right_min = __getMaxOrMin(list.right, 1, list.right[0], 'min');

    this.data && config.colors && (config.colors.length >= this.data.length) && this.data.forEach(function(col, idx){
      var _x = Math.sin(((0 - 360 * col.percent * 0.5) - deg) * (Math.PI / 180)) * (config.size) + (config.size) - 12;
      var _y = (config.size) - Math.cos(((0 - 360 * col.percent * 0.5) - deg) * (Math.PI / 180)) * (config.size) - 5;
      str += '<span name="sector_' + id + '_pointer" style="width:20px; transform:scale(0.5, 1); border-radius:40px; transition-duration:0.5s; transition-property:all; transition-timing-function:ease; height:10px; background:' + config.colors[idx] + '; top:' + _y + 'px; left:' + _x + 'PX; display:block; position:absolute; z-index:1000"></span>';
      if(_x < config.size){
        if(_y == left_min){
          str += '<div id="sector_point_' + id + '_' + idx + '" left="' + (_x - 208 + 30) + '" dir="left" name="sector_' + id + '_tip" style="height:24px; backface-visibility:hidden; opacity:0; width:200px; transition-duration:1s; transition-property:all; transition-timing-function:ease; color:#C9ECFF; position:absolute; top:' + (_y - 6 - 24) + 'px; font-size:16px; text-align:right; left:' + (_x - 208 + 30) + 'px;"><a num="' + '">' + col.industry + ' </a><a num="' + col.percent * 100 + '"></a></div>';
        }else if(_y == left_max){
          str += '<div id="sector_point_' + id + '_' + idx + '" left="' + (_x - 208 + 30) + '" dir="left" name="sector_' + id + '_tip" style="height:24px; backface-visibility:hidden; opacity:0; width:200px; transition-duration:1s; transition-property:all; transition-timing-function:ease; color:#C9ECFF; position:absolute; top:' + (_y - 6 + 24) + 'px; font-size:16px; text-align:right; left:' + (_x - 208 + 30) + 'px;"><a num="' + '">' + col.industry + ' </a><a num="' + col.percent * 100 + '"></a></div>';
        }else{
          str += '<div id="sector_point_' + id + '_' + idx + '" left="' + (_x - 208) + '" dir="left" name="sector_' + id + '_tip" style="height:24px; backface-visibility:hidden; opacity:0; width:200px; transition-duration:1s; transition-property:all; transition-timing-function:ease; color:#C9ECFF; position:absolute; top:' + (_y - 6) + 'px; font-size:16px; text-align:right; left:' + (_x - 208) + 'px;"><a num="' + '">' + col.industry + ' </a><a num="' + col.percent * 100 + '"></a></div>';
        }
      }else{
        if(_y == right_min){
          str += '<div id="sector_point_' + id + '_' + idx + '" left="' + (_x - 30) + '" dir="right" name="sector_' + id + '_tip" style="height:24px; backface-visibility:hidden; opacity:0; width:200px; transition-duration:1s; transition-property:all; transition-timing-function:ease; color:#C9ECFF; position:absolute; top:' + (_y - 6 - 24) + 'px; font-size:16px; padding-left:32px; text-align:left; left:' + (_x - 30) + 'px;"><a>' + col.industry + ' </a><a num="' + col.percent * 100 + '"></a></div>';
        }else if(_y == right_max){
          str += '<div id="sector_point_' + id + '_' + idx + '" left="' + (_x - 30) + '" dir="right" name="sector_' + id + '_tip" style="height:24px; backface-visibility:hidden; opacity:0; width:200px; transition-duration:1s; transition-property:all; transition-timing-function:ease; color:#C9ECFF; position:absolute; top:' + (_y - 6 + 24) + 'px; font-size:16px; padding-left:32px; text-align:left; left:' + (_x - 30) + 'px;"><a>' + col.industry + ' </a><a num="' + col.percent * 100 + '"></a></div>';
        }else{
          str += '<div id="sector_point_' + id + '_' + idx + '" left="' + (_x) + '" dir="right" name="sector_' + id + '_tip" style="height:24px; backface-visibility:hidden; opacity:0; width:200px; transition-duration:1s; transition-property:all; transition-timing-function:ease; color:#C9ECFF; position:absolute; top:' + (_y - 6) + 'px; font-size:16px; padding-left:32px; text-align:left; left:' + _x + 'px;"><a>' + col.industry + ' </a><a num="' + col.percent * 100 + '"></a></div>';
        }
      }
      deg = deg + 360 * col.percent;
    });
    var deg = 0 + config.offset;
    str += '<div id="test_inner" style="width:' + (config.size * 2) + 'px; height:' + (config.size * 2) + 'px; transition-duration:4s; transition-property:all; transition-timing-function:ease-out;">'
    this.data && config.colors && (config.colors.length >= this.data.length) && this.data.forEach(function(col, idx){
      var radius = col.radius * (config.size - config.split);
      var value = col.percent || 0;

      str += '<div deg="' + deg + '" name="sector" id="sector_' + id + '_' + idx + '" style="width:' + radius * 2 + 'px; z-index:' + (20 - idx) + '; transition-duration:1.8s; overflow:hidden; opacity:1; transition-property:all; transition-timing-function:linear; transform-origin:center center; transform:rotate(-' + deg + 'deg) scale(0,0); height:' + radius * 2 + 'px; border-radius:' + radius + 'px; position:absolute; margin:' + (config.size - radius) + 'px;">';
      if(value < 0.5){
        str += '<div style="width:' + radius + 'px; height:' + radius * 2 + 'px; float:left; overflow:hidden;">';
        str += '<span style="width:' + radius + 'px; height:' + radius * 2 + 'px; box-shadow:-1px 1px 16px #666; display:block; transform-origin:left; transform:rotate(-' + 360 * col.percent + 'deg); margin-left:' + radius + 'px; border-radius:0 ' + radius + 'px ' + radius + 'px 0; background:' + config.colors[idx] + ';"></span>'
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

    str += '<div id="inner_' + id + '" style="width:' + config.innerSize * 2 + 'px; height:' + config.innerSize * 2 + 'px; transition-duration:0.6s; transition-timing-function:ease; transition-property:all; transform:scale(0,0); border-radius:' + config.innerSize * 2 + 'px; z-index:30; background:#0E1F3B; margin:' + (config.size - config.innerSize) + 'px; position:absolute;"></div>';
    str += '<span id="temp_' + id + '" style="display:none;"></span>';
    str += '</div>';
    str += '</div>'
    this.el.innerHTML = str;

    window._time3 && (window.clearTimeout(window._time3))

    window._time3 = window.setTimeout(function(){
      var pointers = document.getElementsByName('sector_' + id + '_pointer');
      var tips = document.getElementsByName('sector_' + id + '_tip');
      var ring = document.getElementById('test');
      ring.style.transform = 'rotate(0)';
      ring.style.opacity = 1.0;

      window._time7 = window.setTimeout(function(){
        if(pointers){
          for(var i=0; i<pointers.length; i++){
            pointers[i].style.transform = 'scale(1, 1)';
            pointers[i].style.borderRadius = 0;
            pointers[i].style.left = pointers[i].getAttribute('left') + 'px'
          }
        }
        window._time8 = window.setTimeout(function(){
          if(tips){
            for(var i=0; i<tips.length; i++){
              tips[i].style.opacity = 1.0;
            }
          }
        }, 500);
      }, 2000);

      window._time0 = window.setTimeout(function(){
        var divs = document.getElementsByName('sector');
        var innerDiv = document.getElementById('test_inner');

        for(var i=0; i<divs.length; i++){
          divs[i].style.webkitTransitionDuration = '0.3s';
        }

        for(var i=0; i<divs.length; i++){
          (function(){
            var div = divs[i];
            var pointer = document.getElementById(div.id.replace('sector_' + id + '_', 'sector_point_' + id + '_'));
            pointer.style.left = pointer.getAttribute('left') + 'px'

            window._time02 = window.setTimeout(function(){
              div.style.opacity = 1.0;
              div.style.transform = 'rotate(-' + div.getAttribute('deg') + 'deg) scale(1, 1)';
            }, 200 + i * 75);
          })();
          if(i == divs.length - 1){
            window._time6 = window.setTimeout(function(){
              __animation();
              window._time = window.setInterval(function(){
                __animation();
              }, 33000);

              function __animation(){

                for(var ii=0; ii<divs.length; ii++){
                  divs = document.getElementsByName('sector');

                  (function(){
                    var div = divs[ii];
                    var pointer = document.getElementById(div.id.replace('sector_' + id + '_', 'sector_point_' + id + '_'));
                    var dir = pointer.getAttribute('dir');
                    if(ii == 0){
                      div.style.transform = div.style.transform.replace('scale(1, 1)', 'scale(1.2, 1.2)');
                      pointer.style.transform = 'scale(1.2, 1.2)';
                      pointers[ii].style.transform = 'scale(1.3, 1.3)';
                      if(dir == 'left'){
                        //pointer.style.left = parseInt(pointer.style.left) - 60 + 'px'
                        pointer.style.transform = 'scale(1.2, 1.2) translateX(-15px)';
                      }else{
                        //pointer.style.left = parseInt(pointer.style.left) + 30 + 'px'
                        pointer.style.transform = 'scale(1.2, 1.2) translateX(10px)';
                      }
                      //
                    }else if(ii == divs.length - 1){
                      (function(idx){
                        window._time2 = window.setTimeout(function(){
                          var pre_pointer = document.getElementById('sector_point_' + id + '_' + (idx - 1));
                          var pre_dir = pre_pointer.getAttribute('dir');
                          div.style.transform = div.style.transform.replace('scale(1, 1)', 'scale(1.2, 1.2)');
                          pointer.style.transform = 'scale(1.2, 1.2)';
                          pointers[idx].style.transform = 'scale(1.3, 1.3)';
                          if(dir == 'left'){
                            //pointer.style.left = parseInt(pointer.style.left) - 60 + 'px'
                            pointer.style.transform = 'scale(1.2, 1.2) translateX(-15px)';
                          }else{
                            //pointer.style.left = parseInt(pointer.style.left) + 30 + 'px'
                            pointer.style.transform = 'scale(1.2, 1.2) translateX(10px)';
                          }

                          divs[idx - 1].style.transform = divs[idx - 1].style.transform.replace('scale(1.2, 1.2)', 'scale(1, 1)');
                          pre_pointer.style.transform = 'scale(1, 1)';
                          pointers[idx - 1].style.transform = 'scale(1, 1)';
                          if(pre_dir == 'left'){
                            //pre_pointer.style.left = parseInt(pre_pointer.style.left) + 60 + 'px'
                            pre_pointer.style.transform = 'scale(1, 1) translateX(0)';
                          }else{
                            //pre_pointer.style.left = parseInt(pre_pointer.style.left) - 30 + 'px'
                            pre_pointer.style.transform = 'scale(1, 1) translateX(0px)';
                          }
                          window._time21 = window.setTimeout(function(){
                            div.style.transform = div.style.transform.replace('scale(1.2, 1.2)', 'scale(1, 1)');
                            pointer.style.transform = 'scale(1, 1)';
                            pointers[idx].style.transform = 'scale(1, 1)';
                            if(dir == 'left'){
                              //pointer.style.left = parseInt(pointer.style.left) + 60 + 'px'
                              pointer.style.transform = 'scale(1, 1) translateX(0)';
                            }else{
                              //pointer.style.left = parseInt(pointer.style.left) - 30 + 'px'
                              pointer.style.transform = 'scale(1, 1) translateX(0px)';
                            }
                          }, 3000);
                        }, 3000 * idx + 101);
                      })(ii);
                    }else{
                      (function(idx){
                        window._time2 = window.setTimeout(function(){
                          var pre_pointer = document.getElementById('sector_point_' + id + '_' + (idx - 1));
                          var pre_dir = pre_pointer ? pre_pointer.getAttribute('dir') : 'left';
                          div.style.transform = div.style.transform.replace('scale(1, 1)', 'scale(1.2, 1.2)');
                          pointer.style.transform = 'scale(1.2, 1.2)';
                          pointers[idx].style.transform = 'scale(1.3, 1.3)';
                          if(dir == 'left'){
                            //pointer.style.left = parseInt(pointer.style.left) - 60 + 'px'
                            pointer.style.transform = 'scale(1.2, 1.2) translateX(-15px)';
                          }else{
                            //pointer.style.left = parseInt(pointer.style.left) + 30 + 'px'
                            pointer.style.transform = 'scale(1.2, 1.2) translateX(10px)';
                          }

                          divs[idx - 1] && (divs[idx - 1].style.transform = divs[idx - 1].style.transform.replace('scale(1.2, 1.2)', 'scale(1, 1)'));
                          pre_pointer.style.transform = 'scale(1, 1)';
                          pointers[idx - 1].style.transform = 'scale(1, 1)';
                          if(pre_dir == 'left'){
                            //pre_pointer.style.left = parseInt(pre_pointer.style.left) + 60 + 'px'
                            pre_pointer.style.transform = 'scale(1, 1) translateX(0)';
                          }else{
                            //pre_pointer.style.left = parseInt(pre_pointer.style.left) - 30 + 'px'
                            pre_pointer.style.transform = 'scale(1, 1) translateX(0)';
                          }
                        }, 3000 * idx + 100);
                      })(ii);
                    }
                  })();
                }
              }

            }, 4000);
          }
        }
        var numbers = self.el.querySelectorAll('a[num]');
        for(var i=0; i<numbers.length; i++){
          if(numbers[i].getAttribute('num')){
            var num = new CountUp('temp_' + id, 0, parseFloat(numbers[i].getAttribute('num')), 0, 2, {
              useEasing : true,
              useGrouping : true,
              separator : ',',
              decimal : '.',
              suffix: '%'
            });
            num.d = numbers[i];
            num.start();
          }
        }
        document.getElementById('inner_' + id).style.transform = 'scale(1, 1)'
      }, 100);

    }, 100);
  }

  function formatColor(color, alph){
    if(color && color.length >= 6){
      color = color.replace('#', '');
      return 'rgba(' + parseInt(color.substring(0, 2), 16) + ',' + parseInt(color.substring(2, 4), 16) + ',' + parseInt(color.substring(4, 6), 16) + ',' + (alph || 1.0) + ')';
    }
  }
}
