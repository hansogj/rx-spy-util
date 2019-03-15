# rx-spy-util

Collect all your spies to observable values in one util. SpyUtil helps you keep track on each call without all that boilerplate code


### Usage

For extended excamples, se [main.spec.ts]('https://github.com/hansogj/rx-spy-util/blob/master/src/main.spec.ts')

```js
const key =  'someKey';
const spyUtil: SpyUtil = new SpyUtil();
// before each
spyUtil.spySubscribe(service.someObservable, key);
spyUtil.spyException(service.someObservable, 'someOtherId');

....
// tests
expect(spyUtil.get(key)).toHaveBeenCalledTimes(1) ...
expect(spyUtil.get('someOtherId')).not.toHaveBeenCalled() ...
expect(spyUtil.allCounts()).toEqual([1, 0]) ...
expect(spyUtil.argsFor(key, 0).toEqual('some string')) ...
expect(spyUtil.lastOf(key).toEqual('some string')) ...
...
// after each
spyUtil.unsubscribe() ...

```

### Test

```bash
$> npm i && npm test
```

### Dependencies
Your project should have _rxjs_, _array.defined_ and _jasmine_ installed  - these are not bundled with this package to prevent version conflicts


### Todo

_karma singleRun=false_ not  working
