"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var NewAppScreen_1 = require("react-native/Libraries/NewAppScreen");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_native_1.StatusBar, { barStyle: "dark-content" }),
            react_1.default.createElement(react_native_1.SafeAreaView, null,
                react_1.default.createElement(react_native_1.ScrollView, { contentInsetAdjustmentBehavior: "automatic", style: styles.scrollView },
                    react_1.default.createElement(NewAppScreen_1.Header, null),
                    react_1.default.createElement(react_native_1.View, { style: styles.body },
                        react_1.default.createElement(react_native_1.View, { style: styles.sectionContainer },
                            react_1.default.createElement(react_native_1.Text, { style: styles.sectionTitle }, "Step One"),
                            react_1.default.createElement(react_native_1.Text, { style: styles.sectionDescription },
                                "Edit ",
                                react_1.default.createElement(react_native_1.Text, { style: styles.highlight }, "App.js"),
                                " to change this screen and then come back to see your edits.")),
                        react_1.default.createElement(react_native_1.View, { style: styles.sectionContainer },
                            react_1.default.createElement(react_native_1.Text, { style: styles.sectionTitle }, "See Your Changes"),
                            react_1.default.createElement(react_native_1.Text, { style: styles.sectionDescription },
                                react_1.default.createElement(NewAppScreen_1.ReloadInstructions, null))),
                        react_1.default.createElement(react_native_1.View, { style: styles.sectionContainer },
                            react_1.default.createElement(react_native_1.Text, { style: styles.sectionTitle }, "Debug"),
                            react_1.default.createElement(react_native_1.Text, { style: styles.sectionDescription },
                                react_1.default.createElement(NewAppScreen_1.DebugInstructions, null))),
                        react_1.default.createElement(react_native_1.View, { style: styles.sectionContainer },
                            react_1.default.createElement(react_native_1.Text, { style: styles.sectionTitle }, "Learn More"),
                            react_1.default.createElement(react_native_1.Text, { style: styles.sectionDescription }, "Read the docs to discover what to do next:")),
                        react_1.default.createElement(NewAppScreen_1.LearnMoreLinks, null))))));
    };
    return App;
}(react_1.Component));
exports.default = App;
var styles = react_native_1.StyleSheet.create({
    scrollView: {
        backgroundColor: NewAppScreen_1.Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: NewAppScreen_1.Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: NewAppScreen_1.Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: NewAppScreen_1.Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: NewAppScreen_1.Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});
