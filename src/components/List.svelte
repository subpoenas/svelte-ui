<script>
/*
	2019/07/28 by Alton.Jung

	기능
	- 가상 스크롤 지원
	- checkbox 연동 지원
	- radio 연동 지원
	- fill, content 지원

	개발 시 주의 사항
	- overflow를 갖는 부모내에 보여지는 리스트 개별 item 속성에 absolute를 부여하고, top 속성 값을 통해 hscroll 가상 영역을 제어
	- trace 를 통해, 스크롤 down 시 추가되는 레코드 수 관리
*/
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from './util/Style'
	import CheckboxBtn from './CheckboxBtn.svelte'
	import RadioBtn from './RadioBtn.svelte'
	import Label from './Label.svelte'
	/*
		props
	*/
	export let disabled = false
	export let width = "inherit"
	export let height = "inherit"
	export let itemHeight = 25 // item 사이즈 크기
	export let items = [] // {'record': ['test1', 'test2', 'test1'], 'icon': {'status':true}},
	export let iconType = 'none'
	export let textPos = 'left'
	export let border = false
	export let divider = true

	export let id = '_list_0'

	export let fill = 'content' // content, parent
	export let display = 'inline' // inline, block

	let margin = 'small-height'
	let align = 'left'

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-list']
	let iconStyleClass = ['']
	let contentStyleClass = ['', 'contents']

	if (itemHeight < 25) {
		itemHeight = 25 // height 최소값
	}

	let realRecordHeight = Number(itemHeight) + Number(10) // padding-top(5), padding-bottom(5)
	let divideHeight = Number(itemHeight) + Number(5) // padding-top(5)

	let _width = Number(width.replace(/[a-z|A-Z|%]+/,''))	// height 값이 문자열이라, px, vh, % 제거하고 숫자만 뽑아서 활용
	let _height = Number(height.replace(/[a-z|A-Z|%]+/,''))	// height 값이 문자열이라, px, vh, % 제거하고 숫자만 뽑아서 활용
	let showItems = []
	let sceenItemsLen = Math.ceil(_height / realRecordHeight) // 화면에 보여지는 레코드 갯수
	let screenHeight = sceenItemsLen * realRecordHeight	// 보이는 영역의 pixel 수, 버퍼링 레코드 수
	let vHeight = items.length * realRecordHeight	
	let prevPageOffset = 0  // 이전 페이지 로딩 조건 offset pixel 값
	let nextPageOffset = 0	// 다음 페이지 로딩 조건 offset pixel 값
	let firstItemIdx = 0  // items 내 첫번째 index
	let lastItemIdx = 0  // items 내 마지막 index
	let currentOffset = 0 // 현재 기준 레코드 위치
	let trace = [] // 스크롤 up, down 시 레코드 추가/삭제 이력 tracing

	// radioGroup 관리
	let activeIdx = -1
	/*
		init
	*/
	if (disabled) {
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, undefined, undefined, undefined, margin, align))
		if (textPos == 'right') {
			iconStyleClass[0] = 'left-direction'
			contentStyleClass[0] = 'right-direction'
		} else {
			iconStyleClass[0] = 'right-direction'
			contentStyleClass[0] = 'left-direction'
		}
	}

	let totalItemLength = items.length
	let copyRecord = 0

	// 화면에 보여지는 레코드 수 * 3의 수만큼 버퍼링
	if (sceenItemsLen * 3 <= totalItemLength) {
		copyRecord = sceenItemsLen * 3
	} else {
		copyRecord = totalItemLength
	}

	for (let idx = 0; idx < copyRecord; idx ++){			
		showItems[idx] = items[idx]
		showItems[idx]['offset'] = realRecordHeight * idx
	}

	firstItemIdx = 0
	lastItemIdx = copyRecord
	prevPageOffset = 0
	nextPageOffset = screenHeight

	/*
		method
	*/	

	const onClick = (cnt, content) => (e) => {
		let realCnt = currentOffset + cnt
		if (e.target.className == 'list') {
			dispatch('onClick', {'id': id, 'idx': realCnt, 'content': content})
		}
	} 

	function onCkSelect(e) {
		items[e.detail.idx]['icon']['status'] = e.detail.status
		dispatch('onSelect', {'id': e.detail.id, 'idx': e.detail.idx, 'value': e.detail.status})
	}

	function onRdSelect(e) {
		activeIdx = e.detail.idx;
		dispatch('onSelect', {'id': e.detail.id, 'idx': e.detail.idx, 'value': e.detail.value})
	}

	function onScroll(e) {

		let scrollTop = e.target.scrollTop

		if (prevPageOffset >= scrollTop) {
			// 스크롤이 위로 이동 하여, 추가로 읽어 들일 레코드 수 계산
			let readLen = 0

			if (trace.length !== 0) {
				readLen = trace.pop()
			}

			if (readLen === 0) {
				// 더 이상 읽어 들일 레코드가 없는 경우
				prevPageOffset = scrollTop
				nextPageOffset = scrollTop + screenHeight
			} else {
				// 배열 앞부분에 readLen 크기 만큼 item 추가
				let tempItems = []
				let idx = (firstItemIdx - readLen)
				let max = idx + readLen
				for (; idx < max; idx ++){
					let item = items[idx]
					item['offset'] = realRecordHeight * idx
					tempItems.push(item)
				}

				// 배열 뒷부분부터 readLen 크기 만큼 item 제거
				showItems.splice(showItems.length - readLen, readLen)				
				showItems = tempItems.concat(showItems)

				firstItemIdx -= readLen
				lastItemIdx -= readLen
				prevPageOffset = prevPageOffset - (realRecordHeight * readLen)
				nextPageOffset = nextPageOffset - (realRecordHeight * readLen)

				// 배열 요소 변경 시  reactivity를 위해 해당 패턴 적용
				showItems = showItems

				// 현재 레코드 offset 위치 파악
				currentOffset -= readLen
			}
		} else if (scrollTop >= nextPageOffset) {
			// 스크롤이 아래로 이동 하여, 추가로 읽어 들일 레코드 수 계산
			let readLen = 0
			if (lastItemIdx + sceenItemsLen <= (items.length)) {
				readLen = sceenItemsLen
			} else {
				readLen = items.length - lastItemIdx
			}

			if (readLen === 0) {
				// 더 이상 읽어 들일 레코드가 없는 경우
				if (trace.length !== 0) {
					let lastRecord = trace[trace.length - 1]
					prevPageOffset = scrollTop - (realRecordHeight * lastRecord)
					nextPageOffset = scrollTop
				} else {
					prevPageOffset = scrollTop - screenHeight
					nextPageOffset = scrollTop
				}
			} else {
				// 배열 앞부분부터 화면 크기만큼 item 제거
				showItems.splice(0, readLen)

				// 배열 뒷부분부터 화면 크기만큼 item 추가
				let idx = lastItemIdx
				let max = idx + readLen

				for (; idx < max; idx ++){
					let item = items[idx]
					item['offset'] = realRecordHeight * idx
					showItems.push(item)
				}

				firstItemIdx += readLen
				lastItemIdx += readLen
				prevPageOffset = prevPageOffset + (realRecordHeight * readLen)
				nextPageOffset = nextPageOffset + (realRecordHeight * readLen)

				// 배열 요소 변경 시  reactivity를 위해 해당 패턴 적용
				showItems = showItems

				// 삭제된 대상 trace에 관리
				trace.push(readLen)

				// 현재 레코드 offset 위치 파악
				currentOffset += readLen
			}
	}
}	
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}
	 class:disabled={disabled}
	 style="width: {width}; height: {height}">

	 <div class="container"
	 	  on:scroll={onScroll}>
		 
		 <div class='scroll' 
			class:border={border}
			style="height: {vHeight}px">
			{#each showItems as item, cnt}
				<div class='list' style="top: {Number(item.offset)}px; height: {itemHeight}px" on:click={onClick(cnt, item.record)}>
						{#if iconType == 'checkbox'}
							<span class={iconStyleClass.join(' ')}>
								<CheckboxBtn idx={currentOffset+cnt} 
											 padding=undefined
											 checked={item.icon.status} 
											 on:onSelect={onCkSelect}/>
							</span>					
						{:else if iconType == 'radio'}
							<span class={iconStyleClass.join(' ')}>
								<RadioBtn idx={currentOffset+cnt} 
										  padding=undefined
										  checked={activeIdx === currentOffset+cnt}					  
										  on:onSelect={onRdSelect}/>
							</span>								
						{/if}
						{#each item.record as record, idx}
							<span class={contentStyleClass.join(' ')}>
								{record}
							</span>
						{/each}

						{#if divider}
							<hr class="divider"
								style="top: {divideHeight}px" >
						{/if}			
				</div>
			{/each}
		 </div>
	 </div>
</div>