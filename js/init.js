
(function(global){
    var axisLabel = [];
    var seriesData = []
    fetch(apiConfig.adverseEffect,function(response){

        Module.setAdverseEffects(response.result);
        var seriesData = evaluateChartData(Module.getAdverseEffects());
        initChart('#chartA',seriesData.seriesData(),seriesData.axisLabel());
    })



    function initChart(id,seriesData,axisLabel){
        $(id).highcharts({
            chart: {
                type: 'bar'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: "Type of adverse Reaction"
            },
            xAxis: {
                categories: axisLabel,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                labels: {
                    overflow: 'justify'
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },

                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                fetch(apiConfig[this.category],function(response){
                                    console.log(response.result);
                                    var secondData = evaluateChartData(response.result);
                                    initSecondchart('#chartB',secondData.seriesData(),secondData.axisLabel())
                                });

                                alert('Category: ' + this.category + ', value: ' + this.y);
                            }
                        }
                    }
                }

            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                data: seriesData
            }]
        });
    }
    function initSecondchart(id,seriesData,axisLabel){
        $(id).highcharts({
            chart: {
                type: 'bar'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: "drugs causing Nausea"
            },
            xAxis: {
                categories: axisLabel,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                labels: {
                    overflow: 'justify'
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },

                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                fetch(apiConfig[this.category],function(response){
                                    initLastChart('#chartC',response.result);
                                    console.log(response.result);
                                });

                                alert('Category: ' + this.category + ', value: ' + this.y);
                            }
                        }
                    }
                }

            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                data: seriesData
            }]
        });
    }
    function initLastChart(id,data){
        $(id).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Gender Distribution for Nausea caused by HUMRA'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: "Brands",
                colorByPoint: true,
                data: data
            }]
        });
    }

    function evaluateChartData(module){
        var chartData = {
            axisLabel:function(){
                return _.map(module,function(val){
                    return val.name;
                });
            },
            seriesData:function(){
                return _.map(module,function(val){
                    return val.count;
                });
            }
        };
        return chartData;

    }


})();

