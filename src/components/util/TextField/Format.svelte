<script context="module">

  /*
     입력값에 대해 출력값 formatting 처리
       - x 값은 입력값 그대로 출력
       - 그외 값은 그외 값 그대로 출력
  */
  export function applyFormat (_maskField, _format) {
      let returnField = []
      let maskLen = _maskField.length
      
      if (_format === undefined) {
        returnField = _maskField
      } else {
        let formatField = _format.split('')
        let formatLen = formatField.length
        let lastFormatChar = formatField[formatField.length - 1]
        let _idx = 0

        for (let idx = 0; idx < maskLen; idx++) {
          while(_idx < formatLen) {
              let f = formatField[_idx++]
              if (f === undefined) {
                f = lastFormatChar
              }
   
              if (f === 'x') {
                returnField.push(_maskField[idx])
                break
              } else {
                returnField.push(f)  
              }
          }
        }
      }

      return returnField
  }

</script>
