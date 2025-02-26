/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import faker from 'faker';

import {
	getRandomInt,
	getRandomString,
	getRandomSymbol,
	processFakeRequestData,
} from '../index';
export const currencies = [];

export const currencyTemplate = {
	active: true,
	code: 'TCR',
	id: 999999,
	name: 'TEST CURRENCY',
	symbol: '$',
};

export function generateFakeCurrencies(total) {
	for (let i = 0; i < total - 1; i++) {
		currencies.push({
			...currencyTemplate,
			active: true,
			code: faker.finance.currency(),
			id: i,
			name: getRandomString(6),
			symbol: getRandomSymbol(),
		});
	}

	return currencies;
}

export function getCurrencies(url, itemsLength = getRandomInt(3, 6)) {
	if (!currencies.length) {
		generateFakeCurrencies(itemsLength);
	}

	const {items, lastPage, page, pageSize, totalCount} =
		processFakeRequestData(url, currencies, [currencyTemplate]);

	return {
		actions: {},
		facets: [],
		items,
		lastPage,
		page,
		pageSize,
		totalCount,
	};
}
