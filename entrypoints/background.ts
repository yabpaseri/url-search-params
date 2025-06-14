export default defineBackground(() => {
	browser.runtime.onInstalled.addListener(() => {
		browser.contextMenus.create({
			id: 'e7449800-c979-4cee-a5f9-dcd5e5b80851',
			title: browser.runtime.getManifest().name,
			contexts: ['link', 'page'],
		});
	});

	browser.contextMenus.onClicked.addListener((info, tab) => {
		const target = info.linkUrl ?? info.pageUrl ?? '';
		const windowId = (tab?.windowId ?? '') + '';
		const params = new URLSearchParams({ target, windowId });
		const url = `${browser.runtime.getURL('/window.html')}?${params}`;
		browser.windows.create({
			focused: true,
			height: 500,
			width: 500,
			type: 'popup',
			url,
		});
	});
});
