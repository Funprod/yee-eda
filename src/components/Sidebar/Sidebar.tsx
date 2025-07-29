import { Accordion, Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';

import { categoriesSelector, setSelectedCategoryId } from '~/store/app-slice';
import { useCategoriesWithSubcategories } from '~/utils/getCategoriesWithSubcategories';

import { Breadcrumbs } from '../Header/Breadcrumbs/Breadcrumbs';
import exit from './../../assets/sidebar/exit.svg';
import { SidebarList } from './SidebarList/SidebarList';

type SidebarProps = {
    openBurger?: boolean;
    onClose?: () => void;
};

export const Sidebar = ({ openBurger, onClose }: SidebarProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const categoryDataRedux = useSelector(categoriesSelector);
    const dispatch = useDispatch();

    const handleAccordionButton = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleCategoryClick = (categoryId: string) => {
        dispatch(setSelectedCategoryId(categoryId));
    };
    const sidebarCategory = useCategoriesWithSubcategories(categoryDataRedux);

    return (
        <Flex
            display={{ base: openBurger ? 'flex' : 'none', md: 'flex' }}
            p={openBurger ? '0' : '14px 4px 0 0'}
            w={{ md: '256px', base: 'unset' }}
        >
            <Box
                data-test-id='nav'
                borderRadius={{ base: '0 0 12px 12px', md: 'none' }}
                background='#fff'
                position={{ md: 'sticky', base: 'fixed' }}
                top={{ md: '80px', base: '64px' }}
                right={{ base: '5px', md: 'unset' }}
                h={{ md: 'calc(100vh - 80px)', sm: '878px', base: '652px' }}
                boxShadow={{
                    md: '0 2px 1px -1px rgba(0, 0, 0, 0.2),0 1px 1px 0 rgba(0, 0, 0, 0.14),0 1px 3px 0 rgba(0, 0, 0, 0.12)',
                    base: '0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1) background: #fff',
                }}
                overflowY={{ sm: 'hidden', base: 'auto' }}
                overflowX='hidden'
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(0, 0, 0, 0.04)',
                        borderRadius: '4px',
                        m: '10px 0',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(0, 0, 0, 0.16)',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: 'rgba(0, 0, 0, 0.2)',
                    },
                }}
                zIndex='10'
            >
                {openBurger && <Breadcrumbs onClose={onClose} />}
                <Flex
                    direction='column'
                    height={{ md: 'calc(100vh - 64px)', sm: '868px', base: '642px' }}
                >
                    <Flex
                        flex='1'
                        borderRadius='12px'
                        p='10px 16px 10px 10px'
                        mt={{ sm: '24px', base: '12px' }}
                        overflowY={{ sm: 'auto' }}
                        overflowX={{ sm: 'hidden' }}
                        sx={{
                            '&::-webkit-scrollbar': {
                                width: '8px',
                                borderRadius: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(0, 0, 0, 0.04)',
                                borderRadius: '4px',
                                m: '10px 0',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 0, 0, 0.16)',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(0, 0, 0, 0.2)',
                            },
                        }}
                        boxShadow={
                            openIndex !== null
                                ? {
                                      md: ' 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                      base: 'none',
                                  }
                                : 'none'
                        }
                    >
                        <Accordion
                            index={openIndex !== null ? [openIndex] : []}
                            onChange={(index) => {
                                if (Array.isArray(index)) {
                                    setOpenIndex(index[0] ?? null);
                                } else {
                                    setOpenIndex(index);
                                }
                            }}
                            allowMultiple={false}
                        >
                            {sidebarCategory?.map((section, index) => (
                                <SidebarList
                                    key={section._id}
                                    section={section}
                                    index={index}
                                    openIndex={openIndex}
                                    handleAccordionButton={handleAccordionButton}
                                    handleCategoryClick={handleCategoryClick}
                                />
                            ))}
                        </Accordion>
                    </Flex>
                    <Flex
                        flexDirection='column'
                        mt={{ md: 'auto', base: '12px' }}
                        p='0px 24px 32px 24px'
                    >
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='500'
                            fontSize='12px'
                            lineHeight='133%'
                            color='rgba(0, 0, 0, 0.24)'
                            mb='16px'
                        >
                            Версия программы 03.25
                        </Text>
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='400'
                            fontSize='12px'
                            lineHeight='133%'
                            color='rgba(0, 0, 0, 0.64)'
                            mb='16px'
                            noOfLines={3}
                            whiteSpace='wrap'
                        >
                            Все права защищены, ученический файл,
                            <br /> ©Клевер Технолоджи, 2025
                        </Text>
                        <ChakraLink
                            as={Link}
                            fontFamily='var(--font-family)'
                            fontWeight='600'
                            fontSize='12px'
                            lineHeight='133%'
                            color='#000'
                            _hover={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}
                            href=''
                        >
                            <Flex align='center' justify='flex-start'>
                                <Image src={exit} alt='exit' mr='6px' w='12px' h='12px' />
                                Выйти
                            </Flex>
                        </ChakraLink>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
