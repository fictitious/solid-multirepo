import type {Component, Accessor} from 'solid-js';
import {createSignal, createEffect, Show} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

export interface TestProps {
  first: Accessor<string>;
  last: Accessor<string>;
}

export interface Data {
  first: string;
  last: string;
}

const Test: Component<TestProps> = ({first, last}: TestProps) => {

  createEffect(() => console.log(`${first()} ${last()}`));

  return (<div>{first()} {last()}</div>)
};

const ConditionalTest = () =>  {
  const [loggedIn, setLoggedIn] = createSignal(false);
  const toggle = () => setLoggedIn(!loggedIn())
  
  const fallback = () => <button onClick={toggle}>Log in</button>;

  const bad = () => 
    <Show {...{when: loggedIn(), fallback}}>
      <button onClick={toggle}>Log out</button>
      
    </Show>

  const good = () =>
    <Show when={loggedIn()} fallback={fallback}>
      <button onClick={toggle}>Log out</button>
      
    </Show>

  return good();
}

const TestData: Component<{data: Data}> = (props) => {

//  const {data} = props; // DOES NOT WORK ! CAN'T USE DESCTRUCTURING

  createEffect(() => console.log(`${props?.data?.first} ${props?.data?.last}`));

  return (<div>{props?.data?.first} {props?.data?.last}</div>)
};

const ImmediateComp: Component = (props) => <div>immediate: {props.children}</div>;

const App: Component = () => {
  const [first, setFirst] = createSignal("JSON");
  const [last, setLast] = createSignal("Bourne");

  const [data, setData] = createSignal({first: 'fdd', last: 'q'});

  createEffect(() => setFirst(f => f + '.'));

  createEffect(() => setData(d => ({...d, first: d.first + '+'})));

  return <ImmediateComp>
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>


        <Test {...{first, last}}/>
        qqq
        <Test {...{first, last}}/>
        ddd

        <TestData data={data()} /> {/* does not work ! CAN'T USE DESTRUCTURING*/}

        <TestData {...{data: data()}} />

        conditional:
        <ConditionalTest />

        <a
          class={`${styles.link}`}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  </ImmediateComp>;
};

export {App};
