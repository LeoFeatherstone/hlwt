<script>
  import "carbon-components-svelte/css/all.css";
  import {
    Form,
    FormGroup,
    Select,
    SelectItem,
    NumberInput,
    Theme
  } from "carbon-components-svelte";
  import { solveTime, formatTime } from "./calculate";

  let theme = "white"; // "white" | "g10" | "g80" | "g90" | "g100"

  $: document.documentElement.setAttribute("theme", theme);

  // Define parameters
  let outstanding = 50000.0;
  let interestRate = 1.0;
  let compoundsYearly = 365.25;
  let repayment = 1000.0;
  let paymentsYearly = 12;
  let totalTime = solveTime(
    outstanding,
    repayment,
    interestRate / 100,
    compoundsYearly,
    paymentsYearly
  );
  let expression = formatTime(totalTime);

  $: totalTime = solveTime(
    outstanding,
    repayment,
    interestRate / 100,
    compoundsYearly,
    paymentsYearly
  );
  $: expression = formatTime(totalTime);
</script>

<main>
  <div class="header">
    <Theme render="toggle" />
  </div>
  <div class="container">
    <h1>How long will it take?</h1>
    <h2>...to pay off a debt accruing compound interest</h2>
    <div />
    <div class="container">
      <Form>
        <FormGroup>
          <NumberInput step={1} label="Outstanding" bind:value={outstanding} />
        </FormGroup>
        <FormGroup legendText="">
          <NumberInput
            step={0.01}
            label="Interest rate (% per annum)"
            bind:value={interestRate}
          />
          <Select
            labelText="Compounded"
            on:change={(e) => (compoundsYearly = e.target.value)}
            helperText="Often Daily for bank loans, yearly for HECS debt"
          >
            <SelectItem value="365.25" text="Daily" />
            <SelectItem value="12" text="Monthly" />
            <SelectItem value="1" text="Yearly" />
          </Select>
        </FormGroup>
        <FormGroup legendText="">
          <NumberInput step={1} label="Repayments" bind:value={repayment} />
          <Select
            labelText="Paid Every"
            on:change={(e) => (paymentsYearly = e.target.value)}
          >
            <SelectItem value="52" text="Week" />
            <SelectItem value="12" text="Month" />
            <SelectItem value="1" text="Year" />
          </Select>
        </FormGroup>
      </Form>
    </div>

    <div class="container">
      <h2>{expression}</h2>
    </div>

    <div>
      <br />
      <h3>
        NB: This calculator offers an <em>approximation</em> only. This is because
        it assumes months are all the same length. The creator is not a qualified
        financial analyst of any sort.
      </h3>
    </div>
  </div>
</main>

<style>
  .header {
    margin: 1%;
  }
  .container {
    text-align: center;
    margin: 2.5%;
  }
</style>
