import React from "react";
export default class ErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorOccurred: false };
  }

  componentDidCatch(error, info) {
    this.setState({ errorOccurred: true });
    //logErrorToMyService(error, info);
  }

  render() {
    return (
      <div>
        <h1>Something went wrong!</h1>
      </div>
    );
  }
}
