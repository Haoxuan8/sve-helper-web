import React, {ErrorInfo, ReactElement} from "react";

const Result = (props: any) => {
    return (
        <div className="flex justify-center items-center h-full w-full">
            {props.children}
        </div>
    )
}

const Loading = () => {
    return (
        <Result>
            loading...
        </Result>
    )
}

class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error);
    }

    render(): JSX.Element {
        const {hasError} = this.state;
        const {children} = this.props;
        if (hasError) {
            return (
                <Result>
                    load file Failed. Please try refresh page.
                </Result>
            );
        }
        return children as JSX.Element;
    }
}

const getLazyComp = (loader: any) => {
    const Comp = React.lazy(loader);
    return () => (
        <ErrorBoundary>
            <React.Suspense fallback={<Loading />}>
                <Comp />
            </React.Suspense>
        </ErrorBoundary>
    );
}

export default getLazyComp;
