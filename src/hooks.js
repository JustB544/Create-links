import {useState} from "react";

/** Hook that allows for access and changing of localstorage */

function useLocalStorage(key, json = false, initialFunc = null){
    const [state, setState] = useState(((json) ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)) || set(initialFunc(), true));

    function set(val, initial = false){
        let _val = val;
        if (typeof(val) === "function"){
            _val = val(state);
        }
        const _set = (json) ? JSON.stringify(_val) : val;
        localStorage.setItem(key, _set);
        if (!initial){
            setState(_val);
        }
        return _val;
    }

    function update(){
        const _set = (json) ? JSON.parse(localStorage.getItem(key)): localStorage.getItem(key);
        setState(_set);
        return _set;
    }
    
    return [state, set, update];
}

export { useLocalStorage };