<script>
/*
	2019/06/20 by Alton.Jung

	기능 
	- 레디오 타입 선택
	- 레디오 그룹 타입 선택

	개발 시 주의 사항
	- N/A
*/

	import {createEventDispatcher} from 'svelte';
	import {setStyle} from './util/Style'	
    import CheckboxBtn from './CheckboxBtn.svelte';
	
	/*
		props
	*/
	export let disabled = false
	export let items = []; // [{'value': '', 'label': '', 'disabled': false, 'checked': false}]
	export let direction = 'h'

	export let id = '_ck_grp_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'square'
	export let margin = undefined
	export let align = 'left'

	const dispatch = createEventDispatcher();

	let itemDisplay = 'inline' // inline, block	

	let rootStyleClass = ['-fl-checkbox-group']
	/*
		init
	*/

	rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, display, undefined, undefined, undefined))
	
	if (direction === 'v') {
		itemDisplay = 'block'
	}
	/*
		method
	*/
	function onSelect(e) {
		let data = [e.detail]
		dispatch('onSelect', {'id': id, 'data': data});
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}>
	{#each items as item, idx}
		<CheckboxBtn idx={idx}
				  id={idx}
				  disabled={item.disabled}
				  value={item.value} 
				  label={item.label} 
				  checked={item.checked}
				  isChild
				  display={itemDisplay}
				  border={border}
				  margin={margin}
				  align={align}			  
				  on:onSelect={onSelect}/>
	{/each}
</div>
