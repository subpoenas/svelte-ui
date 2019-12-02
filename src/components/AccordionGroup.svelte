<script>
/*
	2019/06/01 by Alton.Jung
	
	기능 
	- 블럭 타입
	- 버튼 그룹 선택
	- 버튼 선택에 따른 컨텐츠 영역 제어(열기, 닫기)

	개발 시 주의 사항
	- N/A
*/
	import { beforeUpdate, onDestroy, createEventDispatcher } from 'svelte';
    import AccordionBtn from './AccordionBtn.svelte';
	
	/*
		props
	*/
	export let activeIdx = -1;
	export let name = 'default';
	export let items = []; // {'title': '', 'label': '', 'checked': false}
	export let square = false;
	export let round = true;

	const dispatch = createEventDispatcher();

	/*
		lifecycle
	*/
	beforeUpdate(() => {
	});

	onDestroy(() => {
	});

	/*
		method
	*/
	function onClick (event) {
		if (activeIdx !== -1) {
			items[activeIdx].checked = false;
		}
		items[event.detail.idx].checked = event.detail.checked;
		activeIdx = event.detail.idx;
		dispatch('onClick', {'idx': event.detail.idx, 'checked': event.detail.checked});
	}
</script>

<style>
</style>


<div class={'-fl-accordion-group'}>
	{#each items as item, idx}
		<AccordionBtn idx={idx}
					  isGroup
					  round={round}
					  square={square}	  
					  title={item.title} 
					  checked={item.checked} 
					  on:onClick={onClick}>
		   {item.label}
		</AccordionBtn>
	{/each}
</div>
