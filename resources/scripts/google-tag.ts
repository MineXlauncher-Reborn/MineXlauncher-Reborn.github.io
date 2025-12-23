declare global {
	interface Window {
		dataLayer: unknown[];
	}
}

const googleTag = document.createElement('script');
googleTag.async = true;
googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-GD4SJRCR7Z';
document.head.appendChild(googleTag);

window.dataLayer = window.dataLayer || [];
function gtag(...args: unknown[]) {
	window.dataLayer.push(...args);
}
gtag('js', new Date());
gtag('config', 'G-GD4SJRCR7Z');
