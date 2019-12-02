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
    import RadioBtn from './RadioBtn.svelte';
	
	/*
		props
	*/
	export let disabled = false
	export let direction = 'h'
	export let items = []; // [{'value': '', 'label': '', 'disabled': false, 'checked': false}]
	export let vertical = false

	export let id = '_rd_grp_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block	
	export let border = 'circle'
	export let margin = undefined
	export let align = 'left'

	const dispatch = createEventDispatcher();
	
	let itemDisplay = 'inline' // inline, block	
	let activeId = ''

	let rootStyleClass = ['-fl-radio-group']
	let iconStyleClass = ['']
	let contentStyleClass = ['', 'contents']	
	/*
		init
	*/

	rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, display, undefined, undefined, undefined))

	if (direction === 'v') {
		itemDisplay = 'block'
	}

	if (disabled) {
	} else {
		if (items.length != 0) {
			for (let idx=items.length-1; idx > -1; idx--) {
				let item = items[idx]
				if (item.checked) {
					activeId = idx
					break
				}
			}
		}
	}	
	/*
		method
	*/
	function onSelect(e) {
		activeId = e.detail.id;
		let data = [e.detail]
		dispatch('onSelect', {'id': id, 'data': data});
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}>
	{#each items as item, idx}
		<RadioBtn isChild
				  id={idx}
				  groupId={id}
				  activeId={activeId}
				  disabled={item.disabled}		
				  value={item.value} 
				  label={item.label} 
				  display={itemDisplay}
				  border={border}
				  margin={margin}
				  align={align}			  
				  on:onSelect={onSelect}/>
	{/each}
</div>
