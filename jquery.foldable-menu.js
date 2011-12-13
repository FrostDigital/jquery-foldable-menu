/*!
 * 
 * Author: Joel Soderstrom
 */
(function($) {

    var defaults = {
		urlPrefix: '/',
		catCssClass: 'cat',
		leafCssClass: 'leaf'
	};
	
    $.fn.foldableMenu = function(root, opts) {
        return this.each(function() {
			var $this = $(this);
			opts = $.extend(defaults, opts);
			renderCat($this, root, opts, true);
			collapse($this);
        });
    };

	/**
	 * Recursively iterate tree of categories
	 */
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
    }
	
	function renderLeaf($li, leaf, opts) {
		$li.addClass(opts.leafCssClass);
		$li.append('<a href="' + opts.urlPrefix + leaf.id + '">' + leaf.name + '</a>')
	}
	
	function toggleCat(e) {
		$(this).next().slideToggle('fast');
		return false;
	}
	
	function collapse($ctn) {
		$ctn.find('ul').hide();
	}
	
})(jQuery);

