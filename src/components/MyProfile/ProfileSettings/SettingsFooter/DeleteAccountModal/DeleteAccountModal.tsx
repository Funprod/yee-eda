import {
    Button,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import Forgot from '~/assets/Forgot.jpg';
import { ROUTES } from '~/constants/routes';
import { useDeleteProfileMutation } from '~/query/services/profile-api/profile-api';

type DeleteAccountModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
    const [deleteProfile] = useDeleteProfileMutation();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteProfile().unwrap();
            onClose();
            navigate(ROUTES.AUTH);
        } catch {
            return;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                w={{ md: '396px', base: '316px' }}
                h={{ md: '646px', base: '628px' }}
                borderRadius='16px'
                p='26px'
                m='0'
            >
                <ModalHeader pt='0' pb='0'>
                    <Flex direction='column' align='center' gap='32px'>
                        <Image
                            src={Forgot}
                            w={{ md: '206px', base: '108px' }}
                            h={{ md: '206px', base: '108px' }}
                        />
                        <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                            Действительно хотите удалить свой аккаунт?
                        </Text>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton
                    border='2px solid black'
                    borderRadius='50%'
                    w='24px'
                    h='24px'
                    mt='16px'
                    mr='12px'
                />
                <ModalBody mt='16px' p='0'>
                    <Flex direction='column' align='center' gap='16px'>
                        <Text
                            fontWeight='400'
                            fontSize='16px'
                            lineHeight='150%'
                            textAlign='center'
                            color='rgba(0, 0, 0, 0.64)'
                        >
                            Если вы удалите аккаунт, вы больше не сможете всеми функциями сервиса,
                            которые вы использовали.
                        </Text>
                        <Text
                            fontWeight='400'
                            fontSize='16px'
                            lineHeight='150%'
                            textAlign='center'
                            color='rgba(0, 0, 0, 0.64)'
                        >
                            Мы удалим все ваши опубликованные рецепты и записи в блоге.
                        </Text>
                    </Flex>
                </ModalBody>
                <ModalFooter mt='32px' p='0'>
                    <Flex direction='column' align='center' gap='32px'>
                        <Button
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w={{ md: '332px', base: '252px' }}
                            h='48px'
                            bg='rgba(0, 0, 0, 0.92)'
                            fontWeight='600'
                            fontSize='18px'
                            lineHeight='156%'
                            color='#fff'
                            onClick={handleDelete}
                        >
                            Удалить мой аккаунт
                        </Button>
                        <Text
                            fontWeight='400'
                            fontSize='12px'
                            lineHeight='150%'
                            textAlign='center'
                            color='rgba(0, 0, 0, 0.64)'
                            whiteSpace='nowrap'
                        >
                            Остались вопросы? Свяжитесь с поддержкой
                        </Text>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
