<script>
  import Label from './components/Label.svelte'

  let items = [
     {'label': 'item 1' , 'disabled': false},
     {'label': 'item 2' , 'disabled': false},
     {'label': 'item 3' , 'disabled': false},
     {'label': 'item 4' , 'disabled': false},
     {'label': 'item 5' , 'disabled': false},
     {'label': 'item 6' , 'disabled': false},
     {'label': 'item 7' , 'disabled': false},
  ]

	function onCancel (event) {

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
  <div> <h5>Tooltip Example</h5> </div>
      <div class="line">
        <div class="item">
            <Label label={'ellipsis label (this is test)'} width="100px"/>
        </div>
      </div>        
</div>