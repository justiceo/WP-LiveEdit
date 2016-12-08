$(function()
{   
    'use strict';
	if (window.devicePixelRatio >= 1.5)
	{
		var images = $("img.hires");
		for (var i = 0; i < images.length; i++)
		{
			var imageType = images[i].src.substr(-4);
			var imageName = images[i].src.substr(0, images[i].src.length - 4);
			imageName += "@2x" + imageType;
			images[i].src = imageName;
		}
	}

    if ($('#redactor-intro-box').size() !== 0)
    {
        var pluginsToLoad = ['table', 
                             'video', 
                             'source', 
                             'imagemanager', 
                             'comment', 
                             'settings', 
                             'history', 
                             'widget', 
                             'auth', 
                             'quality', 
                             'bufferbuttons', 
                             'iconic',
                             'fullscreen'
                            ];
        var toolbarButtons = ['format', 'bold', 'italic', 'underline', 'horizontalrule']
	    $('#redactor').redactor({
			plugins: pluginsToLoad,	
            buttons: toolbarButtons,
			imageUpload: '/a/url/here',
			imagePosition: true,
			imageResizable: true,
			imageUpload: '/upload.php',
			imageManagerJson: '/upload.php',
			clickToEdit: true,
			clickToCancel: '#btn-cancel',
			clickToSave: '#btn-save',
			placeholder: 'Type your post here',
            formatting: ['p', 'h3', 'h4', 'h5'],
			tabAsSpaces: 4,
			callbacks: {
					save: function(html)
					{
						console.log('save', html);
					},
					cancel: function(html)
					{
						console.log('cancel', html);
					}
				},
			});
		
		// trigger this only when user clicks edit
		$('#post-title').redactor();
    }


    $('.show-selector-code').on('click', function(e)
    {
        e.preventDefault();

        var $el = $(this);
        var $prev = $el.prev();
        var $selector = $el.parent();
        var $example = $selector.next();
        var $code = $example.next();

        $el.closest('.chart-example').addClass('active-code');

        $prev.removeClass('active');
        $el.addClass('active');

        $example.hide();
        $code.show();
    });

    $('.show-selector-example').on('click', function(e)
    {
        e.preventDefault();

        var $el = $(this);
        var $next = $el.next();
        var $selector = $el.parent();
        var $example = $selector.next();
        var $code = $example.next();

        $el.closest('.chart-example').removeClass('active-code');

        $next.removeClass('active');
        $el.addClass('active');

        $code.hide();
        $example.show();

    });
});


function showGrafsCode(e, el)
{
    e.preventDefault();

    var $view = $(el).parent();
    var $code = $view.next();

    $view.slideUp();
    $code.slideDown();
}

function hideGrafsCode(e, el)
{
    e.preventDefault();

    var $code = $(el).parent();
    var $view = $code.prev();

    $code.slideUp();
    $view.slideDown();
}

function getRandomArbitrary(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArray(min, max, len)
{
    len = (typeof len === 'undefined') ? 9 : len;
    var arr = [];
    for (var i = 0; i < len; i++)
    {
        arr.push(getRandomArbitrary(min, max));
    }

    return arr;
}

function addDays(date, days)
{
    date.setDate(date.getDate() + days);

    return date;
}

function getDateArray(days, start)
{
    start = (typeof start === 'undefined') ? 'October 1, 2016' : start;

    var startDate = new Date(start);
    var stopDate = new Date(start);
    stopDate.setDate(stopDate.getDate() + (days-1));

    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate)
    {
        var date = new Date(currentDate);
        dateArray.push(date.getFullYear() + '-' + (parseInt(date.getMonth())+1) + '-' + date.getDate());
        currentDate = addDays(currentDate, 1);

    }

    return dateArray;

}


function showRegForm()
{
    $('#reg-form').slideDown(function()
    {
        $('#price-box').hide();
    })
}


function showLoginForm(e)
{
    e.preventDefault();

    $('#login-form').slideDown(function()
    {
        $('#reg-form').hide();
    })
}

function cancelRegForm(e)
{
    e.preventDefault();

    $('#reg-form').slideUp(function()
    {
        $('#reg-form form').validate('clearErrors');
    });

    $('#price-box').show();
}


function cancelLoginForm(e)
{
    e.preventDefault();

    $('#login-form').slideUp(function()
    {
        $('#login-form form').validate('clearErrors');
    });

    $('#reg-form').show();
}