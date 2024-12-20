console.log('hola desde footer', 2+2, pathname, $('.nav-item'))


var pathname = window.location.pathname,
pages = ['/', '/crear', '/nosotros'];

$('.nav-item').each(function(i) {
 if (pathname.includes(pages[i])) {
    $(this).addClass('active')
    console.log(pathname.includes(pages[i]))
 }
 else if ( $(this).className.includes('active'))  $(this).removeClass('active');
});

