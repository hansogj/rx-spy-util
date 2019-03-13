/// <reference types="jasmine" />
import { Observable } from 'rxjs';
export declare const lastCall: (spy: jasmine.Spy, argNr?: number) => any;
declare type TId = string | number;
export declare class SpyUtil {
    private subscriptions;
    private spies;
    constructor();
    spySubscribe<T>(obj: Observable<T>, id: TId): void;
    spyException<T>(obj: Observable<T>, id: TId): void;
    spySuccessAndException<T>(obj: Observable<T>, id: TId, idException: string): void;
    get(id: TId): jasmine.Spy;
    argsFor<T>(id: TId, callIndex: number): T[];
    lastOf<T>(id: TId): T;
    lastOfAll(): any[];
    all(): jasmine.Spy[];
    allCounts(): number[];
    filter(filter: (id: TId, index?: number) => boolean): jasmine.Spy[];
    unsubscribe(): void;
    private subscribeOn;
}
export {};
