type StrObjProps<Type extends Object> = {
    [key in keyof Type]: string;
}

const strProps = <Type extends Object>(object: Type): StrObjProps<Type> => {
    const objToArr = Object.entries(object);

    const objAreWithPropsStr = objToArr.reduce<Partial<StrObjProps<Type>>>(
        (prevObj, [key, val]) => ({
            ...prevObj,
            [key]: String(val),
        }), {});

    return objAreWithPropsStr as StrObjProps<Type>;
}

export default strProps;