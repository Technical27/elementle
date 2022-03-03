<script>
  import words from "./assets/list.json";
  import order from "./assets/order.json";
  import { DateTime } from "luxon";
  import Answer from "./lib/Answer.svelte";
  import Table from "./lib/Table.svelte";

  // If we forget to change the order, it will just loop
  const currentDay =
    Math.floor(
      DateTime.fromObject({ year: 2022, month: 2, day: 28 })
        .diffNow()
        .negate()
        .as("days")
    ) % 117;
  const currentIndex = order[currentDay];

  let currentAttempt = 0;

  let answerHints = new Array(5).fill(0);
  let tableHints = new Array(118).fill(0);
  let previousGuesses = [];

  const guess = (m) => {
    const guess = m.detail;
    if (previousGuesses.indexOf(guess) !== -1) return;

    const i = words.findIndex((x) => guess === x.toLowerCase());
    if (i === -1) return;

    if (i === currentIndex) {
      answerHints[currentAttempt] = -1;
      tableHints[i] = -1;
      currentAttempt = 5;
    } else {
      previousGuesses.push(guess);
      const hint = i > currentIndex ? i - currentIndex : currentIndex - i;
      // Put a hint by the current guess
      answerHints[currentAttempt] = hint;
      // Put a hint on the periodic table
      tableHints[i] = hint;
      currentAttempt++;
    }
  };
</script>

<main>
  <div>
    <h1>Elementle</h1>
    <Table hints={tableHints} />
    <div id="answer-grid">
      <Answer
        enabled={currentAttempt === 0}
        on:guess={guess}
        hint={answerHints[0]}
      />
      <Answer
        enabled={currentAttempt === 1}
        on:guess={guess}
        hint={answerHints[1]}
      />
      <Answer
        enabled={currentAttempt === 2}
        on:guess={guess}
        hint={answerHints[2]}
      />
      <Answer
        enabled={currentAttempt === 3}
        on:guess={guess}
        hint={answerHints[3]}
      />
      <Answer
        enabled={currentAttempt === 4}
        on:guess={guess}
        hint={answerHints[4]}
      />
    </div>
  </div>
  <footer>
    Created by Aamaruvi Yogamani and inspired by the original Wordle game.
    <br />
    Idea by Aarush Magic.
  </footer>
</main>

<style>
  :root,
  :global(div#app),
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    border: 0;
    height: 100vh;
    width: 100vw;
    min-height: 430px;
  }

  main {
    text-align: center;
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: space-between;
  }

  main > div {
    margin: 0 auto;
  }

  footer {
    width: 100%;
    text-align: center;
    font-size: 0.8em;
    margin: 0 auto;
    padding: 0.4em 0;
  }

  #answer-grid {
    display: grid;
    width: 40em;
    grid-template: repeat(5, 4em) / auto;
  }

  @media (max-width: 680px) {
    #answer-grid {
      width: 22em;
      grid-template: repeat(5, 3.5em) / auto;
    }

    footer {
      font-size: 0.6em;
    }
  }
</style>
