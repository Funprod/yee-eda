import { Box, Flex, Image, ModalBody, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';

import success from '~/assets/notSuccess.jpg';

export const NotSuccess = () => (
    <Flex direction='column' align='center' gap='32px' h={{ md: '470px', base: '410px' }}>
        <Image
            src={success}
            w={{ md: '206px', base: '108px' }}
            h={{ md: '206px', base: '108px' }}
            mt='32px'
        />
        <Box>
            <ModalHeader
                fontWeight='700'
                fontSize='24px'
                lineHeight='133%'
                textAlign='center'
                m='0 32px'
                p='0'
            >
                Упс! Что-то пошло не так
            </ModalHeader>
            <ModalBody m='16px 32px 0 32px' p='0'>
                <Text
                    fontWeight='400'
                    fontSize='16px'
                    lineHeight='150%'
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.64)'
                >
                    Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                    снова.
                </Text>
            </ModalBody>
        </Box>

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
            Остались вопросы? Свяжитесь с поддержкой
        </ModalFooter>
    </Flex>
);
