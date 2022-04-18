import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { Dependency, DependencyStatus } from '../../src/domains/dependency';
import { Health } from '../../src/domains/health'

_chai.should();

@suite class HealthUnitTests {

  @test 'should return FAIL when a critical dependency is down'() {
    const requiredDependency = new Dependency("Database", true, () => false)
    const desiredDependency = new Dependency("Cache", false, () => false)

    const health = new Health([desiredDependency, requiredDependency]);
    _chai.expect(health.check().getMessage()).to.equals(DependencyStatus.FAIL);
  }

  @test 'should return PARTIAL when only non-critical dependencis are down'() {
    const requiredDependency = new Dependency("Database", true, () => true)
    const desiredDependency = new Dependency("Cache", false, () => false)

    const health = new Health([desiredDependency, requiredDependency]);
    _chai.expect(health.check().getMessage()).to.equals(DependencyStatus.PARTIAL);
  }

  @test 'should return UP when no dependencis are down'() {
    const requiredDependency = new Dependency("Database", true, () => true)
    const desiredDependency = new Dependency("Cache", false, () => true)

    const health = new Health([desiredDependency, requiredDependency]);
    _chai.expect(health.check().getMessage()).to.equals(DependencyStatus.UP);
  }
}
