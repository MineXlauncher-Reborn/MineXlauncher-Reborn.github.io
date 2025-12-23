"use strict";
const googleTag = document.createElement('script');
googleTag.async = true;
googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-GD4SJRCR7Z';
document.head.appendChild(googleTag);
window.dataLayer = window.dataLayer || [];
function gtag(...args) {
    window.dataLayer.push(...args);
}
gtag('js', new Date());
gtag('config', 'G-GD4SJRCR7Z');
