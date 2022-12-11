import { run } from "@cycle/run";
import { MainDOMSource, div, hr, input, makeDOMDriver, p } from "@cycle/dom";

const main = (sources: { DOM: MainDOMSource }) => {
  const input$ = sources.DOM.select(".field").events("input");
  const name$ = input$
    .map((ev) => (ev.target as HTMLInputElement).value)
    .startWith("");
  const vdom$ = name$.map((name) =>
    div([
      input(".field", { attrs: { type: "text" } }),
      hr(),
      p(`Hello, ${name}!`),
    ])
  );
  return {
    DOM: vdom$,
  };
};

run(main, { DOM: makeDOMDriver("#app-container") });
