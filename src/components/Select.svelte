<script>
/*
	2019/06/25 by Alton.Jung

	디스플레이 타입
		- 인라인 타입

	기능 
		- 블럭 타입
		- 리스트 선택
		- Arrow 표식

	개발 시 주의 사항
		- select - option tag 대신 ul-li 활용 (사유: option 활용 시 width 제어 불가)
		- ul - li 구성 요소 중 첫번째 li는 선택된 대상 표시 영역을 의미하고, 두번째 이후 부터는 선택될 대상 리스트 표시 영역을 의미
		- ul - li 구성 요소 중 두번째 li부터는 'position: absolute' 를 활용하여, sibling 컴포넌트 위에 show 되도록 제어
*/

	import {createEventDispatcher} from 'svelte'
	import {fade} from 'svelte/transition'
	import {setStyle} from './util/Style'

	/*
		props
	*/
	export let disabled = false
	export let selectIdx = -1
	export let width = "inherit"
	export let height = "inherit"
	export let items = [] // {'value': '', 'label': ''}
	export let showArrow = false
	export let divider = false

	export let id = '_slt_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block

	let border = 'square'
	let margin = undefined
	let align = 'left'

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-select']

	let showItem = ''
	let selectedOptionIdx = 0
	let isOpen = false

	/*
		init
	*/
	if (disabled) {
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, display, border, margin, align))

		// optionHeight값 구하기

	}

	let itemLen = items.length
	if (selectIdx >= 0) {
		if (selectIdx < itemLen) {
			showItem = items[selectIdx].label
			selectedOptionIdx = selectIdx
		} else {
			showItem = items[itemLen - 1].label
			selectedOptionIdx = itemLen - 1
		}
	}

	/*
		method
	*/

	function onClick (_event){
		isOpen = !isOpen
	}

	const onSelect = (_idx, _value) => (e) => {
		isOpen = false
		showItem = items[_idx].label
		selectedOptionIdx = _idx
		dispatch('onSelect', {'id': id, 'idx': _idx, 'value': _value})
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}
	 class:disabled={disabled}
	 style="width: {width}; height: {height}">

	<div class='select' 
		 class:arrow={showArrow} 
		 on:click={onClick}>{showItem}
	</div>

	<div class='container'>

			{#if isOpen}
				<ul in:fade class='options'
							style="height: {height}">				
				{#each items as item, idx}
					<li class="option"
						class:arrow={showArrow}
						class:selected={idx === selectedOptionIdx}
						on:click={onSelect(idx, item.value)}>{item.label}
					</li>
					{#if divider}
						<hr class="divider">
					{/if}						
				{/each} 
				</ul>
			{/if}
	</div>
</div>
