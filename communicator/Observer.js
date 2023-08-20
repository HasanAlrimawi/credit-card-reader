// var pubSub = {};

export const observer = (function () {
  var id = 0;
  var container = {};
  const subscribe = function (topic, callbackFunction) {
    if (!(topic in container)) {
      container[topic] = [];
    }
    container[topic].push({
      id: ++id,
      functionInCharge: callbackFunction,
    });
    return id;
  };

  //   container.unsubscribe = function (topic, id) {
  //     container[topic].pop(id);
  //   };
  const unsubscribe = function (topic, id) {
    var subscribers = [];
    for (var subscriber of container[topic]) {
      if (subscriber.id !== id) {
        subscribers.push(subscriber);
      }
    }
    container[topic] = subscribers;
  };

  const publish = function (topic, data) {
    for (var subscriber of container[topic]) {
      // when executing a callback, it is usually helpful to read
      // the documentation to know which arguments will be
      // passed to our callbacks by the object firing the event
      subscriber.functionInCharge(data);
    }
  };

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish,
  };
})();
