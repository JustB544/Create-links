import React, {Component, createContext, useContext, useEffect, useState} from "react";
import { obj } from "./interfaces";
import {v4 as uuid} from "uuid";
import { asNew } from "./functions";

type Callback<T> = (state: T) => T;

/** Hook that allows for access and changing of localstorage */

function _useLocalStorage<T extends string | obj | boolean>(key : string, json = false, initialFunc : Function|null = null) : [T, Function, Function]{
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
    return (json) ? _useLocalStorage<obj|boolean>(key, json, initialFunc) : _useLocalStorage<string>(key, json, initialFunc);
};



/** Forces batching for every update of state (mainly used for batching between components) */

function useBatch<T>(state : T, setState : Function) : Function {

    type Function<T> = (...any : any) => T;

    // batch stores all of the functions that are to be executed (a queue could be used, but Object.keys gives keys in the order they are added acting as a queue)
    const [batch, setBatch] = useState<obj>({});

    // Mock is used so that the state is not updated until the batch is empty
    const [mock, setMock] = useState<T>(state);

    function next(){
        const cur : string = Object.keys(batch)[0];
        setMock(batch[cur] as Function<T>);
        setBatch((b : any) => {
            const _b = {...b};
            delete _b[cur];
            return _b;
        });
    }

    useEffect(() => {
        // continues the batch or updates the state if at the end of the batch
        if (Object.keys(batch).length > 0) next();
        else setState(asNew(mock));
    }, [mock]);

    function set(val : Function<T>|obj) : void {
        // if the batch is empty, set the mock to the current state
        if (Object.keys(batch).length === 0) setMock(state);
        setBatch((b : any) => ({...b, [uuid()]: (typeof(val) !== "function") ? () => val : val}));
    }

    return set;
}

/** Hook that allows for communication between components */
function useChannel(identity : string) : Function {
    const eventBus = {
        on(event : string, callback : Function) : void {
          document.addEventListener(event, () => callback());
        },
        dispatch(event : string, receiver : string) : void {
          document.dispatchEvent(new CustomEvent(event, {detail: receiver}));
        },
        remove(event : any, callback : any) : void {
          document.removeEventListener(event, callback);
        },
      };
    useEffect(() => {

    }, []);
    return 1 as any;
}

export { useLocalStorage, useBatch }; 