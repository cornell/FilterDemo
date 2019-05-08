syfadis.analytics.charts.filters.DashboardFilter = function (chartKey, filterBy, id, label, title) {

    var self = this;
    self.chartKey = chartKey;
    self.type = filterBy;
    self.id = id;
    self.label = truncateLabels(label);
    self.title = title;

    function truncateLabels(label) {
        if (label.length > 35) {
            return label.substring(0, 35) + '...';
        }
        else {
            return label;
        }
    }

    return self;
}