<script>
/*
	2019/06/10 by Alton.Jung

	디스플레이 타입
		- 인라인 타입

	기능 
		- 버튼 클릭 지원
		- 레이블 지원
		- fill, content 지원
		- shape 변환 지원

	개발 시 주의 사항
		- N/A
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	/*
		props
	*/
	export let width = "inherit"
	export let height = "inherit"
	export let pressed = false
	export let disabled = false
	export let label = undefined
	
	export let id = '_btn_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'square'
	export let margin = undefined
	export let align = 'center'

	// radio
	export let activeId = ''
	
	// group 
	export let groupId = ''
	export let isChild = false

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-button']

	/*
		watch
	*/
	$: if (isChild) {pressed = activeId == id ? true : false}

	/*
		init
	*/
	if (disabled) {
		pressed = false
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(isChild, fill, display, border, margin, align))
	}

	/*
		method
	*/
	// button을 segment 타입으로 활용
	function onSelect(event) {
		pressed = !pressed

		dispatch('onSelect', {'groupId': groupId, 'id': id, 'label': label, 'status': pressed})
	}

	// button을 button 타입으로 활용
	function onClick(event) {

		dispatch('onClick', {'id': id, 'label': label, 'status': pressed})
	}
</script>

<style>
</style>

{#if isChild}	
<button class={rootStyleClass.join(' ')}
		style="width: {width}; height: {height}"
		class:mark={pressed}
		class:disabled={disabled}
		on:click={onSelect}>
	{label}
</button>
{:else}
<button class={rootStyleClass.join(' ')}
		style="width: {width}; height: {height}"
		class:disabled={disabled}
		on:click={onClick}>
	{label}
</button>
{/if}
