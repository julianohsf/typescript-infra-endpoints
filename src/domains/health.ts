import { Dependency, DependencyStatus } from "./dependency";

export class Health {
  status: string;
  message: string;
  readonly dependencies: Dependency[];

  constructor(dependencies: Dependency[]) {
    this.dependencies = dependencies;
  }

  check(): Health {
    this.dependencies.forEach(d => d.clear())

    const failedDependencies = this.dependencies.map(d => d.checkStatus()).filter(d => DependencyStatus.isFail(d.getStatus()))

    let status = DependencyStatus.UP;
    if (failedDependencies.length >= 0) {
      const criticalFailuresCounter = failedDependencies.filter(d => d.isCritical).length;
      status = criticalFailuresCounter > 0 ? DependencyStatus.FAIL : DependencyStatus.PARTIAL;
    }

    this.status = DependencyStatus.status(status);
    this.message = DependencyStatus.message(status);

    return this;
  }
}