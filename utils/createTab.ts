export const createTab = async (windowId: number | undefined, url: string) => {
	const windows = await browser.windows.getAll({ windowTypes: ['normal'] });
	if (windows.length > 0) {
		const win = windows.find((w) => w.id != null && w.id === windowId) ?? windows[windows.length - 1];
		browser.tabs.create({ active: true, windowId: win.id, url });
	} else {
		await browser.windows.create({ focused: true, type: 'normal', url });
	}
};
