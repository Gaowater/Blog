(function(){
  var ready = function(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  };
  ready(function(){
    var els = document.querySelectorAll('.highlight-block:last-of-type li');
    var el = els[els.length - 1];
    if (!el) return;
    el.style.cursor = 'pointer';
    el.setAttribute('title', '双击有惊喜 ✨');
    el.addEventListener('dblclick', function(e){
      var startX = e.clientX;
      var startY = e.clientY;
      var count = 0;
      var maxHearts = 20;
      var interval = setInterval(function(){
        if (count >= maxHearts) { clearInterval(interval); return; }
        count++;
        var heart = document.createElement('span');
        heart.innerHTML = '♥';
        var x = startX + (Math.random() - 0.5) * 60;
        var y = startY;
        var size = 12 + Math.random() * 16;
        heart.style.cssText = 'position:fixed;left:'+x+'px;top:'+y+'px;font-size:'+size+'px;pointer-events:none;z-index:9999;transition:all 1s cubic-bezier(0,.5,.5,1);opacity:1;color:#ffb6c1!important;transform:scale(0);';
        document.body.appendChild(heart);
        var angle = -Math.PI/2 + (Math.random() - 0.5) * 1.5;
        var dist = 30 + Math.random() * 90;
        requestAnimationFrame(function(){
          heart.style.transform = 'translate('+Math.cos(angle)*dist+'px,'+(Math.sin(angle)*dist)+'px) scale(1)';
          heart.style.opacity = '0.8';
        });
        setTimeout(function(){
          heart.style.transform = 'translate('+Math.cos(angle)*dist*1.2+'px,'+(Math.sin(angle)*dist*1.2-30)+'px) scale(0.1)';
          heart.style.opacity = '0';
        }, 700);
        setTimeout(function(){ heart.remove(); }, 1300);
      }, 100);
    });
  });
})();
