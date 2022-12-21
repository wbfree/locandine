import { useState, useEffect } from "react";

function _useState<Type>(
    arg: Type
): [Type, React.Dispatch<React.SetStateAction<Type>>] {
    //console.log("useState:"+arg);
    return useState(arg);
}

export class _Component<Type> {
    protected value: Type;
    protected setter: React.Dispatch<React.SetStateAction<Type>>;

    constructor(refObj: Type, storageName: string = "") {
        const [value, setter] = _useState<any>(refObj);
        this.value = value;
        this.setter = setter;
        if (storageName !== "") this.SetStorage(storageName);
    }

    Set(value: Type = this.value): Type {
        this.setter(value);
        return value;
    }

    Get(): Type {
        return this.value;
    }

    private static _storage: Map<string, _Component<any>> = new Map<
        string,
        _Component<any>
    >();

    SetStorage(storageName: string): void {
        _Component._storage.set(storageName, this);
    }

    static GetStorage<Type>(storageName: string): _Component<Type> {
        return (
            (_Component._storage.get(storageName) as _Component<Type>) ||
            new _Component<string>("_unknown storage <" + storageName + ">")
        );
    }

    static HasStorage(storageName: string): boolean {
        return _Component._storage.has(storageName)
    }
}

function _useEffect<Type extends Object>(component: _ComponentAPI<Type>): void {
    useEffect(() => {
        //console.log("useEffect")
        component.Fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}

export class _ComponentAPI<Type extends Object> extends _Component<Type> {
    constructor(
        protected refObj: Type,
        protected url: string,
        storageName: string = ""
    ) {
        super(refObj, storageName);
        _useEffect(this);
    }

    Fetch(): void {
        fetch(this.url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                /* <-- data inferred as { data: T }*/
                //console.log(this.refObj);
                this.Set(data as Type);
            });
    }

    Get(): Type {
        Object.assign(this.refObj, this.value);
        return this.refObj;
    }
}
