<script>
  import Select from './components/Select.svelte';

  let selectItems = [
     {'label': 'avacado', 'enable': true, 'value': 0},
     {'label': 'bacon', 'enable': true, 'value': 1},
     {'label': 'carrots', 'enable': true, 'value': 2},
     {'label': 'cheese', 'enable': true, 'value': 3},
     {'label': 'eggs', 'enable': true, 'value': 4},
     {'label': 'eggrolls', 'enable': true, 'value': 5}, 
     {'label': 'ginger', 'enable': true, 'value': 6},  
     {'label': 'honey', 'enable': true, 'value': 7},  
     {'label': 'jerky', 'enable': true, 'value': 8},  
     {'label': 'kiwi', 'enable': true, 'value': 9}                           
  ]  

	function onSelect (event) {
    console.log(event.detail)
	}
</script>

<style>
  .line {
    padding-bottom: 10px;
  }

  .full {
    width: 100%;
  }

  .item {
    display: inline-block;
    margin: 15px 15px 15px 15px;
  }  
</style>

<div>
  <div> <h5>Select Example</h5> </div>
      <div class="line">
        <div class="item">
            <Select id="select1" items={selectItems} width="200px" height="200px" selectIdx={0} on:onSelect={onSelect}></Select> 
        </div>     

        <div class="item">
            <Select id="select2" items={selectItems} width="200px" height="200px" showArrow selectIdx={0} on:onSelect={onSelect}></Select> 
        </div>       

        <div class="item">
            <Select id="select3" items={selectItems} width="200px" height="200px" divider showArrow selectIdx={0} on:onSelect={onSelect}></Select> 
        </div>  
      </div>        
</div>
