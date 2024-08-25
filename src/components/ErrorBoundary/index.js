// components/ErrorBoundary.js
import React, { Component } from 'react';
import { withRouter } from 'next/router';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Redirect to the home page
    this.props.router.push('/');
  }

  render() {
    if (this.state.hasError) {
      // Optionally, you can render a fallback UI before the redirect occurs
      return <h1>Redirecting...</h1>;
    }

    return this.props.children; 
  }
}

// Wrap the ErrorBoundary component with `withRouter` to give it access to the router
export default withRouter(ErrorBoundary);
