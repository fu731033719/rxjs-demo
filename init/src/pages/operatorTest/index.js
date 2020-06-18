import styles from './index.css';
import { Button } from 'antd';
import { interval, from, fromEvent, of, combineLatest, zip} from 'rxjs';
import {useEffect} from 'react'
import { take, first, takeUntil, concatAll, map, withLatestFrom, merge   } from 'rxjs/operators';
export default function () {
    const first = interval(2500);
    const second = interval(1000);
    const example = first.pipe(merge(second));

    const fn = () => {
        example.subscribe({
            next: (value) => { console.log('output',value); },
            error: (err) => { console.log('Error: ' + err); },
            complete: () => { console.log('complete'); }
        });
    }
    return (
        <Button onClick={e => fn()}>test</Button>
    );
}
