var syfadis = window.syfadis || {};

syfadis.chartJS = syfadis.chartJS || {};

function ChartHelper() {
    var self = this;
    var truncateLabelLength = null;
    var chartData = null;
    self.chart = null;

    self.datas = null;


    self.createChart = function (canvaId, chartConfig) {
        self.chart = new Chart(document.getElementById(canvaId), chartConfig).chart;
        self.chartData = self.chart.config.data;
    }

    self.bindDataChartSmoothly = function (data) {
        self.datas = data;
        self.updateLabels(data);
        self.updateDatasets(data);
    }

    self.updateLabels = function (data) {
        for (var i = 0; i < data.labels.length; i++) {
            if (self.chartData.labels.length > i) {
                self.chartData.labels[i] = data.labels[i];
            }
            else {
                self.chartData.labels.push(data.labels[i]);
            }
        }

        if (self.chartData.labels.length > data.labels.length) {
            var nbToDelete = self.chartData.labels.length - data.labels.length;
            for (var i = 0; i < nbToDelete; i++) {
                self.chartData.labels.pop();
            }
        }
        self.truncateLabels();
    }

    self.updateDatasets = function (data) {
        for (var i = 0; i < data.datasets.length; i++) {
            if (self.chartData.datasets.length > i) {
                for (var j = 0; j < data.datasets[i].data.length; j++) {
                    if (self.chartData.datasets[i].data.length > j)
                        self.chartData.datasets[i].data[j] = data.datasets[i].data[j];
                    else
                        self.chart.chart.config.data.datasets[i].data.push(data.datasets[i].data[j]);
                }

                if (self.chartData.datasets[i].data.length > data.datasets[i].data.length) {
                    var nbToDelete = self.chartData.datasets[i].data.length - data.datasets[i].data.length;
                    for (var j = 0; j < nbToDelete; j++) {
                        self.chartData.datasets[i].data.pop()
                    }
                }
            }
            else {
                self.chartData.datasets.push(data.datasets[i]);
            }
        }

        if (self.chartData.datasets.length > data.datasets.length) {
            var nbToDelete = self.chartData.labels.length - data.datasets.length;
            for (var i = 0; i < nbToDelete; i++) {
                self.chartData.datasets.pop();
            }
        }
    }

    self.bindDataChart = function (data) {
        self.datas = data;
        self.chartData.labels = data.labels;
        self.chartData.datasets = data.datasets;
    }

    self.setLineChartColors = function () {
        $(self.chartData.datasets).each(function (index, dataset) {
            dataset.backgroundColor = syfadis.chartJS.utils.GetRGBAForIndex(index, 0.5);
            dataset.borderColor = syfadis.chartJS.utils.GetRGBAForIndex(index, 1);
        });
    }

    self.setBackgroundColors = function (backgroundColors) {
        $(self.chartData.datasets).each(function (index, dataset) {
            dataset.backgroundColor = backgroundColors[index];
            dataset.borderColor = backgroundColors[index];
        });
    }

    self.setBackgroundColorsByData = function (backgroundColors) {
        $(self.chartData.datasets).each(function (index, dataset) {
            dataset.backgroundColor = backgroundColors;
            dataset.borderColor = backgroundColors;
        });
    }

    self.update = function () {
        self.chart.update();
    }

    self.truncateLabels = function () {
        if (self.truncateLabelLength != null) {
            for (var i = 0; i < self.chartData.labels.length; i++) {
                if (self.chartData.labels[i].length > self.truncateLabelLength) {
                    self.chartData.labels[i] = self.chartData.labels[i].substring(0, self.truncateLabelLength) + '...';
                }
            }
        }
    }
}