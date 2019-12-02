<script>
  import CheckboxBtn from './components/CheckboxBtn.svelte'
  import CheckboxGroup from './components/CheckboxGroup.svelte'
  
  let checkboxItems = [
    {'label': 'item1', 'value': 'test1', 'checked': false},
    {'label': 'item2', 'value': 'test2', 'checked': false},
    {'label': 'item3', 'value': 'test3', 'checked': false}
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
    margin: 15px 30px 15px 30px;
  }
</style>


<div>
  <div> <h5>Checkbox Example</h5> </div>
      <div class="line">
        <div class="item">
            <CheckboxBtn id="chk1" label="square" checked on:onSelect={onSelect}></CheckboxBtn>
        </div>
        <div class="item">
            <CheckboxBtn id="chk2" label="round" border="round" on:onSelect={onSelect}></CheckboxBtn>
        </div>
        <div class="item">
            <CheckboxBtn id="chk3" label="circle" border="circle" on:onSelect={onSelect}></CheckboxBtn>
        </div>                
      </div>      
      <div class="line">
        <div class="item">
            <CheckboxBtn id="chk1" label="square-reverse" revert on:onSelect={onSelect}></CheckboxBtn>
        </div>
        <div class="item">
            <CheckboxBtn id="chk2" label="round-reverse" border="round" revert on:onSelect={onSelect}></CheckboxBtn>
        </div>
        <div class="item">
            <CheckboxBtn id="chk3" label="circle-reverse" border="circle" revert on:onSelect={onSelect}></CheckboxBtn>
        </div>                
      </div>        
  <hr>
</div>

<div>
  <div> <h5>CheckboxGroup Example</h5> </div>
      Horizontal
      <div class="line">
        <div class="item">
            <CheckboxGroup id="chk4" items={checkboxItems}  on:onSelect={onSelect}></CheckboxGroup>
        </div>                
      </div>
      Vertical
      <div class="line">
        <div class="item full">
            <CheckboxGroup id="chk5" display="block" direction="v" items={checkboxItems}  on:onSelect={onSelect}></CheckboxGroup>
        </div>                
      </div>      
  <hr>
</div>
