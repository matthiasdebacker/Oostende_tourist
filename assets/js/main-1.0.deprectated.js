$(init);
function init(){

    $('#enable-javascript').remove();

    // WIZARD
    //startWizard();

    // MAIN APP
    //startApp();

}
function startApp(){
    $('body').removeAttr('id');

    //

}
function startWizard(){
    // step 1
    API.loadHTML('templates/wizard/slide1.tpl', function(data){
        $('#webapp-wrapper').prepend(data);
        $('.wizard-icon').bind('click',function(e){
            $('.wizard-icon').unbind('click');
            $(e.currentTarget).addClass('pressed').addClass('yellow');
            API.sortingPrefferences.push($(e.currentTarget).attr('id'));

            $('.wizard-icon-wrapper').delay(1000).fadeOut(500, function(){
                // step 2
                $('body').removeAttr('id').addClass('fade-to-pink');
                API.loadHTML('templates/wizard/slide2.tpl', function(data){
                    $('.wizard-icon-wrapper').empty().append(data).fadeIn(500, function(){
                        $('.wizard-icon').bind('click', function(e){
                            $('.wizard-icon').unbind('click');
                            $(e.currentTarget).addClass('pressed').addClass('pink');
                            API.sortingPrefferences.push($(e.currentTarget).attr('id'));

                            // step 3
                            $('.wizard-icon-wrapper').delay(1000).fadeOut(500, function(){
                                // step 2
                                $('body').removeAttr('id').addClass('fade-to-green');
                                API.loadHTML('templates/wizard/slide3.tpl', function(data){
                                    $('.wizard-icon-wrapper').empty().append(data).fadeIn(500, function(){
                                        $('.wizard-icon').bind('click', function(e){
                                            $('.wizard-icon').unbind('click');
                                            $(e.currentTarget).addClass('pressed').addClass('green');
                                            API.sortingPrefferences.push($(e.currentTarget).attr('id'));

                                        });
                                    });
                                });
                            });

                        });
                    });
                });
            });

        });
    });
}