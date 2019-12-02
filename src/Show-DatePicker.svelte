<script>
  import DatePicker from './components/DatePicker.svelte';
  import DateField from './components/DateField.svelte';
  import TimePicker from './components/TimePicker.svelte';

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
  <div> <h5>DatePicker Example</h5> </div>
      <div class="line">
        <div class="item">
           <DatePicker date={'2019/07/10'}/>
        </div>                                 
      </div>        
  <hr>
</div>

<div>
  <div> <h5>DateField Example</h5> </div>
      <div class="line">
        <div class="item">
            <DateField date={'2019/07/10'}></DateField>
        </div>                              
      </div>
      <div class="line">
        <div class="item">
            <DateField date={'2019/07/10'} isPopup></DateField>
        </div>                              
      </div>      
  <hr>      
</div>

<div>
  <div> <h5>TimePicker Example</h5> </div>
      <div class="line">
        <div class="item">
            <TimePicker hour={5}></TimePicker>
        </div>                              
      </div>
</div>
