<script>
/*
	2019/06/25 by Alton.Jung

	디스플레이 타입
		- 인라인 타입

	기능
		- 레이블 지원
		- fill, content 지원
		- shape 변환 지원

	개발 시 주의 사항
		- N/A
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	import Tag from './Tag.svelte';
		
	/*
		props
	*/
	export let disabled = false
	export let items = [] // [{'label': '', 'disabled': false}]
	export let direction = 'h'

	export let id = '_tg_grp_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'square'
	export let margin = undefined
	export let align = 'left'

	const dispatch = createEventDispatcher();

	let itemDisplay = 'inline' // inline, block	
	let deleteArray = []
	let showEmpty = false
	let rootStyleClass = ['-fl-tag-group']

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
	function onCancel(e) {
		let data = [e.detail]
		deleteArray.push(data)
		if (deleteArray.length == items.length) {
			showEmpty = true
		}

		dispatch('onCancel', {'id': id, 'data': data})
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}>
	{#if showEmpty}
		<span class='empty'>
			Empty
		</span>
	{/if}
	{#each items as item, idx}
		<Tag idx= isChild
			 id={idx}
			 groupId={id}
			 disabled={item.disabled} 
			 display={itemDisplay}
			 fill={fill}
			 label={item.label}
			 border={border}
			 margin={margin}
			 align={align}			  
			 on:onCancel={onCancel}/>
	{/each}
</div>
