import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from 'react-router-dom';
import ApexChart from "react-apexcharts"
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface chartProps {
    coinId: string
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart() {
    const { coinId } = useOutletContext<chartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => price.close) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                          mode: isDark ? "dark" : 'light',
                        },
                        chart: {
                          height: 300,
                          width: 500,
                          toolbar: {
                            show: false,
                          },
                          background: "transparent",
                        },
                        grid: { show: false },
                        stroke: {
                          curve: "smooth",
                          width: 4,
                        },
                        yaxis: {
                          show: false,
                        },
                        xaxis: {
                          axisBorder: { show: false },
                          axisTicks: { show: false },
                          labels: { show: false },
                          type: "datetime",
                          categories: data?.map((price) => price.time_close),
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                              formatter: (value) => `$${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}
  
export default Chart;