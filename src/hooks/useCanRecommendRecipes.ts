import { useGetStatisticQuery } from '~/query/services/statistics-api/statistics-api';
import { useGetMeQuery } from '~/query/services/users-api/users-api';

export function useCanRecommendRecipes() {
    const { data: statistic } = useGetStatisticQuery();
    const { data: profileData } = useGetMeQuery();

    if (!statistic || !profileData) {
        return {
            canRecommend: false,
            countLikes: 0,
            countBookmarks: 0,
            subscriberCount: 0,
            recommendationsCount: 0,
        };
    }

    const countLikes = statistic.likes?.reduce((acc, item) => acc + item.count, 0) ?? 0;
    const countBookmarks = statistic.bookmarks?.reduce((acc, item) => acc + item.count, 0) ?? 0;
    const subscriberCount = profileData.subscribers?.length ?? 0;
    const recommendationsCount = statistic.recommendationsCount ?? 0;

    const canRecommend = subscriberCount >= 100 && countBookmarks >= 200;

    return { canRecommend, countLikes, countBookmarks, subscriberCount, recommendationsCount };
}
