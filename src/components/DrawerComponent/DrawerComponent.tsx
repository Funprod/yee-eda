import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

import { TEST_IDS } from '~/constants/testIds';
import { Category } from '~/query/services/category-api/category-api.type';

import { CustomSelect } from '../CustomSelect/CustomSelect';
import drawerClose from './../../assets/drawerClose.svg';

const meat = ['Курица', 'Свинина', 'Говядина', 'Индейка', 'Утка'];
const sideDish = [
    'Картошка',
    'Гречка',
    'Паста',
    'Спагетти',
    'Рис',
    'Капуста',
    'Фасоль',
    'Другие овощи',
];

type DrawerComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedMeat: string[];
    selectedSide: string[];
    categoriesIds: string[];
    setCategoriesIds: (val: string[]) => void;
    allergens: string[];
    handleAllergens: (val: string[]) => void;
    selectedOptions?: string[];
    onChange?: (val: string[]) => void;
    setSelectedCategory?: (val: string) => void;
    setSelectedSide?: (val: string[]) => void;
    setSelectedMeat?: (val: string[]) => void;
    selectedCategory?: string;
    filterCategory?: Category[];
};

export const DrawerComponent = ({
    isOpen,
    onClose,
    onChange = () => {},
    setSelectedCategory,
    setSelectedSide,
    setSelectedMeat,
    selectedCategory,
    selectedMeat,
    selectedSide,
    selectedOptions,
    filterCategory,
    setCategoriesIds,
    allergens,
    handleAllergens,
}: DrawerComponentProps) => {
    const [isActive, setIsActive] = useState(true);
    const [localCategory, setLocalCategory] = useState(selectedCategory);
    const [localMeat, setLocalMeat] = useState<string[]>(selectedMeat);
    const [localSide, setLocalSide] = useState<string[]>(selectedSide);
    const [localAllergens, setLocalAllergens] = useState<string[]>(selectedOptions!);
    const [categoryDisabled, setCategoryDisabled] = useState(false);
    const location = useLocation();
    const categoryFromUrl = location.pathname.split('/')[1];

    const categories = useMemo(
        () => Array.from(new Set(filterCategory?.map((item) => item.category))),
        [filterCategory],
    );

    useEffect(() => {
        if (categoryFromUrl.length > 0) setCategoryDisabled(true);
        const matchedCategory = filterCategory?.find((cat) => cat.category === categoryFromUrl);
        setLocalCategory(matchedCategory?.category);
    }, [categoryFromUrl, filterCategory]);

    const handleSetCategory = (category: string) => {
        setLocalCategory(category);
    };
    const handleSearch = () => {
        setSelectedMeat?.(localMeat);
        setSelectedSide?.(localSide);
        setSelectedCategory?.(localCategory!);
        onChange?.(localAllergens);
        onClose();
        const matched = filterCategory?.find((item) => item.category === localCategory);
        const ids = matched?.subCategories?.map((item) => item._id) || [];
        setCategoriesIds(ids);
    };

    const handleReset = () => {
        setSelectedCategory?.('');
        setSelectedMeat?.([]);
        setSelectedSide?.([]);
        setLocalAllergens([]);
        handleAllergens([]);
        setLocalMeat([]);
        setLocalSide([]);
        setLocalCategory('');
        onChange?.([]);
    };
    const isFindRecipeDisabled =
        !localSide.length && !localAllergens.length && !localCategory?.length && !localMeat?.length;

    const matchedCategoryName =
        filterCategory?.find((item) => item.category === localCategory)?.title || localCategory;

    const allFilters = [
        ...(localCategory ? [matchedCategoryName] : []),
        ...localMeat,
        ...localSide,
        ...allergens,
    ];

    return (
        <Drawer data-test-id='filter-drawer' placement='right' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay bg='rgba(255, 255, 255, 0.1)' backdropFilter='blur(2px)' />
            <DrawerContent
                maxW={{ md: '463px', base: '344px' }}
                w='100%'
                data-test-id='filter-drawer'
            >
                <Flex justify='space-between' m='32px' align='center'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%'>
                        Фильтр
                    </Text>
                    <IconButton
                        data-test-id='close-filter-drawer'
                        aria-label='Close button'
                        icon={<img src={drawerClose} />}
                        onClick={onClose}
                        bg='transparent'
                        minW='24px'
                        w='24px'
                        h='24px'
                    />
                </Flex>
                <DrawerBody
                    display='flex'
                    flexDirection='column'
                    gap='24px'
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
                >
                    <Menu>
                        <MenuButton
                            disabled={categoryDisabled}
                            textAlign='start'
                            as={Button}
                            data-test-id={TEST_IDS.filterMenuButtonCategory}
                            rightIcon={<ChevronDownIcon />}
                            bg='transparent'
                            _hover={{ bg: 'transparent' }}
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            minH='40px'
                        >
                            <Text fontWeight='400' fontSize='16px' lineHeight='150%'>
                                {filterCategory?.find((item) => item.category === localCategory)
                                    ?.title || 'Категория'}
                            </Text>
                        </MenuButton>
                        <MenuList mt='0'>
                            {categories.map((category) => {
                                const title =
                                    filterCategory?.find((item) => item.category === category)
                                        ?.title || category;
                                return (
                                    <MenuItem
                                        key={category}
                                        onClick={() => handleSetCategory(category)}
                                        minW='100%'
                                    >
                                        <Checkbox
                                            data-test-id={
                                                category === 'vegan'
                                                    ? 'checkbox-веганская кухня'
                                                    : undefined
                                            }
                                            isChecked={localCategory === category}
                                            borderColor='#b1ff2e'
                                            iconColor='black'
                                            colorScheme='green'
                                            _checked={{
                                                '& .chakra-checkbox__control': {
                                                    bg: '#b1ff2e',
                                                },
                                            }}
                                            mr='10px'
                                        >
                                            {title}
                                        </Checkbox>
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton
                            textAlign='start'
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            bg='transparent'
                            _hover={{ bg: 'transparent' }}
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            minH='40px'
                        >
                            <Text fontWeight='400' fontSize='16px' lineHeight='150%'>
                                Поиск по автору
                            </Text>
                        </MenuButton>
                    </Menu>
                    <Flex direction='column' gap='12px'>
                        <Text>Тип мяса:</Text>
                        <CheckboxGroup
                            value={localMeat}
                            colorScheme='green'
                            onChange={(newValues) => setLocalMeat(newValues as string[])}
                        >
                            <Stack direction='column'>
                                {meat.map((item) => (
                                    <Checkbox key={item} value={item}>
                                        {item}
                                    </Checkbox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    </Flex>
                    <Flex direction='column' gap='12px'>
                        <Text>Тип гарнира:</Text>
                        <CheckboxGroup
                            value={localSide}
                            colorScheme='green'
                            onChange={(newValues) => setLocalSide(newValues as string[])}
                        >
                            <Stack direction='column'>
                                {sideDish.map((item) => (
                                    <Checkbox
                                        key={item}
                                        value={item}
                                        data-test-id={
                                            item === 'Картошка' ? 'checkbox-картошка' : ''
                                        }
                                    >
                                        {item}
                                    </Checkbox>
                                ))}
                            </Stack>
                        </CheckboxGroup>
                    </Flex>
                    <Flex align='center' mt='6px' maxW='233px' w='100%'>
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='500'
                            fontSize='16px'
                            lineHeight='150%'
                            textAlign='center'
                            mr='12px'
                            whiteSpace='nowrap'
                        >
                            Исключить аллергены
                        </Text>
                        <Switch
                            data-test-id='allergens-switcher-filter'
                            mr='16px'
                            w='34px'
                            h='20px'
                            onChange={(e) => setIsActive(!e.target.checked)}
                            colorScheme='#b1ff2e'
                            _checked={{
                                bg: '#b1ff2e',
                                borderRadius: '9999px',
                            }}
                        />
                    </Flex>
                    <Flex>
                        <CustomSelect
                            isActive={isActive}
                            selectedOptions={localAllergens}
                            allFilters={[...localAllergens]}
                            isOpenDrawer={isOpen}
                            allergens={allergens}
                            handleAllergens={handleAllergens}
                        />
                    </Flex>
                    <Flex w='100%' wrap='wrap' p='12px 16px' gap='4px'>
                        {allFilters.map((item) => {
                            const cleanLabel = item?.replace(/\s*\(.*?\)\s*/g, '').trim();
                            return (
                                <Box
                                    data-test-id='filter-tag'
                                    as='span'
                                    key={item}
                                    border='1px solid #c4ff61'
                                    bg='#d7ff94'
                                    color=' #2db100'
                                    padding='0 8px'
                                    borderRadius='4px'
                                    mr='6px'
                                >
                                    {cleanLabel}
                                </Box>
                            );
                        })}
                    </Flex>
                    <Flex m='14px 0 32px  32px' gap='8px'>
                        <Button
                            data-test-id='clear-filter-button'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w={{ md: '205px', base: '146px' }}
                            h={{ md: '48px', base: '32px' }}
                            bg=' rgba(255, 255, 255, 0.06)'
                            onClick={() => handleReset()}
                        >
                            <Text
                                fontWeight='600'
                                fontSize={{ md: '18px', base: '14px' }}
                                lineHeight='156%'
                                color='rgba(0, 0, 0, 0.8)'
                            >
                                Очистить фильтр
                            </Text>
                        </Button>
                        <Button
                            data-test-id='find-recipe-button'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w={{ md: '172px', base: '121px' }}
                            h={{ md: '48px', base: '32px' }}
                            bg=' rgba(0, 0, 0, 0.92)'
                            onClick={() => handleSearch()}
                            isDisabled={isFindRecipeDisabled}
                            _disabled={{ pointerEvents: 'none', bg: 'gray' }}
                        >
                            <Text
                                fontWeight='600'
                                fontSize={{ md: '18px', base: '14px' }}
                                lineHeight='156%'
                                color='#fff'
                            >
                                Найти рецепт
                            </Text>
                        </Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
