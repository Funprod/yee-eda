import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { Category } from '~/query/services/category-api/category-api.type';

import { FormData } from '../NewRecipe';

type SelectTagsProps = {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    setValue: UseFormSetValue<FormData>;
    errors: FieldErrors<FormData>;
    isSubmitted: boolean;
    values?: string[];
    subCategory: Category[];
};

export const SelectTags = React.memo(
    ({ setValue, errors, isSubmitted, values, subCategory }: SelectTagsProps) => {
        const [selected, setSelected] = useState<Category[]>([]);
        const visibleCount = useBreakpointValue({ base: 1, md: 2 }) || 2;
        const handleSelect = (item: Category) =>
            setSelected((prev) =>
                prev.some((i) => i._id === item._id)
                    ? prev.filter((i) => i.title !== item.title)
                    : [...prev, item],
            );

        useEffect(() => {
            setValue(
                'categoriesIds',
                selected.map((i) => i._id),
                { shouldValidate: true },
            );
        }, [selected, setValue]);

        useEffect(() => {
            if (values && values.length && subCategory.length) {
                const editSelected = subCategory.filter((item: Category) =>
                    values.includes(item._id),
                );
                setSelected(editSelected);
            }
        }, [values, subCategory]);

        return (
            <Flex
                align='center'
                w={{ lg: '668px', md: '575px', sm: '480px', base: '328px' }}
                h='40px'
                justify={{ lg: 'space-between', md: 'flex-start', base: 'space-between' }}
                gap={{ lg: '0', md: '24px' }}
            >
                <Text
                    fontWeight='600'
                    fontSize={{ md: '16px', base: '14px' }}
                    lineHeight='150%'
                    w={{ lg: '100%', md: '200px', base: '116px' }}
                >
                    Выберите не менее 3-х тегов
                </Text>
                <Menu closeOnSelect={false}>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                data-test-id='recipe-categories'
                                as={Button}
                                rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                maxW={{ md: '350px', sm: '232px', base: '196px' }}
                                w='100%'
                                h='40px'
                                bg='transparent'
                                border={
                                    isSubmitted && errors.categoriesIds
                                        ? '2px solid #E53E3E'
                                        : '1px solid rgba(0, 0, 0, 0.08)'
                                }
                                borderRadius='6px'
                                textAlign='left'
                            >
                                {selected.length > 0 ? (
                                    <Flex align='center'>
                                        {selected.slice(0, visibleCount).map((item) => {
                                            const selectItem = item.title
                                                .replace(/\s*\(.*?\)\s*/g, '')
                                                .trim();
                                            return (
                                                <Box
                                                    as='span'
                                                    key={item._id}
                                                    border='1px solid #c4ff61'
                                                    padding='0 8px'
                                                    borderRadius='4px'
                                                    mr='6px'
                                                >
                                                    <Text
                                                        fontWeight='500'
                                                        fontSize='12px'
                                                        lineHeight='133%'
                                                        color='#2db100'
                                                    >
                                                        {selectItem}
                                                    </Text>
                                                </Box>
                                            );
                                        })}
                                        {selected.length > visibleCount && (
                                            <Box
                                                as='span'
                                                border='1px solid #c4ff61'
                                                padding='0 8px'
                                                borderRadius='4px'
                                                h='18px'
                                            >
                                                <Text
                                                    fontWeight='500'
                                                    fontSize='12px'
                                                    lineHeight='133%'
                                                    color='#2db100'
                                                >
                                                    +{selected.length - visibleCount}
                                                </Text>
                                            </Box>
                                        )}
                                    </Flex>
                                ) : (
                                    <Text
                                        fontWeight='400'
                                        fontSize='16px'
                                        lineHeight='150%'
                                        color='#2d3748'
                                        overflow='hidden'
                                        textOverflow='ellipsis'
                                        whiteSpace='nowrap'
                                        maxW='100%'
                                    >
                                        Выберите из списка...
                                    </Text>
                                )}
                            </MenuButton>
                            <MenuList
                                w={{ md: '350px', sm: '232px', base: '196px' }}
                                maxH={{ md: '442px', base: '360px' }}
                                overflowY='auto'
                            >
                                {subCategory.map((item: Category, i) => (
                                    <MenuItem
                                        key={item._id}
                                        p='0'
                                        onClick={() => handleSelect(item)}
                                    >
                                        <Box
                                            display='flex'
                                            alignItems='center'
                                            w='100%'
                                            bg={i % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : 'transparent'}
                                            p='8px 12px'
                                        >
                                            <Checkbox
                                                isChecked={selected.some((i) => i._id === item._id)}
                                                borderColor='#b1ff2e'
                                                onChange={() => handleSelect(item)}
                                                iconColor='black'
                                                colorScheme='green'
                                                _checked={{
                                                    '& .chakra-checkbox__control': {
                                                        bg: '#b1ff2e',
                                                    },
                                                }}
                                                mr='10px'
                                            />
                                            <Text
                                                userSelect='none'
                                                fontWeight='400'
                                                fontSize='12px'
                                                lineHeight='143%'
                                            >
                                                {item.title}
                                            </Text>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Flex>
        );
    },
);
