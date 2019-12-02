<script>
  import List from './components/List.svelte'
  import Label from './components/Label.svelte'

  let listItems = [
  ]

  const maxCnt = 10000

  let title = 'Sample (' + maxCnt + ')'

  console.log("load start...")
  for (let idx=0; idx < maxCnt; idx++) {
      let item = {'record': ['item' + idx], 'icon': {'status': false}}
      listItems.push(item)
  }
  console.log("load end...")


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
    margin-left: 10px;
    margin-right: 10px;
  }  

</style>


<div>
  <div> <h5>List Example</h5> </div>
      <div class="line">
        <div class="item full">
            <Label id="title" width="100%" align="right" label={title} disableHover/>
        </div> 
        <div class="item full">
            <List id="list" items={listItems} itemHeight=25 iconType="checkbox" border  textPos="left" height="200px" width="100%" on:onClick={onClick}/>
        </div>             
      </div>             
</div>
