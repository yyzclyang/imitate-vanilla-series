class PROMISE {
  public status;
  private value;
  private callbacks;
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`);
    }
    this.status = 'pending';
    this.value = null;
    this.callbacks = [];
    executor(this.resolve.bind(this), this.reject.bind(this));
  }
  then(onFulfilled?, onRejected?) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => {};
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => {};
    }
    return new PROMISE((resolve, reject) => {
      if (this.status === 'pending') {
        this.callbacks.push({
          onFulfilled: (value) => {
            setTimeout(() => {
              const result = onFulfilled(value);
              resolve(result);
            });
          },
          onRejected: (reason) => {
            setTimeout(() => {
              const result = onRejected(reason);
              resolve(result);
            });
          }
        });
      }
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          const result = onFulfilled(this.value);
          resolve(result);
        });
      }
      if (this.status === 'rejected') {
        setTimeout(() => {
          const result = onRejected(this.value);
          resolve(result);
        });
      }
    });
  }
  resolve(value) {
    if (this.status !== 'pending') {
      return;
    }
    this.status = 'fulfilled';
    this.value = value;
    this.callbacks.forEach((callback) => {
      callback.onFulfilled(value);
    });
  }
  reject(reason) {
    if (this.status !== 'pending') {
      return;
    }
    this.status = 'rejected';
    this.value = reason;
    this.callbacks.forEach((callback) => {
      callback.onRejected(reason);
    });
  }
}

export default PROMISE;
