/**
 * Created by tzhao on 2018/1/31.
 */
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import BScroll from "better-scroll"
import "./scroll.styl"

class Scroll extends React.Component {
    componentDidUpdate() {
        //组建更新后，如果实例化better-scroll并且需要刷新就调用refresh()函数
        if (this.bScroll && this.props.refresh === true) {// ===的优先级较高
            this.bScroll.refresh();
        }
    }
    componentDidMount() {
        this.scrollView = ReactDOM.findDOMNode(this.refs.scrollView);
        if (!this.bScroll) {
            this.bScroll = new BScroll(this.scrollView, {
                scrollX: this.props.direction === "horizontal",
                scrollY: this.props.direction === "vertical",
                //实时派发scroll事件
                probeType: 3,
                click: this.props.click
            });

            if (this.props.onScroll) {
                this.bScroll.on("scroll", (scroll) => {
                    this.props.onScroll(scroll);
                });
            }
        }
    }

    componentWillUnmount() {
        this.bScroll.off("scroll");
        this.bScroll = null;
    }

    refresh() {
        if (this.bScroll) {
            this.bScroll.refresh();
        }
    }

    render() {
        return (
            /*ref标记div元素，通过ReactDOM.findDOMNode来获取此div*/
            <div className="scroll-view" ref="scrollView">
                {/*获取子组件*/}
                {this.props.children}
            </div>
        );
    }
}

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: false,
    onScroll: null
};

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    //是否启用点击
    click: PropTypes.bool,
    //是否刷新
    refresh: PropTypes.bool,
    onScroll: PropTypes.func
};

export default Scroll