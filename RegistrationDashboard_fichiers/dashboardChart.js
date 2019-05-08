// Manage one chart
syfadis.analytics.charts.DashboardChart = function (config, filterTitle) {
    var self = this;
    var _config = config;
    var _filterTitle = filterTitle;
    var chart; // chartjs chart (and it syfadis overlay : BarChart, LineChart, etc...)
    var skip = 0; // number of items currently displayed
    var isUpToDate = false; // the request will refresh this chart if it 's not up to date
    var isFullyLoaded = false; // block the request if we know that they is no more result to find

    switch (config.chartType) {
        case syfadis.analytics.charts.types.barChart:
            chart = new BarChart(_config.canvasId);
            break;
        case syfadis.analytics.charts.types.lineChart:
            chart = new LineChart(_config.canvasId);
            break;
    }
    chart.Create();

    // Load more items in the chart on scroll down
    GetDivChart().on("scroll", function (e) {
        if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight && !isFullyLoaded) {
            skip += _config.take;
            isUpToDate = false;
            updateCharts();
        }
    });
    if (_config.chartType == syfadis.analytics.charts.types.barChart) {
        document.getElementById(_config.canvasId).addEventListener('click', function (evt) {
            var object = chart.GetObject(evt);
            if (object != null) {
                var filter = new syfadis.analytics.charts.filters.DashboardFilter(_config.key, config.filterBy, object.id, object.label, _filterTitle)
                _filterService.update(filter);
            }
        });
    }

    // Display the loader animation after 0.3 secondes
    function InitUpdate() {
        if (!isUpToDate)
            setTimeout(ShowLoader, 300);
    }

    // Update the chart view
    function Update(dataSeries, selectedItems) {
        if (skip == 0)
            GetDivChart().scrollTop(0);

        if (_config.chartType == syfadis.analytics.charts.types.barChart) {
            var height = (dataSeries.length + skip) * 30 + 15;
            chart.barChart.chart.canvas.parentNode.style.height = height + 'px';
        }
        if (skip > 0)
            chart.Add(dataSeries);
        else
            chart.Update(dataSeries);
        RefreshBackgroundColor(selectedItems);

        isFullyLoaded = dataSeries.length < _config.take;
        isUpToDate = true;
        GetDivLoader().hide();
        GetDivChart().css("opacity", "1");
    }

    // Refresh the background color of barcharts
    function RefreshBackgroundColor(selectedItems) {
        if (_config.chartType == syfadis.analytics.charts.types.barChart)
            chart.RefreshBackgroundColor(selectedItems);
    }

    // ReInit the chart with the default values
    function ReInit() {
        isUpToDate = false;
        isFullyLoaded = false;
        skip = 0;
    }

    // Get the number of item to get in the next request. return 0 if they is no need to refresh the chart
    function GetNextTake() {
        if (!isUpToDate && !isFullyLoaded)
            return _config.take;
        return 0;
    }

    // Return the skip value
    function GetNextSkip() {
        return skip;
    }

    // Display the loader
    function ShowLoader() {
        if (!isUpToDate) {
            GetDivLoader().show();
            GetDivChart().css("opacity", "0.3");
        }
    }

    // Get the div that contain the loader
    function GetDivLoader() {
        return $("#ana-GraphicCard-" + _config.canvasId + " .ana-GraphicCard-loader");
    }

    // Get the div that contain the chart
    function GetDivChart() {
        return $("#ana-GraphicCard-" + _config.canvasId + " .ana-GraphicCard-chart");
    }

    return {
        InitUpdate: InitUpdate,
        Update: Update,
        ReInit: ReInit,
        GetNextTake: GetNextTake,
        GetNextSkip: GetNextSkip,
        RefreshBackgroundColor: RefreshBackgroundColor,
        key: _config.key,
        chart: _config.chart,
    }
}
