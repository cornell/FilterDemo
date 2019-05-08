syfadis.analytics.charts.filters.dashboardFilterService = function () {
    var self = this;
    self.filters = ko.observableArray([]);

    self.update = function (filter) {
        //debugger;
        var index = -1;
        var forceRefreshChart = false;
        self.filters().forEach(function (item, i) {
            if (item.id == filter.id && item.type == filter.type) {
                index = i;
                if (filter.chartKey != item.chartKey) {
                    forceRefreshChart = true;
                }
            }
        });
        if (index < 0) {
            self.filters.push(filter);
        }
        else {
            self.filters.splice(index, 1);
        }
        return forceRefreshChart;
    };

    // Find filters for the specified chartkey
    self.getFilters = function (chartKey) {
        var result = [];
        self.filters().forEach(function (filter) {
            if (filter.chartKey == chartKey)
                result.push(filter.id);
        });
        return result;
    }

    self.remove = function (filter) {
        if (self.filters().length == 0) return;

        self.filters.remove(filter);
    }

    self.removeAll = function () {
        if (self.filters().length == 0) return;

        self.filters.removeAll();
    }
}