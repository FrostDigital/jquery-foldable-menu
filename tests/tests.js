$(function() {
	
	test("Render tree with only one category", function() {
		var o = [ { name:"Cat 1", id: 1, children:[] } ];		
		var $menu = $("#foldableMenu").foldableMenu({ model: o });
		
		equal(1, $menu.find('li').length, "One cat should have been created");
		equal(o[0].name, $menu.find('li > a').html(), "Invalid category name");
		ok($menu.find('li').hasClass('cat'));
	});
	
	test("Render tree with sub categories and leafs", function() {
		var o = [ 
			{ name:"Cat 1", id: 1, children:[] },
			{ name:"Cat 2", id: 2, children:[
				{ name:"Cat 2.1", id: 3, children:[] },
				{ name:"Leaf 1", id: 4 }
			]} 
		];
				
		var $menu = $("#foldableMenu").foldableMenu({ model: o });
		
		equal(2, $menu.find('>li').length);
		equal(o[0].name, $menu.find('li > a').html(), "");
		ok($menu.find('.leaf').length === 1);
	});
	
	test("Render tree from existing markup", function() {
	
		// Markup:
		// 
		// ul
		// 	li.leaf
		//  li.cat
		//		ul
		//		  li.leaf
		
		var $menu = $("#foldableMenu2").foldableMenu();
		
		equal(2, 		$menu.find('>li').length);
		equal('leaf', 	$menu.find('li').first().attr('class'), 		"First child should be a leaf");
		equal('cat', 	$menu.find('li:nth-child(2)').attr('class'), 	"Second child should be a category");
	});
	
});