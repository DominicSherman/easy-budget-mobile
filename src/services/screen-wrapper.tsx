import React from 'react';

export const asScreen = (Component: React.FC) =>
  class ScreenWrapper extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  };
