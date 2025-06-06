
// Error monitoring utility
export class ErrorMonitor {
  private static instance: ErrorMonitor;
  private errors: Array<{ timestamp: Date; error: Error; context?: any }> = [];

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor();
    }
    return ErrorMonitor.instance;
  }

  logError(error: Error, context?: any): void {
    const errorLog = {
      timestamp: new Date(),
      error,
      context
    };
    
    this.errors.push(errorLog);
    console.error('Error logged:', errorLog);
    
    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(errorLog);
    }
  }

  private sendToMonitoringService(errorLog: any): void {
    // Integration with monitoring services like Sentry, LogRocket, etc.
    console.log('Sending to monitoring service:', errorLog);
  }

  getErrors(): Array<{ timestamp: Date; error: Error; context?: any }> {
    return this.errors;
  }

  clearErrors(): void {
    this.errors = [];
  }
}

// Performance monitoring utility
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Array<{ name: string; duration: number; timestamp: Date }> = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      this.logMetric(name, duration);
    };
  }

  logMetric(name: string, duration: number): void {
    const metric = {
      name,
      duration,
      timestamp: new Date()
    };
    
    this.metrics.push(metric);
    console.log(`Performance metric: ${name} took ${duration.toFixed(2)}ms`);
    
    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoringService(metric);
    }
  }

  private sendToMonitoringService(metric: any): void {
    // Integration with performance monitoring services
    console.log('Sending performance metric:', metric);
  }

  getMetrics(): Array<{ name: string; duration: number; timestamp: Date }> {
    return this.metrics;
  }

  clearMetrics(): void {
    this.metrics = [];
  }
}

// React Error Boundary
export const withErrorBoundary = (Component: React.ComponentType<any>) => {
  return class extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      ErrorMonitor.getInstance().logError(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="p-4 text-center">
            <h2>Algo salió mal</h2>
            <p>Ha ocurrido un error inesperado. Por favor, recarga la página.</p>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
};
