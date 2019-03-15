import { BehaviorSubject, concat, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpyUtil } from '../src/';

const key = 'someKey';
const catchKey = 'catchKey';

describe('rx-spy-util', () => {
    it('is defined', () => expect(SpyUtil).toBeDefined());

    describe('spy on observable', () => {
        let myObs: BehaviorSubject<string>;
        let spyUtil: SpyUtil;
        beforeEach(() => {
            spyUtil = new SpyUtil();
            myObs = new BehaviorSubject('next');
        });

        it('has initially no subscribed spies ', () => expect(spyUtil.all().length).toBe(0));

        describe('subscribe with spies', () => {
            beforeEach(() => {
                spyUtil.spySubscribe(myObs, key);
                spyUtil.spyException(myObs, catchKey);
            });

            it('has list of subscribers ', () => expect(spyUtil.all().length).toBe(2));

            it('get returns spy from observable subscription callback handler', () => expect(spyUtil.get(key)).toHaveBeenCalledTimes(1));
            it('get returns spy from observable subscription callback handler', () => expect(spyUtil.get(key).and.identity).toEqual(key));
            it('get returns spy from observable subscription callback handler', () => expect(spyUtil.get(catchKey).and.identity).toEqual(catchKey));

            it('success spy has been called with expected value', () => expect(spyUtil.lastOf(key)).toEqual('next'));

            it('exception spy has not been called', () => expect(spyUtil.get(catchKey)).toHaveBeenCalledTimes(0));
            it('exception spy has no lastOf-arguments and wil hence throw Error ', () =>
                expect(() => spyUtil.lastOf(catchKey)).toThrowError('Spy catchKey has not been called'));

            it('allCounts returns list telling how many times all spies have been called ', () => expect(spyUtil.allCounts()).toEqual([1, 0]));
            it('allCounts get incremented after update  ', () => {
                myObs.next('pling');
                expect(spyUtil.allCounts()).toEqual([2, 0]);
                expect(spyUtil.get(key)).toHaveBeenCalledTimes(2);
            });
        });
    });

    describe(' subscriptions with observables that that throws ', () => {
        const obsWillFail = new BehaviorSubject<any>('good');
        let obsWillSuccessAndFail: Observable<number>;
        let spyUtil: SpyUtil;
        const catchKeyOnly = 'someNewId';
        beforeEach(() => {
            spyUtil = new SpyUtil();
            obsWillSuccessAndFail = concat(of(7), throwError('oops!'));
            obsWillFail.error('DOH!');
            spyUtil.spySuccessAndException(obsWillSuccessAndFail, key, catchKey);
            spyUtil.spyException(obsWillFail as Observable<any>, catchKeyOnly);
        });

        it(' both spies has been called', () => expect(spyUtil.allCounts()).toEqual([1, 1, 1]));
        it('lastOfAll returns list of arguments of all spies last call ', () => expect(spyUtil.lastOfAll()).toEqual([7, 'oops!', 'DOH!']));
        it('filter lets you filter (out) some of the spies', () =>
            expect(spyUtil.filter(id => id !== key).map(spy => spy.and.identity)).toEqual([catchKey, catchKeyOnly]));

        it('unsubscribe clears list', () => {
            spyUtil.unsubscribe();
            expect(spyUtil.all().length).toEqual(3);
            expect(spyUtil.allCounts()).toEqual([0, 0, 0]);

            obsWillFail.error('LOL - Will not be clled');
            expect(spyUtil.allCounts()).toEqual([0, 0, 0]);
        });
    });
});
