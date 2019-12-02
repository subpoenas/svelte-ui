<script>
  import Alert from './components/Alert.svelte'

   let alert = {
    'header': 'title',
    'body': 'this is test',
    'footer': 'ok'
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
  <div> <h5>Alert Example</h5> </div>
      <div class="line">
        <div class="item">
            <Alert contents={alert} on:onClick={onClick}/>
        </div>
      </div>        
</div>