export default class PicoSignals {
    listeners = new Set();

    add(listener) {
        this.listeners.add(listener);

        return () => this.delete(listener);
    }

    delete(listener) {
        return this.listeners.delete(listener);
    }

    clear() {
        this.listeners.clear();
    }

    dispatch(...args) {
        this.listeners.forEach((listener) => listener(...args));
    }
}
