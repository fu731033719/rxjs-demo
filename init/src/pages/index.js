import styles from './index.css';
import {Button} from 'antd';
import { Observable, from, of, fromEvent } from 'rxjs';


const observable = new Observable(subscriber => {
  try {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
  } catch (err) {
    subscriber.error(err); // delivers an error if it caught one
  }
});

const observable2 = from([10, 20, 30]);

const observable3 = of('Jerry', 'Anna')
export default function() {
  const trigglrSubscribe = () => {
    console.log(1111);
    observable.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });
    console.log(2222);
  }
  let promiseTask = () => { 
    return 
  }
  
  const eventTask = fromEvent(document.body, 'click');
  const timeTaskTriggle4 = () => {
    const test = timeTask.subscribe(x => console.log(x));
  }
  
  eventTask.subscribe({
    next(x) { console.log('click got value ' + x); },
    error(err) { console.error(' click something wrong occurred: ' + err); },
    complete() { console.log(' click done'); }
  })

  const trigglrSubscribe2 = () => {
    const test = observable2.subscribe(x => console.log(x));
    test.unsubscribe();
  }
  const trigglrSubscribe3 = () => {
    const test = observable3.subscribe({
      next: (val) => {
        console.log(`ddd:${val}`);
      },
      complete: () => {
        console.log('complete');
      },
      error: (err) => {
        console.error(err);
      }
    });
    test.unsubscribe();
  }

  const timeTask = from(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello spa rxjs')
    }, 3000)
  }))

  
  
  return (
    <div className={styles.normal}>
      <Button type="primary" onClick={e => trigglrSubscribe()}>test</Button>
      <Button type="primary" onClick={e => trigglrSubscribe2()}>test2</Button>
      <Button type="primary" onClick={e => trigglrSubscribe3()}>test3</Button>
      <Button type="primary" onClick={e => timeTaskTriggle4()}>test4</Button>
    </div>
  );
}
