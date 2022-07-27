import React, {FC, useEffect, useMemo} from "react";
import {animated, useSpringRef, useTransition} from "react-spring";
import {usePrevious} from "ahooks";

const usePageSwitch = (index: number, pages: FC[]) => {
    const prevIndex = usePrevious(index);

    const reverse = useMemo(() => {
        if (prevIndex != null && prevIndex > index) return true;
        return false;
    }, [index]);

    const transRef = useSpringRef();
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        immediate: prevIndex == null,
        from: {
            opacity: 0,
            transform: `translate3d(${reverse ? "-100%" : "100%"},0,0)`
        },
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: {
            opacity: 0,
            transform: `translate3d(${reverse ? "75%" : "-75%"},0,0)`
        },
    });

    useEffect(() => {
        transRef.start();
    }, [index])

    const pagesElem = (
        <>
            {transitions((style, i) => {
                const Page = pages[i];
                return (
                    <animated.div
                        className="absolute top-0 left-0 right-0"
                        style={{...style}}
                    >
                        <Page />
                    </animated.div>
                )
            })}
        </>
    );

    return {
        elem: pagesElem,
    }
}

export default usePageSwitch;
