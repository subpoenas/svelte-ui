<script>
  import Spinner from './components/Spinner.svelte';

  let radioItems = [
    {'label': 'radio1', 'value': 'test1'},
    {'label': 'radio2', 'value': 'test2'},
    {'label': 'radio3', 'value': 'test3'}
  ]

  let value = 0

	function onPlus (event) {
    console.log(event.detail)
  }
  
  function onMinus (event) {
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
  <div> <h5>Spinner Example</h5> </div>
   <hr>
      <div class="line">
        <div class="item">
            <Spinner id="sp1" display="block" value=0 number=1 on:onPlus={onPlus} on:onMinus={onMinus}/>
        </div>

        <div class="item">
            <Spinner id="sp1" display="block" value=0 number=1 min=1 max=10/>
        </div> 

        <div class="item">
            <Spinner id="sp2" display="block" value=10 number=1/>
        </div>       

        <div class="item">
            <Spinner id="sp3" display="block" value=10 number=5/>
        </div>
      </div>

      <div class="line">
        <div class="item full">
           <Spinner id="sp4" display="block" fill="parent" value=10 number=5/>
        </div>
      </div>     

  
  <hr>
</div>
