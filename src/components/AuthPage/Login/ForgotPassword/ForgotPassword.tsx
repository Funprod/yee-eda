import {
    Button,
    Flex,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';

import { Code } from './Code/Code';
import { Email } from './Email/Email';
import { Reset } from './Reset/Reset';

const testIdMap: Record<string, string> = {
    email: 'send-email-modal',
    code: 'verification-code-modal',
    reset: 'reset-credentials-modal',
};

type ForgotPasswordProps = {
    setSuccess: (value: 'email' | 'reset' | null) => void;
};

export const ForgotPassword = ({ setSuccess }: ForgotPasswordProps) => {
    const isLoading = useSelector((state: ApplicationState) => state.app.isLoading);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
    const [email, setEmail] = useState<string>('');

    const handleCloseButton = () => {
        setStep('email');
    };
    return (
        <Flex>
            <Text fontWeight='600' fontSize='16px' lineHeight='150%' mt='16px'>
                <Button
                    data-test-id='forgot-password'
                    bg='transparent'
                    p='0'
                    _hover={{ bg: 'transparent' }}
                    onClick={onOpen}
                >
                    Забыли логин или пароль?
                </Button>
            </Text>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay p='0' />
                <ModalContent
                    data-test-id={testIdMap[step] || ''}
                    borderRadius='16px'
                    w={{ md: '396px', base: '316px' }}
                    p='0'
                    filter={isLoading ? 'blur(2px)' : 'none'}
                    transition='filter 0.2s ease-out'
                >
                    <ModalCloseButton
                        data-test-id='close-button'
                        border='2px solid black'
                        borderRadius='50%'
                        w='24px'
                        h='24px'
                        mt='16px'
                        mr='12px'
                        onClick={handleCloseButton}
                    />
                    {step === 'email' && <Email setStep={setStep} setEmail={setEmail} />}
                    {step === 'code' && <Code setStep={setStep} email={email} />}
                    {step === 'reset' && (
                        <Reset email={email} setSuccess={setSuccess} onClose={onClose} />
                    )}
                </ModalContent>
            </Modal>
        </Flex>
    );
};
