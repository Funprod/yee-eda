import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useGetCategoriesQuery } from '~/query/services/category-api/category-api';

type CategoryTagsProps = {
    tagsId?: string[];
};

export const CategoryTags = ({ tagsId }: CategoryTagsProps) => {
    const { data } = useGetCategoriesQuery();
    const categoryFilter = data?.filter((item) => !item.subCategories);
    return (
        <Flex
            direction='column'
            gap='6px'
            top='8px'
            left='8px'
            position={{
                md: 'static',
                base: 'absolute',
            }}
        >
            {tagsId?.slice(0, 2).map((id) => {
                const filterId = categoryFilter?.filter((item) => item._id === id);
                return filterId?.map((item) => (
                    <Link to={ROUTES.HOME} key={item._id}>
                        <Flex
                            w='100%'
                            h='24px'
                            p={{
                                md: '2px 8px',
                                base: '2px 4px',
                            }}
                            borderRadius='4px'
                            background='var(--lime-150)'
                            gap={{ md: '8px', base: '2px' }}
                        >
                            <Text
                                fontFamily='var(--font-family)'
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                whiteSpace='nowrap'
                            >
                                {item?.title}
                            </Text>
                        </Flex>
                    </Link>
                ));
            })}
        </Flex>
    );
};
