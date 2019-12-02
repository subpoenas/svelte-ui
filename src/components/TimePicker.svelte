<script>
/*
	2019/06/27 by Alton.Jung

	기능 
	- 인라인 타입
	- 시간 정보 선택
	- 시간 정보 범위 선택(From - To)

	개발 시 주의 사항
	- N/A
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
    import Select from './Select.svelte'
	import Label from './Label.svelte'

	/*
		props
	*/
	export let hour = 0
	export let minute = 0
	export let fromHour = undefined
	export let toHour =  undefined
	export let disabled = false
	export let idx = 0
	export let hide = false
	export let shape = 'round'
	export let padding = 'middle'
	export let align = 'center'

	const gDispatch = createEventDispatcher()

	let gStyleClass = []
	let gHourItems = []
	let gActiveHour = hour
	let gMinuteItems = []
	let gActiveMinute = minute
	let gPrevHour = hour

	/*
		init
	*/

	init()

	/*
		method
	*/

	function init () {

		if (disabled) {
		} else {
			gStyleClass = gStyleClass.concat(setStyle(false, shape, padding, align))
		}

		// init from to
		if (fromHour == undefined) {
			fromHour = 0
		}
		if (toHour == undefined) {
			toHour = 23
		}

		if (fromHour > toHour) {
			fromHour = toHour
		}

		// make hourlist
		for (let _inc = 0; _inc < 24; _inc++){					
			
			let _hourMeta = {
			  'label': '' + _inc,
			  'enable': false,
			  'value': _inc
			}

			if (fromHour <= _inc && _inc <= toHour) {
				_hourMeta.enable = true
			}
			gHourItems.push(_hourMeta)
		}

		// make minutelist
		for (let _inc = 0; _inc < 60; _inc++){					
			
			let _minuteMeta = {
			  'label': '' + _inc,
			  'enable': false,
			  'value': _inc
			}

			gMinuteItems.push(_minuteMeta)
		}		
	}

	function onHourPress (pIdx) {

		gActiveHour = pIdx

		gDispatch('onHourPress', {'idx': idx, 'hour': pIdx})
	}	

	function onMinutePress (pIdx) {

		gActiveMinute = pIdx

		gDispatch('onMinutePress', {'idx': idx, 'minute': pIdx})
	}	

</script>

<style>
</style>

<div class={'-fl-timepicker'}
	 class:display-none={hide}>

	<Select items={gHourItems} activeIdx={gActiveHour} width='80px' height='200px' showArrow={false}></Select>
	<Label label=':'></Label>
	<Select items={gMinuteItems} activeIdx={gActiveMinute} width='80px' height='200px' showArrow={false}></Select> 
</div>

