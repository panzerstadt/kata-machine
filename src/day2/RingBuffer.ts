export default class RingBuffer<T> {
    public readonly length: number;
    public values: Array<T | undefined>;
    private headIdx: number;
    private tailIdx: number;

    constructor(size: number = 5) {
        this.length = size;
        this.headIdx = -1; // head is always current?
        this.tailIdx = -1;
        this.values = new Array(this.length).fill(undefined);
    }

    private incrementHeadIdx() {
        this.headIdx = (this.headIdx + 1) % this.length;
    }
    private decrementHeadIdx() {
        let newIdx = this.headIdx - 1;
        if (newIdx < 0) {
            newIdx = this.length - 1;
        }
        this.headIdx = newIdx;
    }
    private incrementTailIdx() {
        this.tailIdx = (this.tailIdx + 1) % this.length;
    }
    private decrementTailIdx() {
        this.tailIdx = (this.tailIdx - 1) % this.length;
    }
    private _debug(functionName: string, ...rest: string[]) {
        console.log(
            `op:${functionName} h:${this.headIdx} t:${
                this.tailIdx
            } v:<${this.values.map((v, i) =>
                i === this.headIdx ? `${v ?? "_"}]` : `${v ?? "_"}`,
            )}>`,
            ...rest,
        );
    }

    push(item: T): void {
        this.incrementHeadIdx(); // incr BEFORE all push ops
        const newIdx = this.headIdx;

        this.values[newIdx] = item;
        this._debug(this.push.name, `added:${item}`);
    }
    get(idx: number): T | undefined {
        if (idx < 0 || idx > this.length - 1) return undefined;
        return this.values[idx];
    }
    pop(): T | undefined {
        const outputIdx = this.headIdx;

        const res = this.values[outputIdx];
        this.values[outputIdx] = undefined;
        this.decrementHeadIdx(); // decr AFTER all pop ops, IF there is a value?

        this._debug(this.pop.name, `returned:${res}`);
        return res;
    }
}
