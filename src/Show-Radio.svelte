<script>
  import RadioBtn from './components/RadioBtn.svelte'
  import RadioGroup from './components/RadioGroup.svelte'

  let radioItems = [
    {'label': 'radio1', 'value': 'test1', 'checked': false},
    {'label': 'radio2', 'value': 'test2', 'checked': false},
    {'label': 'radio3', 'value': 'test3', 'checked': false}
  ]

  let sample1Id = 'rd1'
  let sample2Id = 'rd1'

	function onSelect (event) {
    switch (event.detail.groupId) {
      case 'grp1':
        sample1Id = event.detail.id
        break
      case 'grp2':
        sample2Id = event.detail.id  
        break
    }

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
  <div> <h5>Radio Example</h5> </div>
      <div class="line">
        <div class="item">
            <RadioBtn groupId="grp1" id="rd1" activeId={sample1Id} label="radio1" on:onSelect={onSelect}></RadioBtn>
        </div>
        <div class="item">
            <RadioBtn groupId="grp1" id="rd2" activeId={sample1Id}  label="radio2" on:onSelect={onSelect}></RadioBtn>
        </div>
        <div class="item">
            <RadioBtn groupId="grp1" id="rd3" activeId={sample1Id}  label="radio3" on:onSelect={onSelect}></RadioBtn>
        </div>        
      </div>

      <div class="line">
        <div class="item">
            <RadioBtn groupId="grp2" id="rd1" activeId={sample2Id}  border="round" label="radio1" revert on:onSelect={onSelect}></RadioBtn>
        </div>
        <div class="item">
            <RadioBtn groupId="grp2" id="rd2" activeId={sample2Id}  border="round" label="radio2" revert on:onSelect={onSelect}></RadioBtn>
        </div>
        <div class="item">
            <RadioBtn groupId="grp2" id="rd3" activeId={sample2Id}  border="round" label="radio3" revert on:onSelect={onSelect}></RadioBtn>
        </div>        
      </div>            
  <hr>
</div>


<div>
  <div> <h5>RadioGroup Example</h5> </div>
      Horizontal
      <div class="line">
        <div class="item">
            <RadioGroup id="rd3" items={radioItems} on:onSelect={onSelect}></RadioGroup>
        </div>                
      </div>
      Vertical
      <div class="line">
        <div class="item full">
            <RadioGroup id="rd4" display="block" direction="v" items={radioItems} on:onSelect={onSelect}></RadioGroup>
        </div>                
      </div>      
  <hr>
</div>