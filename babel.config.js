module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        // plugins: [
        //     "expo-router/babel" // styled-components 최적화
        // ],

    };
};