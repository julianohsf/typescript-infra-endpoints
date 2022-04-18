import { Dependency } from '../domains/dependency'
import { Health } from '../domains/health';

export class HealthService {

  readonly health: Health;

  constructor(dependencies: Array<Dependency>) {
    this.health = new Health(dependencies);
  }

  public check(): Health {
    return this.health.check();
  }

}

export class HealthServiceBuilder {
  
  readonly dependencies: Array<Dependency>;
  
  constructor() {
    this.dependencies = new Array<Dependency>();
  }

  public addDependency(dependency: Dependency): HealthServiceBuilder {
    this.dependencies.push(dependency);
    return this;
  }

  public build(): HealthService {
    return new HealthService(this.dependencies);
  }
}