# svelte-webpack4-template
svelte UI using Webpack 4

## UI Basic Concept
- 기본 정책
    - UI는 고유 idx 값을 소유
    - UI는 단일 요소와 다중 요소(그룹) 타입으로 구성
    - UI는 페이지내 커스텀 태그로 표현되고, 속성과 이벤트로 모형과 상태 정보를 제공
        - 속성은 UI 스타일과 초기 상태값을 정의
        - 이벤트는 UI에서 변화된 상태 정보를 페이지(부모)에게 전달 인터페이스

- 이벤트 타입 정의
    - 단일 요소 타입 UI는 이벤트 발생 시 onCheck, onClick, onPress, onChange로 명칭 사용
        - onCheck 는 상태 위주 변경 시 활용
        - onClick 은 행위 위주 변경 시 (visible <-> invisible) 활용
        - onPress 는 행위 위주 변경 시 활용
        - onChange 는 행위 위주 변경 시 (데이터 값 변경) 활용

    - 다중 요소(그룹) 타입 UI는 이벤트 발생 시 onSelect 로 명칭 사용
        - onSelect 는 행위 위주 변경 시 (단일 요소 선택) 활용

- 이펙트
    - show/hide 요소에 show인 경우만 transition 적용
    - scroll 요소에 scroll transition 적용

## form
- Button

    [Props]
        pressed = false
        disabled = false
        label = ''
        id = 0
        border = 'square'
        padding = 'middle'

    [Event]
        onPress  {idx, label, pressed}

    [Example]
        <Button id='_btn_0' shape='round' label={'click'} on:onPress={onPress}></Button>


- Button Group = Segmentbox with multi select

    [Props]
         exclusitve = false
         activeIdx = -1
	     disabled = false
	     items = []
	     border = 'round'
	     padding = 'middle'

    [Event]
        onSelect  {'items': selectedArray}

- Checkbox

    [Props]
	     disabled = false
	     idx = 0
	     label = ''
	     circle = false
 	     round = false

    [Event]
        onCheck  {idx, state}

- Input
    - masking
    - filtering
    - formatting
    - validation (min, max)
    
- Radio
- RadioGroup
- Spinner
- Tag

## menu
- Accordion
- Accordion Group

## list
- list
    - virtual list

## popup
- modal
- dialog