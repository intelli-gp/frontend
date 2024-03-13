export class Lock {
    queue: Array<(value: unknown) => void> = [];
    acquired = false;

    async acquire() {
        if (!this.acquired) {
            /**
             * if the lock is not acquired, acquire it and return
             * note: this.acquired is set to true from starting till
             * the last access to this lock then it is set to false
             */
            this.acquired = true;
        } else {
            /**
             * if the lock is acquired, add the continuation to the queue
             * and return a promise that will be resolved when the lock is released
             */
            return new Promise((resolve) => {
                this.queue.push(resolve);
            });
        }
    }

    async release() {
        if (this.queue.length === 0 && this.acquired) {
            /**
             * this represents the case when this is the last continuation on the queue
             */
            this.acquired = false;
            return;
        }

        /**
         * get the next continuation from the queue and call it
         * so that the next next waiting operation can be executed
         */
        const continuation = this.queue.shift();
        continuation && continuation(0);
    }
}
