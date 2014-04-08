var DataModel = function(){
    var _self = this;

    //Page information
    _self.complete = ko.observable(null);
    _self.failed = ko.observable(null);
    _self.active = ko.observable(null);
    _self.pending = ko.observable(null);
    _self.stuck = ko.observable(null);
    _self.keys = ko.observableArray([]);
    _self.memory = ko.observable({});
    _self.peakMemory = ko.observable("");

    _self.autoRefreshId = null;
    _self.fn = {
        refreshViewModel: function(force){
            var refresh = function(){
                $.getJSON("/api"+window.location.pathname).done(function(data){
                    _self.complete(" ("+data.counts.complete+")");
                    _self.failed(" ("+data.counts.failed+")");
                    _self.active(" ("+data.counts.active+")");
                    _self.pending(" ("+data.counts.pending+")");
                    _self.stuck(" ("+data.counts.stuck+")");
                    _self.keys(data.keys);
                    _self.memory(data.memory.usage);
                    _self.peakMemory(data.memory.peak.human);
                });
            };
            if(force){
                clearInterval(_self.autoRefreshId);
                refresh();
            }
            _self.autoRefreshId = setInterval(refresh, 2500);
        }
    }

    return _self;
}

var dataModel = new DataModel();