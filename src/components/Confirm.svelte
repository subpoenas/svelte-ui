<script>
/*
	2019/06/01 by Alton.Jung

	디스플레이 타입
		- 인라인 타입

	기능 
		- 블럭 타입
		- 모달리스 타입 확인 창
		- fill, content 지원
		- shape 변환 지원

	개발 시 주의 사항
		- 모달리스 활용
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	import Button from './Button'
	import Modaless from './Popup/Modaless'
	/*
		props
	*/
	export let contents = {'header': '', 'body': '', 'footer': []}
	export let disabled = false

	export let id = '_cnf_0'

	export let fill = 'content' // content, parent
	export let margin = undefined


	let close = false

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-confirm']

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

	<Modaless bind:close={close}>
				<span slot='header'>
					{contents.header}
				</span>
				<span slot='body'>
					{contents.body}
				</span>
				<span slot='footer'>
					<Button label={contents.footer[0]} id='_btn_0' shape='round' on:onClick={onClick}></Button>
					<Button label={contents.footer[1]} id='_btn_1' shape='round' on:onClick={onClick}></Button>
				</span>
	</Modaless>
</div>

