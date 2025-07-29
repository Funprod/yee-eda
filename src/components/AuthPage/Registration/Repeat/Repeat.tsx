import {
    Button,
    Flex,
    Image,
    LinkBox,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Text,
} from '@chakra-ui/react';

import forgot from '~/assets/Forgot.jpg';

type RepeatProps = {
    onClose: () => void;
    setRepeatLogin?: (value: boolean) => void;
};

export const Repeat = ({ onClose, setRepeatLogin }: RepeatProps) => {
    const handleRepeat = () => {
        setRepeatLogin?.(true);
        onClose();
    };
    return (
        <Flex direction='column' align='center' gap='32px' h={{ md: '478px', base: '380px' }}>
            <Image
                src={forgot}
                w={{ md: '206px', base: '108px' }}
                h={{ md: '206px', base: '108px' }}
                mt='32px'
            />
            <LinkBox>
                <ModalHeader
                    fontWeight='700'
                    fontSize='24px'
                    lineHeight='133%'
                    textAlign='center'
                    m='0 32px'
                    p='0'
                >
                    Вход не выполнен
                </ModalHeader>
                <ModalBody m='16px 32px 0 32px' p='0'>
                    <Text
                        fontWeight='400'
                        fontSize='16px'
                        lineHeight='150%'
                        textAlign='center'
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        Что-то пошло не так. <br /> Попробуйте еще раз
                    </Text>
                </ModalBody>
            </LinkBox>

            <ModalFooter
                display='flex'
                p='0'
                m='0 32px'
                fontWeight='400'
                fontSize='12px'
                lineHeight='133%'
                color='rgba(0, 0, 0, 0.48)'
                textAlign='center'
            >
                <Button
                    data-test-id='repeat-button'
                    w={{ md: '332px', base: '252px' }}
                    h='48px'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    borderRadius='6px'
                    bg='rgba(0, 0, 0, 0.92)'
                    _hover={{
                        bg: 'rgba(0, 0, 0, 0.7)',
                    }}
                    color='#fff'
                    onClick={handleRepeat}
                >
                    Повторить
                </Button>
            </ModalFooter>
        </Flex>
    );
};
