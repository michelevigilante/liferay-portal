/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import '../../tests_utilities/polyfills';

import {act, cleanup, fireEvent, render} from '@testing-library/react';
import React from 'react';

import ServiceProvider from '../../../src/main/resources/META-INF/resources/ServiceProvider';
import CurrencySelector from '../../../src/main/resources/META-INF/resources/components/currency_selector/CurrencySelector';
import * as CurrencySelectorUtils from '../../../src/main/resources/META-INF/resources/components/currency_selector/util';

jest.mock('../../../src/main/resources/META-INF/resources/ServiceProvider');

describe('CurrencySelector', () => {
	const BASE_PROPS = {
		commerceChannelId: 24324,
		commerceOrderDetailBaseUrl: 'http://order-detail.url',
		commerceOrderId: 0,
		commerceOrderTypes: [],
	};

	beforeEach(() => {
		ServiceProvider.DeliveryCatalogAPI = jest.fn().mockReturnValue({
			getCurrenciesByChannelId: jest.fn(() =>
				Promise.resolve({
					items: [
						{
							active: true,
							code: 'USD',
							externalReferenceCode:
								'1772bef2-8512-b8a3-067c-0e5462a6e454',
							formatPattern: {
								en_US: '$ ###,##0.00',
							},
							id: 30128,
							maxFractionDigits: 2,
							minFractionDigits: 2,
							name: {
								en_US: 'US Dollar',
							},
							primary: true,
							priority: 1,
							rate: 1,
							roundingMode: 'HALF_EVEN',
							symbol: '$',
						},
						{
							active: true,
							code: 'GBP',
							externalReferenceCode:
								'1ca319a1-3fa5-b341-1ae7-15858064a23b',
							formatPattern: {
								en_US: '£ ###,##0.00',
							},
							id: 30130,
							maxFractionDigits: 2,
							minFractionDigits: 2,
							name: {
								en_US: 'British Pound',
							},
							primary: false,
							priority: 3,
							rate: 0.7914,
							roundingMode: 'HALF_EVEN',
							symbol: '£',
						},
						{
							active: true,
							code: 'CNY',
							externalReferenceCode:
								'b007208b-2dfd-e79e-8b75-95837869c5af',
							formatPattern: {
								en_US: '¥ ###,##0.00',
							},
							id: 30132,
							maxFractionDigits: 2,
							minFractionDigits: 2,
							name: {
								en_US: 'Chinese Yuan Renminbi',
							},
							primary: false,
							priority: 5,
							rate: 7.25,
							roundingMode: 'HALF_EVEN',
							symbol: '¥',
						},
					],
				})
			),
		});

		window.Liferay = {
			CommerceContext: {
				currency: {
					currencyCode: 'USD',
				},
			},
		};
	});

	afterEach(() => {
		jest.resetAllMocks();

		cleanup();
	});

	describe('Default behaviour', () => {
		it('shows the currently active currency', async () => {
			const retrieveCommerceCurrencyMock = jest
				.spyOn(CurrencySelectorUtils, 'retrieveCommerceCurrency')
				.mockName('retrieveCommerceCurrencyMock')
				.mockImplementation(() => undefined);

			const storeCommerceCurrencyMock = jest
				.spyOn(CurrencySelectorUtils, 'storeCommerceCurrency')
				.mockName('storeCommerceCurrencyMock');

			const {getByText} = render(<CurrencySelector {...BASE_PROPS} />);

			expect(getByText('$ USD')).toBeInTheDocument();
			expect(retrieveCommerceCurrencyMock).toHaveBeenCalled();
			expect(storeCommerceCurrencyMock).toHaveBeenCalled();
		});
	});
});
