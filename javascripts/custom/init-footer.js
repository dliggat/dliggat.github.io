(function() {


// Don't actually want to use this - but it's neat. Fade body in and out.j
// function newpage() {
//   window.location = newLocation;
// }
// $('a').click(function(e) {
//   e.preventDefault();
//   newLocation = this.href;
//   $('body').fadeOut('fast', newpage);
// });


  function updateDuration() {
    var blogStarted = moment([2013, 05, 07]),  // TODO: Grab this from configuration.
                now = moment(),
               unit = 'years',
               diff = now.diff(blogStarted, unit, true);

    var duration = diff.toFixed(8) + ' ' + unit;
    $('#site-duration').html(duration);
  }

  $(document).ready(function() {
    var frequencyMillis = 2000;
    updateDuration();
    setInterval(updateDuration, frequencyMillis);
  });

})();
