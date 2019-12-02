<script>
/*
	2019/06/25 by Alton.Jung


	디스플레이 타입
		- 인라인 타입

	기능 
		- 증/감 제공
		- 최대/최소 값 설정
		- fill, content 지원
		- shape 변환 지원		

	개발 시 주의 사항
		- N/A
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	import Button from './Button.svelte'
	/*
		props
	*/
	export let width = "inherit"
	export let height = "inherit"	
	export let disabled = false
	export let number = 1
	export let value = 0
	export let min = 0
	export let max = 999999
	
	export let id = '_tgl_0'
	export let idx = 0

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block
	export let border = 'round'
	export let margin = undefined
	export let align = 'center'

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-spinner']

	let _min = 0
	let _max = 0
	let _value = 0
	let _number = 1

	let disabledPlusBtn = false
	let disabledMinusBtn = false

	/*
		watch
	*/
	$: disabledMinusBtn = _value == _min ? true : false
	$: disabledPlusBtn = _value == _max ? true : false
	$: if (_value > _min && _value < _max) {
		disabledMinusBtn = false
		disabledPlusBtn = false
	}	

	/*
		init
	*/
	if (disabled) {
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, display, border, margin, align))
		_number = Number(number)
		_value = Number(value)
		_min = Number(min)
		_max = Number(max)

		_value = _value < _min ? _min : _value
	}

	/*
		method
	*/
	function onPlus (event) {
		if ((_value + _number) <= _max) {
			_value += _number
		}
		dispatch('onPlus', {'id': id, 'value': _value})
	}
	
	function onMinus (event) {	
		if ((_value - _number) >= _min) {
			_value -= _number
		} 
		dispatch('onMinus', {'id': id, 'value': _value})
	}

</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}
	 class:disabled={disabled}
	 style="width: {width}; height: {height}">

	<div class={'container'}>
		<Button on:onClick={onPlus} disabled={disabledPlusBtn} border='round' width="10%" label={'+'}/>
		<input class={'input'} type='text' value={_value} readonly />
		<Button on:onClick={onMinus} disabled={disabledMinusBtn} border='round' width="10%" label={'-'}/>
	</div>
</div>

