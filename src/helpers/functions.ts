import { obj } from "./interfaces";

/** Takes an object and returns an array containing all the keys arranged by priority. */
function sortPriority(data : obj) : Array<string> {
    const arr : Array<string> = [];
    arr.push(...Object.keys(data).filter((k) => data[k].priority).sort((a, b) => data[a].priority - data[b].priority));
    arr.push(...Object.keys(data).filter((k) => !data[k].priority));
    return arr;
}

/** Takes an object and returns an object with priorities reduced to sequential and priorities to new items. */
function addPriority(data : obj) : obj {
    const keys = sortPriority(data);
    return keys.reduce((acc : obj, key, index) => {
        acc[key] = {...data[key], priority: index+1};
        return acc;
    }, {});
}

/** Returns data without references to the original data. */
function asNew<T>(data : T){
    if (Array.isArray(data)) return [...data];
    else if (typeof(data) === "object") return {...data};
    return data;
}

export { sortPriority, addPriority, asNew};