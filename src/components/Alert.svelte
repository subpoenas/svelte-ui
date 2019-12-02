<script>
/*
	2019/06/01 by Alton.Jung

	기능 
	- 블럭 타입
	- 모달 타입 경고 창

	개발 시 주의 사항
	- 모달 활용
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	import Button from './Button'
	import Modal from './Popup/Modal'
	/*
		props
	*/
	export let contents = {'header': '', 'body': '', 'footer':''}
	export let showClose = false
	export let disabled = false
	export let label = ''

	export let id = '_alt_0'

	export let fill = 'content' // content, parent
	export let margin = undefined

	let close = false

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-alert']

	/*
		init
	*/
	if (disabled) {
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, undefined, undefined, margin, undefined))
	}

	/*
		method
	*/
	function onClick (event) {
		dispatch('onClick', {'id': event.detail.id, 'label': event.detail.label})
		close = true
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}
     class:disabled={disabled}
	 class:display-none={close}>

	<Modal bind:close={close}
		   showClose={showClose}>
			<span slot="header">{contents.header}</span>
			<span slot="body">{contents.body}</span>
			<span slot="footer">
				{#if contents.footer}
					<Button label={contents.footer} shape="round" on:onClick={onClick}></Button>
				{/if}
			</span>
	</Modal>
</div>

