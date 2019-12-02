<script context="module">

  let filter= {
        '#': {
          test: char => char.match(/[0-9]/),
          convert: char => char
        },
        'A': {
          test: char => char.match(/[A-Z]/i),
          convert: char => char.toUpperCase()
        },
        'a': {
          test: char => char.match(/[a-z]/i),
          convert: char => char.toLowerCase()
        },
        'N': {
          test: char => char.match(/[0-9A-Z]/i),
          convert: char => char.toUpperCase()
        },
        'n': {
          test: char => char.match(/[0-9a-z]/i),
          convert: char => char.toLowerCase()
        },
        'U': {
          test: char => char.match(/[0-9A-Z_]/i), // 숫자, 영문대문자, _ 만 허용
          convert: char => char.toUpperCase()
        },
        'd': {
          test: char => char.match(/[0-9.]/), // 숫자와 . 만 허용
          convert: char => char
        },
        'c': {
          test: char => char.match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/), // 한글, 영어, 숫자만 허용
          convert: char => char
        }
  }

  /*
    filter 값 자체에 대한, validation 처리
      - 허용되지 않은 값이 filter값에 존재시 제거
  */
  export function validateFilter (_filter) {
      let filteredText = []
      if (_filter === undefined) {
      } else {
        let filterLen = _filter.length
        const filtered = _filter.split('')

        for (let idx = 0; idx < filterLen; idx++) {
            if (filter.hasOwnProperty(filtered[idx])) {
              filteredText.push(filtered[idx])
            }
        }
      }
    
      return filteredText;
  }
 
  /*
    입력값과 filter 입력값의 맨 마지막 값을 가지고 filter 적용 여부 확인
      - 입력값 마지막값과 filter 마지막값이 매칭이 되면 true 값 전달
  */
  export function applyFilter (_textField, _filter) {
     let _textLen = _textField.length
     let _filterField = []
     let _filterLen = 0

     if (_filter === undefined || _filterLen === 0) {
       return true
     } else {
       _filterField = _filter.split('')
       _filterLen = _filterField.length

      if(_textLen > 0 && _filterLen > 0) {
          let c = _textField[_textLen-1]
          let f = _filterField[_filterLen-1]

          if (_filterLen < _textLen) {
            return false
          } else {
            let m = _filterField[_textLen-1]

            if (filter[f].test(c)) {
              return true
            } else {
              return false
            }
          }
      }     
     }
  }

</script>
