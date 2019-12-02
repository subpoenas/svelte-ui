<script>
/*
	2019/06/20 by Alton.Jung

	디스플레이 타입
		- 인라인 타입

	기능
		- 레이블 지원

	개발 시 주의 사항
		- N/A
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	/*
		props
	*/
	export let show = false
	export let width = "max-content"
	export let height = "max-content"
	export let disabled = false
	export let label = undefined

	export let id = '_tt_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'square'
	export let margin = undefined
	export let align = 'middle'

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-tooltip']

	/*
		init
	*/
	if (disabled) {
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, undefined, undefined, undefined, undefined, align))
	}

	/*
		method
	*/	
</script>

<style>
</style>

 <label class={rootStyleClass.join(' ')}>
	{#if show}
	<span class='tooltiptext'>
		{label}
	</span>
	{/if}
 </label>

