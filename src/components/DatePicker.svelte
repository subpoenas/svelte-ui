<script>
/*
	2019/07/01 by Alton.Jung

	기능 
	- 인라인 타입
	- 년/월/일 선택
	- 범위 지정 선택(From ~ To)

	개발 시 주의 사항
	- Stage 관리 (년선택 후-> 월선택 후-> 일선택 스테이지 프로세스)
*/

	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	import {getTotalDateOfMonth, getCalendar} from './util/Date/Calendar'
	import Message from './util/Date/Message.json'
	import Button from './Button'

	/*
		props
	*/
	export let lang = 'en'
	export let date = '1970/01/01'
	export let fromDate = undefined
	export let toDate =  undefined
	export let disabled = false
	export let idx = 0
	export let hide = false
	export let shape = 'round'
	export let padding = 'middle'

	const gDispatch = createEventDispatcher()

	let gStyleClass = []
	let gDateParse= date.split('/') // 0: year, 1: month, 2: date
	let gMonthArrayMsg = []
	let gWeekArrayMsg = []	
	let gShowCalendarStage = 'd' // 'y': year, 'm': month, 'd': date
	let gTitleOfMonth = ''
	let gTitleOfYear = ''
	let gYears = []
	let gMonthGrid = []
	let gWeekGrid = []

	let gDateUTC = 0
	let gFromDateUTC = 0
	let gToDateUTC = 99999999999999

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
			gStyleClass = gStyleClass.concat(setStyle(false, shape, padding, false))
		}

		// init from to
		if (date != undefined) {
			gDateUTC = new Date(date).getTime()
		}
		if (fromDate != undefined) {
			gFromDateUTC = new Date(fromDate).getTime()
		}
		if (toDate != undefined) {
			gToDateUTC = new Date(toDate).getTime()
		}				

		// set message with lang
		if (Message[lang] !== undefined) {
		  gMonthArrayMsg = Message['en'].month
		  gWeekArrayMsg = Message['en'].week		
		} else {
		  // default lang ('en')
		  gMonthArrayMsg = Message['en'].month
		  gWeekArrayMsg = Message['en'].week
		}

		// make 4 x 4 row of month
		let _month = []
		for (let _inc = 1; _inc <= 12; _inc++){		
				
			_month.push(gMonthArrayMsg[_inc - 1])
	
			if (_inc % 4 === 0) {
				gMonthGrid.push(_month)
				_month = []
			}
		}

		// make row of year
		let _currentYear = gDateParse[0]
		let _lowYear = Number(_currentYear) - 30
		let _highYear = Number(_currentYear) + 5
		for (let _inc = _highYear; _inc >= _lowYear; _inc--){						
			gYears.push(_inc)
		}

		recalculate(date)
	}

	function recalculate (pDate) {
	    
        date = pDate
		gDateUTC = new Date(date).getTime()
		gDateParse= date.split('/')

		let _year = gDateParse[0] // year
		let _month = gDateParse[1] // month
		let _date = gDateParse[2] // date
		let _calendar = getCalendar(_year, _month)

		let _endDate = _calendar.getDate()
		let _endDay = _calendar.getDay()
		let _startDay = ((35 - _endDate) + _endDay + 1) % 7
		let _startDate = _startDay + 1
	
		gTitleOfMonth = gMonthArrayMsg[Number(_month - 1)]
		gTitleOfYear = _year

		// init gWeekGrid
		let length = gWeekGrid.length
		for (let inc = 0; inc < length; inc ++){	
			gWeekGrid.pop()
		}

		gWeekGrid = []		

		// make row of week
		let _Week = []
		length = _endDate + _startDate
		for (let inc = 1, num = 1; inc < length; inc++){					
			
			let dayMeta = {
			  'day': ' ',
			  'selected': false,	// 선택된 대상인지 식별
			  'choosable': false  // from to 영향을 받는 대상인지 식별
			}

			if (inc >= _startDate) {				
				let _tempDateUTC = new Date(_year + '/' +  _month + '/'+ num).getTime()
				dayMeta.day = num

				if (_tempDateUTC >= gFromDateUTC && _tempDateUTC <= gToDateUTC) {

					if(_tempDateUTC === gDateUTC) {
						dayMeta.selected = true
					}

					dayMeta.choosable = true

				} 

				num++
			}

			_Week.push(dayMeta)

			if (inc % 7 === 0) {
				gWeekGrid.push(_Week)
				_Week = []
			}	
		}

		if (_Week.length > 0 ){
			gWeekGrid.push(_Week)
			_Week = []
		}
	}

	function onYearPress (pIdx) {
					
		let _month = gDateParse[1] // month			

		recalculate(pIdx + '/' + _month + '/' + '01')

		// next
		changeStage()
	}	

	function onMonthPress (pIdx) {

		let _year = gDateParse[0] // year				

		recalculate(_year + '/' + (pIdx + 1) + '/' + '01')

		// next
		changeStage()
	}

	function onDatePress (pIdx) {

		let _year = gDateParse[0] // year				
		let _month = gDateParse[1] // month

		recalculate(_year + '/' + _month + '/' + pIdx)

		// next
		changeStage()
		gDispatch('onDayPress', {'idx': idx, 'calendar': date})
	}
	
	function onClick (pIdx) {

		let _year = gDateParse[0] // year
		let _month = gDateParse[1] // month

		let _yearNum = Number(_year)
		let _monthNum = Number(_month)

		if (pIdx === 'left') {

		  _monthNum--

		  if (_monthNum < 1) {
			_yearNum--
			_monthNum = 12
		  }
			
		} else if (pIdx === 'right') {
		  _monthNum++

		  if (_monthNum > 12) {
			_yearNum++
			_monthNum = 1
		  }

		} 

		moveStage(pIdx)

		recalculate(_yearNum + '/' + _monthNum + '/' + '01')
	}

	function changeStage() {

		switch(gShowCalendarStage) {
		 case 'y': 
		 	gShowCalendarStage = 'm'; break
		 case 'm': 
		 	gShowCalendarStage = 'd'; break
		 default: 
		 	gShowCalendarStage = 'd'
		}
	}


	function moveStage(stage) {

		switch(stage) {
		 case 'year': 
		 	gShowCalendarStage = 'y'; break
		 case 'month': 
		 	gShowCalendarStage = 'm'; break
		 default: 
		 	gShowCalendarStage = 'd'
		}
	}	

</script>

<style>
</style>

<div class={'-fl-datepicker'}
	 class:display-none={hide}>
	 <div class={'control'}>
	 	<Button label={'<'} shape="round" on:onClick={()=>onClick('left')}></Button>
	 	<span on:click={()=>onClick('month')}>{gTitleOfMonth}</span>
		<span on:click={()=>onClick('year')}>{gTitleOfYear}</span>
		<Button label={'>'} shape="round" on:onClick={()=>onClick('right')}></Button>
	 </div>
	 <div class={'container'}>
		<table class={'table'}>
				<!-- year stage -->
				{#if gShowCalendarStage === 'y'} 	
					<tbody>
						{#each gYears as year, idx}
							<tr class={'year'} on:click={()=>onYearPress(year)}>
								{year}
							</tr>							
						{/each}	
					</tbody>
				<!-- month stage -->					
				{:else if gShowCalendarStage === 'm'}
					<tbody>
						{#each gMonthGrid as month, idx}
							<tr class={'month'}>
								{#each month as item, idxx}
									<td on:click={()=>onMonthPress(idx * 4 + idxx)}>{item}</td>
								{/each}
							</tr>							
						{/each}
					</tbody>		
				{:else}			
				<!-- date stage -->								
					<thead>
						<tr class={'date'}>
							{#each gWeekArrayMsg as item, idx}	
								<td>{item}</td>
							{/each}
						</tr>
					</thead>		
					<tbody>
						{#each gWeekGrid as week, idx}
								<tr class={'date'}>
									{#each week as item}
										{#if item.choosable}		
											<td class:selected={item.selected} on:click={()=>onDatePress(item.day)}>{item.day}</td>
										{:else}
											<td class={'disable'}
												on:click={()=>onDatePress(item.day)}>{item.day}</td>
										{/if}
									{/each}
								</tr>									
						{/each}
					</tbody>
				{/if}
		</table>
	</div>
</div>

