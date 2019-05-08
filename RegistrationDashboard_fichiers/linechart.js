var syfadis = window.syfadis || {};
syfadis.charts = syfadis.charts || {};

function LineChart(canvasId) {
    var self = this;
    var lineChart;//chartHelper instance
    var _mapper = new syfadis.analytics.charts.chartMapper();

    self.Create = function () {

        self.lineChart = new ChartHelper();
        self.lineChart.createChart(canvasId, {
            type: 'line',
            options: {
                fill: false,
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                        },
                        gridLines: { display: true },
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                        },
                        ticks: {
                            beginAtZero: true,
                            //Force integer value for Y axis
                            callback: function (value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        },
                        gridLines: { display: true},
                    }]
                },
                layout: {
                    padding: {
                        bottom: -20,
                        top: 0,
                        right: 10,
                        left: 10
                    }
                },
                plugins: { datalabels: { display: false } },
            },
        });
    }

    self.Update = function (serverData) {
        var chartData = _mapper.map(serverData);

        chartData.datasets[0].pointRadius = 3;
        self.lineChart.bindDataChartSmoothly(chartData);
        self.lineChart.setLineChartColors();
        self.lineChart.update();
    }
    return self;
}