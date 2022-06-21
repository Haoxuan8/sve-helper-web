import _ from "lodash";


type MergeProps = {
    <A, B>(a: A, b: B): B & A;
}

export const mergeProps: MergeProps = (...items: any[]) => {
    const customizer = (objValue: any, srcValue: any) => {
        return _.isUndefined(srcValue) ? objValue : srcValue;
    }

    let ret = _.assign({}, items[0]);
    for (let i = 1; i < items.length; i++) {
        ret = _.assignWith(ret, items[i], customizer);
    }
    return ret
}
