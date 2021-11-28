import {createSignal, createEffect, onCleanup, untrack} from 'solid-js';
import {createStore} from 'solid-js/store';
import type {Component, Accessor} from 'solid-js';

const [count, setCount] = createSignal(0);

const interestingMessages = [
    'solid-devtools-hook',
    'solid-devtools-channel'
];

const S: Component = () => {

    let div: HTMLDivElement | undefined;

    untrack(() => setCount(c => c + 1));
    createEffect(() => {
        console.log(`render S: count=${count()}`);
    });

    const onMessage = ({data, source}: {data: Record<string, string>, source: object}) => {
        if (source !== window || !data) {
            return;
        }
        if (interestingMessages.includes(data.category)) {
            console.log(data);
            if (div) {
                const e = document.createElement('div');
                const t = document.createTextNode(JSON.stringify(data));
                e.appendChild(t);
                div.appendChild(e);
            }
        }
    };

    createEffect(() => {
        window.addEventListener('message', onMessage);
    });
    onCleanup(() => {
        window.removeEventListener('message', onMessage);
    });

    return (
        <div ref={div} data-s="s" style={{height:'1000px', width:'1000px'}}>s: <T count={count()}/></div>
    );
}

export type TState = Readonly<{
    count: number;
    interval?: number;
}>;

const T: Component<{count: number}> = props => {
    
    const [state, setState] = createStore<TState>({count: 0});
    createEffect(() => {
        console.log(`T useEffect`);
        setState(s => ({
            count: s.count,
            interval: setInterval(
                () => {

console.log(`T interval: count=${state.count}`);
                
                    setState(s => {
                        let interval = s.interval;
                        if (s.count > 3) {
                            clearInterval(interval);
                            interval = undefined;
                        }
                        return {
                            count: s.count + 1,
                            interval
                        };
                    })
                },
                3000
            )
        }));
    });
    onCleanup(() => {
        state.interval && clearInterval(state.interval);
    });

    const buttonClick = () => { console.log('Q') };

    return <>
        <div>render count: {props.count}</div>
        <div>state count: {state.count}</div>
        <div><button onclick={buttonClick}>Q</button></div>
    </>;
}

export {S};
