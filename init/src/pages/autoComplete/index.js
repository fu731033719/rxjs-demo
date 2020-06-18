import styles from './index.css';
import { Button } from 'antd';
import { fromEvent } from 'rxjs';
import { useEffect, useState, useRef} from 'react'
import { switchMap, debounceTime } from 'rxjs/operators';
export default function () {
    const inputRef = useRef(null);
    const ulRef = useRef(null);
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        const inputEvent$ = fromEvent(inputRef.current, 'input')
        const ulEvent$ = fromEvent(ulRef.current, 'click')
        inputEvent$.pipe(
            debounceTime(1000),
            switchMap(e => getList(e.target.value))
        ).subscribe(
            {
                next: (e) => {
                    setSearchList(e)
                    console.log('next', e);
                },
                error: (err) => {
                    console.error('error',err);
                },
                complete: (e) => {
                    console.log('complete', e);
                }
            }
        )
        ulEvent$.subscribe(
            {
                next: (e) => {
                    console.log('ulEvent$next', e);
                },
                error: (err) => {
                    console.error('error',err);
                },
                complete: (e) => {
                    console.log('complete', e);
                }
            }
        )
    }, [])
    const url = '/api/currentUser';
    const getList = (keyword) => fetch(url).then(res => {
        let arr = []
        if (keyword) {
            arr = creatRandomArray()
        }
        return arr
    })
    const creatRandomArray = () => {
        const length = Math.ceil(Math.random() * 30)
        let arr = [];
        for (let i=0; i< length; i++) {
            arr[i] = {
                label: `item${i}`,
                value: i,
            }
        }
        return arr
    }
    return (
        <div className={styles.autocomplete}>
            <input ref={inputRef} className={styles.input} type="search" id="search" autoComplete="off"/>
            <ul ref={ulRef} id="suggest-list" className={styles.suggest}>
                {
                    searchList.map((item, index) => {
                        return <li key={item.value}>{item.label}</li>
                    })
                }
            </ul>
        </div>
    )
}
