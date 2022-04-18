import { Dependency, DependencyStatus } from "./dependency";

export class Health {
  private status: string;
  private message: string;
  readonly dependencies: Array<Dependency>;

  constructor(dependencies: Array<Dependency>) {
    this.dependencies = dependencies;
  }

  public check(): Health {
    this.dependencies.forEach(d => d.clear())

    const failedDependencies = this.dependencies.map(d => d.checkStatus()).filter(d => DependencyStatus.isFail(d.getStatus()))
    // console.log('failedDependencies: ', JSON.stringify(failedDependencies))

    let statusMessage = DependencyStatus.UP;
    if (failedDependencies.length > 0) {
      const criticalFailuresCounter = failedDependencies.filter(d => d.isCritical).length;
      statusMessage = criticalFailuresCounter > 0 ? DependencyStatus.FAIL : DependencyStatus.PARTIAL;
    }

    this.message = statusMessage
    this.status = DependencyStatus.status(statusMessage);

    return this;
  }

  public getStatus(): string {
    return this.status;
  }

  public getMessage(): string {
    return this.message;
  }
}