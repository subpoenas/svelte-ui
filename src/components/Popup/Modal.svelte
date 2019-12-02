<script>
	import {createEventDispatcher} from 'svelte'
	import {setStyle} from '../util/Style'
	import {fade} from 'svelte/transition'
	import Button from '../Button'

	/*
		props
	*/
	export let disabled = false
	export let hide = true
	export let showClose = true

	export let id = '_modl_0'

	export let fill = 'content' // content, parent
	export let margin = undefined

	const dispatch = createEventDispatcher()
	let rootStyleClass = ['-fl-modal']
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
	function onClick (_event) {
		hide = true
	}
	
</script>

<style>
</style>

<div class={rootStyleClass.join(' ')}
     class:display-none={hide}>

	 <div class={'outside'} 
		  in:fade>
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

	  {#if showClose}
		<div class={'close'}>
			<Button shape={'circle'}
					label={'x'} 
					style="background-color: black; width: 20px; height: 20px; padding: 0px !important" 
					on:onClick={onClick}>
			</Button>
		</div>	  
	  {/if}
	</div>
</div>

