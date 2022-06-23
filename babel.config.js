const isDev = process.env.NODE_ENV === "development";

module.exports = function (api) {
    const isLoader = api.caller(caller => {
        return caller != null && caller.name === "babel-loader";
    });

    api.cache(true);

    return {
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "entry",
                    corejs: 3,
                    targets: isLoader
                        ? {
                            chrome: "69",
                            safari: "9",
                        }
                        : {
                            node: "current",
                        },
                },
            ],
            "@babel/preset-react",
            "@babel/preset-typescript",
        ],
        plugins: [
            isDev && "react-refresh/babel",
        ].filter(Boolean),
    };
};
