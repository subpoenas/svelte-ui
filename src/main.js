import App from './Demo.svelte';
import './assets/scss/fl.scss';

const app = new App({
	target: document.body,
	// props: {
	// 	name: 'world'
	// }
});

window.app = app;

export default app;