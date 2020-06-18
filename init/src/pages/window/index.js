import styles from './index.css';
import { Button } from 'antd';
import { fromEvent, interval } from 'rxjs';
import {useEffect} from 'react'
import { switchMap, window } from 'rxjs/operators';
export default function () {
    useEffect(() => {
        const click = fromEvent(document.body, 'click');
        const source = interval(1000);
        source.pipe(
            window(click),
            switchMap()
        ).subscribe({
            next: (e) => {
                console.log('next', e);
            },
            error: (e) => {
                console.log('error', e);
            },
            complete: (e) => {
                console.log('complete', e);
            },
        })
    }, [])
    return (
        <Button>test</Button>
    );
}
