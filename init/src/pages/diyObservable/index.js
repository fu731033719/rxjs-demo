import { Button } from 'antd';
import {useEffect, Fragment} from 'react'
const emptyObserver = {
    next: () => {},
    error: (e) => {
        console.error('error', e);
    },
    complete: () => {},
}
class Observer {
    constructor (next, error, complete) {
        switch (arguments.length) {
            case 0:
                this.destination = this.safeObserver(emptyObserver)
                break;
            case 1:
                if (!next) {
                    this.destination = this.safeObserver(emptyObserver)
                }
                if (typeof next === 'object') {
                    this.destination = this.safeObserver(next)
                }
                break;
            default:
                this.destination = this.safeObserver(next, error, complete)
                break;
        }
    }
    safeObserver (observerNext, error, complete) {
        let next;
        if (typeof (observerNext) === 'function') {
            next = observerNext
        } else if (observerNext) {
            next = observerNext.next || function () {}
            error = observerNext.error || function (err) { throw err};
            complete = observerNext.complete || function () {}
        }
        return {
            next,
            error,
            complete
        }
    }
    next (value) {
        if ( !this.isStopped && this.next) {
            try {
                this.destination.next(value);
            } catch (err) {
                this.unsubscribe()
                throw err;
            }
        }
    }
    error (err) {
        if (!this.isStopped && this.error) {
            try {
                this.destination.error(err);
            } catch (otherErr) {
                this.unsubscribe();
                throw otherErr
            }
        }

    }
    complete () {
        if (!this.isStopped && this.complete) {
            try {
                this.destination.complete();
            } catch (err) {
                this.unsubscribe();
                throw err
            }
        }
        this.unsubscribe();
    }
    unsubscribe () {
        this.isStopped = true;
    }
}
class Observable {
    constructor(subscribe) {
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    subscribe () {
        const observer = new Observer(...arguments);
        this._subscribe(observer);
        return observer;
    }
}

Observable.create = function (subscribe) {
    return new Observable(subscribe);
}

export default function () {
    const fn = () => {
        let subscribe = (observer) => {
            observer.next(1)
            observer.next(2)
            observer.next(3)
            observer.complete()
            observer.next('still work')
        }
        // let testObserbable = new Observable(subscribe)
        let testObservable = Observable.create(subscribe)

        let observer = {
            next: (e) => {
                console.log('next', e);
            },
            error: (e) => {
                console.log('error', e);
            },
            complete: () => {
                console.log('complete');
            },
        }
        testObservable.subscribe(observer)
    }
    return (
        <Fragment>
            <Button onClick={e => fn()}>test</Button>
        </Fragment>
    );
}
