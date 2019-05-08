// Element that will manage dashboard request
function DashboardRequest() {
    var self = this;
    var inputStartDate = $(".DashboardPeriod-startedOnText");
    var inputEndDate = $(".DashboardPeriod-finishedOnText");

    // Init Update on each chart that need update
    function initUpdate() {
        dashboardCharts.forEach(function (obj) {
            obj.InitUpdate();
        });
    }
    // Return the chart query object for the POST ajax request
    function getChartQuery() {
        var chartDTO = [];
        dashboardCharts.forEach(function (obj) {
            if (obj.GetNextTake() > 0) {
                chartDTO.push(
                    {
                        key: obj.key,
                        take: obj.GetNextTake(),
                        skip: obj.GetNextSkip(),
                    });
            }
        });
        return {
            Start: inputStartDate.val(),
            End: inputEndDate.val(),
            Querys: chartDTO,
            MustRefreshKpis: updateKpi,
            Filters: _filterService.filters(),
        };
    }

    // Return true if the request is valid, false if not (and will block the request)
    function isValid() {
        if (inputStartDate.val() == "")
            return false;
        if (inputEndDate.val() == "")
            return false;
        return true;
    }

    return {
        getChartQuery: getChartQuery,
        initUpdate: initUpdate,
        isValid: isValid,

    };
}
