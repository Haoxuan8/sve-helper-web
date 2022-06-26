import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC} from "react";
import {mergeProps} from "@/util/withDefaultProps";

export type HomeProps = {} & NativeProps;

const defaultProps = {};

const Home: FC<HomeProps> = (p) => {
    const props = mergeProps(defaultProps, p);

    return withNativeProps(
        props,
        <div>
            Home
        </div>
    )
}

export default Home;
