(function(Kube)
{
    Kube.Autocomplete = SuperKube.plugin('autocomplete', {

    	opts: {

    		url: false,
    		min: 2,
    		paramName: false,
    		appendForms: false,
    		appendFields: false,
    		callbacks: ['set']

    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

    		this.result = $('<ul class="autocomplete">').hide();

    		this.pos = this.$element.offset();
    		this.elementHeight = this.$element.innerHeight();

    		$('body').append(this.result);

    		this.placement = (($(document).height() - (this.pos.top + this.elementHeight)) < this.result.height()) ? 'top' : 'bottom';

    		$(document).on('click.component.autocomplete', $.proxy(this.hide, this));

    		this.timeout = null;
    		this.$element.on('keyup.component.autocomplete', $.proxy(this.keyup, this));
    	},
    	keyup: function(e)
    	{
    		clearTimeout(this.timeout);

    		var value = this.$element.val();
    		if (value.length >= this.opts.min)
    		{
    			this.$element.addClass('autocomplete-in');
    			this.result.addClass('open');

    			this.listen(e);
    		}
    		else
    		{
    			this.hide();
    		}
    	},
    	lookup: function()
    	{
    		var name = (this.opts.paramName) ? this.opts.paramName : this.$element.attr('name');
    		var data = name + '=' + this.$element.val();

    		data = this.appendForms(data);
    		data = this.appendFields(data);

    		$.ajax({
    			url: this.opts.url,
    			type: 'post',
    			data: data,
    			success: $.proxy(function(json)
    			{
    				var data = $.parseJSON(json);

    				this.result.html('');

    				$.each(data, $.proxy(function(i,s)
    				{
    					var li = $('<li>');
    					var a = $('<a href="#" rel="' + i + '">').text(s).on('click', $.proxy(this.set, this));

    					li.append(a);
    					this.result.append(li);

    				}, this));

    				var top = (this.placement === 'top') ? (this.pos.top - this.result.height() - this.elementHeight) : (this.pos.top + this.elementHeight);

    				this.result.css({ top: top + 'px', left: this.pos.left + 'px' });
    				this.result.show();
    				this.active = false;

    			}, this)
    		});

    	},
    	listen: function(e)
    	{

    		switch(e.keyCode)
    		{
    			case 40: // down arrow
    				e.preventDefault();
    				this.select('next');
    			break;

    			case 38: // up arrow
    				e.preventDefault();
    				this.select('prev');
    			break;

    			case 13: // enter
    				e.preventDefault();
    				this.set();
    			break;

    			case 27: // escape
    				e.preventDefault();
    				this.hide();
    			break;

    			default:
    				this.timeout = setTimeout($.proxy(this.lookup, this), 300);
    			break;
    		}

    	},
    	select: function(type)
    	{
    		var $links = this.result.find('a');
    		var size = $links.size();

    		var $active = this.result.find('a.active');
    		$active.removeClass('active');

    		var $item = (type === 'next') ? $active.parent().next().children('a') : $active.parent().prev().children('a');
    		if ($item.size() === 0)
    		{
    			$item = (type === 'next') ? $links.eq(0) : $links.eq(size-1);
    		}

    		$item.addClass('active');
    		this.active = $item;
    	},
    	set: function(e)
    	{
    		var $el = $(this.active);

    		if (e)
    		{
    			e.preventDefault();
    			$el = $(e.target);
    		}

    		var id = $el.attr('rel');
    		var value = $el.html();

    		this.$element.val(value);

    		this.callback('set', id, value);
    		this.hide();
    	},
    	hide: function(e)
    	{
    		if (e && ($(e.target).hasClass('autocomplete-in') || $(e.target).hasClass('open') || $(e.target).parents().hasClass('open')))
    		{
    			return;
    		}

    		this.$element.removeClass('autocomplete-in');
    		this.result.removeClass('open');
    		this.result.hide();
    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Autoresize = SuperKube.plugin('autoresize', {

        classname: 'autoresize',
        opts: {
            minHeight: '50px'
        },
    	init: function()
    	{
        	Kube.apply(this, arguments);

        	this.minHeight = this.getMinHeight();
        	this.paddingHeight = this.getPaddingHeight();

    		this.setElementMinHeight();

            // resize
            this.resize();
    		this.$element.on('input.component.autoresize keyup.component.autoresize', $.proxy(this.resize, this));
    	},
    	getMinHeight: function()
    	{
        	return (this.opts.minHeight) ? parseInt(this.opts.minHeight) : false;
    	},
    	getPaddingHeight: function()
    	{
        	return parseInt(this.$element.css('paddingBottom')) + parseInt(this.$element.css('paddingTop'));
    	},
    	setElementMinHeight: function()
    	{
    		if (this.minHeight !== false)
    		{
    			this.$element.css('min-height', this.minHeight + 'px');
    		}
    	},
    	isResizeNeeded: function()
    	{
        	return !(this.minHeight && this.$element[0].scrollHeight < this.minHeight);
    	},
    	resize: function()
    	{
    		if (!this.isResizeNeeded())
    		{
    			return;
    		}

    		var $window = $(window);
    		var scrollPosition = $window.scrollTop();

    		this.$element.height(0).height(this.$element[0].scrollHeight - this.paddingHeight);
    		$window.scrollTop(scrollPosition);
    	},
    	destroy: function()
    	{
    		this.$element.off('.component.autoresize').css({ 'min-height': '' }).removeData();
    	}
    });

}(Kube));


(function(Kube)
{
    Kube.Cardform = SuperKube.plugin('cardform', {

        classname: 'cardform',
        opts: {
            callbacks: ['enable', 'disable', 'cancel']
        },
    	init: function()
    	{
        	Kube.apply(this, arguments);

            this.$inputs = this.getInputs();
            this.$buttons = this.getButtons();
    		this.$save = this.$element.find('.cardform-save');
    		this.$cancel = this.$element.find('.cardform-cancel');
    		this.$edit = this.$element.find('.cardform-toggle');

    		this.$edit.on('click.component.cardform', $.proxy(this.toggle, this));
    		this.$cancel.on('click.component.cardform', $.proxy(this.cancel, this));
    		this.$element.on('success.callback.validate', $.proxy(this.disable, this));

    		this.disable();

    	},
    	getInputs: function()
    	{
        	return this.$element.find('input, select, textarea');
    	},
    	getButtons: function()
    	{
        	return this.$element.find('.button, button');
    	},
    	addReadOnly: function()
    	{
        	this.$inputs.attr('readonly', true);
    	},
    	removeReadOnly: function()
    	{
        	this.$inputs.removeAttr('readonly');
    	},
    	toggle: function(e)
    	{
    		return (this.isDisabled()) ? this.enable(e) : this.disable(e);
    	},
    	unserialize: function()
    	{
    		var data = this.buffer;

    		for (var key in this.buffer)
    		{
    			data[this.buffer[key].name] = this.buffer[key].value;
    		}

    		var val, $el;
            for (var i = 0, len = this.$inputs.length; i < len; i++)
            {
                $el = $(this.$inputs[i]);
                val = data[$el.attr('name')];
    			$el.val(val);
            }

            this.buffer = {};
    	},
    	cancel: function(e)
    	{
        	e.preventDefault();

    		this.$element.validate('clearErrors');
    		this.unserialize();
    		this.disable(false);

    		this.callback('cancel');
    	},
    	enable: function(e)
    	{
    		if (e && e.preventDefault)
    		{
    			e.preventDefault();
    		}

    		this.buffer = this.$element.serializeArray();

    		this.removeReadOnly();
    		this.$buttons.show();

    		this.$element.removeClass('cardform-view');
    		this.$edit.addClass('hide').hide();
    		this.$save.removeClass('hide').show();
    		this.$cancel.removeClass('hide').show();

    		this.callback('enable');
    	},
    	disable: function(e)
    	{
    		if (e && e.preventDefault)
    		{
    			e.preventDefault();
    		}

    		this.addReadOnly();
    		this.$buttons.hide();

    		this.$element.addClass('cardform-view');
    		this.$edit.removeClass('hide').show();
    		this.$save.addClass('hide').hide();
    		this.$cancel.addClass('hide').hide();

    	    if (e !== false)
    	    {
    		    this.callback('disable');
    		}
    	},
    	isEnabled: function()
    	{
            return !this.$element.hasClass('cardform-view');
    	},
    	isDisabled: function()
    	{
        	return this.$element.hasClass('cardform-view');
    	},
    	destroy: function()
    	{
            this.disableReadOnly();
            this.$element.removeClass('cardform-view').off('success.callback.validate');

            this.$edit.off('.component.cardform');
            this.$cancel.off('.component.cardform');
    	}
    });

}(Kube));

(function(Kube)
{
    Kube.Changer = SuperKube.plugin('changer', {

        classname: 'changer',
    	opts: {
        	prefix: '',
        	callbacks: ['open', 'close']
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

            // target
            this.select = (this.$element[0].tagName === 'SELECT');
            this.$target = (this.select) ? this.$element : this.$element.find('input[type="radio"]');

            // event
            this.$target.on('change.component.changer', $.proxy(this.change, this));

            // active
            this.active();
    	},
    	change: function(e)
    	{
            var $values = (this.select) ? this.$target.find('option') : this.$target;
            var self = this;

            $values.each(function()
            {
                var value = $(this).val();
                var id = self.opts.prefix + value;
                $('#' + id).addClass('hide').removeClass('open').hide();

                if (self.current === value)
                {
                    self.callback('close', self.current, id);
                }
            });

            this.active(true);
    	},
    	active: function(callback)
    	{
            this.current = (this.select) ? this.$target.val() : this.$target.filter(':checked').val();

            var id = this.opts.prefix + this.current;
            $('#' + id).removeClass('hide').addClass('open').show();

            if (callback)
            {
                this.callback('open', this.current, id);
            }
    	}
    });

}(Kube));

(function(Kube)
{
    Kube.Check = SuperKube.plugin('check', {

    	opts: {
    		parent: false,
    		target: false,
    		classname: 'ch',
    		highlight: 'highlight',
    		callbacks: ['checked', 'unchecked']
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

    		this.$target = $(this.opts.target);
    		this.values = this.getValues();

            this.$checkboxes = this.getCheckboxes();
            this.$checkboxes.each($.proxy(this.loadCheckboxes, this));
            this.$checkboxes.on('click.component.check', $.proxy(this.toggleCheckbox, this));

            if (this.isCheckedAll())
            {
                this.highlight(this.$element);
            }

    		this.$element.on('click.component.check', $.proxy(this.toggle, this));

    	},
    	getCheckboxes: function()
    	{
            return $('.' + this.opts.classname);

    	},
    	toggle: function()
    	{
    		if (this.$element.prop('checked'))
    		{
                this.setAll();
    			this.callback('checked');
    		}
    		else
    		{
    			this.clearAll();
    			this.callback('unchecked');
    		}
    	},
    	isCheckedAll: function()
    	{
    		return (this.$checkboxes.length === this.$checkboxes.filter(':checked').length);
    	},
    	isChecked: function($checkbox)
    	{
        	return ($checkbox.prop('checked') || (this.values && ($.inArray($checkbox.val(), this.values) !== -1)));
    	},
    	loadCheckboxes: function(i, checkbox)
    	{
    		var $checkbox = $(checkbox);

    		if (this.isChecked($checkbox))
    		{
    			this.highlight($checkbox);
    			this.addValue($checkbox.val());
    		}
        },
        toggleCheckbox: function(e)
        {
            var $checkbox = $(e.target);

            if ($checkbox.prop('checked'))
            {
                this.highlight($checkbox);
                this.addValue($checkbox.val());
            }
            else
            {
                this.unhighlight($checkbox);
                this.removeValue($checkbox.val());
            }

            if (this.isCheckedAll())
            {
                this.highlight(this.$element);
            }
            else
            {
                this.unhighlight(this.$element);
            }
    	},
    	getValues: function()
    	{
        	if (!this.opts.target)
        	{
                return;
            }

            var str = this.$target.val();
    		var arr = str.split(',');

    		return (str === '') ? [] : arr;
    	},
    	removeValue: function(value)
    	{
        	if (!this.opts.target)
        	{
                return;
            }

        	var values = this.getValues();

        	var index = values.indexOf(value);
    		values.splice(index, 1);

    		this.$target.val(values.join(','));
    	},
    	addValue: function(value)
    	{
        	if (!this.opts.target)
        	{
                return;
            }

            var values = this.getValues();
            values.push(value);

            this.$target.val(values.join(','));
    	},
    	setValue: function()
    	{
            var values = [];
            this.$checkboxes.each(function()
            {
                values.push($(this).val());
            });

            this.$target.val(values.join(','));
    	},
    	clearValue: function()
    	{
        	this.$target.val('');
    	},
    	highlight: function($element)
    	{
        	$element.prop('checked', true);

        	if (this.opts.parent)
        	{
            	$element = $element.closest(this.opts.parent);
        	}

        	$element.addClass(this.opts.highlight);
    	},
    	unhighlight: function($element)
    	{
        	$element.prop('checked', false);

        	if (this.opts.parent)
        	{
            	$element = $element.closest(this.opts.parent);
        	}

        	$element.removeClass(this.opts.highlight);
    	},
    	highlightAll: function()
    	{
        	this.$checkboxes.closest(this.opts.parent).addClass(this.opts.highlight);
        	this.highlight(this.$element);
    	},
    	unhighlightAll: function()
    	{
        	this.$checkboxes.closest(this.opts.parent).removeClass(this.opts.highlight);
        	this.unhighlight(this.$element);
    	},
    	setAll: function()
    	{
        	this.$checkboxes.prop('checked', true);

    		if (this.opts.parent)
    		{
    			this.highlightAll();
    		}

    		if (this.opts.target)
    		{
    			this.setValue();
    		}
    	},
    	clearAll: function()
    	{
        	this.$checkboxes.prop('checked', false);

    		if (this.opts.parent)
    		{
    			this.unhighlightAll();
    		}

    		if (this.opts.target)
    		{
    			this.clearValue();
    		}
    	},
    	destroy: function()
    	{
    		this.$element.off('.component.check').prop('checked', false).removeData();
    		this.$checkboxes.off('.component.check');
            this.clearAll();
    	}
    });

}(Kube));

(function(Kube)
{
    Kube.Combobox = SuperKube.plugin('combobox', {

    	opts: {

    		placeholder: false,
    		callbacks: ['set']
    	},
    	init: function()
    	{
            Kube.apply(this, arguments);

    		this.$sourceBox = $('<div class="combobox" />');

    		this.$element.after(this.$sourceBox).hide();

    		this.$sourceSelect = $('<span class="combobox-toggle" />');
    		this.$sourceLayer = $('<ul class="combobox-list hide" />');

    		this.$sourceResult = this.$element;
    		this.$source = $('<input type="text" id="' + this.$element.attr('id') + '-input" class="' + this.$element.attr('class') + '" />');

    		this.$sourceBox.append(this.$sourceResult);
    		this.$sourceBox.append(this.$source);
    		this.$sourceBox.append(this.$sourceSelect);
    		this.$sourceBox.append(this.$sourceLayer);


    		this.setPlaceholder();
    		this.$element.find('option').each($.proxy(this.buildListItemsFromOptions, this));

    		// set default
    		var key = this.$element.val();
    		var value = this.$element.find('option:selected').text();
    		this.setResult(key, value);

    		this.$source.on('keyup.component.combobox', $.proxy(this.clearSelected, this));
    		this.$sourceSelect.on('click.component.combobox', $.proxy(this.load, this));

    	},
    	load: function(e)
    	{
    		e.preventDefault();

    		if (this.$sourceLayer.hasClass('open'))
    		{
    			this.close();
    			return;
    		}

    		var value = this.$element.val();

    		this.$sourceLayer.addClass('open').slideDown(300);

    		var items = this.$sourceLayer.find('li').removeClass('active');
    		this.setSelectedItem(items, value);

    		$(document).on('click.component.combobox', $.proxy(this.close, this));
    		$(document).on('keydown.component.combobox', $.proxy(function(e)
    		{
    		   var key = e.which;
    		   var $el;
    		   var item;

    		   if (key === 38) // up
    		   {
    			   e.preventDefault();

    			   if (items.hasClass('active'))
    			   {
    				   	item = items.filter('li.active');
    			   		item.removeClass('active');

    			   		var prev = item.prev();
    			   		$el = (prev.size() !== 0) ? $el = prev : items.last();
    			   }
    			   else
    			   {
    			   		$el = items.last();
    			   }

    			   $el.addClass('active');
    			   this.setScrollTop($el);
    		   }
    		   else if (key === 40) // down
    		   {
    			   e.preventDefault();

    			   if (items.hasClass('active'))
    			   {
    			   		item = items.filter('li.active');
    			   		item.removeClass('active');

    			   		var next = item.next();
    			   		$el = (next.size() !== 0) ? next : items.first();
    			   }
    			   else
    			   {
    				    $el = items.first();
    			   }

    			   $el.addClass('active');
    			   this.setScrollTop($el);

    		   }
    		   else if (key === 13) // enter
    		   {
    		   		if (!items.hasClass('active'))
    		   		{
    			   		return;
    			   	}

    			   	item = items.filter('li.active');
    				this.onItemClick(e, item);
    		   }
    		   else if (key === 27) // esc
    		   {
    			   this.close();
    		   }

    		}, this));

    	},
    	clearSelected: function()
    	{
    		var value = this.$source.val();
    		this.setResult(value, value);

    		if (this.$source.val().length === 0)
    		{
    			this.$element.val(0);
    			this.callback('set', { key: 0, value: '' });
    		}
    	},
    	setSelectedItem: function(items, value)
    	{
    		var selectEl = items.filter('[rel=' + value + ']');
    		if (selectEl.size() === 0)
    		{
    			selectEl = false;

    			// if user typed value
    			var sourceValue = this.$source.val();
    			$.each(items, function(i,s)
    			{
    				var $s = $(s);
    				if ($s.text() === sourceValue)
    				{
    					selectEl = $s;
    				}
    			});

    			if (selectEl === false)
    			{
    				return;
    			}
    		}

    		selectEl.addClass('active');
    		this.setScrollTop(selectEl);
    	},
    	setScrollTop: function($el)
    	{
    		this.$sourceLayer.scrollTop(this.$sourceLayer.scrollTop() + $el.position().top - 40);
    	},
    	buildListItemsFromOptions: function(i,s)
    	{
    		var $el = $(s);
    		var val = $el.val();
    		if (val === 0)
    		{
    			return;
    		}

    		var item = $('<li />');

    		item.attr('rel', val).text($el.text());
    		item.on('click', $.proxy(this.onItemClick, this));

    		this.$sourceLayer.append(item);
    	},
    	set: function(value, key)
    	{
    		var text = this.$sourceLayer.find('li').filter('[rel=' + value + ']').text();
    		text = (text === '') ? key : text;

    		var option = $('<option value="' + value + '" selected="selected">' + text + '</option>');

    		this.$sourceResult.html(option);
    		this.$source.val(text);
    		this.callback('set', { key: value, value: text });

    	},
    	get: function()
    	{
    		return this.$element.val();
    	},
    	update: function(value)
    	{
    		var text = this.$sourceLayer.find('li').filter('[rel=' + value + ']').text();
    		var option = $('<option value="' + value + '" selected="selected">' + text + '</option>');

    		this.$sourceResult.html(option);
    		this.$source.val(text);
    	},
    	onItemClick: function(e, item)
    	{
    		e.preventDefault();

    		var $el = $(item || e.target);
    		var rel = $el.attr('rel');
    		var text = $el.text();

    		this.$source.val(text);
    		this.$element.val(rel);

    		this.close();

    		this.setResult(rel, text);
    		this.callback('set', { key: rel, value: text });
    	},
    	setResult: function(key, value)
    	{
    		var option = $('<option value="' + key + '" selected="selected">' + value + '</option>');

    		this.$sourceResult.html(option);
    	},
    	setPlaceholder: function()
    	{
    		if (!this.opts.placeholder && !this.$element.attr('placeholder'))
    		{
    			return;
    		}

    		this.$source.attr('placeholder', (this.opts.placeholder) ? this.opts.placeholder : this.$element.attr('placeholder'));
    	},
    	close: function(e)
    	{
    		if (e && ($(e.target).hasClass('combobox-toggle') || $(e.target).closest('div.combobox').size() === 1))
    		{
    			return;
    		}

    		this.$sourceLayer.removeClass('open').slideUp(150);
    		$(document).off('.component.combobox');
    	}
    });

}(Kube));
(function(Kube)
{
    var datepickerId = 0;

    Kube.Datepicker = SuperKube.plugin('datepicker', {

    	opts: {
    		lang: 'en',
    		year: false,
    		month: false,
    		day: false,
    		format: '%d.%m.%Y', // %d, %m, %F, %M, %Y
    		embed: false,
    		trigger: false,
    		callback: false, // function string
    		target: false, // selector
    		weekend: true,
    		current: false,
    		selectYear: false,
    		sundayFirst: false,
    		startDate: false, // string
    		endDate: false, // string
    		rangeTo: false, // selector
    		rangeParent: false, // constructor
    		animation: {
        		open: {
            		name: 'slideDown',
            		duration: 0.25,
            		timing: 'linear'
        		},
        		close: {
            		name: 'slideUp',
            		duration: 0.25,
            		timing: 'linear'
        		}
    		},
    		callbacks: ['set', 'open', 'opened', 'close', 'closed'],
    		langs: {
        		en: {
                	"days": [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
                	"months": ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
                	"months-short": ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                }
    		},

    		// private
    		dateRegexp: /^(.*?)(\/|\.|,|\s|\-)(.*?)(?:\/|\.|,|\s|\-)(.*?)$/,
    		splitter: '.',
    		daysInMonth: [0,31,28,31,30,31,30,31,31,30,31,30,31]
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

    		if (this.isDisabled())
    		{
    			return;
    		}

    		// range
    		if (this.opts.rangeTo !== false)
    		{
    			$(this.opts.rangeTo).datepicker({
        			lang: this.opts.lang,
    				format: this.opts.format,
    				rangeParent: this
    			});
    		}

    		var $element;
    		if (this.opts.trigger === false)
    		{
    			$element = (this.opts.target !== false) ? $(this.opts.target) : this.$element;
    		}

    		if (this.isMobile() && this.opts.embed === false && $element[0].tagName === 'INPUT' && $element.attr('type') !== 'hidden')
    		{
    			var value = this.parseDateFormat($element.val());
    			var startDate = (this.opts.startDate !== false) ? this.parseDateFormat(this.opts.startDate) : false;
    			var endDate = (this.opts.endDate !== false) ? this.parseDateFormat(this.opts.endDate) : false;

    			this.opts.format = '%Y-%m-%d';

    			if (startDate)
    			{
    				$element.attr('min', this.convertDateToFormat(startDate));
    			}

    			if (endDate)
    			{
    				$element.attr('max', this.convertDateToFormat(endDate));
    			}

    			$element.val(this.convertDateToFormat(value)).attr('type', 'date');

    			if (this.opts.target !== false)
    			{
    				this.$element.hide();
    			}

    			return;
    		}

    		this.uuid = datepickerId++;


    		// set lang
    		this.currentLang = this.opts.langs[this.opts.lang];


    		this.loadTodayDate();
    		this.loadOptsDate();
    		this.parseStartDate();
    		this.parseEndDate();
    		this.parseDate();
    		this.buildDate();
    		this.build();

    		if (this.opts.embed === false)
    		{
    			this.$element.on('click.component.datepicker', $.proxy(this.open, this));

    			if (this.opts.trigger === false)
    			{
    				$element = (this.opts.target !== false) ? $(this.opts.target) : this.$element;
    				$element.on('keyup.component.datepicker', $.proxy(this.close, this));
    			}
    		}
    	},
    	lang: function(name)
    	{
        	return this.currentLang[name];
    	},
    	isDisabled: function()
    	{
    		if (this.$element.attr('disabled') || this.$element.attr('readonly') || this.$element.hasClass('disabled'))
    		{
    			return true;
    		}
    	},
    	loadTodayDate: function()
    	{
    		this.today = new Date();
    		this.todayYear = this.today.getFullYear();
    		this.todayMonth = parseInt(this.today.getMonth() + 1);
    		this.todayDay = parseInt(this.today.getDate());
    	},
    	loadOptsDate: function()
    	{
    		if (this.opts.year !== false && this.opts.month !== false)
    		{
    			this.currentYear = this.opts.year;
    			this.currentMonth = parseInt(this.opts.month);
    			this.currentDay = (this.opts.day !== false) ? parseInt(this.opts.day) : this.todayDay;

    			this.opts.month = this.currentMonth;
    			this.opts.day = this.currentDay;

    			return;
    		}
    	},
    	parseDate: function()
    	{
    		var value = '';

    		if (this.opts.embed === false && this.opts.trigger === false)
    		{
    			var $element = (this.opts.target !== false) ? $(this.opts.target) : this.$element;
    			value = ($element[0].tagName === 'INPUT' || $element[0].tagName === 'TEXTAREA') ? $element.val() : $element.text();
    		}

    		var date = this.parseDateFormat(value);

    		this.opts.year = date.year;
    		this.opts.month = date.month;
    		this.opts.day = date.day;

    		this.currentYear = date.year;
    		this.currentMonth = date.month;
    		this.currentDay = date.day;

    		this.opts.splitter = date.splitter;
    	},
    	parseDateFormat: function(str)
    	{
    		var obj = {};
    		if (str === '')
    		{
    			obj.year = (this.opts.year === false) ? this.todayYear : this.opts.year;
    			obj.month = (this.opts.month === false) ? this.todayMonth : parseInt(this.opts.month);
    			obj.day = (this.opts.day === false) ? this.todayDay : parseInt(this.opts.day);
    		}
    		else
    		{
    			// parse
    			var date = str.match(this.opts.dateRegexp);
    			var format = this.opts.format.match(this.opts.dateRegexp);

    			obj.year = (date === null) ? this.todayYear : parseInt(date[4]);

    			if (format[1] === '%m' || format[1] === '%M' || format[1] === '%F')
    			{
    				obj.month = (date === null) ? this.todayMonth : this.parseMonth(format[1], date[1]);
    				obj.day = (date === null) ? this.todayDay : parseInt(date[3]);
    			}
    			else
    			{
    				obj.month = (date === null) ? this.todayMonth : this.parseMonth(format[1], date[3]);
    				obj.day = (date === null) ? this.todayDay : parseInt(date[1]);
    			}

    			obj.splitter = (date === null) ? '.' : date[2];

    		}

    		return obj;
    	},
    	parseStartDate: function()
    	{
    		if (this.opts.startDate === false)
    		{
    			return;
    		}

    		this.opts.startDate = this.parseDateFormat(this.opts.startDate);

    	},
    	parseEndDate: function()
    	{
    		if (this.opts.endDate === false)
    		{
    			return;
    		}

    		this.opts.endDate = this.parseDateFormat(this.opts.endDate);

    	},
    	parseMonth: function(type, month)
    	{
    		if (type === '%M')
    		{
    			return $.inArray(month, this.lang('months-short'));
    		}
    		else if (type === '%F')
    		{
    			return $.inArray(month, this.lang('months'));
    		}
    		else
    		{
    			return parseInt(month);
    		}
    	},
    	buildDate: function()
    	{
    		this.buildPrevDate();
    		this.buildNextDate();
    	},
    	buildPrevDate: function()
    	{
    		var date = this.getPrevYearAndMonth(this.currentYear, this.currentMonth);

    		this.prevMonth = date.month;
    		this.prevYear = date.year;
    	},
    	buildNextDate: function()
    	{
    		var date = this.getNextYearAndMonth(this.currentYear, this.currentMonth);

    		this.nextMonth = date.month;
    		this.nextYear = date.year;
    	},
    	build: function()
    	{
    		this.$datepicker = $('<div class="datepicker" id="dateicker-' + this.uuid + '" data-id="' + this.uuid + '">');

    		if (this.opts.embed === false)
    		{
    			this.$datepicker.hide();
    		}

    		// head
    		this.$datepickerHead = $('<div class="datepicker-head">');
    		this.$datepicker.append(this.$datepickerHead);

    		// month box
    		this.$datepickerMonthBox = $('<div class="datepicker-month-box">');
    		this.$datepickerHead.append(this.$datepickerMonthBox);

    		this.$datepickerMonth = $('<span />');
    		this.$datepickerMonthBox.append(this.$datepickerMonth);

    		// controls
    		this.$datepickerControls = $('<div class="datepicker-controls">');
    		this.$datepickerHead.append(this.$datepickerControls);

    		// weekdays
    		this.$datepickerWeekdays = $('<div class="datepicker-weekdays">');
    		this.$datepicker.append(this.$datepickerWeekdays);

    		// body
    		this.$datepickerBody = $('<div class="datepicker-body">');
    		this.$datepicker.append(this.$datepickerBody);

    		this.buildMonth();
    		this.buildYear();
    		this.buildControls();

    		if (this.opts.embed)
    		{
    			this.updateGrid();

    			this.$datepicker.addClass('datepicker-embed');
    			this.$element.append(this.$datepicker);
    		}
    		else
    		{
    			$(document.body).append(this.$datepicker);
    		}
    	},
    	buildControls: function()
    	{
    		this.$datepickerPrev = $('<span class="datepicker-control datepicker-control-prev" />').html('&laquo;');
    		this.$datepickerPrev.on('click.component.datepicker', $.proxy(this.buildGridPrevMonth, this));
    		this.$datepickerControls.append(this.$datepickerPrev);

    		this.$datepickerNext = $('<span class="datepicker-control datepicker-control-next" />').html('&raquo;');
    		this.$datepickerNext.on('click.component.datepicker', $.proxy(this.buildGridNextMonth, this));
    		this.$datepickerControls.append(this.$datepickerNext);
    	},
    	buildMonth: function()
    	{
    		this.$datepickerYear = $('<span />');
    		this.$datepickerYearValue = $('<span />');
    		this.$datepickerYear.append(this.$datepickerYearValue);
    		this.$datepickerMonthBox.append(this.$datepickerYear);
    	},
    	buildYear: function()
    	{
    		if (this.opts.selectYear === false)
    		{
    			return;
    		}

    		var now = new Date();
    		var start = (this.opts.startDate !== false) ? this.opts.startDate.year : (now.getYear() - 99);
    		var end = (this.opts.endDate !== false) ? this.opts.endDate.year : now.getYear();

    		if ((end - start) < 2)
    		{
    			return;
    		}

    		this.$datepickerYearSelect = $('<select />');
    		this.$datepickerYear.append(this.$datepickerYearSelect);
    		this.$datepickerYear.append('<span class="datepicker-select-year-caret" />');
    		this.$datepickerYear.addClass('datepicker-select-year');

    		for (var i = start; i <= end; i++)
    		{
    			var $option = $('<option value="' + i + '">' + i + '</option>');

    			if (i === this.currentYear)
    			{
    				$option.attr('selected', 'selected');
    			}

    			this.$datepickerYearSelect.append($option);
    		}

    		this.$datepickerYearSelect.on('change.component.datepicker', $.proxy(this.setYear, this));

    	},
    	buildWeekDays: function()
    	{
    		this.$datepickerWeekdays.html('');

    		var result = [];
    		if (this.opts.sundayFirst)
    		{
    			var last = this.lang('days').slice(6);
    			result = this.lang('days').slice(0, 6);
    			result.unshift(last[0]);
    		}
    		else
    		{
    			result = this.lang('days');
    		}

    		$.each(result, $.proxy(function(i,s)
    		{
    			var tr = $('<span>').html(s);
    			this.$datepickerWeekdays.append(tr);

    		}, this));

    	},
    	buildGrid: function()
    	{
    		this.$datepickerBody.html('');

    		var daysInCurrentMonth = this.getDaysInCurrentMonth();
    		var daysInPrevMonth = this.getDaysInPrevMonth();
    		var daysInNextMonth = this.getDaysInNextMonth();

    		// start index
    		var d = new Date(this.currentYear, this.currentMonth - 1, 1);
    		var startIndex = (this.opts.sundayFirst) ? d.getDay() + 1 : ((!d.getDay()) ? 7 : d.getDay());

    		var daysPrevMonthStart = daysInPrevMonth - startIndex + 2;
    		var startCurrent = 8 - startIndex;

    		var y = 1, c = 1, obj;
    		for (var z = 0; z < 6; z++)
    		{
    			var tr = $('<div class="datepicker-row">');

    			for (var i = 0; i < 7; i++)
    			{
    				if (z === 0)
    				{
    					var dayPrev = daysPrevMonthStart + i;

    					if (dayPrev > daysInPrevMonth)
    					{

    						// current day
    						obj = {
    							day: y,
    							next: false,
    							prev: false,
    							year: this.currentYear,
    							month: this.currentMonth,
    							date: this.getGridDay(this.currentYear, this.currentMonth, y),
    							selected: this.checkSelectedDate(this.currentYear, this.currentMonth, y),
    							today: this.checkTodayDate(this.currentYear, this.currentMonth, y),
    							weekend: (i > 4) ? true : false,
    							disabled: this.checkDisabledDate(this.currentYear, this.currentMonth, y)
    						};
    						y++;
    					}
    					else
    					{
    						// prev day
    						obj = {
    							day: dayPrev,
    							next: false,
    							prev: true,
    							year: this.prevYear,
    							month: this.prevMonth,
    							date: this.getGridDay(this.prevYear, this.prevMonth, dayPrev),
    							selected: this.checkSelectedDate(this.prevYear, this.prevMonth, dayPrev),
    							today: this.checkTodayDate(this.prevYear, this.prevMonth, dayPrev),
    							weekend: (i > 4) ? true : false,
    							disabled: this.checkDisabledDate(this.prevYear, this.prevMonth, dayPrev)
    						};

    					}
    				}
    				else if (y > daysInCurrentMonth)
    				{
    					// next day
    					obj = {
    						day: c,
    						next: true,
    						prev: false,
    						year: this.nextYear,
    						month: this.nextMonth,
    						date: this.getGridDay(this.nextYear, this.nextMonth, c),
    						selected: this.checkSelectedDate(this.nextYear, this.nextMonth, c),
    						today: this.checkTodayDate(this.nextYear, this.nextMonth, c),
    						weekend: (i > 4) ? true : false,
    						disabled: this.checkDisabledDate(this.nextYear, this.nextMonth, c)
    					};
    					c++;

    				}
    				else
    				{
    					// current day
    					obj = {
    						day: y,
    						next: false,
    						prev: false,
    						year: this.currentYear,
    						month: this.currentMonth,
    						date: this.getGridDay(this.currentYear, this.currentMonth, y),
    						selected: this.checkSelectedDate(this.currentYear, this.currentMonth, y),
    						today: this.checkTodayDate(this.currentYear, this.currentMonth, y),
    						weekend: (i > 4) ? true : false,
    						disabled: this.checkDisabledDate(this.currentYear, this.currentMonth, y)
    					};
    					y++;
    				}

    				tr.append(this.buildGridDay(obj));
    			}

    			this.$datepickerBody.append(tr);

    		}
    	},
    	buildGridDay: function(obj)
    	{
    		var td = $('<div class="datepicker-cell">');

    		if (obj.next || obj.prev)
    		{
    			td.addClass('datepicker-day-last');
    			if (this.opts.current)
    			{
    				td.addClass('datepicker-day-hidden');
    			}
    		}

    		if (obj.selected)
    		{
    			td.addClass('datepicker-day-selected');
    		}

    		if (obj.today)
    		{
    			td.addClass('datepicker-day-today');
    		}

    		if (obj.weekend && this.opts.weekend)
    		{
    			td.addClass('datepicker-day-weekend');
    		}

    		if (obj.disabled)
    		{
    			td.addClass('datepicker-day-disabled');
    		}

    		var $a = $('<a href="#" rel="' + obj.date + '">' + obj.day + '</a>');

    		$a.on('click', $.proxy(function(e)
    		{
    			e.preventDefault();

    			if (obj.disabled === false)
    			{
    				this.loadCallback(obj);
    			}

    		}, this));

    		return td.append($a);

    	},
    	buildPosition: function()
    	{
    		this.position = {};

    		var pos = this.$element.offset();
    		var height = this.$element.innerHeight();
    		var width = this.$element.innerWidth();

    		var datepickerWidth = this.$datepicker.innerWidth();
    		var datepickerHeight = this.$datepicker.innerHeight();

    		var windowWidth = $(window).width();
    		var documentHeight = $(document).height();

    		var right = 0;
    		var left = pos.left;
    		var top = pos.top + height + 1;

    		this.position.type = 'left';

    		if ((left + datepickerWidth) > windowWidth)
    		{
    			this.position.type = 'right';
    			right = (windowWidth - (left + width));
    		}

    		if ((top + datepickerHeight) > documentHeight)
    		{

    			this.opts.animation.open.name = 'show';
    			this.opts.animation.close.name = 'hide';

    			top = (top - datepickerHeight - height - 2);
    		}

    		this.position.top = top;
    		this.position.left = left;
    		this.position.right = right;
    	},
    	buildGridNextMonth: function(e)
    	{
    		e.preventDefault();

    		this.currentYear = this.nextYear;
    		this.currentMonth = this.nextMonth;

    		this.updateGrid();
    	},
    	buildGridPrevMonth: function(e)
    	{
    		e.preventDefault();

    		this.currentYear = this.prevYear;
    		this.currentMonth = this.prevMonth;

    		this.updateGrid();
    	},
    	updateYear: function()
    	{
    		this.$datepickerYearValue.html(this.currentYear);
    	},
    	updateMonth: function()
    	{
    		this.$datepickerMonth.html(this.lang('months')[this.currentMonth] + ' ');
    	},
    	updateGrid: function()
    	{
    		this.buildDate();
    		this.setControls();
    		this.updateMonth();
    		this.updateYear();
    		this.buildWeekDays();
    		this.buildGrid();
    	},
    	resizePosition: function()
    	{
    		this.buildPosition();
    		this.setPosition();
    	},
    	setPosition: function()
    	{
    		if (this.position.type === 'left')
    		{
    			this.$datepicker.css({
    				top: this.position.top + 'px',
    				left: this.position.left + 'px',
    				right: 'auto'
    			});
    		}
    		else
    		{
    			this.$datepicker.css({
    				top: this.position.top + 'px',
    				left: 'auto',
    				right: this.position.right + 'px'
    			});

    		}
    	},
    	setControls: function()
    	{
    		if (this.opts.startDate)
    		{
    			var datePrev = new Date(this.prevYear + '/' + this.prevMonth + '/31');
    			var dateStart = new Date(this.opts.startDate.year + '/' + this.opts.startDate.month + '/' + this.opts.startDate.day);

    			if (dateStart.getTime() > datePrev.getTime())
    			{
    				this.$datepickerPrev.hide();
    			}
    			else
    			{
    				this.$datepickerPrev.show();
    			}
    		}

    		if (this.opts.endDate !== false)
    		{
    			var dateNext = new Date(this.nextYear + '/' + this.nextMonth + '/1');
    			var dateEnd = new Date(this.opts.endDate.year + '/' + this.opts.endDate.month + '/' + this.opts.endDate.day);

    			if (dateEnd.getTime() < dateNext.getTime())
    			{
    				this.$datepickerNext.hide();
    			}
    			else
    			{
    				this.$datepickerNext.show();
    			}
    		}
    	},
    	setYear: function()
    	{
    		this.currentYear = Number(this.$datepickerYearSelect.val());
    		this.$datepickerYearValue.text(this.currentYear);

    		this.updateGrid();
    	},
    	convertDateToFormat: function(obj)
    	{
    		var formated = this.opts.format.replace('%d', obj.day);
    		formated = formated.replace('%F', this.lang('months')[obj.month]);
    		formated = formated.replace('%m', this.addZero(obj.month));
    		formated = formated.replace('%M', this.lang('months-short')[obj.month]);
    		formated = formated.replace('%Y', obj.year);

    		return formated;

    	},
    	loadCallback: function(obj)
    	{
    		obj.date = this.convertDateToFormat(obj);

    		if (this.opts.embed === false && this.opts.trigger === false)
    		{
    			var $element = (this.opts.target !== false) ? $(this.opts.target) : this.$element;
    			if ($element[0].tagName === 'INPUT' || $element[0].tagName === 'TEXTARE')
    			{
    				$element.val(obj.date);
    			}
    			else
    			{
    				$element.text(obj.date);
    			}

    			var dateObj;
    			if (this.opts.rangeTo !== false)
    			{
    				var $el = $(this.opts.rangeTo);
    				var dateTo = this.parseDateFormat($el.val());

    				// less
    				dateObj = new Date(obj.year + '/' + obj.month + '/' + obj.day);
    				var dateToObj = new Date(dateTo.year + '/' + dateTo.month + '/' + dateTo.day);
    				if (dateToObj.getTime() < dateObj.getTime())
    				{
    					$el.val(obj.date);
    				}

    			}

    			if (this.opts.rangeParent !== false)
    			{
    				var dateParent = this.parseDateFormat(this.opts.rangeParent.$element.val());

    				var dateParentObj = new Date(dateParent.year + '/' + dateParent.month + '/' + dateParent.day);
    				dateObj = new Date(obj.year + '/' + obj.month + '/' + obj.day);

    				// greater
    				if (dateParentObj.getTime() > dateObj.getTime())
    				{
    					this.opts.rangeParent.$element.val(obj.date);
    				}
    			}

    		}

    		if (this.opts.embed === false)
    		{
    			this.close(false);
    		}

    		// callback
    		if (this.opts.callback !== false)
    		{
    			window[this.opts.callback].call(this, obj);
    		}

    		this.callback('set', obj);
    	},
    	enableEvents: function()
    	{
    		$(document).on('click.component.datepicker.' + this.uuid + ' touchstart.tools.dropdown.' + this.uuid, $.proxy(this.close, this));
    		$(window).on('resize.component.datepicker.' + this.uuid, $.proxy(this.resizePosition, this));
    	},
    	disableEvents: function()
    	{
    		$(document).off('.component.datepicker.' + this.uuid);
    		$(window).off('.component.datepicker.' + this.uuid);
    	},
    	open: function(e)
    	{
        	if (e) {
    		    e.preventDefault();
    		}

    		if (this.isOpened()) {
    			return;
    		}

    		this.callback('open');

    		this.parseDate();
    		this.updateGrid();

    		this.buildPosition();
    		this.setPosition();

    		this.$datepicker.animation(this.opts.animation.open, $.proxy(this.opened, this));

    	},
    	opened: function()
    	{
    		this.enableEvents();
        	this.$element.addClass('datepicker-in');
    		this.$datepicker.addClass('open');
    		this.callback('opened');
    	},
    	close: function(e)
    	{
    		if (e && $(e.target).closest('.datepicker').length !== 0) {
    			return;
    		}

    		if (this.isClosed()) {
    			return;
    		}

    		this.callback('close');
    		this.$datepicker.animation(this.opts.animation.close, $.proxy(this.closed, this));
    	},
    	closed: function()
    	{
    		this.disableEvents();
            this.$datepicker.removeClass('open');
    		this.$element.removeClass('datepicker-in');
    		this.callback('closed');
    	},
    	closeAll: function()
    	{
    		var self = this;
    		$('.datepicker.open').each(function() {

    			var $el = $(this);
    			var id = $el.attr('data-id');

    			$(document).off('.component.datepicker.' + id);
    			$(window).off('.component.datepicker.' + id);

    			$el.removeClass('open').hide();

    			self.callback('closed');
    		});

    		$('.datepicker-in').removeClass('datepicker-in');
    	},
    	isOpened: function()
    	{
        	return this.$datepicker.hasClass('open');
    	},
    	isClosed: function()
    	{
        	return !this.$datepicker.hasClass('open');
    	},
    	checkSelectedDate: function(year, month, day)
    	{
    		return (this.opts.year === year && this.opts.month === month && this.opts.day === day) ? true : false;
    	},
    	checkTodayDate: function(year, month, day)
    	{
    		return (this.todayYear === year && this.todayMonth === month && this.todayDay === day) ? true : false;
    	},
    	checkDisabledDate: function(year, month, day)
    	{
    		if (this.opts.datesDisabled === false && this.opts.endDate === false && this.opts.startDate === false)
    		{
    			return false;
    		}

    		var date = new Date(year + '/' + month + '/' + day);
    		if (this.opts.startDate !== false)
    		{
    			var dateStart = new Date(this.opts.startDate.year + '/' + this.opts.startDate.month + '/' + this.opts.startDate.day);
    			if (date.getTime() < dateStart.getTime())
    			{
    				return true;
    			}
    		}

    		if (this.opts.endDate !== false)
    		{
    			var dateEnd = new Date(this.opts.endDate.year + '/' + this.opts.endDate.month + '/' + this.opts.endDate.day);
    			if (date.getTime() > dateEnd.getTime())
    			{
    				return true;
    			}
    		}

    		return false;

    	},
    	getGridDay: function(year, month, day)
    	{
    		return year + '-' + month + '-' + day;
    	},
    	getDaysInCurrentMonth: function()
    	{
    		return this.getDaysInMonth(this.currentYear, this.currentMonth);
    	},
    	getDaysInPrevMonth: function()
    	{
    		return this.getDaysInMonth(this.prevYear, this.prevMonth);
    	},
    	getDaysInNextMonth: function()
    	{
    		return this.getDaysInMonth(this.nextYear, this.nextMonth);
    	},
    	getDaysInMonth: function (year, month)
    	{
    		return (((0 === (year%4)) && ((0 !== (year%100)) || (0 === (year%400)))) && (month === 1)) ? 29 : this.opts.daysInMonth[month];
    	},
    	getPrevYearAndMonth: function(year, month)
    	{
    		var date = {};

    		date.month = parseInt(month) - 1;
    		date.year = year;

    		if (date.month <= 0)
    		{
    			date.month = 12;
    			date.year--;
    		}

    		return date;
    	},
    	getNextYearAndMonth: function(year, month)
    	{
    		var date = {};

    		date.month = parseInt(month) + 1;
    		date.year = year;

    		if (date.month > 12)
    		{
    			date.month = 1;
    			date.year++;
    		}

    		return date;
    	},
    	addZero: function(str)
    	{
    		str = Number(str);
    		return (str < 10) ? '0' + str : str;
    	},
    	destroy: function()
    	{
    		this.disableEvents();

    		this.$datepicker.remove();

    		this.$element.off('.component.datepicker');
    		this.$element.removeClass('datepicker-in');

    		// target
    		var $element = (this.opts.target !== false) ? $(this.opts.target) : this.$element;
    		$element.off('.component.datepicker');

    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Editable = SuperKube.plugin('editable', {

        classname: 'editable',
    	opts: {
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

            this.$element.attr('contenteditable', true);

            // events
            this.$element.on('keydown.component.editable', $.proxy(this.keydown, this));
            this.$element.on('paste.component.editable', $.proxy(this.paste, this));
            this.$element.on('blur.component.editable', $.proxy(this.blur, this));

    	},
    	paste: function(e)
    	{
            e.preventDefault();

            var event = (e.originalEvent || e);

            var text = '';
            if (event.clipboardData)
            {
                text = event.clipboardData.getData('text/plain');
                document.execCommand('insertText', false, text);
            }
            else if (window.clipboardData)
            {
                text = window.clipboardData.getData('Text');
                document.selection.createRange().pasteHTML(text);
            }
    	},
    	blur: function(e)
    	{
            if (!this.$element.text().replace(" ", "").length)
            {
                this.$element.empty();
            }
    	},
    	keydown: function(e)
    	{
        	var key = e.which;

        	// disable enter key
        	if (key === 13)
        	{
            	e.preventDefault();
        	}

    	},
    	destroy: function()
    	{
            this.$element.removeAttr('contenteditable');
    	}
    });

}(Kube));

(function(Kube)
{
    Kube.Livesearch = SuperKube.plugin('livesearch', {

    	opts: {

    		url: false, // string
    		target: false, // selector
    		min: 2,
    		loader: false,
    		paramName: false,
    		appendForms: false,
    		appendFields: false,

    		hideElements: '', // selectors
    		showElements: '', // selectors

    		callbacks: ['result']
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

        	this.$target = $(this.opts.target);
        	this.targetToggle = this.$target.hasClass('hide');

    		this.$input = this.$element.find('input');

    		this.timeout = null;

    		this.$input.attr('autocomplete', 'off').attr('role', 'search');
    		this.$input.off('keydown.component.livesearch');
    		this.$input.on('keydown.component.livesearch', $.proxy(this.load, this));

    		this.buildIcon();
    		this.buildClose();

    	},
    	buildIcon: function()
    	{
    		this.$icon = this.$element.find('.search-icon');
    		if (this.$icon.length !== 0)
    		{
        		var padding = parseInt(this.$input.css('padding-left')) + 18;
        		this.$input.css('padding-left', padding + 'px');
    		}

    		this.$icon.on('click.component.livesearch', $.proxy(function()
    		{
    			this.$input.focus();

    		}, this));
    	},
    	buildClose: function()
    	{
    		this.$close = this.$element.find('.close').hide();

    		this.$close.off('click.component.livesearch');
    		this.$close.on('click.component.livesearch', $.proxy(function(e)
    		{
    			e.preventDefault();

    			this.search(this.getData(''), false, false);

    			this.$input.val('');
    			this.$close.hide();

    		}, this));
    	},
    	toggleClose: function(length)
    	{
    		return (length === 0) ? this.$close.hide() : this.$close.show();
    	},
    	getData: function(data)
    	{
    		data = this.appendForms(data);
    		data = this.appendFields(data);

    		return data;
    	},
    	load: function()
    	{
    		clearTimeout(this.timeout);

    		this.timeout = setTimeout($.proxy(function()
    		{
    			var value = this.$input.val();
    			var data = '';
    			var results = false;
    			if (value.length > (this.opts.min - 1))
    			{
    				var name = (this.opts.paramName) ? this.opts.paramName : this.$input.attr('name');

    				data += '&' + name + '=' + value;
    				results = true;
    			}

    			this.toggleClose(value.length);
    			this.search(this.getData(data), results, true);

    		}, this), 300);

    	},
    	search: function(data, results, loader)
    	{
    		this.toggleTarget(results);
    		this.toggleElements(results);

    		if (loader && this.opts.loader)
    		{
    			$.loader.open(this.opts.target);
    		}

    		$.ajax({
    			url: this.opts.url,
    			type: 'post',
    			data: data,
    			success: $.proxy(function(result)
    			{
    				if (loader && this.opts.loader)
    				{
    					setTimeout($.proxy(function()
    					{
    						this.$target.html(result);
    						this.callback('result', result);

    					}, this), 500);
    				}
    				else
    				{
    					this.$target.html(result);
    					this.callback('result', result);
    				}

    			}, this)
    		});
    	},
    	toggleTarget: function(results)
    	{
        	if (!this.targetToggle)
        	{
            	return;
        	}

        	if (results)
        	{
            	this.$target.removeClass('hide');
        	}
        	else
        	{
            	this.$target.addClass('hide');
        	}
    	},
    	toggleElements: function(results)
    	{
            if (results)
    		{
    			$(this.opts.hideElements).hide();
    			$(this.opts.showElements).removeClass('hide').show();
    		}
    		else
    		{
                $(this.opts.hideElements).removeClass('hide').show();
    			$(this.opts.showElements).hide();
    		}
    	}
    });

}(Kube));
$.loader = {
	open: function($target)
	{
		$target = (typeof $target === 'string') ? $($target) : $target;

		this.$loader = $('<div />').addClass('loading');
		this.$spinner = $('<span />').addClass('loading-spinner');

		this.$loader.append(this.$spinner);
		$target.html(this.$loader);
	},
	close: function()
	{
    	if (typeof this.$loader !== 'undefined')
		{
    		this.$loader.remove();
        }
	}
};
// Direct Load
(function($)
{
    $.magicload = function(options)
    {
    	if (typeof this.element === 'undefined')
    	{
    		this.element = document.createElement('span');
    	}

    	$(this.element).magicquery(options);
    	$(this.element).magicquery('query');

    };

})(jQuery);

(function(Kube)
{
    Kube.Magicquery = SuperKube.plugin('magicquery', {

    	opts: {
    		url: false, // string
    		appendForms: false, // selectors
    		appendFields: false, // selectors
    		callbacks: ['complete']
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

    		this.$element.on('click.component.magicquery', $.proxy(this.query, this));
    	},
    	query: function(e)
    	{
    		if (e)
    		{
    			e.preventDefault();
    		}

    		var params = '';
    		params = this.appendForms(params);
    		params = this.appendFields(params);

    		$.ajax({
    			url: this.opts.url,
    			type: 'post',
    			data: params,
    			success: $.proxy(function(data)
    			{
    				var json = $.response.parse(data);
    				//this.callback('complete', data, json);

    			}, this)
    		});
    	},
    	destroy: function()
    	{
    		this.$element.off('.component.magicquery');
    	}
    });

}(Kube));
(function($)
{

	// Plugin
	$.notify = function(options)
	{
		return new Notify(options);
	};

	// Initialization
	var Notify = function(options)
	{
    	if (typeof options === 'string')
    	{
        	this[options]();
        	return;
    	}

		this.opts = $.extend({

    		content: '',
    		top: '16px',
    		right: '16px',
    		position: 'right', // center
    		click: true,
    		delay: 10, // message autohide delay - seconds or false
    		theme: 'primary', // error, success, warning, primary
    		target: 'body',
    		animation: {
        		open: {
            		name: 'slideInRight', // slideInDown for center
            		duration: 0.5,
            		timing: 'cubic-bezier(0.175, 0.885, 0.320, 1.375)'
        		},
        		close: {
            		name: 'slideOutRight', // slideOutUp for center
            		duration: 0.5,
            		timing: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
        		}
    		}

		}, options);

		this.init();
	};

	// Functionality
	Notify.prototype = {
		init: function()
		{
			this.build();
			this.open();
		},
		build: function()
		{
			this.$element = $('<div class="message" />').addClass(this.opts.theme).addClass('notify-generated').html(this.opts.content).hide();
			$(this.opts.target).append(this.$element);
		},
		setPosition: function()
		{
			if (this.opts.position === 'center')
			{
    			this.opts.animation.open.name = 'slideInDown';
    			this.opts.animation.close.name = 'slideOutUp';
				this.$element.css({ 'top': this.opts.top, 'right': '', 'left': '50%' });
				this.$element.css({ 'margin-left': '-' + this.$element.innerWidth()/2 + 'px' });
			}
			else
			{
    			this.opts.animation.open.name = 'slideInRight';
    			this.opts.animation.close.name = 'slideOutRight';
				this.$element.css({ 'top': this.opts.top, 'right': this.opts.right, 'left': '' });
			}
		},
		open: function()
		{
			if (this.$element.hasClass('open'))
			{
				return;
			}

			this.closeAll();
			this.setPosition();

			// open
			this.$element.addClass('open').animation(this.opts.animation.open, $.proxy(this.opened, this));

		},
		opened: function()
		{
			$(document).on('keyup.component.notify', $.proxy(this.handleKeyboard, this));

			if (this.opts.click)
			{
				this.$element.on('click.component.notify', $.proxy(this.close, this));
            }

			if (this.opts.delay !== false)
			{
				this.timeout = setTimeout($.proxy(this.close, this), this.opts.delay * 1000);
            }
		},
		handleKeyboard: function(e)
		{
			return (e.which === 27) ? this.close() : true;
		},
		close: function(e)
		{
			if (e && e.preventDefault)
			{
				e.preventDefault();
			}

			this.$element.off('click.component.notify').animation(this.opts.animation.close, $.proxy(this.closed, this));
            clearTimeout(this.timeout);
		},
		closed: function()
		{
    		this.$element.hide().remove();
    		$(document).off('keyup.component.notify');
    		clearTimeout(this.timeout);
		},
		closeAll: function()
		{
			$(document).off('keyup.component.notify');

			if (typeof this.$element !== 'undefined')
			{
	    		$('.notify-generated').not(this.$element[0]).hide().remove();
			}
			else
			{
    			$('.notify-generated').hide().remove();
			}

   			clearTimeout(this.timeout);
        }
	};

})(jQuery);
$.progress = {
    $progress: false,
	selector: '#progress',
	open: function($target)
	{
		if (this.$progress)
		{
			return;
		}

		$target = (typeof $target === 'string') ? $($target) : $target;

		var id = this.selector.replace(/^#/, '');
		var $stripes = $('<span />');
		this.$progress = $('<div id="' + id + '"></div>').append($stripes).hide();

		var position = (typeof $target === 'undefined') ? 'fixed' : 'absolute';

		$target = (typeof $target === 'undefined') ? $('body') : $target;
		$target.append(this.$progress);

		this.$progress.css('position', position).animation('fadeIn');

	},
	update: function(target, value)
	{
		target = (typeof value === 'undefined') ? undefined : target;
		value = (typeof value === 'undefined') ? target : value;

		this.open(target);

		this.$progress.find('span').css('width', value + '%');
	},
	close: function()
	{
		if (!this.$progress)
		{
			return;
		}

		this.$progress.animation('fadeOut', { duration: 1 });
		this.$progress = false;
	}
};

$.response = {
	parse: function(str)
	{
    	if (str === '')
		{
			return false;
		}

		var obj = {};

		try {
			obj = $.parseJSON(str);
		} catch (e) {
			return false;
		}

		if (obj[0] !== undefined)
		{
			for (var item in obj)
			{
				$.response.item(obj[item]);
			}
		}
		else
		{
			$.response.item(obj);
		}

		return obj;
	},
	item: function(item)
	{
		if (item.type === 'value')
		{
			$.each(item.data, $.proxy(function(key, val)
			{
    			val = (val === null || val === false) ? 0 : val;
    			val = (val === true) ? 1 : val;

				$(key).val(val);

			}, this));
		}
		else if (item.type === 'html')
		{
			$.each(item.data, $.proxy(function(key, val)
			{
    			val = (val === null || val === false) ? '' : val;

				$(key).html($.response.stripslashes(val));

			}, this));
		}
		else if (item.type === 'addClass')
		{
			$.each(item.data, function(key, val)
			{
				$(key).addClass(val);
			});
        }
		else if (item.type === 'removeClass')
		{
			$.each(item.data, function(key, val)
			{
				$(key).removeClass(val);
			});
        }
		else if (item.type === 'command')
		{
			$.each(item.data, function(key, val)
			{
				$(val)[key]();
			});
		}
		else if (item.type === 'animation')
		{
			$.each(item.data, function(key, data)
			{
				data.opts = (typeof data.opts === 'undefined') ? {} : data.opts;

				$(key).animation(data.name, data.opts);
			});
		}
		else if (item.type === 'location')
		{
			top.location.href = item.data;
		}
		else if (item.type === 'notify' || item.type === 'message')
		{
			$.notify(item.data);
		}

		return item;
	},
    stripslashes: function(str)
	{
		return (str+'').replace(/\0/g, '0').replace(/\\([\\'"])/g, '$1');
	}
};
(function(Kube)
{
    Kube.Slug = SuperKube.plugin('slug', {

        opts: {
            target: false, // selector
            callbacks: ['set']
        },
    	init: function()
    	{
        	Kube.apply(this, arguments);

    		this.$target = $(this.opts.target);

    		this.$element.on('keyup.component.slug', $.proxy(this.pass, this));
    		this.$target.on('keyup.component.slug, keydown.component.slug', $.proxy(this.disableKeyup, this));
    	},
    	disableKeyup: function()
    	{
        	this.$element.off('keyup.component.slug');
    	},
    	clean: function(value)
    	{
        	return value.toLowerCase().replace(/[\s_]/gi, '-').replace(/[\.,\/#!$%\^&\*;:"“”'{}=_`~()]/g, '');
    	},
    	pass: function()
    	{
        	var value = this.$element.val();

        	value = this.clean(value);
    		value = this.callback('set', value);

    		this.$target.val(value);
    	},
    	destroy: function()
    	{
        	this.disableKeyup();
        	this.$element.removeData();
    		this.$target.off('.component.slug').removeData();
    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Tabkey = SuperKube.plugin('tabkey', {

    	init: function()
    	{
        	Kube.apply(this, arguments);

    		this.$element.on('keydown.component.tabkey', $.proxy(this.tab, this));
    	},
    	tab: function(e)
    	{
    		if (e.keyCode !== 9)
    		{
    			return true;
    		}

    		var start = this.$element[0].selectionStart;
    		var text = this.$element.val();

    		this.addTab(start, text);
            this.setCursorPosition(start);

    		return false;
    	},
    	addTab: function(start, text)
    	{
        	text = text.substring(0, start) + "\t" + text.substring(this.$element[0].selectionEnd);
        	this.$element.val(text);
    	},
    	setCursorPosition: function(start)
    	{
        	this.$element[0].selectionStart = this.$element[0].selectionEnd = start + 1;
    	},
    	destroy: function()
    	{
    		this.$element.off('.component.tabkey').removeData();
    	}
    });

}(Kube));

(function(Kube)
{
    Kube.Upload = SuperKube.plugin('upload', {

    	opts: {
    		target: null,
    		preview: null,
    		url: false, // path to upload script
    		multiple: false, // boolean
    		paramName: false,
    		appendForms: false,
    		appendFields: false,
    		callbacks: ['fallback', 'progress', 'start', 'complete', 'preview'],

    		// private
    		imageTypes: ['image/png', 'image/jpeg', 'image/gif']
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

        	// fallback
    		if (!this.tests())
    		{
    			this.callback('fallback');
    			return;
    		}

    		this.build();
    	},
    	tests: function()
    	{
    		var supported = true;
    		var supports = {};

    		supports.filereader = (typeof FileReader !== 'undefined') ? true : false;
    		supports.dnd = ('draggable' in document.createElement('span')) ? true : false;
    		supports.formdata = (!!window.FormData) ? true : false;
    		supports.progress = ("upload" in new XMLHttpRequest()) ? true : false;

    		for (var api in supports)
    		{
    			if (api === false) {
    				supported = false;
    			}
    		}

    		return supported;
    	},
    	build: function()
    	{
    		this.$element.hide();

    		this.$target = $(this.opts.target);
    		this.$preview = $(this.opts.preview);

    		this.enableEvents();
    	},
    	enableEvents: function()
    	{
    		this.$element.on('change.component.upload', $.proxy(this.onChange, this));
    		this.$target.on('click.component.upload', $.proxy(this.onClick, this));
    		this.$target.on('drop.component.upload', $.proxy(this.onDrop, this));
    		this.$target.on('dragover.component.upload', $.proxy(this.onDragOver, this));
    		this.$target.on('dragleave.component.upload', $.proxy(this.onDragLeave, this));
    	},
    	onClick: function(e)
    	{
    		e.preventDefault();
    		this.$element.click();
    	},
    	onChange: function(e)
    	{
        	this.callback('start');
    		this.send(e, this.$element[0].files);
    	},
    	onDrop: function(e)
    	{
    		e.preventDefault();

    		this.$target.removeClass('upload-hover upload-error upload-success');
    		this.$target.addClass('upload-drop');

    		this.callback('start');
    		this.send(e);
    	},
    	onDragOver: function()
    	{
    		this.$target.addClass('upload-hover');

    		return false;
    	},
    	onDragLeave: function()
    	{
    		this.$target.removeClass('upload-hover');

    		return false;
    	},
    	send: function(e, files)
    	{
        	e = e.originalEvent || e;

    		files = (files) ? files : e.dataTransfer.files;
    		var formData = new FormData();
    		var len = files.length;
    		var name = (this.opts.paramName) ? this.opts.paramName : 'file';

    		if (len === 1)
    		{
    			formData = this.buildData(name, files, formData);
    		}
    		else if (len > 1 && this.opts.multiple !== false)
    		{
    			formData = this.buildDataMultiple(name, files, formData);
    		}

    		formData = this.appendFormsAsData(formData);
    		formData = this.appendFieldsAsData(formData);

    		var xhr = new XMLHttpRequest();
    		xhr.open('POST', this.opts.url);
    		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    		xhr.upload.addEventListener('progress', $.proxy(this.progress, this), false);
    		xhr.onreadystatechange = $.proxy(this.complete, this);

    		xhr.send(formData);

    	},
    	buildData: function(name, files, formData)
    	{
    		this.showPreview(files, false);
    		formData.append(name, files[0]);

    		return formData;
    	},
    	buildDataMultiple: function(name, files, formData)
    	{
    		this.showPreview(files, true);

    		var len = files.length;
    		for (var i = 0; i < len; i++)
    		{
    			formData.append(name + '-' + i, files[i]);
    		}

    		return formData;
    	},
    	showPreview: function(files, multiple)
    	{
    		if (this.opts.preview === null)
    		{
    			return;
    		}

    		if (multiple)
    		{
    			this.$preview.addClass('upload-preview-multiple');
    			this.previewFileMultiple(files);
    		}
    		else
    		{
    			this.$preview.removeClass('upload-preview-multiple');
    			this.previewFile(files[0]);
    		}
    	},
    	complete: function (e)
    	{
    		var data, json;
    		if (e.target.readyState !== 4)
    		{
    			return;
    		}

    		if (e.target.status === 200)
    		{
    			$.progress.close();

    			// complete
    			this.$target.removeClass('upload-hover upload-error upload-drop');
    			this.$target.addClass('upload-success');

    	        data = this.normalizeJsonString(e.target.responseText);

    	        // validate
    	        var $form = this.$element.closest('form[data-component=validate]');
    	        if ($form.length !== 0)
    	        {
                    $form.validate('parse', data);
    	        }

    			json = $.response.parse(data);

    			// callback
    			this.callback('complete', data, json);

    			setTimeout($.proxy(function()
    			{
    				this.$target.removeClass('upload-success');

    			}, this), 1500);
    		}
    	},
    	previewFile: function(file)
    	{
    		if ($.inArray(file.type, this.opts.imageTypes) !== -1)
    		{
    			var reader = new FileReader();
    			reader.onload = $.proxy(this.previewFileOnLoad, this);
    			reader.readAsDataURL(file);
    		}
    		else
    		{
    			this.$preview.text(file.name).show();
    			this.callback('preview', file);
    		}
    	},
    	previewFileOnLoad: function(e)
    	{
    		var img = new Image();
    		img.src = e.target.result;
    		this.$preview.html(img);
    		this.callback('preview', img);
    	},
    	previewFileMultiple: function(files)
    	{
    		var len = files.length;
    		var $ul = $('<ul />');
    		for (var i = 0; i < len; i++)
    		{
    			var file = files[i];

    			if ($.inArray(file.type, this.opts.imageTypes) !== -1)
    			{
    				var reader = new FileReader();
    				reader.onload = $.proxy(this.previewFileMultipleOnLoad, this);
    				reader.readAsDataURL(file);
    			}
    			else
    			{
    				var $file = $('<span />').text(file.name);
    				var $li = $('<li />').append($file);

    				this.$preview.append($li).show();
    				this.callback('preview', file);
    			}
    		}

    	},
    	previewFileMultipleOnLoad: function(e)
    	{
    		var img = new Image();
    		img.src = e.target.result;

    		var $li = $('<li />').append(img);
    		this.$preview.append($li);
    		this.callback('preview', img);
    	},
    	normalizeJsonString: function(str)
    	{
    		str = str.replace(/^\[/, '');
    		str = str.replace(/\]$/, '');

    		return str;
    	},
    	progress: function(e)
    	{
    		var complete = parseInt(e.loaded / e.total * 100);

    		$.progress.update(this.$target, complete);
    		this.callback('progress', complete);
    	}
    });

}(Kube));

(function(Kube)
{
    Kube.Validate = SuperKube.plugin('validate', {

    	opts: {

    		trigger: false,
    		errorClass: 'error',
    		send: true,
    		shortcut: false,
    		progress: false,
    		callbacks: ['load', 'send', 'success', 'error']

    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

    		this.disableDefaultValidation();
    		this.setShortcut();

    		return (this.opts.trigger) ? this.initTrigger() : this.initSubmit();
    	},
    	disableDefaultValidation: function()
    	{
    		this.$element.attr('novalidate', 'novalidate');
    	},
    	initTrigger: function()
    	{
        	this.$trigger = $(this.opts.trigger);

    		this.$element.submit(function() { return false; });
    		this.$trigger.off('click.component.validate');
    		this.$trigger.on('click.component.validate', $.proxy(this.load, this));
    	},
    	initSubmit: function()
    	{
    		this.$element.on('submit.component.validate', $.proxy(this.load, this));
    	},
    	load: function()
    	{
    		this.callback('load');

    		if (this.opts.send)
    		{
    			this.sendForm();
    		}

    		return false;
    	},
    	sendForm: function()
    	{
    		if (this.opts.progress)
    		{
    			$.progress.open();
    		}

    		this.disableButtons();
            this.saveCodeMirror();
    		this.callback('send');

    		$.ajax({
    			url: this.$element.attr('action'),
    			type: 'post',
    			data: this.$element.serialize(),
    			success: $.proxy(this.parse, this)
    		});

    		return false;
    	},
    	saveCodeMirror: function()
    	{
            $('.CodeMirror').each(function(i, el)
    		{
    			el.CodeMirror.save();
    		});
    	},
    	parse: function(data)
    	{
    		this.enableButtons();
    		this.clearErrors();

    		if (this.opts.progress)
    		{
    			$.progress.close();
    		}

    		var json = $.response.parse(data);
    		if (typeof json.type !== 'undefined' && json.type === 'error')
    		{
    			this.validate(json.errors);
    			this.callback('error', json.errors);
    		}
    		else
    		{
    			this.callback('success', json);
    		}
    	},
    	validate: function(errors)
    	{

        	for (var name in errors)
        	{
                var text = errors[name];
            	var $el = this.getField(name);

            	if ($el.size() !== 0)
                {
        			this.toggleRedactorError($el, 'add');
        			$el.addClass(this.opts.errorClass);

        			if (text !== '')
        			{
            			this.showErrorText(name, text);
        				this.setFieldEvent($el, name);
        			}
    			}
            }
    	},
    	getField: function(name)
    	{
        	return $(this.$element.find('[name=' + name + ']'));
    	},
    	setFieldEvent: function($el, name)
    	{
    		$el.on(this.getFieldEventName($el) + '.component.validate', $.proxy(function()
    		{
        		this.toggleRedactorError($el, 'remove');
        		this.clearError($el);

    		}, this));
    	},
    	showErrorText: function(name, text)
    	{
        	this.$element.find('#' + name + '-validation-error').addClass(this.opts.errorClass).text(text).show();
    	},
    	toggleRedactorError: function($el, type)
    	{
            var redactor = $el.data('redactor');
    		if (typeof redactor !== 'undefined')
    		{
    			redactor.core.box()[type + 'Class'](this.opts.errorClass);
    		}
    	},
        getFieldEventName: function($el)
        {
    		return ($el[0].tagName === 'SELECT' || $el.prop('type') === 'checkbox' || $el.prop('type') === 'radio') ? 'change' : 'keyup';
        },
    	clearErrors: function()
    	{
    		this.$element.find('.' + this.opts.errorClass).each($.proxy(function(i, el)
    		{
        		this.clearError(el);

            }, this));

    		$.notify('closeAll');
    	},
    	clearError: function(el)
    	{
    		this.$element.find('#' + $(el).attr('name') + '-validation-error').removeClass(this.opts.errorClass).html('').hide();
    		$(el).removeClass(this.opts.errorClass).off('.component.validate');
    	},
    	disableButtons: function()
    	{
    		this.$element.find('button').attr('disabled', true);
    	},
    	enableButtons: function()
    	{
    		this.$element.find('button').removeAttr('disabled');
    	},
    	setShortcut: function()
    	{
    		if (this.opts.shortcut)
    		{
        		// ctrl + s or cmd + s
    			$(window).on('keydown.component.validate', $.proxy(this.handleShortcut, this));
    		}
    	},
    	handleShortcut: function(e)
    	{
    		if (((e.ctrlKey || e.metaKey) && e.which === 83))
    		{
    			e.preventDefault();
    			return this.sendForm();
    		}

    		return true;
    	},
    	destroy: function()
    	{
    		this.enableButtons();
    		this.clearErrors();

    		$(this.opts.trigger).off('.component.validate');
    		this.$element.off('.component.validate');
    		$(window).off('.component.validate');
    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Visibility = SuperKube.plugin('visibility', {

        classname: 'visibility',
    	opts: {
        	callbacks: ['visible', 'invisible']
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

            $(window).on('scroll.component.visibility resize.component.visibility', $.proxy(this.check, this));
            this.check();

    	},
        check: function()
        {
            var $window = $(window);
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();
            var elemTop = this.$element.offset().top;
            var elemBottom = elemTop + this.$element.height();
            var tolerance = 15; // px

            var check = ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= (docViewBottom + tolerance)) &&  (elemTop >= docViewTop));
            check ? this.callback('visible') : this.callback('invisible');
        }
    });

}(Kube));
