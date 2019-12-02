<script>
/*
	2019/07/05 by Alton.Jung

	기능 
	- 특정 날짜 선택
	- 특정 날짜 From, To 선택
	- popup 형태, embed 형태 제공

	개발 시 주의 사항
	- N/A
*/
	import { createEventDispatcher } from 'svelte'
	import {setStyle} from './util/Style'
	import DatePicker from './DatePicker'
	import TextField from './TextField'
	import Modal from './Popup/Modal'
	
	export let disabled = false
	export let placeholder = ''
	export let fromDate = undefined
	export let toDate =  undefined
	export let date = '1970/01/01'
	export let isPopup = false
	export let idx = 0
	export let shape = 'square'
	export let padding = 'none'
	export let align = 'center'

	const gDispatch = createEventDispatcher()	
	let gStyleClass = ['label']
	let gHide = true
	
	/*
	 	init
	*/
	if (disabled) {	
	} else {
		gStyleClass = gStyleClass.concat(setStyle(undefined, shape, padding, align))
		let _calendar =  new Date()
		date = _calendar.getFullYear() + '/' + (_calendar.getMonth() + 1 )+ '/' + _calendar.getDate()
	}

	/*
		method
	*/
	function onClick (event) {
		gHide = !gHide		
	}

	function onBlur (event) {
		gHide = false
	}

	function onDayPress (event) {
		date = event.detail.calendar
		gHide = true
	}

</script>

<style>
</style>

<div class={'-fl-datefield'}>
	<TextField filter={'########'} mask={'x'} placeholder={date} format={'xxxx/xx/xx'} require={false} readonly={true}} align={'right'} on:onBlur={onBlur} on:onClick={onClick}></TextField>

		{#if isPopup}
			<Modal hide={gHide}>
				<span slot="body">
					<DatePicker date={date} hide={gHide} fromDate={fromDate} toDate={toDate} on:onDayPress={onDayPress}></DatePicker>
				</span>
			</Modal>
		{:else}
			<DatePicker date={date} hide={gHide} fromDate={fromDate} toDate={toDate} on:onDayPress={onDayPress}></DatePicker>
		{/if}
</div>

