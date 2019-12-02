<script>
   import Checkbox from './components/Checkbox.svelte';
   import Radio from './components/Radio.svelte';
   import RadioGroup from './components/RadioGroup.svelte';

   function onChange (event) {
   	 console.log('onChange ' + event.detail)
   }
   function onChange1 (event) {
   	 console.log('onChange ' + event.detail)
   }   

   let items=[{'value':'test3', 'label':'test3'}, {'value':'test4', 'label':'test4'}]
</script>

<style>
</style>

<Checkbox disabled={false} checked={false} style={'round'} on:onChange={onChange}/>
<Checkbox disabled={false} checked={false} style={'round'} on:onChange={onChange}/>

<!-- <Radio value={'test1'} label={'Test1'}/> -->
<!-- <Radio value={'test2'} label={'Test2'}/> -->

<RadioGroup items={items} name={'default'}>
</RadioGroup>