export type StatPoint = { count: number; date: string };
export function groupByWeek(data: StatPoint[]) {
    const grouped: Record<string, number> = {};

    data.forEach(({ date, count }) => {
        const d = new Date(date);
        const day = d.getDay();

        const diffToMonday = (day + 7) % 8;
        d.setDate(d.getDate() - diffToMonday);

        const formatted = d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });

        grouped[formatted] = (grouped[formatted] || 0) + count;
    });

    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
}
