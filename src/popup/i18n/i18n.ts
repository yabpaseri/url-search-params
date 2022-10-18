import { I18N_KEY } from './i18n-key';

export const i18n = (key: I18N_KEY, substitutions?: string[]): string => {
	return chrome.i18n.getMessage(key, substitutions);
};
