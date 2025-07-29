import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    IconButton,
    Image,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import addAllerg from './../../assets/addAllerg.svg';

const options = [
    'Молочные продукты',
    'Яйцо',
    'Рыба',
    'Моллюски',
    'Орехи',
    'Томат (помидор)',
    'Цитрусовые',
    'Клубника (ягоды)',
    'Шоколад',
];

type CustomSelectProps = {
    isActive: boolean;
    allergens: string[];
    handleAllergens: (val: string[]) => void;
    selectedOptions?: string[];
    allFilters?: string[];
    isOpenDrawer?: boolean;
};

export const CustomSelect = ({
    isActive,
    isOpenDrawer,
    allergens,
    handleAllergens,
}: CustomSelectProps) => {
    const [newAllergen, setNewAllergen] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const handleToggle = useCallback(
        (option: string) => {
            const updated = allergens.includes(option)
                ? allergens.filter((item: string) => item !== option)
                : [...allergens, option];

            handleAllergens(updated);
        },
        [allergens, handleAllergens],
    );
    const addNewAllergen = () => {
        if (newAllergen.trim() && !allergens.includes(newAllergen.trim())) {
            handleAllergens([...allergens, newAllergen.trim()]);
            setNewAllergen('');
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [handleToggle]);
    return (
        <Flex maxW='400px' w='100%' h='auto'>
            <Menu
                closeOnSelect={false}
                modifiers={
                    !isOpenDrawer
                        ? [
                              {
                                  name: 'preventOverflow',
                                  options: {
                                      mainAxis: false,
                                  },
                              },
                              {
                                  name: 'flip',
                                  options: {
                                      fallbackPlacements: [],
                                  },
                              },
                          ]
                        : []
                }
            >
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            as={Button}
                            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            data-test-id={
                                isOpenDrawer
                                    ? 'allergens-menu-button-filter'
                                    : 'allergens-menu-button'
                            }
                            isDisabled={isActive}
                            maxW='400px'
                            w='100%'
                            minH='auto'
                            height='auto'
                            textOverflow='ellipsis'
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            position='relative'
                            bg='transparent'
                            border={!isActive ? '1px solid #c4ff61' : '1px solid gray'}
                            p='0 12px 0 0'
                        >
                            <Flex
                                w='182px'
                                wrap='wrap'
                                overflow='hidden'
                                as='span'
                                p='12px 16px'
                                gap='4px'
                                color={allergens.length > 0 ? 'green' : 'rgba(0, 0, 0, 0.64)'}
                                fontSize={allergens.length > 0 ? '12px' : '16px'}
                                fontWeight={allergens.length > 0 ? '500' : '400'}
                            >
                                {allergens.length > 0 ? (
                                    allergens.map((item) => {
                                        const cleanLabel = item
                                            .replace(/\s*\(.*?\)\s*/g, '')
                                            .trim();
                                        return (
                                            <Box
                                                as='span'
                                                key={item}
                                                border='1px solid #c4ff61'
                                                padding='0 8px'
                                                borderRadius='4px'
                                                mr='6px'
                                            >
                                                {cleanLabel}
                                            </Box>
                                        );
                                    })
                                ) : (
                                    <Text>Выберите из списка...</Text>
                                )}
                            </Flex>
                        </MenuButton>

                        <MenuList
                            data-test-id='allergens-menu'
                            maxH='336px'
                            overflowY='hidden'
                            maxW={{ md: '400px', base: '200px' }}
                            w='100%'
                            minW='284px'
                            p='0'
                        >
                            {options.map((option, i) => (
                                <MenuItem
                                    key={option}
                                    bg={i % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : 'transparent'}
                                    height='32px'
                                    p={0}
                                >
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        w='100%'
                                        p='8px 12px'
                                        onClick={() => handleToggle(option)}
                                    >
                                        <Checkbox
                                            isChecked={allergens.includes(option)}
                                            onChange={() => handleToggle(option)}
                                            borderColor='#b1ff2e'
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
                                            data-test-id={`allergen-${i}`}
                                            fontWeight='400'
                                            fontSize='12px'
                                            lineHeight='143%'
                                        >
                                            {option}
                                        </Text>
                                    </Box>
                                </MenuItem>
                            ))}

                            <Flex p='8px 16px' align='center'>
                                <Input
                                    ref={inputRef}
                                    data-test-id='add-other-allergen'
                                    w='100%'
                                    h='32px'
                                    borderRadius='4px'
                                    value={newAllergen}
                                    onChange={(e) => setNewAllergen(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addNewAllergen();
                                        }
                                    }}
                                    border='1px solid rgba(0, 0, 0, 0.08)'
                                />
                                <IconButton
                                    data-test-id='add-allergen-button'
                                    ml='10px'
                                    p='0'
                                    icon={<Image src={addAllerg} w='26px' h='26px' />}
                                    size='sm'
                                    variant='link'
                                    onClick={addNewAllergen}
                                    aria-label='Добавить аллерген'
                                />
                            </Flex>
                        </MenuList>
                    </>
                )}
            </Menu>
        </Flex>
    );
};
