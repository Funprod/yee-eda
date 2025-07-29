import { Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router';

import arrowRight from '~/assets/main/icon/arrowRight.svg';

import { DeleteAccountModal } from './DeleteAccountModal/DeleteAccountModal';
export const SettingsFooter = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex direction='column' gap='40px'>
                <Flex direction='column' gap='16px'>
                    <Text fontWeight='700' fontSize='20px' lineHeight='140%'>
                        О проекте
                    </Text>
                    <Flex gap='6px'>
                        <Text fontWeight='500' fontSize='16px' lineHeight='150%'>
                            Связаться с <Link to='https://clevertec.ru/'>разработчиками</Link>
                        </Text>
                        <Image src={arrowRight} />
                    </Flex>
                </Flex>
                <Flex direction='column' gap='16px'>
                    <Text fontWeight='700' fontSize='20px' lineHeight='140%'>
                        Удаление аккаунта
                    </Text>
                    <Button
                        w='192px'
                        bg='transparent'
                        rightIcon={<Image src={arrowRight} />}
                        fontWeight='500'
                        fontSize='16px'
                        lineHeight='150%'
                        onClick={onOpen}
                    >
                        Удалить мой аккаунт
                    </Button>
                </Flex>
            </Flex>
            <DeleteAccountModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
