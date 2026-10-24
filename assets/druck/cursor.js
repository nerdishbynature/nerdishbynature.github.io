// Small readout next to the cursor showing its page position in mm,
// like the X/Y display on a printer. Updates are batched to one per frame.
(function () {
  var touch = window.matchMedia("(hover: none)").matches;
  if (touch) return;

  var readout = document.getElementById("nozzle");
  if (!readout) return;

  var PX_PER_MM = 3.78; // CSS px at 96 dpi
  var idleTimer;
  var last = null;
  var queued = false;
  var visible = false;

  function update() {
    queued = false;
    var x = (last.pageX / PX_PER_MM).toFixed(1);
    var y = (last.pageY / PX_PER_MM).toFixed(1);
    readout.textContent = "X " + x + "  Y " + y;
    var flip = last.clientX > window.innerWidth - 160;
    readout.style.transform = "translate3d(" + (last.clientX + (flip ? -150 : 16)) + "px," + (last.clientY + 16) + "px,0)";
    if (!visible) {
      readout.style.opacity = "1";
      visible = true;
    }
  }

  function hide() {
    readout.style.opacity = "0";
    visible = false;
  }

  window.addEventListener("mousemove", function (e) {
    last = e;
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(hide, 1200);
  }, { passive: true });

  document.addEventListener("mouseleave", hide);
})();
