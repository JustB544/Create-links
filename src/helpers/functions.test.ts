import { sortPriority, addPriority, asNew } from "./functions";

describe('#sortPriority', () => {
    it('should return an array of keys arranged by priority', () => {
        const data = {
            key1: { priority: 2 },
            key2: { priority: 1 },
            key3: { priority: 3 },
        };

        const result = sortPriority(data);

        expect(result).toEqual(['key2', 'key1', 'key3']);
    });

    it('should return an empty array if the input object is empty', () => {
        const data = {};

        const result = sortPriority(data);

        expect(result).toEqual([]);
    });

    it('should return an array of keys arranged the same as the object', () => {
        const data = {
            key1: {},
            key2: {},
            key3: {},
        };

        const result = sortPriority(data);

        expect(result).toEqual(["key1", "key2", "key3"]);
    });

    it('should return an array of keys arranged by priority first and then the same as the object', () => {
        const data = {
            key1: {},
            key2: {},
            key3: {},
            key4: {priority: 2},
            key5: {priority: 1},
        };

        const result = sortPriority(data);

        expect(result).toEqual(["key5", "key4", "key1", "key2", "key3"]);
    });
});

describe('#addPriority', () => {
    it('should return an object with priority added to each key', () => {
        const data = {
            key1: {},
            key2: {},
            key3: {},
        };

        const result = addPriority(data);

        expect(result).toEqual({
            key1: { priority: 1 },
            key2: { priority: 2 },
            key3: { priority: 3 },
        });
    });

    it('should return an object with priority added to each key and the rest of the properties kept', () => {
        const data = {
            key1: { value: "value1" },
            key2: { value: "value2" },
            key3: { value: "value3" },
        };

        const result = addPriority(data);

        expect(result).toEqual({
            key1: { value: "value1", priority: 1 },
            key2: { value: "value2", priority: 2 },
            key3: { value: "value3", priority: 3 },
        });
    });

    it('should return an object with old priorities reduced to sequential and new priorities added', () => {
        const data = {
            key1: { value: "value1", priority: 3 },
            key2: { value: "value2" },
            key3: { value: "value3", priority: 1},
            key4: { value: "value4" },
            key5: { value: "value5" },
        };

        const result = addPriority(data);

        expect(result).toEqual({
            key1: { value: "value1", priority: 2 },
            key2: { value: "value2", priority: 3 },
            key3: { value: "value3", priority: 1 },
            key4: { value: "value4", priority: 4 },
            key5: { value: "value5", priority: 5 },
        });
    });
});

describe('#asNew', () => {
    it('should return a new object with the same properties', () => {
        const data = {
            key1: { value: "value1" },
            key2: { value: "value2" },
            key3: { value: "value3" },
        };

        const result = asNew(data);

        expect(result).toEqual(data);
        expect(result).not.toBe(data);
    });

    it('should return a new array with the same properties', () => {
        const data = [1, 2, 3];

        const result = asNew(data);

        expect(result).toEqual(data);
        expect(result).not.toBe(data);
    });

    it('should return the same value if it is not an object or an array', () => {
        const data = "string";

        const result = asNew(data);

        expect(result).toEqual(data);
        expect(result).toBe(data);
    });
});