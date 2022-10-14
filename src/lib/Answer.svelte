<script lang="ts">
  import { createEventDispatcher, afterUpdate } from "svelte";

  export let enabled: boolean;
  export let hint: number;
  export let value: string;

  const dispatch = createEventDispatcher();

  let el: HTMLInputElement;
  const keydown = (e: KeyboardEvent) => {
    if (enabled && !e.repeat && e.key === "Enter") {
      dispatch("guess", value.toLowerCase());
    }
  };

  const distanceToColor = (d: number): string => {
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

  let updated = false;
  afterUpdate(() => {
    if (updated) {
      if (enabled) {
        el.focus();
      } else {
        el.blur();
      }
    } else {
      updated = true;
    }
  });
</script>

<main>
  <input
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    bind:value
    type="text"
    disabled={!enabled}
    placeholder={enabled ? "Enter your guess" : ""}
    class="answer-input"
    on:keydown={keydown}
    bind:this={el}
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
    grid: 100% / 80% 20%;
  }

  input {
    margin: 0.2em;
    font-size: 2em;
  }

  @media (max-width: 680px) {
    input {
      font-size: 1.2em;
    }
  }

  .hint-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5em;
    padding: 0.1em;
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
