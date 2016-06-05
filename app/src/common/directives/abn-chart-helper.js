function ABNChartHelper() {
    function combinations(str) {
        var fn = function (current, rest, combinations) {
            if (!rest) {
                combinations.push(current);
            } else {
                fn(current + rest[0], rest.slice(1), combinations);
                fn(current, rest.slice(1), combinations);
            }
            return combinations;
        };
        return _.sortBy(fn("", str, []), 'length');
    }

    function intersection(stringA, stringB) {
        var result = '';
        _.forEach(stringA, function (char) {
            if (stringB.indexOf(char) != -1) {
                result += char;
            }
        });
        return result;
    }

    function isConnected(nodeA, nodeB) {
        return (intersection(nodeA, nodeB).length > 0) ||
            (nodeA === '' && nodeB.length == 1);
    }

    function generateKP(alphabet) {
        var graph = {nodes: [], links: []};
        var conjuncts = combinations(alphabet);
        _.forEach(conjuncts, function (conjunct, conjunctIndex) {
            graph.nodes.push({x: 250, y: 250, name: conjunct});
            for (var i = conjunctIndex + 1; i < conjuncts.length; i++) {
                if ((conjunct.length + 1 == conjuncts[i].length) &&
                    isConnected(conjunct, conjuncts[i])) {
                    graph.links.push({
                        source: conjunctIndex,
                        target: i,
                        weight: intersection(conjunct, conjuncts[i])
                    });
                }
            }
        });
        return graph;
    }

    return {
        isConnected: isConnected,
        generateKP: generateKP
    };
}