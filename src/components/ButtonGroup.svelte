<script>
/*
	2019/06/10 by Alton.Jung


	디스플레이 타입
		- 인라인 타입

	기능 
		- 세그먼트 버튼 제공
		- 세그먼트 버튼간 radio 모드 지원
		- 세그먼트 버튼 레이블 변경

	개발 시 주의 사항
		- N/A
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	import Button from './Button.svelte'
	
	/*
		props
	*/
	export let disabled = false
	export let items = [] // [{'value': '', 'label': '', 'disabled': false, 'pressed': false}]
	export let mode = 'checkbox'
	export let direction = 'h'

	export let id = '_btn_grp_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'square'
	export let margin = undefined
	export let align = 'left'


	let itemDisplay = 'inline'
	let isRadioMode = mode === 'radio' ? true : false
	let activeId = ''
	let selectedMap = new Map()
	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-button-group']
	/*
		init
	*/
	rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, display, undefined, undefined, undefined))

	if (direction === 'v') {
		itemDisplay = 'block'
	}

	if (disabled) {
	} else {
		if (isRadioMode) {
			if (items.length != 0) {
				for (let idx=items.length-1; idx > -1; idx--) {
					let item = items[idx]
					if (item.pressed) {
						let tempItem = {'groupId': id, 'id': idx, 'label': item.label, 'pressed': true}
						selectedMap.set(idx, tempItem)
						break
					}
				}
			}	
		} else {
			items.forEach(function (item, idx) {
				if (item.pressed) {
					let tempItem = {'groupId': id, 'id': idx, 'label': item.label, 'pressed': true}
					selectedMap.set(idx, tempItem)
				}
			})	
		}
	}

	/*
		method
	*/
	function onSelect(e) {
		let selectedArray = []
		if (isRadioMode) {

			activeId = e.detail.id
			selectedArray.push(e.detail)
		} else {
			if (e.detail.status) {
				selectedMap.set(e.detail.id, e.detail)
			} else {
				selectedMap.delete(e.detail.id)
			}

			for (let [key, value] of selectedMap) {
				selectedArray.push(value)
			}
		}

		dispatch('onSelect', {'id': id, 'data': selectedArray})
	}
</script>

<style>
</style>

<span class={rootStyleClass.join(' ')}>
	{#if isRadioMode}
		{#each items as item, idx}
			<Button isChild
					groupId={id}
					id={idx}			
					fill={fill}
					display={itemDisplay}
					border={border}
					margin={margin}
					align={align}
					activeId={activeId}
					disabled={item.disabled}
					label={item.label}
					on:onSelect={onSelect}/>
		{/each}
	{:else}
		{#each items as item, idx}
			<Button isChild
					groupId={id}
					id={idx}
					fill={fill}
					display={itemDisplay}
					border={border}
					margin={margin}
					align={align}
					disabled={item.disabled}
					label={item.label}
					pressed={item.pressed}
					on:onSelect={onSelect}/>
		{/each}
	{/if}
</span>
