$(function(){
    $('tbody tr').click(function(event){
        var id = $(this).data('responseid');
        window.location.href = viewUrl.replace('0', id);
    });
});