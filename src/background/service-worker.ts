export {};

(function main() {
	// add context menu
	chrome.runtime.onInstalled.addListener(() => {
		chrome.contextMenus.create({
			id: import.meta.env.VITE_APP_TITLE,
			title: import.meta.env.VITE_APP_TITLE,
			contexts: ['link', 'page'],
		});
	});

	// add context menu click event
	chrome.contextMenus.onClicked.addListener((info, tab) => {
		// priority: linkUrl > pageUrl
		const target = info.linkUrl || info.pageUrl;
		const windowId = (tab?.windowId || '') + '';
		const params = new URLSearchParams({ target, windowId }).toString();
		//  PROD : relative path from dist/service-worker-loader.js
		// !PROD : relattive path from service-worker.ts (this file)
		const url = (import.meta.env.PROD ? './pages/popup.html?' : '../../pages/popup.html?') + params;
		chrome.windows.create({
			focused: true,
			height: 500,
			width: 500,
			type: 'popup',
			url,
		});
	});
})();
