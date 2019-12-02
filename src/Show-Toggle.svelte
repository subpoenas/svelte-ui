<script>
   import ButtonGroup from './components/ButtonGroup.svelte';
   import Button from './components/Button.svelte';
   
   let buttonGroupItems = [
     {'label': 'item1', 'pressed': true},
     {'label': 'item2', 'pressed': false},
     {'label': 'item3', 'pressed': false}
   ]
   

   function onGroupSelect (event) {
   	 console.log(event.detail)
   } 

   function onClick (event) {
      console.log( event.detail)
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
  <div> <h5>Button Example</h5> </div>
      <div class="line">
        <div class="item">
            <Button id="btn1" border="round-up" label={'round up'} on:onClick={onClick}></Button>
        </div>
        <div class="item">
            <Button id="btn2" border="round-down" label={'round down'} on:onClick={onClick}></Button>
        </div>
        <div class="item">
            <Button id="btn3" border="round" label={'round'} on:onClick={onClick}></Button>
        </div>                
        <div class="item">
            <Button id="btn4" border="square" label={'square'} on:onClick={onClick}></Button>
        </div>
        <div class="item">
            <Button id="btn5" border="circle" label={'circle'} on:onClick={onClick}></Button>
        </div>     
      </div>     
      <div class="line">
        <div class="item full">
          <Button display="block" fill="parent" border="square" label={'circle'} on:onClick={onClick}></Button>
        </div>
      </div>
  <hr>
</div>

<div>
  <div> <h5>ButtonGroup Example</h5> </div>
      <div class="line">
        <div class="item">
            <ButtonGroup id="btn6" items={buttonGroupItems} on:onSelect={onGroupSelect}></ButtonGroup>
        </div>
        <div class="item">
            <ButtonGroup id="btn7" mode="radio" border="round" items={buttonGroupItems} on:onSelect={onGroupSelect}></ButtonGroup>
        </div>
      </div>
      
      <div class="line">
        <div class="item full">
            <ButtonGroup id="btn10" display="block" direction="v" fill="parent" items={buttonGroupItems} on:onSelect={onGroupSelect}></ButtonGroup>
        </div>
      </div>
  <hr>
</div>

