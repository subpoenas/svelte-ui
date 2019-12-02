<script>
/*
	2019/06/01 by Alton.Jung
	
	기능 
	- 블럭 타입
	- 버튼 선택
	- 버튼 선택에 따른 컨텐츠 영역 제어(열기, 닫기)

	개발 시 주의 사항
	- N/A
*/
	import { beforeUpdate, onDestroy, createEventDispatcher } from 'svelte';
	import {setStyle} from './util/Style';
	/*
		props
	*/
	export let checked = false
	export let disabled = false
	export let title = ''
	export let idx = 0
	export let isGroup = false
	export let style = ''
	export let shape = 'square'
	export let padding = 'none'
	export let align = 'left'

	const dispatch = createEventDispatcher()
	let styleClass = ['-fl-accordion']
	/*
		init
	*/
	if (disabled) {
	  clicked = false
	} else {
	  styleClass = styleClass.concat(setStyle(isGroup, shape, padding, align))
	}


	/*
		method
	*/
	function onClick (event) {
		checked = !checked
		dispatch('onClick', {'idx': idx, 'checked': checked})
	}
</script>

<style>
</style>

{#if isGroup}	
<div class={styleClass.join(' ')}
     class:disabled={disabled}>

	  <div class={'container'}>
		<button class={'button'}
			 class:active={checked}
			 on:click={onClick}>
		   {title}
		</button>
		<div class={'panel'} 
			 class:hidden={!checked}>
			<slot/>
		</div>
	  </div>
</div>
{:else}
<div class={styleClass.join(' ')}
     class:disabled={disabled}
	 style={style}>
	 
	 <div class={'container'}>
		<button class={'button'}
			 class:active={checked}
			 on:click={onClick}>
		   {title}
		</button>
		<div class={'panel'} 
			 class:hidden={!checked}>
			<slot/>
		</div>			
	</div>
</div>
{/if}

