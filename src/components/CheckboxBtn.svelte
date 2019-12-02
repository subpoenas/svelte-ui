<script>
/*
	2019/06/11 by Alton.Jung

	디스플레이 타입
		- 인라인 타입

	기능 
		- 버튼 클릭
		- 레이블 변경

	개발 시 주의 사항
		- N/A
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	/*
		props
	*/
	export let checked = false
	export let disabled = false
	export let label = undefined
	export let value = undefined
	export let revert = false	// icon 과 label 위치 변경

	export let id = '_chkbx_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'square'
	export let margin = undefined
	export let align = 'center'

	// group 
	export let groupId = ''
	export let isChild = false
	
	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-checkbox']
	let iconStyleClass = ['unmark']
	let labelStyleClass = ['label']
	
	/*
		watch
	*/
	$: iconStyleClass[0] = checked == true ? 'mark' : 'unmark'
	/*
		init
	*/
	if (disabled) {
		checked = false
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, undefined, display, undefined, margin, align))
		iconStyleClass = iconStyleClass.concat(setStyle(undefined, undefined, undefined, border, undefined, undefined))		
	}

	/*
		method
	*/
	function onSelect (e) {
		checked = !checked

		if (isChild) {
			dispatch('onSelect', {'groupId': groupId, 'id': id, 'label': label, 'value': value, 'status': checked})
		} else {
			dispatch('onSelect', {'id': id, 'label': label, 'value': value, 'status': checked})
		}
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}
     class:disabled={disabled}>

	 <div class={'container'}>
	 	{#if revert}
			{#if label}
			<span class={labelStyleClass.join(' ')}>{label}</span>
			{/if}		
		 	<span class={iconStyleClass.join(' ')} on:click={onSelect}>
				<span class='check'></span> 
			</span>		 
		{:else}
		 	<span class={iconStyleClass.join(' ')} on:click={onSelect}>
			 	<span class='check'></span> 
			</span>
			{#if label}
			<span class={labelStyleClass.join(' ')}>{label}</span>
			{/if}
		{/if}
	</div>		
</div>
