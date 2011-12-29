# Foldable menu

This plugin aims to create a simple foldable, vertical menu tree structure.

## Usage
	
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
	
    $("#uploadedFiles").foldableMenu(menu);


## License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)