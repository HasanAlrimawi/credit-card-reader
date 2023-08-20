export const observer = (function () {
  let id = 0;
  let container = {};
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

  const unsubscribe = function (topic, id) {
    let subscribers = [];
    for (let subscriber of container[topic]) {
      if (subscriber.id !== id) {
        subscribers.push(subscriber);
      }
    }
    container[topic] = subscribers;
  };

  const publish = function (topic, data) {
    for (let subscriber of container[topic]) {
      subscriber.functionInCharge(data);
    }
  };

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    publish: publish,
  };
})();
