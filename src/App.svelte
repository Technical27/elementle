<script>
  import words from "./assets/list.json";
  import order from "./assets/order.json";
  import { DateTime } from "luxon";
  import Answer from "./lib/Answer.svelte";

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

  let hints = [0, 0, 0, 0, 0];
  let previousGuesses = [];

  const guess = (m) => {
    const guess = m.detail;
    if (previousGuesses.indexOf(guess) !== -1) return;

    const i = words.findIndex((x) => guess === x.toLowerCase());
    if (i === -1) return;

    if (i === currentIndex) {
      hints[currentAttempt] = -1;
      currentAttempt = 5;
    } else {
      previousGuesses.push(guess);
      const hint = i > currentIndex ? i - currentIndex : currentIndex - i;
      hints[currentAttempt] = hint;
      currentAttempt++;
    }
  };
</script>

<main>
  <h1>Elementle</h1>
  <div id="answer-grid">
    <Answer enabled={currentAttempt === 0} on:guess={guess} hint={hints[0]} />
    <Answer enabled={currentAttempt === 1} on:guess={guess} hint={hints[1]} />
    <Answer enabled={currentAttempt === 2} on:guess={guess} hint={hints[2]} />
    <Answer enabled={currentAttempt === 3} on:guess={guess} hint={hints[3]} />
    <Answer enabled={currentAttempt === 4} on:guess={guess} hint={hints[4]} />
  </div>
  <footer>
    Created by Aamaruvi Yogamani and inspired by the original Wordle game.
    <br />
    Idea by Aarush Magic.
  </footer>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    border: 0;
    height: 100vh;
    width: 100vw;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 0.8em;
    margin: 0 auto;
    padding: 0.4em 0;
  }

  #answer-grid {
    display: grid;
    margin: 0 auto;
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
