export class PromiseEvent {
    promise
    constructor(param) {
        this.promise = param;
    }

    // 返回确认
    onConfrim() {
        return new Promise((r, j) => {
            this.promise.on("confirmation", (confNumber, receipt) => {
                r(receipt);
            })
            this.promise.on("error", err => {
                j(err)
            })
        })
    }

    // 返回交易Hash
    onTransactionHash() {
        return new Promise((r, j) => {
            this.promise.on("transactionHash", (receipt) => {
                r(receipt);
            })
            this.promise.on("error", err => {
                j(err)
            })
        })
    }

    onThen() {
        return this.promise;
    }

    onCatch() {
        return this.promise.catch;
    }

    onFinally() {
        return this.promise.finally;
    }

}