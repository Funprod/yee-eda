import { Flex, Image, Text } from '@chakra-ui/react';
import {
    Area,
    AreaChart,
    CartesianGrid,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import BookmarkHeartBlackFill from '~/assets/BookmarkHeartBlackFill.svg';
import EmojiHeartEyesBlackFill from '~/assets/EmojiHeartEyesBlackFill.svg';
import { groupByWeek } from '~/utils/groupByWeek';

type ProfileChartProps = {
    chartData: {
        count: number;
        date: string;
    }[];
    isBookmarks?: boolean;
};

export const ProfileChart = ({ chartData, isBookmarks }: ProfileChartProps) => {
    const countChartData = chartData.reduce((acc, item) => acc + item.count, 0);
    const groupedChartData = groupByWeek(chartData);

    const tick = [0, 20, 40, 60, 80, 100, 120];

    const text = isBookmarks ? 'Сохранений' : 'Лайков';
    return (
        <Flex direction='column' gap='14px'>
            <Flex align='center' gap='6px'>
                <Image
                    src={isBookmarks ? BookmarkHeartBlackFill : EmojiHeartEyesBlackFill}
                    w='12px'
                    h='12px'
                />
                <Text fontWeight='600' fontSize='12px' lineHeight='133%' color='#2db100'>
                    {countChartData} {text}
                </Text>
            </Flex>
            {chartData.length > 0 && (
                <ResponsiveContainer width='100%' height={300}>
                    <AreaChart data={groupedChartData}>
                        <defs>
                            <linearGradient id='colorCountBookmark' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='0%' stopColor='#c5ff61e6' stopOpacity={0.4} />
                                <stop offset='100%' stopColor='#c4ff61' stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id='colorCountLike' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='0%' stopColor='#8C54FF' stopOpacity={0.4} />
                                <stop offset='100%' stopColor='#8C54FF' stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey='date'
                            tickMargin={17}
                            tickLine={false}
                            axisLine={{ stroke: '#FFFFD3', strokeWidth: 2 }}
                        />
                        <YAxis
                            tickCount={6}
                            domain={[0, 120]}
                            ticks={tick}
                            tickMargin={17}
                            tickLine={false}
                            axisLine={{ stroke: '#FFFFD3', strokeWidth: 2 }}
                        />
                        <CartesianGrid
                            stroke='#000'
                            strokeDasharray='5 5'
                            strokeWidth={0.2}
                            strokeOpacity={0.6}
                            vertical={false}
                            horizontal={false}
                        />

                        {groupedChartData.map((entry, index) =>
                            index === 0 ? null : (
                                <ReferenceLine
                                    key={`ref-line-${index}`}
                                    x={entry.date}
                                    stroke='#000'
                                    strokeDasharray='5 5'
                                    strokeWidth={0.2}
                                    strokeOpacity={0.6}
                                />
                            ),
                        )}

                        {tick.map((tick, index) =>
                            index === 0 ? null : (
                                <ReferenceLine
                                    key={`h-line-${index}`}
                                    y={tick}
                                    stroke='#000'
                                    strokeDasharray='5 5'
                                    strokeWidth={0.2}
                                    strokeOpacity={0.6}
                                />
                            ),
                        )}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                borderRadius: 6,
                                borderColor: '#ccc',
                            }}
                            labelStyle={{ fontWeight: 'bold' }}
                            formatter={(value: number) => [
                                `${value} ${isBookmarks ? 'сохранений' : 'лайков'}`,
                            ]}
                        />

                        <Area
                            type='linear'
                            dataKey='count'
                            stroke={isBookmarks ? '#2DB100' : '#8C54FF'}
                            fill={isBookmarks ? 'url(#colorCountBookmark)' : 'url(#colorCountLike)'}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Flex>
    );
};
