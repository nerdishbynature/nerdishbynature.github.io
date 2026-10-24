// Small readout next to the cursor showing its page position in mm,
// like the X/Y display on a printer.
(function () {
  var touch = window.matchMedia("(hover: none)").matches;
  if (touch) return;

  var readout = document.getElementById("nozzle");
  if (!readout) return;

  var PX_PER_MM = 3.78; // CSS px at 96 dpi
  var idleTimer;

  window.addEventListener("mousemove", function (e) {
    var x = (e.pageX / PX_PER_MM).toFixed(1);
    var y = (e.pageY / PX_PER_MM).toFixed(1);
    readout.textContent = "X " + x + "  Y " + y;
    var flip = e.clientX > window.innerWidth - 160;
    readout.style.transform = "translate(" + (e.clientX + (flip ? -150 : 16)) + "px," + (e.clientY + 16) + "px)";
    readout.style.opacity = "1";
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { readout.style.opacity = "0"; }, 1200);
  }, { passive: true });

  document.addEventListener("mouseleave", function () {
    readout.style.opacity = "0";
  });
})();
