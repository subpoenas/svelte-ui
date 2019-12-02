<script>
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from '../util/Style'
	import {fade} from 'svelte/transition'
	import Button from '../Button'

	/*
		props
	*/
	export let disabled = false
	export let close = false

	export let id = '_modless_0'

	export let fill = 'content' // content, parent
	export let margin = undefined

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-modaless']
	/*
		init
	*/
	if (disabled) {
	} else {
		rootStyleClass = rootStyleClass.concat(setStyle(undefined, fill, undefined, undefined, margin, undefined))
	}

	/*
		method
	*/
	function onPress (_event) {
		close = true
	}

	function onClickOutside (_event) {
			
	}
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}
     class:display-none={close}>

	 <div class={'outside'} 
		  in:fade
		  on:click={onClickOutside}>
	 </div>

	 <div class={'container'}>
	  <header class={'header'} style="height: 20px">
	  	<slot name="header"></slot>
	  </header>
	  <section class={'body'}>
	    <slot name="body"></slot>
	  </section>
	  <footer class={'footer'}>		
	  	<slot name="footer"></slot>
	  </footer>
	</div>
</div>

