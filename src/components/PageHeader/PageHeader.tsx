import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Spinner,
    Switch,
    Text,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { Category } from '~/query/services/category-api/category-api.type';

import { CustomSelect } from '../CustomSelect/CustomSelect';
import { DrawerComponent } from '../DrawerComponent/DrawerComponent';
import filterIcon from './../../assets/main/icon/filter.svg';

type PageHeaderProps = {
    searchResultsCount: number;
    title: string;
    selectedOptions: string[];
    onChange: (val: string[]) => void;
    setSelectedCategory: (val: string) => void;
    setSelectedSide: (val: string[]) => void;
    setSelectedMeat: (val: string[]) => void;
    selectedCategory: string;
    selectedMeat: string[];
    selectedSide: string[];
    setSearchQuery: (val: string) => void;
    searchQuery: string;
    isLoading: boolean;
    categoriesIds: string[];
    setCategoriesIds: (val: string[]) => void;
    filterCategory: Category[];
    description?: string;
};

export const PageHeader = ({
    title,
    description,
    selectedOptions,
    onChange,
    setSelectedCategory,
    setSelectedSide,
    setSelectedMeat,
    selectedCategory,
    selectedMeat = [],
    selectedSide = [],
    setSearchQuery,
    filterCategory,
    categoriesIds,
    setCategoriesIds,
    isLoading,
    searchQuery,
    searchResultsCount,
}: PageHeaderProps) => {
    const [text, setText] = useState('');
    const [isActive, setIsActive] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isFound, setIsFound] = useState<boolean | null>(null);
    const [allergens, setAllergens] = useState<string[]>([]);
    const handleSearch = () => {
        setSearchQuery?.(text);
        onChange?.(allergens);
    };

    const handleClear = () => {
        setSearchQuery?.('');
        setText('');
        setIsFound(null);
        onChange?.(allergens);
        setAllergens([]);
    };

    const handleToggle = () => {
        setIsActive(!isActive);
        setAllergens([]);
    };

    useEffect(() => {
        if (!searchQuery) {
            setIsFound(null);
            return;
        }
        setIsFound(searchResultsCount! > 0);
    }, [searchResultsCount, searchQuery]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setIsFound(null);
    };
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (text.length >= 3 || allergens.length > 0) {
                handleSearch();
            }
        }
    };

    const isLargerThanMd = useBreakpointValue({ base: false, sm: true });

    return (
        <Flex
            direction='column'
            width='100%'
            align={{ sm: 'center', base: 'stretch' }}
            pt={{ md: '32px', base: '16px' }}
            zIndex='10'
            bg='#fff'
        >
            <Text
                textAlign='center'
                fontFamily='var(--font-family)'
                fontWeight='700'
                fontSize={{ md: '48px', base: '24px' }}
                lineHeight='133%'
            >
                {title}
            </Text>
            {isLoading ? (
                <Flex justify='center' mt='12px' data-test-id='loader-search-block'>
                    <Spinner size='md' color='green.400' />
                </Flex>
            ) : (
                <>
                    {description && (
                        <Box w={{ sm: '700px', base: '328px' }} mt={{ md: '12px', base: '16px' }}>
                            <Text
                                fontWeight='500'
                                fontSize={{ md: '16px', base: '14px' }}
                                lineHeight='150%'
                                textAlign='center'
                                color='rgba(0, 0, 0, 0.48)'
                            >
                                {description}
                            </Text>
                        </Box>
                    )}
                    <Flex mt={{ md: '32px', base: '16px' }} gap={{ md: '12px', base: '8px' }}>
                        <Button
                            data-test-id='filter-button'
                            bg='transparent'
                            w={{ md: '48px', base: '32px' }}
                            minW='0'
                            h={{ md: '48px', base: '32px' }}
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            borderRadius='6px'
                            p={{ md: '0 12px', base: '0' }}
                            onClick={() => onOpen()}
                        >
                            <Image
                                src={filterIcon}
                                alt='filter'
                                w={{ md: '24px', base: '14px' }}
                                h={{ md: '24px', base: '14px' }}
                            />
                        </Button>
                        <Box
                            position='relative'
                            w={{ md: '458px', sm: '404px', base: '284px' }}
                            h={{ md: '48px', base: '32px' }}
                        >
                            <InputGroup w='100%' h='100%'>
                                <Input
                                    data-test-id='search-input'
                                    placeholder='Название или ингредиент...'
                                    value={text}
                                    w='100%'
                                    h='100%'
                                    onChange={handleOnChange}
                                    onKeyDown={handleKeyDown}
                                    border={`1px solid ${isFound === null ? 'rgba(0, 0, 0, 0.48)' : isFound ? 'green' : 'red'}`}
                                    borderRadius='6px'
                                    fontSize={{ base: '14px', md: '18px' }}
                                    fontWeight='400'
                                    sx={{
                                        '::placeholder': {
                                            color: '#134b00',
                                        },
                                    }}
                                />
                                <InputRightElement width='4.5rem'>
                                    <IconButton
                                        data-test-id='search-button'
                                        disabled={text.length < 3 && allergens.length < 1}
                                        onClick={() => handleSearch()}
                                        position='absolute'
                                        top={{ md: '5px', base: '-5px' }}
                                        right={{ md: '5px', base: '0' }}
                                        aria-label='Search database'
                                        icon={<SearchIcon />}
                                        bg='transparent'
                                        _hover={{ bg: 'transparent' }}
                                        _disabled={{ pointerEvents: 'none' }}
                                    />
                                    {text.length > 0 && (
                                        <IconButton
                                            onClick={() => handleClear()}
                                            position='absolute'
                                            top={{ md: '5px', base: '-5px' }}
                                            right={{ md: '30px', base: '25px' }}
                                            aria-label='Search database'
                                            icon={<CloseIcon w='10px' h='10px' />}
                                            bg='transparent'
                                            _hover={{ bg: 'transparent' }}
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    </Flex>
                    {isLargerThanMd && (
                        <Flex align='flex-start' mt='16px' maxW='518px' w='100%'>
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
                                    data-test-id='allergens-switcher'
                                    mr='16px'
                                    w='34px'
                                    h='20px'
                                    onChange={() => handleToggle()}
                                    colorScheme='#b1ff2e'
                                    _checked={{
                                        bg: '#b1ff2e',
                                        borderRadius: '9999px',
                                    }}
                                />
                            </Flex>
                            {!isOpen ? (
                                <CustomSelect
                                    isActive={!!isActive}
                                    selectedOptions={selectedOptions}
                                    allFilters={[...(selectedOptions as string[])]}
                                    isOpenDrawer={isOpen}
                                    allergens={allergens}
                                    handleAllergens={setAllergens}
                                />
                            ) : (
                                <Select
                                    color='rgba(0, 0, 0, 0.64)'
                                    placeholder='Выберите из списка...'
                                    _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
                                />
                            )}
                        </Flex>
                    )}
                </>
            )}
            {isOpen && (
                <DrawerComponent
                    isOpen={isOpen}
                    onClose={onClose}
                    selectedOptions={selectedOptions}
                    onChange={onChange}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSide={setSelectedSide}
                    setSelectedMeat={setSelectedMeat}
                    selectedCategory={selectedCategory}
                    selectedMeat={selectedMeat}
                    selectedSide={selectedSide}
                    filterCategory={filterCategory}
                    categoriesIds={categoriesIds!}
                    setCategoriesIds={setCategoriesIds!}
                    allergens={allergens}
                    handleAllergens={setAllergens}
                />
            )}
        </Flex>
    );
};
