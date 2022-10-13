/**
 * Get chrome's normal window; if one matching windowId exists, it is returned.
 * If there is no match for windowId, one of the existing normal windows is returned.
 * If the normal window does not exist, a new one is created.
 * @param windowId
 * @param created_start_page The page that opens when a new window is created.
 * @returns [window, is_created(boolean)]
 */
export const getOrCreateNormalWindow = async (
	windowId: number | undefined,
	created_start_page?: string
): Promise<[chrome.windows.Window, boolean]> => {
	const windows = await chrome.windows.getAll({ windowTypes: ['normal'] });
	if (windows.length !== 0) {
		return [windows.find((w) => w.id != null && w.id === windowId) || <chrome.windows.Window>windows.at(-1), false];
	} else {
		// create a normal window if there is none.
		return [await chrome.windows.create({ focused: true, type: 'normal', url: created_start_page }), true];
	}
};
