/*!
 * 
 * Author: Joel Soderstrom
 */
;(function($) {
	
    var defaults = {
		model: undefined,			// Tree model/source, if null markup of current jQuery el will be used to construct tree
		urlPrefix: undefined,		// Prefix of all hrefs in tree
		idAttr: 'data-leaf-id',		// Name of custom attribute that hold leaf id	
		catCssClass: 'cat',			// Category <li> CSS class
		leafCssClass: 'leaf',		// Leaf <li> element CSS class
		catUnfoldedCssClass: 'cat-unfolded',	
		activeLeafId: undefined		// ID of active leaf - menu will unfold to show this leaf
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
		
		if(this.opts.activeLeafId) {
			// unfold menu to show active leaf
			this.showLeaf(this.opts.activeLeafId);
		}
	};
	
	Plugin.prototype.showLeaf = function(id) {
		$('[' + this.opts.idAttr + '=' + id + ']').parents('ul').show();
	};
	
	function traverse($ctn, opts) {
		$ctn.find('li').each(function() {
			var $this = $(this),
				$ul = $this.find('ul'),
				isCat = $ul.length;
			
			$this.addClass(isCat ? opts.catCssClass : opts.leafCssClass);
			
			if(isCat) {
				$this
					.find('>a')
					.bind('click', {opts: opts}, toggleCat);
			}
		});
	}
	
	function renderCat($ctn, o, opts, isRoot) {
		var $ul;
		
		if(!isRoot) {
			var $a = $('<a href="#' + o.id + '">' + o.name + '<span></span></a>'); // span element used for folded/unfolded indicator 
			$ul = $('<ul />');
			$ctn.append($a)
				.append($ul)
				.addClass(opts.catCssClass);
			
			$a.bind('click', { opts: opts }, toggleCat);
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
		$li.addClass(opts.leafCssClass)
			.attr(opts.idAttr, leaf.id)
			.append('<a href="' + (opts.urlPrefix ? opts.urlPrefix : '')  + leaf.id + '">' + leaf.name + '</a>');
	}
	
	function toggleCat(e) {
		$(this)
			.parent('li')
			.toggleClass(e.data.opts.catUnfoldedCssClass)
			.end()
			.next()
			.slideToggle('fast');

		return false;
	};
	
	function collapse($ctn) {
		$ctn.find('ul').hide();
	}
	
    $.fn.foldableMenu = function(opts) {
        return this.each(function() {
			new Plugin($(this), opts);
        });
    };
	
})(jQuery);

