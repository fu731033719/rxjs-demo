import styles from './index.css';
import { Button } from 'antd';
import { interval, Subject, ReplaySubject} from 'rxjs';
import {useEffect, Fragment} from 'react'
import { map, take, multicast } from 'rxjs/operators';
export default function () {
    const source = interval(1000).pipe(
        take(3)
    );

    const first = {
        next: (value) => { console.log('Aoutput', value); },
        error: (err) => { console.log('AError: ' + err); },
        complete: () => { console.log('Acomplete'); }
    }
    const second = {
        next: (value) => { console.log('Boutput', value); },
        error: (err) => { console.log('BError: ' + err); },
        complete: () => { console.log('Bcomplete'); }
    }

    const subject = new Subject({
        next: (value) => { console.log('output', value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); },
    })
    
    const fn = () => {
        subject.subscribe(first)
        source.subscribe(subject);
        setTimeout(() => {
            subject.subscribe(second);
        }, 1000);
    }
    const multi = () => {
        let multiSource = interval(1000).pipe(
            multicast(() => new Subject())
        )
        multiSource.subscribe(first);
        let realSubscription = multiSource.connect();
        setTimeout(() => {
            multiSource.subscribe(second);
        }, 4000)
        setTimeout(() => {
            realSubscription.unsubscribe()
        }, 7000)
    }
    return (
        <Fragment>
            <Button onClick={e => fn()}>test</Button>
            <Button onClick={e => multi()}>multiTest</Button>
        </Fragment>
    );
}
