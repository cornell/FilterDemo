syfadis.analytics.charts.chartMapper = function () {

    function map(dataSeries) {
        var labels = [];
        var datasets = [];

        var dataset = {
            data: [],
            datalabels: {
                anchor: "end",
                align: "end",
                offset: 0
            },
            showLine: true,
            fill: true,
            spanGaps: false,
            steppedLine: false
        };
        datasets.push(dataset);

        dataSeries.map(function(obj) {
            labels.push(obj.label);
            datasets[0].data.push(obj.value);
        });
        
        return {
            labels: labels,
            datasets: datasets,
        }
    }

    return {

        map: map
    }
}