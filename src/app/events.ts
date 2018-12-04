export function Events() {
    let _events = {}, _emitted = [];
    this.on = function (eventNames, fn, priority = 100) {
        if (!Array.isArray(eventNames)) {
            eventNames = [eventNames];
        }
        eventNames.forEach(eventName => {
            _events[eventName] = _events[eventName] || [];
            _events[eventName].push({
                fn: fn,
                priority: priority
            });
            if (_emitted[eventName]) {
                fn(_emitted[eventName].data);
            }
        });
    };
    this.emit = function (eventName, data) {
        if (!_emitted[eventName]) {
            _emitted[eventName] = {data: data};
        }
        if (_events[eventName]) {
            _events[eventName].sort((a,b) => {
                return a.priority - b.priority;
            });
            let promises = [];
            _events[eventName].forEach(event => {
                promises.push(Promise.resolve(event.fn(data)));
            });
            return Promise.all(promises);
        }
        return Promise.resolve();
    };
    this.debugEvents = function(key) {
        console.log(key, _events, _emitted);
    }
}