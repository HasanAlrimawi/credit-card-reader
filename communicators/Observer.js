export const observer = (function () {
  let _id = 0;
  let _container = {};
  const subscribe = function (topic, callbackFunction) {
    if (!(topic in _container)) {
      _container[topic] = [];
    }
    _container[topic].push({
      _id: ++_id,
      functionInCharge: callbackFunction,
    });
    return _id;
  };

  const unsubscribe = function (topic, _id) {
    let subscribers = [];
    for (let subscriber of _container[topic]) {
      if (subscriber._id !== _id) {
        subscribers.push(subscriber);
      }
    }
    _container[topic] = subscribers;
  };

  const publish = function (topic, data) {
    for (let subscriber of _container[topic]) {
      subscriber.functionInCharge(data);
    }
  };

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish,
  };
})();
