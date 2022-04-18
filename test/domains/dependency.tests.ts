import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { Dependency, DependencyStatus } from '../../src/domains/dependency';

_chai.should();

@suite class DependencyUnitTests {

  @test 'should return up when checkStatusFn returns true'() {
    const dependency = new Dependency("Database", true, () => true)
    
    _chai.expect(dependency.checkStatus().getStatus()).to.equal(DependencyStatus.UP);
  }
}