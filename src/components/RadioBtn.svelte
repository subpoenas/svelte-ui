<script>
/*
	2019/06/20 by Alton.Jung

	기능 
	- 레디오 타입 선택

	개발 시 주의 사항
	- N/A
*/
	import { createEventDispatcher } from 'svelte'
	import {setStyle} from './util/Style'
	/*
		props
	*/
	export let checked = false
	export let disabled = false
	export let label = undefined
	export let value = undefined
	export let revert = false	// icon 과 label 위치 변경
	export let activeId = ''

	export let id = '_rdbtn_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'circle'
	export let margin = undefined
	export let align = 'center'
	
	// group
	export let groupId = ''
	export let isChild = false

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-radio']
	let iconStyleClass = ['unmark']
	let labelStyleClass = ['label']

	/*
		watch
	*/
	$: iconStyleClass[0] = checked == true ? 'mark' : 'unmark'
	$: checked = activeId == id ? true : false
	/*
	 	init
	*/
	if (disabled) {
		checked = false;
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, undefined, display, undefined, margin, align))
		iconStyleClass = iconStyleClass.concat(setStyle(undefined, undefined, undefined, border, undefined, undefined))
	}

	/*
		method
	*/
	function onSelect (e) {
		// checked = !checked

		dispatch('onSelect', {'groupId': groupId,'id': id, 'label': label, 'value': value})
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}
     class:disabled={disabled}>

	 <div class={'container'}>
	 	{#if !revert}
		 	<span class={iconStyleClass.join(' ')} on:click={onSelect}>
				<span class='check'></span> 
			</span>
			{#if label}
			<span class={labelStyleClass.join(' ')}>{label}</span>
			{/if}	
		{:else}
			{#if label}
			<span class={labelStyleClass.join(' ')}>{label}</span>
			{/if}		
		 	<span class={iconStyleClass.join(' ')} on:click={onSelect}>
				<span class='check'></span> 
			</span>
		{/if}
	 </div>
</div>
