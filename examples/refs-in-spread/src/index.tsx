import {render} from "solid-js/web";
import {createSignal, onCleanup, onMount, Show, splitProps} from "solid-js";



function Counter() {
  const [count, setCount] = createSignal(0);
  const increment = () => setCount(count() + 1);

  const [showBtn, setShowBtn] = createSignal(true)

  return (
    <div>
      <Show when={showBtn()}>
        <Button 
          ref={directive} 
          type="button" 
          onClick={increment}
          classList={{
            'hello': count() % 2 === 0
          }} 
        >
          {count()}
        </Button>
      </Show>
      <button onClick={() => setShowBtn(v => !v)}>Toggle Show</button>
    </div>
  );
}

const directive = (el) => {
  console.log('use directive', el)
  onCleanup(() => console.log('cleanup directive'))
}

const Button = (p) => {
  onMount(() => console.log('mount'))
//  const [local, others] = splitProps(p, ["ref"]);
  onCleanup(() => console.log('cleanup'))
//  return <button onClick={p.onClick} type={p.type} classList={p.classList} ref={p.ref}>{p.children}</button>
  return <button {...p} />
//  return <button ref={local.ref} {...others}/>;
}


render(() => <Counter />, document.getElementById("root"));
