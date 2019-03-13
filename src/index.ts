import { defined } from 'array.defined';
import { Observable, Subscription } from 'rxjs';

export const lastCall = (spy: jasmine.Spy, argNr = 0) => {
    if (defined(spy.calls.mostRecent())) {
        return spy.calls.mostRecent().args[argNr];
    }
    throw new Error(`Spy ${spy.name} has not been called`.replace(/\s\s/, '  '));
};

type TId = string | number;
export class SpyUtil {

    private subscriptions: Subscription[];
    private spies: { [id: string]: jasmine.Spy };
    constructor() {
        this.subscriptions = [];
        this.spies = {};
    }


    public spySubscribe<T>(obj: Observable<T>, id: TId) {
        const spy: jasmine.Spy = jasmine.createSpy(`${id}`);
        this.subscribeOn(obj.subscribe(spy));
        this.spies[id] = spy;
    }

    public    spyException<T>(obj: Observable<T>, id: TId) {
        const spy: jasmine.Spy = jasmine.createSpy(`${id}`);
        this.subscribeOn(obj.subscribe(undefined, spy));
        this.spies[id] = spy;
    }

    public spySuccessAndException<T>(obj: Observable<T>, id: TId, idException: string) {
        const spy: jasmine.Spy = jasmine.createSpy(`${id}`);
        const spyException: jasmine.Spy = jasmine.createSpy(idException);
        this.subscribeOn(obj.subscribe(spy, spyException));
        this.spies[id] = spy;
        this.spies[idException] = spyException;
    }

    public get(id: TId): jasmine.Spy {
        return this.spies[id];
    }

    public argsFor<T>(id: TId, callIndex:number): T[] {
        return this.spies[id].calls.argsFor(callIndex);
    }

    public lastOf<T>(id: TId): T {
        return lastCall(this.spies[id]) as T;
    }

    public lastOfAll() {
        return this.all()
            .map(spy => lastCall(spy));
    }

    public all(): jasmine.Spy[] {
        return Object.keys(this.spies)
            .map(key => this.spies[key]);
    }

    public allCounts(): number[] {
        return this.all().map(spy => spy.calls.count());
    }

    public filter(filter: (id: TId, index?: number) => boolean): jasmine.Spy[] {
        return Object.keys(this.spies)
            .filter(filter)
            .map(key => this.spies[key]);
    }


    public unsubscribe() {
        this.all().forEach(spy => spy.calls.reset());
        this.subscriptions.defined().forEach(subscriber => subscriber.unsubscribe());
        this.subscriptions = [];
    }

    private subscribeOn(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

}
