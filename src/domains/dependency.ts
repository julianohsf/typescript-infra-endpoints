interface BooleanSupplier {
  (): boolean;
}

export enum DependencyStatus {
  UP = "All dependencies are up",
  PARTIAL = "All critical dependencies are up, but there is at least one non critical dependency out of service",
  FAIL = "There is at least one critical dependency out of service"
}

export namespace DependencyStatus {
  export function status(status: DependencyStatus): string {
    return DependencyStatus[DependencyStatus[status]];
  }

  export function message(status: DependencyStatus): string {
    return DependencyStatus[status];
  }

  export function isFail(status: DependencyStatus): boolean {
    return status === DependencyStatus.FAIL;
  }
}

export class Dependency {
  readonly name: string;
  readonly isCritical: boolean;
  readonly checkStatusFn: BooleanSupplier;

  private status: DependencyStatus;

  constructor(name: string, isCritical: boolean, checkStatusFn: BooleanSupplier) {
    this.name = name;
    this.isCritical = isCritical;
    this.checkStatusFn = checkStatusFn;
  }

  public clear(): void {
    this.status = null;
  }

  public checkStatus(): Dependency {
    try {
      this.status = this.checkStatusFn() ? DependencyStatus.UP : DependencyStatus.FAIL;
    } catch (error) {
      this.status = DependencyStatus.FAIL;
    }

    return this;
  }

  public getStatus(): DependencyStatus {
    return this.status;
  }

}