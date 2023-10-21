(function () {
  function countTo(element, options) {
    options = options || {};
    var from = options.from || 0;
    var to = options.to || 0;
    var speed = options.speed || 1000;
    var refreshInterval = options.refreshInterval || 100;
    var decimals = options.decimals || 0;
    var formatter = options.formatter || defaultFormatter;
    var onUpdate = options.onUpdate || null;
    var onComplete = options.onComplete || null;

    var loops = Math.ceil(speed / refreshInterval);
    var increment = (to - from) / loops;
    var currentCount = from;
    var loopCount = 0;

    var interval = setInterval(function () {
      currentCount += increment;
      loopCount++;

      render(currentCount);

      if (typeof onUpdate === "function") {
        onUpdate(currentCount);
      }

      if (loopCount >= loops) {
        clearInterval(interval);
        currentCount = to;

        if (typeof onComplete === "function") {
          onComplete(currentCount);
        }
      }
    }, refreshInterval);

    function render(value) {
      var formattedValue = formatter(value, decimals);
      element.innerHTML = formattedValue;
    }

    function defaultFormatter(value, decimals) {
      return value.toFixed(decimals);
    }
  }

  // custom formatting example
  var countElements = document.querySelectorAll(".count-number");
  countElements.forEach(function (element) {
    var options = {
      decimals: 0,
      formatter: function (value, decimals) {
        return value.toFixed(decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
      }
    };
    var from = element.getAttribute("data-from");
    var to = element.getAttribute("data-to");
    options.from = parseFloat(from);
    options.to = parseFloat(to);
    countTo(element, options);
  });
})();
