import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
let bodyRoot = document.getElementById("modal-root");
if (!bodyRoot) {
  bodyRoot = document.createElement("div");
  bodyRoot.id = "modal-root";
  document.querySelector("body").appendChild(bodyRoot);
}
/*
footer:
undefined: show default footer
null: not show footer
vNode: outDiv is container.inner div1 is cancel. inner div2 is onClick.如果只有一个外层，一个内层，那就只有取消回调功能。
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onOkClick = this.onOkClick.bind(this);
    this.onClose = this.onClose.bind(this);
    // 禁止滚动
    this.bodyStyle = document.querySelector("body").getAttribute("style");
    document
      .querySelector("body")
      .setAttribute("style", "overflow: hidden; height: 100vh");
  }

  componentWillUnmount() {}

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    this.init();
  }

  init = () => {
    let modalRoot = this.props.getContainer || bodyRoot;
    if (this.props.visible && this.outNode) {
      modalRoot.appendChild(this.outNode);
    } else {
      if (modalRoot && this.outNode) {
        ReactDOM.unmountComponentAtNode(this.outNode);
        this.outNode &&
          this.outNode.parentNode &&
          this.outNode.parentNode.removeChild(this.outNode);
        document.body.style.overflow = "auto";
        this.outNode = null;
      }
    }
  };

  renderFooter() {
    let { footer, okText, cancelText } = this.props;
    // 如果footer，渲染并嵌入onClick
    if (footer && footer.props && footer.props.children) {
      return React.cloneElement(
        footer,
        {},
        React.Children.map(footer.props.children, (footerElement, index) => {
          if (index === 0) {
            return React.cloneElement(footerElement, { onClick: this.onClose });
          } else if (index === 1) {
            return React.cloneElement(footerElement, {
              onClick: this.onOkClick
            });
          }
        })
      );
    } else if (footer === "default") {
      return (
        <div className="zao-modal_footer">
          <div
            className="zao-modal_button zao-modal_cancelButton"
            onClick={this.onClose}
          >
            {cancelText}
          </div>
          <div
            className="zao-modal_button zao-modal_sureButton"
            onClick={this.onOkClick}
          >
            {okText}
          </div>
        </div>
      );
    } else if (footer === "single") {
      return (
        <div className="zao-modal_footer">
          <div
            className="zao-modal_button zao-modal_sureButton"
            onClick={this.onClose}
          >
            {cancelText}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  onOkClick() {
    let { onOk, destoryFunc } = this.props;
    let onOkResult;
    // 添加异步按钮
    if (onOk) {
      onOkResult = onOk();
    }
    if (onOkResult instanceof Promise) {
      onOkResult.then(() => {
        finish();
      });
    } else {
      finish();
    }
    function finish() {
      destoryFunc && destoryFunc();
    }
  }

  onClose() {
    // body init
    document.querySelector("body").setAttribute("style", this.bodyStyle);
    let { onCancel, destoryFunc } = this.props;
    if (onCancel) {
      onCancel();
    }
    destoryFunc && destoryFunc();
  }

  setModalScroll = ele => {
    ele &&
      ele.addEventListener(
        "touchmove",
        e => {
          !this.props.needDefaultScroll && e && e.preventDefault();
        },
        {
          passive: false
        }
      );
  };

  renderModal() {
    let {
      maskStyle,
      modalMainStyle,
      modalContentStyle,
      style,
      closable,
      centered,
      title
    } = this.props;
    return (
      <div
        ref={this.setModalScroll}
        style={maskStyle}
        onClick={this.props.maskClosable ? this.onClose : null}
        className={`modal_mask ${centered ? "modal_pos_centered" : ""}`}
      >
        <div
          style={modalMainStyle}
          className={`modal_main ${centered ? "" : "modal_pos_top"}`}
        >
          <div
            style={modalContentStyle}
            className="modal_content"
            onClick={e => e.stopPropagation()}
          >
            {/*2-21删除closable 原因：可能是bug*/}
            {title && (
              <div className="zao-center zao-font-normal zao-font-18 modal_title">
                {title}
              </div>
            )}
            {closable && (
              <div className="zao-flex-center closeContainer">
                <img
                  className="closeIcon"
                  onClick={this.onClose}
                  src={require("./res/closeIcon.png")}
                />
              </div>
            )}
            <div
              style={style}
              className="modal_body zao-font-normal zao-color-9"
            >
              {this.props.content}
            </div>
            {this.renderFooter()}
          </div>
        </div>
      </div>
    );
  }

  render() {

    // 这块需要考虑15
    if (this.props.visible && this.props.content) {
      if (!this.outNode) {
        //
        this.outNode = document.createElement("div");
      }
      return ReactDOM.createPortal(this.renderModal(), this.outNode);
    } else {
      return null;
    }
  }
}

Modal.defaultProps = {
  content: "",
  maskClosable: true,
  closable: false,
  footer: "default",
  title: "提示",
  okText: "确认",
  cancelText: "取消",
  centered: false,
  needDefaultScroll: false
};

Modal.confirm = function(props) {
  const modalRoot = bodyRoot;
  let addEle = document.createElement("div");
  modalRoot.appendChild(addEle);
  render(true);
  const destroy = ele => {
    render(false);
    window.setTimeout(() => {
      ReactDOM.unmountComponentAtNode(ele);
      ele && ele.parentNode && ele.parentNode.removeChild(ele);
      document.body.style.overflow = "auto";
    }, 1000);
  };
  function render(bool) {
    ReactDOM.render(
      <Modal
        {...props}
        visible={bool}
        destoryFunc={() => {
          destroy(addEle);
        }}
      />,
      addEle
    );
  }
  return {
    destroy: () => {
      destroy(addEle);
    }
  };
};

export default Modal;
