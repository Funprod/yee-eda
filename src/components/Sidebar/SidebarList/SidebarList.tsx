import {
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Image,
    Link as ChakraLink,
    List,
    ListItem,
    Text,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import arrowDown from '~/assets/sidebar/arrowDown.svg';
import arrowUp from '~/assets/sidebar/arrowUp.svg';
import { Category } from '~/query/services/category-api/category-api.type';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

type SidebarLitsProps = {
    section: Category;
    index: number;
    openIndex: number | null;
    handleAccordionButton: (index: number) => void;
    handleCategoryClick: (id: string) => void;
};

export const SidebarList = ({
    section,
    index,
    openIndex,
    handleAccordionButton,
    handleCategoryClick,
}: SidebarLitsProps) => {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <AccordionItem
            data-test-id={section.title === 'Веганская кухня' ? 'vegan-cuisine' : undefined}
            w={{ md: '230px', sm: '314px', base: '302px' }}
            minHeight='48px'
            border='none'
            margin='0'
            padding='0'
        >
            <h2>
                <AccordionButton
                    onClick={() => {
                        handleAccordionButton(index);
                    }}
                    display='flex'
                    justifyContent='space-between'
                    margin='0'
                    padding='0'
                    maxWidth={{ md: '230px', base: '314px' }}
                    height='48px'
                    borderRadius='0'
                    _expanded={{ bg: '#eaffc7', fontWeight: '700' }}
                    _hover={{
                        bg: '#eaffc7',
                        borderColor: 'transparent',
                        fontWeight: '700',
                    }}
                    _focus={{
                        outline: 'none',
                        fontWeight: '700',
                        border: 'none',
                        boxShadow: 'none',
                        borderColor: 'transparent',
                    }}
                    _focusVisible={{
                        bg: '#eaffc7',
                        outline: 'none',
                        boxShadow: 'none',
                    }}
                >
                    <Box
                        as='span'
                        display='flex'
                        alignItems='center'
                        flex='1'
                        textAlign='left'
                        ml='8px'
                    >
                        <Image
                            src={getFullMediaUrl(section.icon)}
                            alt={section.title}
                            boxSize='24px'
                        />
                        <Link
                            onClick={() => handleCategoryClick(section._id)}
                            to={`${section.category}/${section.subCategories[0].category}`}
                        >
                            <Text ml='8px' fontSize='16px'>
                                {section.title}
                            </Text>
                        </Link>
                    </Box>

                    {openIndex === index ? (
                        <Image src={arrowUp} mr='12px' />
                    ) : (
                        <Image src={arrowDown} mr='12px' />
                    )}
                </AccordionButton>
            </h2>
            <AccordionPanel padding={0} margin={0}>
                <List>
                    {section.subCategories.map((item) => {
                        const isActive = currentPath === `/${section.category}/${item.category}`;
                        return (
                            <ListItem key={item._id}>
                                <ChakraLink
                                    data-test-id={isActive ? `${item.category}-active` : ''}
                                    as={Link}
                                    onClick={() => handleCategoryClick(section._id)}
                                    to={`/${section.category}/${item.category}`}
                                    fontWeight={isActive ? '700' : '400'}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: '230px',
                                        height: '36px',
                                        marginLeft: '0',

                                        _hover: {
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            fontWeight: '700',
                                            '::before': {
                                                width: '8px',
                                                height: '28px',
                                                marginLeft: '33px',
                                            },
                                        },
                                        '::before': {
                                            content: '""',
                                            display: 'inline-block',
                                            width: isActive ? '8px' : '1px',
                                            height: isActive ? '28px' : '24px',
                                            backgroundColor: '#c4ff61',
                                            margin: isActive
                                                ? '0 11px 0 33px'
                                                : '2px 11px 2px 40px',
                                            transition:
                                                'width 0.3s ease-in-out, margin-left 0.3s ease-in-out',
                                        },
                                    }}
                                >
                                    {item.title}
                                </ChakraLink>
                            </ListItem>
                        );
                    })}
                </List>
            </AccordionPanel>
        </AccordionItem>
    );
};
