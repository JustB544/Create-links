import React, {useState} from "react";
import { obj } from "./interfaces";

type Callback<T> = (state: T) => T;

/** Hook that allows for access and changing of localstorage */

function _useLocalStorage<T extends string | obj>(key : string, json = false, initialFunc : Function|null = null) : [T, Function, Function]{
    const [state, setState] = useState<T>((((json) ? JSON.parse(localStorage.getItem(key) as string) : localStorage.getItem(key)) || set((typeof(initialFunc) === "function") ? initialFunc() : null, true)) as T);

    function set(val : Callback<T> | T, initial = false) : T{
        let _val : T = (typeof(val) === "function") ? (val as Callback<T>)(state) : val as T;
        const _set : string = (json) ? JSON.stringify(_val) : _val as string;
        localStorage.setItem(key, _set);
        if (!initial){
            setState(_val);
        }
        return _val;
    }

    function update() : T{
        const _set : T = (json) ? JSON.parse(localStorage.getItem(key) as string): localStorage.getItem(key);
        setState(_set);
        return _set;
    }
    
    return [state, set, update];
}

function useLocalStorage(key : string, json = false, initialFunc : Function|null = null) : [any, Function, Function] {
    return (json) ? _useLocalStorage<obj>(key, json, initialFunc) : _useLocalStorage<string>(key, json, initialFunc);
};
export { useLocalStorage }; 