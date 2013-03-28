var api;
$(function(){
    $('#enable-javascript').remove();
    /*$('body').empty();
    MAP.setup();
    MAP.init();*/

    // init API

    api = new TouristApi();

    // get the global template

    api.getTemplate('templates/application.tpl', function(response){
        if(response[1] !== "error"){
            $('#webapp-wrapper').append(response);
        }
    });

    // load the data needed to fuse the template

        // load slide menu

    api.call('api/attractions', 'get', null , function(response){
        if(response[1] !== "error"){
            buildMenu(JSON.parse(response));
        }
    });

        // load content

        // load details

});

function buildMenu(data){

    $.each(data, function(index,value){
        $('#slideopen-menu-wrapper #data-list ul li.parent-node ul').append('<li id="' + value.id + '" class="child-node">' + value.title + '</li>');
    });

}