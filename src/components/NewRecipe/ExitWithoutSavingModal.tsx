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

import forgot from '~/assets/Forgot.jpg';
import draftModal from '~/assets/newRecipe/draftModal.svg';
type ExitWithoutSavingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    handleExitWithoutSaving: () => void;
    handleDraftClick: () => void;
};

export const ExitWithoutSavingModal = ({
    isOpen,
    onClose,
    handleExitWithoutSaving,
    handleDraftClick,
}: ExitWithoutSavingModalProps) => (
    <>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
            <ModalContent
                data-test-id='recipe-preventive-modal'
                borderRadius='16px'
                w={{ md: '396px', base: '316px' }}
                p='0'
            >
                <ModalCloseButton
                    data-test-id='close-button'
                    border='2px solid black'
                    borderRadius='50%'
                    w='24px'
                    h='24px'
                    mt='16px'
                    mr='12px'
                />
                <Flex direction='column' align='center' h={{ md: '542px', base: '410px' }}>
                    <Image
                        src={forgot}
                        w={{ md: '206px', base: '108px' }}
                        h={{ md: '206px', base: '108px' }}
                        mt='32px'
                    />
                    <ModalHeader
                        fontWeight='700'
                        fontSize={{ md: '24px', base: '20px' }}
                        lineHeight='133%'
                        color='#000'
                        mt='32px'
                        p='0'
                    >
                        Выйти без сохранения?
                    </ModalHeader>
                    <ModalBody m='16px 32px 0 32px' p='0'>
                        <Text
                            fontWeight='400'
                            fontSize={{ md: '16px', base: '14px' }}
                            lineHeight='150%'
                            textAlign='center'
                            color='rgba(0, 0, 0, 0.64)'
                        >
                            Чтобы сохранить, нажмите кнопку сохранить черновик
                        </Text>
                    </ModalBody>

                    <ModalFooter p='0' mb='32px'>
                        <Flex direction='column' gap='16px'>
                            <Button
                                border='1px solid rgba(0, 0, 0, 0.48)'
                                borderRadius='6px'
                                w={{ md: '332px', base: '232px' }}
                                h={{ md: '48px', base: '36px' }}
                                bg='rgba(0, 0, 0, 0.92)'
                                leftIcon={<Image src={draftModal} w='11px' h='14px' />}
                                onClick={handleDraftClick}
                            >
                                <Text
                                    fontWeight='600'
                                    fontSize={{ md: '18px', base: '14px' }}
                                    lineHeight='156%'
                                    color='#fff'
                                >
                                    Сохранить черновик
                                </Text>
                            </Button>
                            <Button
                                borderRadius='6px'
                                w={{ md: '332px', base: '232px' }}
                                h={{ md: '48px', base: '36px' }}
                                bg='transparent'
                                onClick={handleExitWithoutSaving}
                            >
                                <Text
                                    fontWeight='600'
                                    fontSize={{ md: '18px', base: '14px' }}
                                    lineHeight='156%'
                                    color='#000'
                                >
                                    Выйти без сохранения
                                </Text>
                            </Button>
                        </Flex>
                    </ModalFooter>
                </Flex>
            </ModalContent>
        </Modal>
    </>
);
