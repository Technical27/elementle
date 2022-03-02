<script>
  /* import { attempts, latestGuess } from "./store.js"; */
  import { createEventDispatcher } from "svelte";

  export let enabled;
  export let hint;
  let guess = "";

  const dispatch = createEventDispatcher();

  const keydown = (e) => {
    if (enabled && e.keyCode === 13) {
      console.log("enter");
      dispatch("guess", e.target.value.toLowerCase());
    }
  };

  const distanceToColor = (d) => {
    if (d === 0) {
      return "grey";
    } else if (d === -1) {
      return "green";
    } else if (d <= 25) {
      return "light-green";
    } else if (d <= 50) {
      return "yellow";
    } else {
      return "light-yellow";
    }
  };
</script>

<main>
  <input
    bind:value={guess}
    type="text"
    disabled={!enabled}
    placeholder={enabled ? "Enter your guess" : ""}
    class="answer-input"
    on:keydown={keydown}
  />
  <div class={`hint-bg ${distanceToColor(hint)}`}>
    {#if hint > 0}
      <span class="hint">{hint > 50 ? ">50" : hint.toString()}</span>
    {/if}
  </div>
</main>

<style>
  main {
    display: grid;
    grid-template: 100% / 80% 20%;
  }

  input {
    margin: 0.2em;
    font-size: 2em;
  }

  .hint-bg {
    margin: 0.5em;
    padding: 0.1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hint {
    text-align: center;
    color: black;
  }

  .green {
    background-color: green;
  }
  .light-green {
    background-color: lightgreen;
  }
  .yellow {
    background-color: yellow;
  }
  .light-yellow {
    background-color: lightyellow;
  }
  .grey {
    background-color: grey;
  }

  .answer-input:disabled {
    color: black;
  }
</style>
