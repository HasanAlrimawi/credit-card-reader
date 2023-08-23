export const observer = (function () {
  //private attributes
  let _id = 0;
  let _container = {};

  //public functions
  /**
   * It adds the topic/event to the container in order to notify the subscribers on publish
   *
   * @access public
   *
   * @param {string} topic Which is the name of the topic/event to be notified for.
   * @param {function} callbackFunction Which is the function that will be executed on publish for every subscriber on the specified topic
   * @returns {number} id Distinct id or every subscriber to permit unsubscription
   */
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

  /**
   * Unsubscibes the subscriber from the topic it subscribed to.
   *
   * @access public
   *
   * @param {string} topic  The topic/event specified to unsubscribe from
   * @param {number} _id    Subscriber's id
   */
  const unsubscribe = function (topic, _id) {
    let subscribers = [];
    for (let subscriber of _container[topic]) {
      if (subscriber._id !== _id) {
        subscribers.push(subscriber);
      }
    }
    _container[topic] = subscribers;
  };

  /**
   * Notifies the subscibers that a new event on some topic happened and passes data to them.
   *
   * It will invoke the subsciber's function specified for the specified topic type.
   *
   * @access public
   *
   * @param {string} topic  The event or topic wanted to notify its subscibers
   * @param {Object} data   The wanted data to be passed to the subscibers of the topic
   */
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
