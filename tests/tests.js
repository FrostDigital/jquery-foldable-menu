$(function() {
	
	test("Render tree with only one category", function() {
		var o = [ { name:"Cat 1", id: 1, children:[] } ];		
		var $menu = $("#foldableMenu").foldableMenu(o, { catCssClass: 'cat' });
		
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
		var $menu = $("#foldableMenu").foldableMenu(o, { catCssClass: 'cat', leafCssClass: 'leaf' });
		
		equal(2, $menu.find('>li').length);
		equal(o[0].name, $menu.find('li > a').html(), "");
		ok($menu.find('.leaf').length === 1);
	});
	
	
	
	
	// HELPERS
	
	
});