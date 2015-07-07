# fauxlightbox
Unique method of lightbox for mobile devices. Uses standard lightbox (http://www.ericmmartin.com/projects/simplemodal/) for desktop screens. Uses jQuery, jquery.simplemodal.js and cookies. The concept is wrapping entire content in a div called #content-main which has a fixed position that fills up the screen 

#content-main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #999;
}

and then with jQuery adding the faux classes to the lightbox and making it appear to be a lightbox when it is really just an absolutely positioned div on top.
