import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { useBreadcrumbs } from '~/hooks/useBreadcrumbs';

type Breadcrumbs = { onClose?: () => void };

export const Breadcrumbs = ({ onClose = () => {} }: Breadcrumbs) => {
    const breadcrumbItems = useBreadcrumbs();

    return (
        <Box
            width={{ base: '300px', md: '100%' }}
            overflow='hidden'
            ml={{ md: '0', base: '20px' }}
            display={{ base: 'block', md: 'block' }}
        >
            <Flex wrap='wrap' gap='2px' maxWidth='100%'>
                {breadcrumbItems?.map((item, index) => (
                    <Flex key={`${item.to}-${index}`} align='center' justify='center'>
                        <Link to={item.to}>
                            <Text
                                data-test-id='breadcrumbs'
                                fontSize='16px'
                                fontWeight={index === breadcrumbItems.length - 1 ? '500' : '400'}
                                color={
                                    index === breadcrumbItems.length - 1
                                        ? '#000'
                                        : 'rgba(0, 0, 0, 0.64)'
                                }
                                whiteSpace='wrap'
                                _hover={{ textDecoration: 'none' }}
                                onClick={() => onClose()}
                            >
                                {item.label}
                            </Text>
                        </Link>
                        {index < breadcrumbItems.length - 1 && (
                            <ChevronRightIcon
                                mx='4px'
                                w={{ md: '22px', base: '18px' }}
                                h={{ md: '24px', base: '18px' }}
                                flexShrink={0}
                            />
                        )}
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};
