<script>
  import Confirm from './components/Confirm.svelte'

   let confirm = {
    'header': 'title',
    'body': 'this is test',
    'footer': ['cancel', 'ok']
   }

	function onClick (event) {
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
  <div> <h5>Confirm Example</h5> </div>
      <div class="line">
        <div class="item">
            <Confirm contents={confirm} on:onClick={onClick}/>
        </div>
      </div>        
</div>