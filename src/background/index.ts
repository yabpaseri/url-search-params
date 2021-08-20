import { browser, Menus, Tabs } from "webextension-polyfill-ts";
import { getConfigParams, init as storageInit } from "../util/storage";

const CONTEXT_ID = "URL-PARAMS-PARSER";
const CONTEXT_PROPERTY: Menus.CreateCreatePropertiesType = {
	id: CONTEXT_ID,
	title: "Parse URL Parameters",
	contexts: ["page", "selection", "link"],
};

const createCallback = () => {
	if (browser.runtime.lastError) console.log(browser.runtime.lastError);
};

const clickCallback = (info: Menus.OnClickData, tab: Tabs.Tab | undefined) => {
	if (info.menuItemId === CONTEXT_ID) {
		const url = (() => {
			// (優先度:高) select > link > page (低)
			const raw_url = info.selectionText || info.linkUrl || info.pageUrl;
			const dummy_url = new URL("http://example.com/");
			if (!raw_url) return dummy_url;
			try {
				return new URL(raw_url);
			} catch (error) {
				return dummy_url;
			}
		})();

		// 設定の縦横サイズとcontextMenuからのURLを使ってウィンドウ(popup)を開く
		getConfigParams()
			.then(value => browser.windows.create({
				focused: true,
				height: value.height,
				width: value.width,
				type: 'popup',
				url: `./html/popup.html${url.search}`,
			}))
			.catch(reason => console.log(reason));
	}
}

(() => {
	browser.runtime.onInstalled.addListener(details => {
		if (details.reason === "update" || details.reason === "install") storageInit();
		browser.contextMenus.create(CONTEXT_PROPERTY, createCallback);
	});

	browser.contextMenus.onClicked.addListener(clickCallback);
})();