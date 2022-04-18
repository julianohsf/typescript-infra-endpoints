import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { Dependency, DependencyStatus } from '../../src/domains/dependency';

_chai.should();

@suite class DependencyUnitTests {

  @test 'should return false when UP is passed to isFail'() {
    _chai.expect(DependencyStatus.isFail(DependencyStatus.UP)).to.false;
  }

  @test 'should return false when PARTIAL is passed to isFail'() {
    _chai.expect(DependencyStatus.isFail(DependencyStatus.PARTIAL)).to.false;
  }

  @test 'should return true when FAIL is passed to isFail'() {
    _chai.expect(DependencyStatus.isFail(DependencyStatus.FAIL)).to.true;
  }

  @test 'should return UP when checkStatusFn returns true'() {
    const dependency = new Dependency("Database", true, () => true)
    
    _chai.expect(dependency.checkStatus().getStatus()).to.equal(DependencyStatus.UP);
    _chai.expect(dependency.clear().getStatus()).to.null;
  }

  @test 'should return FAIL when checkStatusFn returns false'() {
    const dependency = new Dependency("Database", true, () => false)
    
    _chai.expect(dependency.checkStatus().getStatus()).to.equal(DependencyStatus.FAIL);
    _chai.expect(dependency.clear().getStatus()).to.null;
  }

  @test 'should return FAIL when checkStatusFn throws error'() {
    const dependency = new Dependency("Database", true, () => {throw new Error("Deliberate error")})
    
    _chai.expect(dependency.checkStatus().getStatus()).to.equal(DependencyStatus.FAIL);
    _chai.expect(dependency.clear().getStatus()).to.null;
  }

}