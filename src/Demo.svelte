<script>
  import ShowAlert from "./Show-Alert.svelte";
  import ShowButton from "./Show-Button.svelte";
  import ShowCheckbox from "./Show-Checkbox.svelte";
  import ShowConfirm from "./Show-Confirm.svelte";
  import ShowRadio from "./Show-Radio.svelte";
  import ShowList from "./Show-List.svelte";
  import ShowSpinner from "./Show-Spinner.svelte";
  import ShowTag from "./Show-Tag.svelte";
  import ShowSelect from "./Show-Select.svelte";
  import ShowDatePicker from "./Show-DatePicker.svelte";
  import ShowTooltip from "./Show-Tooltip.svelte";
  import ShowTextField from "./Show-TextField.svelte";

  import List from "./components/List.svelte";

  let title = "Flat UI";

  let listItems = [
    { record: ["Alert"] },
    { record: ["Button"] },
    { record: ["Checkbox"] },
    { record: ["Confirm"] },
    { record: ["Date/Time"] },
    { record: ["List"] },
    { record: ["Radio"] },
    { record: ["Spinner"] },
    { record: ["Select"] },
    { record: ["Tag"] },
    { record: ["TextField"] },
    { record: ["Tooltip"] }
  ];

  let showType = "";

  function onListPress(event) {
    console.log(event.detail);
    console.log("onListPress " + event.detail.id + "," + event.detail.idx);
    showType = event.detail.content[0];
  }
</script>

<style>
  .title {
    height: 100px;
    width: 100%;
    z-index: 100;
    position: fixed;
    border: solid black;
    border-width: 1px;
  }

  .nav {
    top: 100px;
    position: fixed;
    width: 200px;
    z-index: 101;
  }

  .body {
    width: 100%;
    top: 100px;
    position: absolute;
    padding-left: 250px;
    width: 650px;
    z-index: 10;
  }
</style>

<div class="title">{title}</div>
<div class="nav">
  <List
    id="list0"
    items={listItems}
    itemHeight="30"
    textDirection="left"
    height="700px"
    width="200px"
    on:onClick={onListPress} />
</div>
<div class="body">
  {#if showType == 'Alert'}
    <ShowAlert />
  {:else if showType == 'Button'}
    <ShowButton />
  {:else if showType == 'Checkbox'}
    <ShowCheckbox />
  {:else if showType == 'Confirm'}
    <ShowConfirm />
  {:else if showType == 'Radio'}
    <ShowRadio />
  {:else if showType == 'List'}
    <ShowList />
  {:else if showType == 'Date/Time'}
    <ShowDatePicker />
  {:else if showType == 'Spinner'}
    <ShowSpinner />
  {:else if showType == 'Select'}
    <ShowSelect />
  {:else if showType == 'Tag'}
    <ShowTag />
  {:else if showType == 'TextField'}
    <ShowTextField />
  {:else if showType == 'Tooltip'}
    <ShowTooltip />
  {/if}
</div>
