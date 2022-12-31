
var duration = 400;

var tree = d3.tree().separation(function () { 
	return 40; 
});
var svg = d3.select('svg'),
	 g = svg.append('g').attr('transform', 'translate(1,40)');

var gLinks = g.append('g'),
	gNodes = g.append('g');

svg.attr('width', '1000')
	.attr('height', '450');

  var newTreeSize = [960,380];
var oldPos = {};
var updateTree = function () {
	var root = d3.hierarchy(data);

	if (tree.size()[0] !== newTreeSize[0] || tree.size()[1] !== newTreeSize[1]) {
		tree.size(newTreeSize);
	}
	tree(root);

	var nodes = root.descendants().filter(function(d) {
		return d.data.data === null ? false : true;
	});

	var link = gLinks.selectAll('path')
		.data(nodes, function(d) { return d.data.id; });

	link.exit().remove();

	var node = gNodes.selectAll('g')
	  .data(nodes, function(d) { return d.data.id; });

	node.exit().remove();

	node.transition()
		.duration(duration)
	  .attr('transform', function(d) {
	  	setTimeout(function() {
	  		oldPos[d.data.id.toString()] = [d.x, d.y];
	  	}, duration);
	  	return 'translate(' + d.x + ',' + d.y + ')'; 
	  });

	var newNode = node.enter().append('g')
		.attr('transform', function(d) {
			if (!d.parent) return 'translate(' + d.x + ',' + (d.y) + ')';
			else return 'translate(' + oldPos[d.parent.data.id.toString()][0] + ',' + (oldPos[d.parent.data.id.toString()][1]) + ')';
		})
	  .attr('class', 'node');

	newNode.transition()
		.duration(duration)
	  .attr('transform', function(d) { 
	  	oldPos[d.data.id.toString()] = [d.x, d.y];
	  	return 'translate(' + d.x + ',' + d.y + ')'; 
	  });

	newNode.append('circle')
	  .attr('r', 20);

	newNode.append('text')
		.attr('class', 'text')
		.attr('text-anchor', 'middle')
	   .attr('dy', 5)
	   .text(function(d) { return d.data.data; });
};

var handleInsert = function(event) {
	var num = document.getElementById('insertInput').value;
	if (num) {
		document.getElementById('insertInput').value = '';
		insert(parseInt(num), function() {
			d3.selectAll('#insertTree input').each(function() { 
				d3.select(this).attr('disabled', null);
			});
		});
	}
	return false;
};

var handleDelete = function(event) {
	var num = document.getElementById('deleteInput').value;
	if (num && data.data !== null) { 
		document.getElementById('deleteInput').value = '';
		deleteTree(parseInt(num), function() {
			d3.selectAll('#deleteTree input').each(function() { 
				d3.select(this).attr('disabled', null);
			});
		});
	}
	return false;
};
var handleRandom = function(event) {
	// clearTree();
	for(var i = 0;i<10;i++){
	n = Math.floor(Math.random() * (9999 - -9999 + 1)) + -9999;
	randomTree(n, function() {
		d3.selectAll('#randomTree input').each(function() { 
			d3.select(this).attr('disabled', null);
		});
	});
	}
	return false;
}
