angular.module('abn-charts', [])
    .directive('abnChart', function abnChart($timeout, $window) {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/abn-chart.tpl.html',
            scope: {
                id: '@',
                chartTitle: '@',
                model: '='
            },
            link: function (scope, element) {
                var chart;
                var height = 500;
                var unbinds = [];
                var div = $('#' + scope.id + '-div');
                var svgId = scope.id + '-svg';
                $('#' + svgId).empty();
                var helper = new ABNChartHelper();

                var redrawPlot = function (data) {
                    var config = {
                        chartTitle: scope.chartTitle,
                        title: scope.model.title,
                        width: $('#' + scope.id + '-div').width(),
                        height: height,
                        id: scope.id,
                        data: data,
                        alphabet: scope.model.alphabet,
                        selectionCallback: scope.model.selectionCallback
                    };

                    // if (!chart) {
                    chart = new ABNChart(config);
                    // }
                    // chart.updatePlot(config);
                };

                var timeout;
                var onResize = function () {
                    $timeout.cancel(timeout);
                    timeout = $timeout(function () {
                        redrawPlot(scope.model.data);
                    }, 100);
                };

                angular.element($window).on('resize', onResize);
                unbinds.push(scope.$watch('model.dataChanged', function () {
                    if (scope.model.alphabet) {
                        $timeout(function () {
                            scope.model.data = helper.generateKP(scope.model.alphabet);
                            redrawPlot(scope.model.data);
                        });
                    }

                }));


                function getStyle(keyWords) {
                    var style = "<style type='text/css'><![CDATA[\n";
                    _.forEach(document.styleSheets, function (styleSheet) {
                        _.forEach(styleSheet.cssRules, function (cssRule) {
                            _.forEach(keyWords, function (keyWord) {
                                if (cssRule.selectorText && (cssRule.selectorText.indexOf(keyWord) != -1
                                    )
                                ) {
                                    style += cssRule.cssText;
                                    style += '\n';
                                }
                            });
                        });
                    });
                    style += ']]></style>';
                    return style;
                }

                //var link = document.getElementById('download-bar');
                scope.model.downloadChart = function (event, link, fileName) {
                    var serializer = new XMLSerializer();
                    // chart.toggleLegend();
                    var svgId = scope.id + '-svg';
                    var svgElement = document.getElementById(svgId);
                    var styleNames = ['path', 'axis'];
                    var style = getStyle(styleNames);
                    var svgStr = serializer.serializeToString(svgElement);
                    var tag = svgStr.substr(0, svgStr.indexOf('>') + 1);
                    var rest = svgStr.substr(svgStr.indexOf('>') + 1);
                    var svg = tag + style + rest;
                    var canvas = document.getElementById('bar-chart-canvas');
                    if (!canvas) {
                        canvas = document.createElement('canvas');
                        canvas.setAttribute('id', 'bar-chart-canvas');
                    }
                    canvas.height = element[0].clientHeight;
                    canvas.width = element[0].clientWidth;
                    canvg(canvas, svg);
                    var blob;
                    if (canvas.msToBlob) {
                        //for IE
                        event.preventDefault();
                        blob = canvas.msToBlob();
                        window.navigator.msSaveBlob(blob, fileName);
                    } else {
                        link.href = canvas.toDataURL('image/png');
                        link.download = fileName;
                    }
                    // chart.toggleLegend();
                };

                scope.$on('$destroy', function () {
                    unbinds.forEach(function (unbind) {
                        unbind();
                    });
                    chart = null;
                    angular.element($window).off('resize', onResize);

                });
            }
        };
    });
