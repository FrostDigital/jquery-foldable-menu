# Foldable menu

This plugin aims to create a simple foldable, vertical menu tree structure.

## Usage

There are two ways of using this plugin. Either load menu tree structure from a JSON object. 
The other approach is to create a foldable tree from existing markup of nested lists (ul-elements).

Example of JSON object:

	var menu = [
		{
			id: 1,
			name: "Category 1",
			children: [{ id: 1, name: "Leaf 1.1" }, { id: 2, name: "Leaf 1.2" } ]
		},
		{
			id: 2,
			name: "Root leaf"
		}
	];
	
	// element #uploadedFiles will be populated with nodes 
	// that corresponds to JSON object above
    $("#uploadedFiles").foldableMenu(menu);
	
	...
	
	<!-- Will be populated by plugin -->
	<ul id="uploadedFiles"></ul>


Example of loading menu form existing markup:
	
    $("#uploadedFiles").foldableMenu();
	
	...
	
	<ul id="uploadedFiles">
		<li>
			<a href="#">Category 1</a>
			<ul>
				<li><a href="#">Leaf 1.1</a></li>
				<li><a href="#">Leaf 1.2</a></li>
			</ul>
		</li>
		<li><a href="#">Root leaf</a></li>
	</ul>

Both examples will generate the same tree.

### HTML markup

   <ul id="uploadedFiles"></ul>

## License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)