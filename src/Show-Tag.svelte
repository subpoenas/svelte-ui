<script>
  import Tag from './components/Tag.svelte'
  import TagGroup from './components/TagGroup.svelte'

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
  <div> <h5>Tag Example</h5> </div>
      <div class="line">
        <div class="item">
            <Tag id="tag1" label={'round 1'} border="round" on:onCancel={onCancel}></Tag>
        </div>   
        <div class="item">
            <Tag id="tag2" label={'round 2'} border="round" on:onCancel={onCancel}/>
        </div>   
        <div class="item">
            <Tag id="tag3" label={'round 3'} border="round" on:onCancel={onCancel}/>
        </div>   
        <div class="item">
            <Tag id="tag4" label={'round 4'} border="round" on:onCancel={onCancel}/>
        </div>                               
      </div>  

      <div class="line">
        <div class="item full">
            <Tag id="tag1" label={'round 1'} border="round" width="100%" on:onCancel={onCancel}></Tag>
        </div>                                
      </div>              
  <hr>
</div>

<div>
  <div> <h5>TagGroup Example</h5> </div>
      <div class="line">
        <div class="item">
            <TagGroup items={items} on:onCancel={onCancel}/>
        </div>                              
      </div>      

      <div class="line">
        <div class="item full">
            <TagGroup items={items} display="block" direction="v" fill="parent" on:onCancel={onCancel}/>
        </div>                              
      </div>           
</div>