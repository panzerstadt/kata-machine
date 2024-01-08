import quick_sort from "@code/QuickSort";

test("quick-sort", function () {
    const arr = [9, 3, 70, 4, 69, 2, 420, 42];
    // const arr = [9, 3, 7, 4, 69, 420, 42];

    quick_sort(arr);
    expect(arr).toEqual([2, 3, 4, 9, 42, 69, 70, 420]);
});
