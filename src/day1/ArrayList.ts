// an array list is like a growable array, basically what js devs are used to
// as an array

// also called a `growable` array

export default class ArrayList<T> {
    public length: number;
    public arr: Array<T | undefined>;

    constructor(size: number) {
        this.length = size;
        this.arr = new Array(this.length).fill(undefined);
    }

    private _realloc(len: number) {
        return new Array(len).fill(undefined);
    }
    // resize == O(n)
    private _ensureSizeForAdding() {
        const lastEmpty = this.arr.findIndex((itm) => itm === undefined);
        if (lastEmpty === -1) {
            // array is full, expand array
            const tmp = this._realloc(this.length * 2);
            for (let i = 0; i < this.length; i++) {
                tmp[i] = this.arr[i];
            }
            this.arr = tmp; // larger array
            this.length = tmp.length;
            console.log("array has been resized", this.arr);
        }
    }

    // O(n)
    prepend(item: T): void {
        this._ensureSizeForAdding();

        for (let ri = this.length - 1; ri > 0; ri--) {
            const prev = this.arr[ri - 1];
            this.arr[ri] = prev;
        }
        this.arr[0] = item;
        console.log("list prepended", this.arr);
    }

    // O(1), zero checks if it actually adds to array
    insertAt(item: T, idx: number): void {
        if (idx > this.length - 1) return; // throw??
        this.arr[idx] = item;
        console.log("insertAt successful", this.arr);
    }
    // O(n)
    append(item: T): void {
        this._ensureSizeForAdding();

        for (let i = 0; i < this.length; i++) {
            if (this.arr[i] === undefined) {
                this.arr[i] = item;
                console.log("append successful: ", this.arr);
                return;
            }
        }
    }
    // O(n) to find
    remove(item: T): T | undefined {
        const idx = this.arr.findIndex((itm) => itm === item);
        const res = this.arr[idx];

        if (res) {
            this.arr[idx] = undefined;
            console.log("removing and returning: ", res, this.arr);
            return res;
        }
        console.log(`remove could not find: ${item}`, this.arr);
        return undefined;
    }
    // O(1)
    get(idx: number): T | undefined {
        return this.arr[idx];
    }
    removeAt(idx: number): T | undefined {
        const res = this.arr[idx];
        if (res) {
            this.arr[idx] = undefined;
        }
        console.log("removeAt: ", res, this.arr);
        return res;
    }
}
