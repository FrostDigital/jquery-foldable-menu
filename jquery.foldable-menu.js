/*!
 * 
 * Author: Joel Soderstrom
 */
;(function($) {
	
    var defaults = {
		model: undefined,			// Tree model/source, if null markup of current jQuery el will be used to construct tree
		urlPrefix: undefined,		// Prefix of all hrefs in tree
		catCssClass: 'cat',			// Category CSS class
		leafCssClass: 'leaf'		// Leaf CSS class
	};
	
	function Plugin(el, opts) {
		this.opts = $.extend({}, defaults, opts);
		this.el = el;
		
		if(this.opts.model) {
			// render tree from model
			renderCat(this.el, this.opts.model, this.opts, true);
		}
		else {
			// create tree from existing markup
			traverse(this.el, this.opts);
		}
		
		collapse(this.el);
	};
	
	function traverse($ctn, opts) {
		$ctn.find('li').each(function() {
			var $this = $(this),
				$ul = $this.find('ul'),
				isCat = $ul.length;
			
			$this.addClass(isCat ? opts.catCssClass : opts.leafCssClass);
			
			if(isCat) {
				console.log('init: ' + $this.find('>a').text());
				$this.find('>a').click(toggleCat);
				//traverse($ul, opts);
			}
		});
	}
	
	function renderCat($ctn, o, opts, isRoot) {
		var $ul;
		
		if(!isRoot) {
			var $a = $('<a href="#' + o.id + '">' + o.name + '</a>');
			$ul = $('<ul />');
			$ctn.append($a)
				.append($ul)
				.addClass(opts.catCssClass);
			
			$a.click(toggleCat);
		} else {
			$ul = $ctn;
		}

		$.each(isRoot ? o : o.children, function(i, child) {
			var $li = $('<li></li>'); 
			$ul.append($li);
			child.children ? renderCat($li, child, opts) : renderLeaf($li, child, opts);
		});
	};
	
	function renderLeaf($li, leaf, opts) {
		$li.addClass(opts.leafCssClass);
		$li.append('<a href="' + (opts.urlPrefix ? opts.urlPrefix : '')  + leaf.id + '">' + leaf.name + '</a>')
	}
	
	function toggleCat(e) {
		$(this).next().slideToggle('fast');
		// TODO: add css class for folded/unfolded
		return false;
	}
	
	function collapse($ctn) {
		$ctn.find('ul').hide();
	}
	
    $.fn.foldableMenu = function(opts) {
        return this.each(function() {
			new Plugin($(this), opts);
        });
    };
	
})(jQuery);

