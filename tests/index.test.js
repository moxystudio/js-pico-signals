import picoSignals from '../index';

it('should have all methods', () => {
    const instance = new picoSignals();

    expect(typeof instance.add).toEqual('function');
    expect(typeof instance.delete).toEqual('function');
    expect(typeof instance.clear).toEqual('function');
    expect(typeof instance.dispatch).toEqual('function');
});

it('should add listener and provide method to delete it', () => {
    const instance = new picoSignals();
    const mockListener = jest.fn();

    const deleteListener = instance.add(mockListener);

    expect(typeof deleteListener).toEqual('function');
    expect(instance.listeners.size).toEqual(1);

    deleteListener();

    expect(instance.listeners.size).toEqual(0);
});

it('should delete listener', () => {
    const instance = new picoSignals();
    const mockListener = jest.fn();

    instance.add(mockListener);

    expect(instance.listeners.size).toEqual(1);

    instance.delete(mockListener);

    expect(instance.listeners.size).toEqual(0);
});

it('should clear all listeners', () => {
    const instance = new picoSignals();

    instance.add(() => jest.fn());
    instance.add(() => jest.fn());

    expect(instance.listeners.size).toEqual(2);

    instance.clear();

    expect(instance.listeners.size).toEqual(0);
});

it('should call every listener on dispatch', () => {
    const instance = new picoSignals();
    const mockListener1 = jest.fn();
    const mockListener2 = jest.fn();

    instance.add(mockListener1);
    instance.add(mockListener2);
    instance.dispatch('arg1', 'arg2');

    expect(mockListener1).toHaveBeenCalledTimes(1);
    expect(mockListener1).toHaveBeenCalledWith('arg1', 'arg2');

    expect(mockListener2).toHaveBeenCalledTimes(1);
    expect(mockListener2).toHaveBeenCalledWith('arg1', 'arg2');
});
