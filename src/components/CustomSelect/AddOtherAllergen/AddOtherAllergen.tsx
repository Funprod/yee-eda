import { Flex, IconButton, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';

import addAllerg from './../../../assets/addAllerg.svg';

type AddOtherAllergenProps = {
    selectedOptions?: string[];
    onChange?: (val: string[]) => void;
};
export const AddOtherAllergen = ({
    selectedOptions = [],
    onChange = () => {},
}: AddOtherAllergenProps) => {
    const [newAllergen, setNewAllergen] = useState<string>('');
    const addNewAllergen = () => {
        if (newAllergen && !selectedOptions.includes(newAllergen)) {
            onChange([...selectedOptions, newAllergen.toLocaleLowerCase()]);
            setNewAllergen('');
        }
    };
    return (
        <Flex p='8px 0' ml='24px'>
            <Input
                data-test-id='add-other-allergen'
                w='205px'
                h='32px'
                borderRadius='4px'
                value={newAllergen}
                onChange={(e) => setNewAllergen(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
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
    );
};
