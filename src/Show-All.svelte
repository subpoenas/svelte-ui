<script>
   import AccordionBtn from './components/AccordionBtn.svelte';
   import AccordionGroup from './components/AccordionGroup.svelte';
   import RadioGroup from './components/RadioGroup.svelte';
   import ButtonGroup from './components/ButtonGroup.svelte';
   import Button from './components/Button.svelte';
   import Spinner from './components/Spinner.svelte';
   import Tag from './components/Tag.svelte';
   import CheckboxBtn from './components/CheckboxBtn.svelte';
   import TextField from './components/TextField.svelte';
   import Select from './components/Select.svelte';
   import Alert from './components/Alert.svelte';
   import Confirm from './components/Confirm.svelte';
   import DatePicker from './components/DatePicker.svelte';
   import DateField from './components/DateField.svelte';
   import TimePicker from './components/TimePicker.svelte';
   import List from './components/list.svelte';
   
   let accordionItems = [
     {'title': 'test1', 'label': 'hahaha', 'checked': false},
     {'title': 'test2', 'label': 'hahaha', 'checked': false},
     {'title': 'test3', 'label': 'hahaha', 'checked': false}
   ]

   let radioItems = [
     {'label': 'test1', 'value': 'hahaha'},
     {'label': 'test2', 'value': 'hahaha'},
     {'label': 'test3', 'value': 'hahaha'}
   ]

   let buttonGroupItems = [
     {'label': 'click1', 'pressed': true},
     {'label': 'click2'},
     {'label': 'click3', 'pressed': true}
   ]

   let selectItems = [
     {'label': 'test1', 'enable': true, 'value': 0},
     {'label': 'test2', 'enable': true, 'value': 1},
     {'label': 'testsdfdsdfsddf3', 'enable': true, 'value': 2}
   ]   

   let alert = {
    'header': 'title',
    'body': 'this is test',
    'footer': 'ok'
   }

   let confirm = {
    'header': 'title',
    'body': 'this is test',
    'footer': ['cancel', 'ok']
   }

   let listItems = [
        {'record': ['test1', 'test2', 'test1'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test2'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test3'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test4'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test5'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test6'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test7'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test8'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test9'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test10'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test11'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test12'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test13'], 'checkbox': true},        
        {'record': ['test1', 'test2', 'test14'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test15'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test16'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test17'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test18'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test19'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test20'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test21'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test22'], 'checkbox': true},        
        {'record': ['test1', 'test2', 'test23'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test24'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test25'], 'checkbox': true},        
        {'record': ['test1', 'test2', 'test26'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test27'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test28'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test29'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test30'], 'checkbox': true},        
        {'record': ['test1', 'test2', 'test31'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test32'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test33'], 'checkbox': true},        
        {'record': ['test1', 'test2', 'test34'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test35'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test36'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test37'], 'checkbox': true},
        {'record': ['test1', 'test2', 'test38'], 'checkbox': true},        
        {'record': ['test1', 'test2', 'test39'], 'checkbox': true}          
    ]
    
   let yes = false;

   function onBtnGrpSelect (event) {
   	 console.log('onBtnGrpSelect ' + event.detail.items)
   } 

   function onBtnPress (event) {
   	 console.log('onBtnPress ' + event.detail.label + ',' + event.detail.pressed)
   } 

   function onChange (event) {
   	 console.log('onChange ' + event.detail.idx)
   } 

   function onPress (event) {
   	 console.log(event.detail)
   }

   function onEnter (event) {
   	 console.log(event.detail)
   }
</script>

<style>
</style>

<!-- <div>
  <div> <h5>Checkbox Example</h5> </div>
  <div>
    <Button border="round" label={'click1'}></Button>
    <Button border="square" label={'click2'}></Button>
  </div>
  <hr>
</div>

<div>
  <div> <h5>Radio Example</h5> </div>
  <div>
    <Button border="round" label={'click1'}></Button>
    <Button border="square" label={'click2'}></Button>
  </div>
  <hr>
</div> -->

<div>
  <div> <h5>ButtonGroup Example</h5> </div>
  <div>
    <ButtonGroup border="round" items={buttonGroupItems} on:onSelect={onBtnGrpSelect}></ButtonGroup>
    <ButtonGroup exclusive border="square" items={buttonGroupItems} activeIdx={0} on:onSelect={onBtnGrpSelect}></ButtonGroup>
  </div>
  <hr>
</div>

<div>
  <div> <h5>Button Example</h5> </div>
  <div>
    <Button border="round" label={'round'} on:onPress={onBtnPress}></Button>
    <Button border="square" label={'square'} on:onPress={onBtnPress}></Button>
    <Button border="circle" label={'circle'} on:onPress={onBtnPress}></Button>
  </div>
  <hr>
</div>

<!-- <AccordionBtn title='test'>test1</AccordionBtn>
<AccordionBtn title='test'>test1</AccordionBtn>
<AccordionBtn title='test'>test1</AccordionBtn>
<AccordionBtn title='test'>test1</AccordionBtn>
<RadioGroup items={radioItems}></RadioGroup>
<ButtonGroup items={buttonItems} activeIdx={0}></ButtonGroup>
<Spinner></Spinner>
<Tag label={'test 3'}></Tag>
<Button label={'click'}></Button>
<Select items={selectItems} activeIdx={0}></Select> 
<TextField filter={'#######'} mask={'xxxxxxx'} format={'xxxxxxx'} require={true}></TextField>

<CheckboxBtn></CheckboxBtn>
<Alert contents={alert}></Alert>

<Modal>
	<span slot="header">
		header
	</span>
  	<span slot="body">
		body
	</span>
	<span slot="footer">
		footer
	</span>
</Modal>

<Confirm contents={confirm}></Confirm>
<DatePicker date={'2019/07/10'}></DatePicker>
<DateField date={'2019/07/10'}></DateField>
<DateField date={'2019/07/10'} isPopup={true}></DateField>
<TimePicker hour={5}></TimePicker>
-->

