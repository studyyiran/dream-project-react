

newTimer(time) {
    let { finishCallBack } = this.props;
    const that = this;
    const info = {
      time: time,
      runCallBack: times => {},
      finishCallBack: () => {
        that.setState({
          times: []
        });
      }
    };
    this.timer = new Timer(info);
    this.timer.start();
  }