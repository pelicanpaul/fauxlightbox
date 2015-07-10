
var utility = {
    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    isMobile: function(){
        if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            return 'true';
        }
    }
};

var modals = {
    show_overlay: function(overlayDiv, modalWidth, minHeight, formSent){
        if (formSent != 'true') {
            if ($(overlayDiv).length > 0) {
                $('.close-modal').show();
                $(overlayDiv).modal({
                    autoResize: false,
                    overlayCss: {
                        backgroundColor: "#6b4714"
                    },
                    containerCss: {
                        height: 'auto',
                        padding: 0,
                        width: modalWidth
                    },
                    minWidth: 300,
                    maxWidth: 475, //475
                    minHeight: minHeight,
                    overlayClose: true,
                    escClose: true,
                    closeClass: 'close-modal',
                    onOpen: function (dialog) {
                        dialog.overlay.fadeIn('slow', function () {
                            dialog.container.slideDown('slow', function () {
                                dialog.data.fadeIn('slow');
                                $('body').css({'overflow': 'hidden'});
                            });
                        });
                    },
                    onShow: function (dialog) {
                        $("a.skip-link, .subscribe-link", dialog.data).click(function () {
                            //$.cookie('emailsignup', true, {expires: 30});
                        });
                    },
                    onClose: function (dialog) {

                        dialog.data.fadeOut('slow', function () {
                            dialog.container.slideUp('slow', function () {
                                dialog.overlay.fadeOut('slow', function () {
                                    $('body').css({'overflow': 'auto'});

                                    $.modal.close(); // must call this!
                                    $('#close-x').hide();
                                });
                            });
                        });
                    }
                });
            }
        }
    },

    show_fauxlightbox: function(){
        var closeModal = $('.close-modal');
        $(closeModal).show();
        $('.logo-lightbox').show();
        $('#content-main').hide();
        $('#body-faux').show();
        $('#email-signup').show().addClass('modal-faux');
        $('body').addClass('lightbox-faux');
        $(closeModal).addClass('close-modal-faux');

        $('.close-modal-faux').on('click', function(){
            $('.bg-logo-svg ').hide();
            $('#body-faux').hide();
            $('#email-signup').hide('slow');
            $('#content-main').show('slow');
            $('body').removeClass('lightbox-faux');
            $('.logo-lightbox').hide();
            //$.cookie('emailsignup', 'true', { expires: 30 });
        });
    }
};

jQuery(document).ready(function($) {

    // start modal calls
	var screenWidth = $(window).width();
	var modalWidth = 780;
	var minHeight = 360;

	if(screenWidth < 479) {
	    modalWidth = 280;
	    minHeight = 460;
	}

	// cookie getter and setter
    var cookie_set = ''; //$.cookie('emailsignup'); // => "the_value"

	// desktop
        if(cookie_set != 'true'){
            if(cookie_set != 'true' && utility.isMobile() != 'true') {
                modals.show_overlay('#email-signup', 475, 360);
            } else { // mobile
                    modals.show_fauxlightbox();
            }
        }

    $(window).resize(function () {
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();

        if (screenWidth < 479) {
            modalWidth = 280;
            minHeight = 500;
        } else {
            modalWidth = 475;
            minHeight = 360;
        }
        $("#simplemodal-container").css('width', modalWidth + 'px !important');
    });


});

