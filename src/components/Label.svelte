<script>
/*
	2019/06/20 by Alton.Jung

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
	import Tooltip from './Tooltip.svelte'
	/*
		props
	*/
	export let width = "inherit"
	export let height = "inherit"
	export let disabled = false
	export let disableHover = false
	export let label = undefined

	export let id = '_lb_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'square'
	export let margin = undefined
	export let align = 'left'

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-label']
	let showHover = false

	/*
		init
	*/
	if (disabled) {
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, display, border, margin, align))
	}

	/*
		method
	*/	
	function onShowHover () {
		if (!disableHover) {
			showHover = true
		}
	}

	function onUnShowHover () {
		if (!disableHover) {
			showHover = false
		}
	}	
</script>

<style>
</style>

 <span class={rootStyleClass.join(' ')}
 		style="width: {width}; height: {height}">

		<span class='label' on:mouseenter={onShowHover} on:mouseleave={onUnShowHover}>{label}</span>
		<Tooltip show={showHover} label={label}/>
 </span>
 