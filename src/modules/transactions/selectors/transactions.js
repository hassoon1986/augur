import memoizerific from 'memoizerific';
import { formatShares, formatEther, formatRep } from '../../../utils/format-number';

import { PENDING, SUCCESS, FAILED } from '../../transactions/constants/statuses';

import store from '../../../store';

export default function() {
	var { transactionsData } = store.getState();
	return selectTransactions(transactionsData);
}

export const selectTransactions = memoizerific(1)(function(transactionsData) {
    return Object.keys(transactionsData || {})
            .sort((a, b) => parseFloat(b) - parseFloat(a))
            .map(id => {
                return {
                    ...transactionsData[id],
                    gas: transactionsData[id].gas && formatEther(transactionsData[id].gas),
                    ether: transactionsData[id].etherWithoutGas && formatEther(transactionsData[id].etherWithoutGas),
                    shares: transactionsData[id].sharesChange && formatShares(transactionsData[id].sharesChange),
                    rep: transactionsData[id].repChange && formatRep(transactionsData[id].repChange)
                };
            });
});