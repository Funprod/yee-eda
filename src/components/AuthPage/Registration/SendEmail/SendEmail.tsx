import { Box, Flex, Image, ModalBody, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';

import reg from '~/assets/register.jpg';

type SendEmailProps = {
    email?: string;
};

export const SendEmail = ({ email }: SendEmailProps) => (
    <Flex direction='column' align='center' gap='32px' h='550px'>
        <Image
            src={reg}
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
                Остался последний шаг. Нужно верифицировать ваш e-mail
            </ModalHeader>
            <ModalBody m='16px 32px 0 32px' p='0'>
                <Text
                    fontWeight='400'
                    fontSize='16px'
                    lineHeight='150%'
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.92)'
                >
                    Мы отправили вам на почту <b>{email}</b> <br />
                    ссылку для верификации.
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
            whiteSpace={{ md: 'normal', base: 'pre-line' }}
        >
            Не пришло письмо? {'\n'} Проверьте папку Спам.
            <br />
            По другим вопросам свяжитесь с поддержкой.
        </ModalFooter>
    </Flex>
);
