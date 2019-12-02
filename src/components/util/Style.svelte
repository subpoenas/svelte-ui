<script context="module">

  export  function setStyle (isChild, fill, display, border, margin, align) {
		let styleClass = [];

		if (isChild) {
			switch(border) {
				case 'square': styleClass.push('border-item-square-in-group');break;
				case 'round': if(display == 'block') { 
								styleClass.push('block-border-item-round-in-group')								  }
							  else {
								styleClass.push('inline-border-item-round-in-group')
							  }
						break; 	
			}
		} else {
			switch(border) {
				case 'square': styleClass.push('border-item-square');break;
				case 'circle': styleClass.push('border-item-circle');break;
				case 'round': styleClass.push('border-item-round');break;
				case 'round-up': styleClass.push('border-item-round-up');break; 
				case 'round-down': styleClass.push('border-item-round-down');break; 
			}
		}

		switch(fill) {
			case 'document': styleClass.push('fill-document');break;
			case 'parent': styleClass.push('fill-parent');break;
			case 'content': styleClass.push('fill-content');break;
	  	}

		switch(display) {
			case 'inline': styleClass.push('display-inline');break;
			case 'block': styleClass.push('display-block');break;
	  	}

		switch(margin) {
			case 'small-height': styleClass.push('margin-small-height');break;
			case 'middle-height': styleClass.push('margin-middle-height');break;
			case 'large-height': styleClass.push('margin-large-height');break;
			case 'small': styleClass.push('margin-small');break;
			case 'middle': styleClass.push('margin-middle');break;
			case 'large': styleClass.push('margin-large');break; 	
	  	}

		switch(align) {
			case 'left': styleClass.push('align-left');break;
			case 'right': styleClass.push('align-right');break;
			case 'center': styleClass.push('align-center');break; 	
		}

      return styleClass;
   }
</script>
