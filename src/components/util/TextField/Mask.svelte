<script context="module">

  /*
     입력값에 대해 출력값 masking 처리
       - x 값은 입력값 그대로 출력
       - 그외 값은 그외 값 그대로 출력
  */
  export function applyMask (_textField, _mask) {
      let returnField = []
      if (_mask === undefined) {
        returnField = _textField
      } else {
        let textLen = _textField.length
        let maskField = _mask.split('')
        let lastMaskChar = maskField[maskField.length - 1]
  
        for (let idx = 0; idx < textLen; idx++) {
          let m = maskField[idx]

          if (m === undefined) {
            m = lastMaskChar
          }

          if (m === 'x') {
            returnField.push(_textField[idx])
          } else {
            returnField.push(m)
          }
        }
      }

      return returnField
  }

</script>
