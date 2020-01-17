semantic.sidebar.ready = function() {
    $('.ui.sidebar')
    .find('.ui.button.sidebar')
      .on('click', function() {
        var
          transition = $(this).data('transition')
        ;
        $('ui.sidebar.left')
          .not('.styled')
          .sidebar('setting', {
            transition       : transition,
            mobileTransition : transition
          })
        ;
        $('ui.sidebar.left').not('.styled').sidebar('toggle');
      });
}

$(document)
  .ready(semantic.sidebar.ready)
;
