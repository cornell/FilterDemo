var syfadis = window.syfadis || {};
syfadis.charts = syfadis.charts || {};

function BarChart(canvasId) {
    var self = this;
    var barChart;//chartHelper instance
    self.serverData;

    var defaultColor;
    var selectedColor;
    var unselectedColor;
    var _mapper;

    (function init() {
        defaultColor = syfadis.chartJS.utils.GetRGBAForIndex(0, 0.8);
        selectedColor = syfadis.chartJS.utils.GetRGBAForIndex(0, 1);
        unselectedColor = syfadis.chartJS.utils.GetRGBAForIndex(0, 0.4);
        _mapper = new syfadis.analytics.charts.chartMapper();
    })();

    function getArrayColors(selectedItems) {
        var result = [];
        for (var i = 0; i < self.serverData.length; i++) {
            var color = defaultColor;
            if (selectedItems.length > 0) {
                color = unselectedColor;
                selectedItems.forEach(function (item) {
                    if (item == self.serverData[i].id)
                        color = selectedColor;
                });
            }
            result.push(color);
        }
        return result;
    }

    self.Create = function () {
        self.barChart = new ChartHelper();
        self.barChart.truncateLabelLength = 35;
        self.barChart.createChart(canvasId, {
            type: 'horizontalBar',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                responsiveAnimationDuration: 300,
                events: ['click', 'mousemove'],
                onClick: function () { },
                onHover: function (event, chartElement) {
                    event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                },
                legend: { display: false },
                tooltips: {
                    enabled: false,
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: { display: false },
                        ticks:
                        {
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        barPercentage: 1,
                        gridLines: { display: false },
                        ticks:
                        {
                            display: true, // show labels,
                            gridLines: { display: false },
                            ticks: { beginAtZero: true },
                            scaleLabel: {
                                padding: 20
                            }
                        }
                    }],
                },
                layout: {
                    padding: {
                        bottom: 0,
                        top: 0,
                        right: 0,
                        left: 0
                    }
                },
            },
        });
    }

    self.GetElement = function (evt) {
        var elements = self.barChart.chart.getElementAtEvent(evt);
        var result;
        if (elements && elements.length > 0) {
            result = elements[0];
        }
        return result;
    }

    self.GetObject = function (evt) {
        var element = self.GetElement(evt);
        if (element) {
            var obj = self.serverData[element._index];
            return obj;
        }
        return null;
    }

    self.Update = function (serverData) {
        self.serverData = serverData;

        var chartData = _mapper.map(serverData);
        self.barChart.chart.options.scales.xAxes[0].ticks.max = Math.max.apply(null, chartData.datasets[0].data) + Math.max.apply(null, chartData.datasets[0].data) * 15 / 100; //set xAxe max value to 10% more than the maximum value to keep space to display the value.
        self.barChart.bindDataChartSmoothly(chartData);
    }
    self.Add = function (serverData) {
        var chartData = _mapper.map(serverData);

        for (var i = 0; i < chartData.labels.length; i++) {
            self.barChart.chartData.datasets[0].data.push(chartData.datasets[0].data[i]);
            self.barChart.chartData.labels.push(chartData.labels[i]);
            self.barChart.truncateLabels();
            self.serverData.push(serverData[i]);
        }
        self.barChart.update();
    }

    self.RefreshBackgroundColor = function (selectedItems) {
        var colors = getArrayColors(selectedItems);
        self.barChart.setBackgroundColorsByData(colors);
        self.barChart.update();
    }

    return self;
};