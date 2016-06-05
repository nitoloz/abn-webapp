function ABNChart(config) {
    var width = config.width,
        height = config.height;

    var svg = d3.select('#' + config.id + '-svg')
        .attr('width', width)
        .attr('height', height);

    var nodes = config.data.nodes,
        links = config.data.links;
    var animation = false;
    var helper = new ABNChartHelper();

    var nodeSizeScale = d3.scale.linear().range([10, 30]).domain([0, config.alphabet.length - 1]);
    var nodeYPositionScale = d3.scale.linear().range([height - 50, 50]).domain([0, config.alphabet.length]);
    var nodeXPositionScale = d3.scale.ordinal().rangePoints([50, width - 50]);
    nodes = _.groupBy(nodes, 'name.length');
    _.forEach(nodes, function (nodes, nameLength) {
        nodeXPositionScale.domain(_.map(nodes, 'name'));
        _.forEach(nodes, function (node) {
            node.x = nodeXPositionScale(node.name);
            node.y = nodeYPositionScale(node.name.length);
        });
    });
    nodes = _.flatten(_.values(nodes));
    var force = d3.layout.force()
        .size([width, height])
        .nodes(nodes)
        .links(links)
        .linkDistance(80)
        .linkStrength(0.1)
        .gravity(0.1)
        .charge(-300);
    if (animation) {
        force.on('tick', tick);
    }

    var link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link')
        .attr('display', function (link) {
            return link.hidden ? 'none' : '';
        })
        .attr('x1', function (d) {
            return nodes[d.source].x;
        })
        .attr('y1', function (d) {
            return nodes[d.source].y;
        })
        .attr('x2', function (d) {
            return nodes[d.target].x;
        })
        .attr('y2', function (d) {
            return nodes[d.target].y;
        });

    var node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', function (d) {
            return nodeSizeScale(d.name.length);
        })
        .attr('cx', function (d) {
            return d.x;
        })
        .attr('cy', function (d) {
            return d.y;
        })
        .call(force.drag)
        .on('click', function (node) {
            console.log(node);
            d3.selectAll('.node').style('fill', function (d) {
                if (helper.isConnected(node.name, d.name) && Math.abs(node.name.length - d.name.length) == 1) {
                    return '#1f77b4';
                } else {
                    return null;
                }
            });
            d3.select(this).style('fill', '#ff7f0e');
        });

    var text = svg.append("g").selectAll("text")
        .data(force.nodes())
        .enter().append("text")
        .style('text-anchor', 'middle')
        .attr('x', function (d) {
            return d.x;
        })
        .attr('dy', 0.5)
        .attr('y', function (d) {
            return d.y;
        })
        .text(function (d) {
            return d.name;
        });

    function tick() {
        var quadTree = d3.geom.quadtree(nodes);
        _.forEach(nodes, function (node) {
            node.y = nodeYPositionScale(node.name.length);
            quadTree.visit(collide(node));
        });

        node.transition()
            .ease('linear')
            // .duration(100)
            .attr('cx', function (d) {
                return d.x;
            })
            .attr('cy', function (d) {
                return d.y;
            });

        text.transition()
            .ease('linear')
            // .duration(100)
            .attr('x', function (d) {
                return d.x;
            })
            .attr('dy', 0.5)
            .attr('y', function (d) {
                return d.y;
            });

        link.transition()
            .ease('linear')
            // .duration(100)
            .attr('x1', function (d) {
                return d.source.x;
            })
            .attr('y1', function (d) {
                return d.source.y;
            })
            .attr('x2', function (d) {
                return d.target.x;
            })
            .attr('y2', function (d) {
                return d.target.y;
            });
    }

    function collide(node) {
        var r = nodeSizeScale(node.name.length) + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function (quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = nodeSizeScale(node.name.length) + nodeSizeScale(quad.point.name.length);
                if (l < r) {
                    l = (l - r) / l * 0.5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }

    force.start();
}