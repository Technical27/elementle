<script>
  import words from "./assets/list.json";
  import order from "./assets/order.json";
  import { DateTime } from "luxon";
  import Answer from "./lib/Answer.svelte";
  import Table from "./lib/Table.svelte";

  // If we forget to change the order, it will just loop
  const currentDay =
    Math.floor(
      DateTime.fromObject({ year: 2022, month: 10, day: 12 })
        .diffNow()
        .negate()
        .as("days")
    ) % 117;
  const currentIndex = order[currentDay];

  let currentAttempt;
  let tableHints;
  let answers;

  if (
    localStorage.getItem("currentAttempt") !== null &&
    localStorage.getItem("tableHints") !== null &&
    localStorage.getItem("answers") !== null &&
    localStorage.getItem("lastIndex") !== null &&
    Number.parseInt(localStorage.getItem("lastIndex")) === currentIndex
  ) {
    currentAttempt = Number.parseInt(localStorage.getItem("currentAttempt"));
    tableHints = JSON.parse(localStorage.getItem("tableHints"));
    answers = JSON.parse(localStorage.getItem("answers"));
  } else {
    currentAttempt = 0;
    tableHints = new Array(118).fill(0);
    answers = [
      { id: 0, hint: 0, value: "" },
      { id: 1, hint: 0, value: "" },
      { id: 2, hint: 0, value: "" },
      { id: 3, hint: 0, value: "" },
      { id: 4, hint: 0, value: "" },
    ];

    localStorage.setItem("lastIndex", currentIndex.toString());
  }

  $: {
    localStorage.setItem("currentAttempt", currentAttempt.toString());
    localStorage.setItem("tableHints", JSON.stringify(tableHints));
    localStorage.setItem("answers", JSON.stringify(answers));
  }

  const guess = (m) => {
    const guess = m.detail;
    if (
      answers.findIndex(
        (x) => x.value.toLowerCase() === guess && currentAttempt !== x.id
      ) !== -1
    )
      return;

    const i = words.findIndex((x) => guess === x);
    if (i === -1) return;

    if (i === currentIndex) {
      answers[currentAttempt].hint = -1;
      tableHints[i] = -1;
      currentAttempt = 5;
    } else {
      const hint = i > currentIndex ? i - currentIndex : currentIndex - i;
      // Put a hint by the current guess
      answers[currentAttempt].hint = hint;
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
      {#each answers as answer (answer.id)}
        <Answer
          enabled={currentAttempt == answer.id}
          on:guess={guess}
          bind:value={answer.value}
          hint={answer.hint}
        />
      {/each}
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
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: space-between;
  }

  main > div {
    margin: 0 auto;
  }

  h1 {
    text-align: center;
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
    grid: repeat(5, 4em) / auto;
  }

  @media (max-width: 680px) {
    #answer-grid {
      width: 22em;
      grid: repeat(5, 3.5em) / auto;
    }

    footer {
      font-size: 0.6em;
    }
  }
</style>
