import ArrayList from "@code/ArrayList";
import { test_list } from "./ListTest";

test("array-list", function () {
    const list = new ArrayList<number>(3);
    // list.append(1);
    // list.append(2);
    // list.append(2);
    // list.append(4);
    // list.insertAt(99, 5);
    // list.prepend(88);
    // list.prepend(88);
    // list.prepend(88);
    // list.remove(2);
    // list.remove(77);
    // list.removeAt(99);
    // list.removeAt(1);

    test_list(list);
});
