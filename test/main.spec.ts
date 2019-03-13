import { Observable, of } from 'rxjs';
import { SpyUtil } from '../src/';

describe('rx-spy-util', () => {
    let myObs: Observable<string>;
    let spyUtil: SpyUtil;
    beforeEach(() => (myObs = of('next')));
    beforeEach(() => (spyUtil = new SpyUtil()));

    it('is defined', () => expect(SpyUtil).toBeDefined());

    it('has initially no subscribed spies ', () => expect(spyUtil.all().length).toBe(0));

    describe('spy on observable', () => {
        beforeEach(() => spyUtil.spySubscribe(myObs, 'myObs'));
        it('has list of subscribers ', () => expect(spyUtil.all().length).toBe(1));
        it('getSpy gives us spy on myObservable ', () =>
             expect(spyUtil.get('myObs')).toBeDefined());

             /* ..... TODO  ..... */
    });
});
