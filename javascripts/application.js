$.ajax({
  url: 'https://api.github.com/repos/codepdx/meetings/contents/future',
  success: function(resp) { renderFutureMeetings(resp); },
  error: function() {
    $('#future-meetings').html('An error occurred while loading upcoming meetings.')
  }
});

function renderFutureMeetings(resp) {
  if (resp instanceof Array) {
    $('#future-meetings').html('<ol></ol>')
    $.each(resp, function(index, meeting) {
      $.ajax({
        beforeSend: function(req) { req.setRequestHeader('Accept', 'application/vnd.github.VERSION.raw') },
        url: 'https://api.github.com/repos/codepdx/meetings/contents/' + meeting.path,
        success: function(resp) {
          resp = JSON.parse(resp);
          renderMeeting(resp);
        },
        error: function(err) {
          $('future-meetings').html('An error occured while loading upcoming meetings.');
          console.log(err);
        }
      });
    });
  } else {
    $('#future-meetings').html('No future meetings scheduled.');
  }
}

function renderMeeting(meeting) {
  var element = '<li>'
  element += '<strong>' + meeting.title + '</strong>'
  element += ' - ' + meeting.description
  element += ' <strong>date:</strong> ' + meeting.date
  element += ' - <strong>View on <a href=\"' + meeting.calagator + '\">Calagator</a></strong>.'
  element += '</li>'
  $('#future-meetings ol').append(element);
}
