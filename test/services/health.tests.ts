import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { Dependency } from '../../src/domains/dependency';
import { HealthServiceBuilder, HealthService } from '../../src/services/health'

_chai.should()

@suite class HealthServiceUnitTests {

  private builder: HealthServiceBuilder;

  before(): void {
    this.builder = new HealthServiceBuilder()
  }

  @test 'should build a HealthService'() {
    const healthService = this.builder.build();
    _chai.expect(healthService instanceof HealthService).to.true;
  }
  
  @test 'should build a HealthService using dependencies'() {
    const database = new Dependency('Database', true, () => true);

    const healthService = this.builder.addDependency(database).build();
    _chai.expect(healthService instanceof HealthService).to.true;
    
    const health = healthService.check();
    _chai.expect(health.dependencies).length(1);
    _chai.expect(health.dependencies).contains(database);
  }
}