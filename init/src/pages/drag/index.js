import styles from './index.css';
import { Button } from 'antd';
import { interval, fromEvent, of } from 'rxjs';
import {useEffect} from 'react'
import {  takeUntil, concatAll, map } from 'rxjs/operators';
export default function () {
    useEffect(() => {
        const dragDOM = document.getElementById('drag');
        const body = document.body;
        const mouseDown$ = fromEvent(dragDOM, 'mousedown');
        const mouseUp$ = fromEvent(body, 'mouseup');
        const mouseMove$ = fromEvent(body, 'mousemove');

        mouseDown$.pipe(
            map(e => mouseMove$.pipe(takeUntil(mouseUp$))),
            concatAll(),
            map(e => ({ x: e.clientX, y: e.clientY }))
        ).subscribe({
            next(e) { 
                console.log('mouseMoveVal:' + JSON.stringify(e));
                dragDOM.style.left = e.x + 'px';
                dragDOM.style.top = e.y + 'px';
             },
            error(err) { console.error('mouseMoveErr: ' + err); },
            complete() { console.log('mouseMove done'); }
        });
    }, [])
    return (
        <div className={styles.normal}>
            <div id="drag" className={styles.drag}></div>
        </div>
    );
}
