export const observer = (function () {
  /** @private {number} */
  let id_ = 0;
  /** @private {object} */
  let container_ = {};

  /**
   * Adds the topic/event to the container in order to notify
   *     the subscribers on publish.
   *
   * @access public
   *
   * @param {string} topic Which is the name of the topic/event to be
   *     notified for.
   * @param {function(): undefined} callbackFunction Function that will be
   *     executed on publish for every subscriber on the specified topic
   * @returns {number} id Distinct id or every subscriber
   *     to permit unsubscription
   */
  const subscribe = function (topic, callbackFunction) {
    if (!(topic in container_)) {
      container_[topic] = [];
    }

    container_[topic].push({
      id_: ++id_,
      functionInCharge: callbackFunction,
    });
    return id_;
  };

  /**
   * Unsubscribes the subscriber from the topic it subscribed to.
   *
   * @access public
   *
   * @param {string} topic  The topic/event specified to unsubscribe from
   * @param {number} id_    Subscriber's id
   */
  const unsubscribe = function (topic, id_) {
    let subscribers = [];

    for (let subscriber of container_[topic]) {
      if (subscriber.id_ !== id_) {
        subscribers.push(subscriber);
      }
    }
    container_[topic] = subscribers;
  };

  /**
   * Notifies the subscibers that a new event on some topic happened
   *     and passes data to them.
   *
   * It will invoke the subsciber's function specified for the
   *     specified topic type.
   *
   * @access public
   *
   * @param {string} topic  The event or topic wanted to notify its subscibers
   * @param {Object} data   The wanted data to be passed to the
   *     subscibers of the topic
   */
  const publish = function (topic, data) {
    if (topic in container_) {
      for (let subscriber of container_[topic]) {
        subscriber.functionInCharge(data);
      }
    }
  };

  return {
    subscribe,
    unsubscribe,
    publish,
  };
})();
