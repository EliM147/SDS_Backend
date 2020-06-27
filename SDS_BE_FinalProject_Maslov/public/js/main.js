$(document).ready(function(){
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser(){
  var confirmation = confirm('Are you sure tho?');

  if(confirmation){
    $.ajax({
      type:'DELETE',
      url: '/users/delete/'+$(this).data('id')
    }).done(function(response){

    });
      window.location.replace('/');
      location.location.href = "/";
  } else {
    return false;
  }
}
