import styles from './index.css';
import { fromEvent, interval } from 'rxjs';
import { useEffect } from 'react'
import { Button } from 'antd';
import { concatAll, map, take  } from 'rxjs/operators';
export default function () {
    useEffect(() => {
        
    }, [])
    const first = interval(1000).pipe(
        take(3)
    );
    const test = () => {
        const click = fromEvent(document.body, 'click');
        click.pipe(
            map(e => first),
            concatAll(),
        ).subscribe({
            next: (value) => { console.log(value); },
            error: (err) => { console.log('Error: ' + err); },
            complete: () => { console.log('complete'); }
        })
    }
    return (
        <Button onClick={test}>test</Button>
    );
}
