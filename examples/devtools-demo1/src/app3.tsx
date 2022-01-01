
import type {Component} from 'solid-js';
import {createSignal, onCleanup, Show} from 'solid-js';

const Comp3: Component<{text: string}> = (props) => {

    try {
        throw new Error('x');
    } catch (e) {
        console.log(`Comp3 render`, e.stack);
    }

    onCleanup(() => {
        try {
            throw new Error('x');
        } catch (e) {
            console.log(`Comp3 cleanup`, e.stack);
        }
    });
    return <span>Comp3: {props.text}</span>;
}

function createShowSignal() {
    const [show, setShow] = createSignal(true);
    return {show, setShow};
}

const App3: Component = () => {
    const showSignals = [
        createShowSignal(),
        createShowSignal(),
        createShowSignal()
    ];
    const toggleShow = (n: number) => showSignals[n].setShow(s => !s);
    return <div>
        App: 
        <div><button onclick={[toggleShow, 0]}>{showSignals[0].show() ? 'Hide' : 'Show'}</button> <Show when={showSignals[0].show()}><Comp3 text="0" /></Show></div>
        <div><button onclick={[toggleShow, 1]}>{showSignals[1].show() ? 'Hide' : 'Show'}</button> <Show when={showSignals[1].show()}><Comp3 text="1" /></Show></div>
        <div><button onclick={[toggleShow, 2]}>{showSignals[2].show() ? 'Hide' : 'Show'}</button> <Show when={showSignals[2].show()}><Comp3 text="2" /></Show></div>
    </div>
};

export {App3};
