import React, { Component } from "react";

interface GameBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface GameBoundaryState {
  hasError: boolean;
}

export class GameBoundary extends Component<
  GameBoundaryProps,
  GameBoundaryState
> {
  constructor(props: GameBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
