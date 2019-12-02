<script>
/*
	2019/07/15 by Alton.Jung

	기능 
	- 인라인 타입
	- filter 설정
	- mask 설정
	- format 설정
	- error 보이기/안보이기 설정
	- 입력값 최대/최소 제어

	개발 시 주의 사항
	- N/A
*/
	import { createEventDispatcher } from 'svelte'
	import {setStyle} from './util/Style'
	import {validateFilter, applyFilter} from './util/TextField/Filter'
	import {applyMask} from './util/TextField/Mask'
	import {applyFormat} from './util/TextField/Format'
	import {getErrorMsg} from './util/TextField/ErrorMsg'
/*
	props
		- filter : input 내 입력 허용 가능한 숫자/문자 타입 지정
		- mask : input 내 보여질 숫자/문자 영역 지정
		- format : input 내 보여질 영역 포맷팅 지정
		- error : input 값이 invalid 할때 보여지는 error 메시지

	event
	    - onEnter : input 내 입력 종료 시, 호출 (입력값, 오류여부 제공)
*/
	export let disabled = false
	export let placeholder = ''
	export let readonly = false
	export let require = false
	export let min = 1							// 입력 최소값
	export let max = 20							// 입력 최대값
	export let filter = undefined
	export let mask = undefined
	export let format = undefined
	export let idx = 0
	export let shape = 'square'
	export let padding = 'none'
	export let align = 'center'

	const gDispatch = createEventDispatcher()
	let gStyleClass = ['label']
	let gInputField = []
	let gFilteredField = []
	let gMaskField = ''
	let gFormatField = ''
	let gFormatText = ''
	let gFormatMax = max
	let gIsValid = true
	let gErrorMsg = ''
	
	/*
	 	init
	*/
	if (disabled) {	
	} else {
		gStyleClass = gStyleClass.concat(setStyle(false, shape, padding, align))
		filter = validateFilter(filter).join('')

		if (filter.length != 0) {
			max = filter.length
		}

		if (format.length != 0) {
			gFormatMax = format.length
		}
	}

	/*
		method
	*/
	function checkValidation () {
		if (require) {
			gIsValid = false
			
			if (gInputField.length < min) {
			  gErrorMsg = getErrorMsg().require
			} else if (gInputField.length != max) {
			  gErrorMsg = getErrorMsg().invalid
			} else {
			  gIsValid = true
			}
		}	
	}

	function onInput (event) {
		let keyValue = event.data

		gIsValid = true

		// deleteBackward key process
		if (keyValue === null) {
		  gInputField.pop()
		} else {
		  gInputField.push(keyValue)
		}

		// check max
		if(gInputField.length > max){

		  gInputField.pop()
		  return
		}

		// filter process
		if(!applyFilter(gInputField, filter)){
			gInputField.pop()
		}
				
		// mask process
		gMaskField = applyMask(gInputField, mask)

		// format process
		gFormatText = applyFormat(gMaskField, format).join('')
	}

	function onKeyUp (event) {
		if (event.key === 'Enter') {
			// check validation
			checkValidation()
			gDispatch('onEnter', {'idx': idx, 'rawValue': gInputField.join(''), 'formattedValue': gFormatText, 'valid': gIsValid})
			this.blur()
		}
	}

	function onBlur () {
		// check validation
		checkValidation()
		gDispatch('onBlur', {'idx': idx, 'rawValue': gInputField.join(''), 'formattedValue': gFormatText, 'valid': gIsValid})
	}

	function onClick () {
		gDispatch('onClick', {'idx': idx, 'value': gInputField.join('')})
	}	

</script>

<style>
</style>

<div class={'-fl-textfield'}>
	<input
		class={gStyleClass.join(' ')}
		type='text'
		maxlength={gFormatMax}
		bind:value={gFormatText}
		placeholder={placeholder}
		readonly={readonly}
		on:click={onClick}
		on:blur={onBlur}
		on:input={onInput}
		on:keyup={onKeyUp}>

	{#if require && !gIsValid}
	  <div class={'error'}>
	  	{gErrorMsg}
	  </div>
	{/if}
</div>

