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
	/*
		props
	*/
	export let width = "inherit"
	export let height = "inherit"
	export let clicked = false
	export let disabled = false
	export let label = undefined

	export let id = '_tg_0'
	export let idx = 0

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'square'
	
	// group
	export let groupId = ''
	export let isChild = false

	let margin = undefined
	let align = 'center'

	let cancel = false

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-tag']
	// let containerStyleClass = ['container']

	/*
		init
	*/
	if (disabled) {
		clicked = false
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, display, border, margin, align))
	}

	/*
		method
	*/
	function onCancel (event) {
		cancel = true

		if (isChild) {
			dispatch('onCancel', {'groupId': groupId, 'id': id, 'label': label})
		} else {
			dispatch('onCancel', {'id': id, 'label': label})
		}
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')} 
	 class:disabled={disabled}
	 class:display-none={cancel}	 
	 style="width: {width}; height: {height}">
	 
	<div class='container'>
	  <span class={'label'}>{label}</span>
	  <button class={'cancel'} on:click={onCancel}>{'x'}</button>
	</div>
</div>

