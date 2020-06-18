import styles from './index.css';
import {  fromEvent } from 'rxjs';
import {useEffect} from 'react'
import { takeUntil, concatAll, map, filter, withLatestFrom } from 'rxjs/operators';
export default function () {
    useEffect(() => {
        const video = document.getElementById('video');
        const anchor = document.getElementById('anchor');
        const body = document.body;
        const scroll = fromEvent(document, 'scroll');
        const mouseDown = fromEvent(video, 'mousedown');
        const mouseUp = fromEvent(body, 'mouseup');
        const mouseMove = fromEvent(body, 'mousemove');
        scroll.pipe(
            map(e => { 
                let bottom = anchor.getBoundingClientRect().bottom
                return bottom < 0
            })
        ).subscribe(bool => {
            bool ?
                video.classList.add(`${styles['video-fixed']}`)
            :
                video.classList.remove(`${styles['video-fixed']}`)
        })
        mouseDown.pipe(
            filter(e => video.classList.contains(`${styles['video-fixed']}`)),
            map(e => mouseMove.pipe(takeUntil(mouseUp))),
            concatAll(),
            withLatestFrom(mouseDown, (move, down) => {
                console.log(move, down);
                return{
                    x: move.clientX - down.offsetX,
                    y: move.clientY - down.offsetY
                }
            }),
        ).subscribe({
            next(e) { 
                video.style.left = e.x + 'px';
                video.style.top = e.y + 'px';
             },
            error(err) { console.error('mouseMoveErr: ' + err); },
            complete() { console.log('mouseMove done'); }
        });
    }, [])
    return (
        <div className={styles.normal}>
            <div id="anchor" className={styles.anchor}>
                <div id="video" className={styles.video}></div>
            </div>
        </div>
    );
}
