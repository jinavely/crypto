import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinPrice } from '../api';

const List = styled.div``;

interface priceProps {
    coinId: string
}

interface IToday {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Price() {
    const { coinId } = useOutletContext<priceProps>();
    const { isLoading, data } = useQuery<IToday[]>(['price', coinId], () => fetchCoinPrice(coinId));
    const todayPrice: any = data ? data[0] : {};

    return (
        <div>
            {isLoading ? (
                "Loading price..."
            ) : (
                <div>
                   <List>오픈: {todayPrice.open.toFixed(2)} USD</List>
                   <List>마감: {todayPrice.close.toFixed(2)} USD</List>
                   <List>최고가: {todayPrice.high.toFixed(2)} USD</List>
                   <List>최저가: {todayPrice.low.toFixed(2)} USD</List>
                </div>
            )}
        </div>
    );
}
  
export default Price;