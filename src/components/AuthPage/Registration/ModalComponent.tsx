import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';

import { NotSuccess } from './NotSuccess/NotSuccess';
import { FormData } from './Registration';
import { Repeat } from './Repeat/Repeat';
import { SendEmail } from './SendEmail/SendEmail';

const TEST_ID_MAP = {
    health: 'sign-in-error-modal',
    sendEmail: 'sign-up-success-modal',
    notSuccess: 'email-verification-failed-modal',
};

type ModalComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    authModal: 'sendEmail' | 'notSuccess' | 'health';
    formData: Partial<FormData>;
    setRepeatLogin?: (value: boolean) => void;
};

export const ModalComponent = ({
    isOpen,
    onClose,
    formData,
    authModal,
    setRepeatLogin,
}: ModalComponentProps) => {
    const testId = TEST_ID_MAP[authModal] || '';
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay p='0' />
                <ModalContent
                    data-test-id={testId}
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
                    {authModal === 'notSuccess' && <NotSuccess />}
                    {authModal === 'sendEmail' && <SendEmail email={formData?.email} />}
                    {authModal === 'health' && (
                        <Repeat onClose={onClose} setRepeatLogin={setRepeatLogin} />
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
