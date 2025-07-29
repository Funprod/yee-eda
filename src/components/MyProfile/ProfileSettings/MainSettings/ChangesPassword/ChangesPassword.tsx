import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useUpdatePasswordMutation } from '~/query/services/users-api/users-api';
import { isFetchBaseQueryErrorWithMessage } from '~/utils/isFetchBaseQueryError';

import { FormChangesPassword } from './FormChangesPassword/FormChangesPassword';

export type ChangePasswordFormData = {
    password: string;
    newPassword: string;
    confirmPassword: string;
};

export const ChangesPassword = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        formState: { errors },
    } = useForm<ChangePasswordFormData>();

    const [updatePassword] = useUpdatePasswordMutation();
    const onSubmit = async (data: ChangePasswordFormData) => {
        try {
            await updatePassword(data).unwrap();
            reset();
            onClose();
        } catch (error) {
            if (isFetchBaseQueryErrorWithMessage(error)) {
                if (error.data.message === 'Не верный пароль') {
                    setError('password', { type: 'manual' });
                }
            }
        }
    };
    return (
        <>
            <Button
                onClick={onOpen}
                fontWeight='600'
                fontSize='18px'
                lineHeight='156%'
                w='168px'
                h='48px'
                bg='transparent'
            >
                Сменить пароль
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                    w={{ md: '396px', base: '316px' }}
                    h='512px'
                    borderRadius='16px'
                    p='32px'
                    m='0'
                >
                    <ModalHeader
                        fontWeight='700'
                        fontSize='24px'
                        lineHeight='133%'
                        textAlign='center'
                        pt='0'
                        pb='0'
                    >
                        Сменить пароль
                    </ModalHeader>
                    <ModalCloseButton
                        border='2px solid black'
                        borderRadius='50%'
                        w='24px'
                        h='24px'
                        mt='16px'
                        mr='12px'
                    />
                    <ModalBody display='flex' justifyContent='center' mt='24px' p='0'>
                        <FormChangesPassword
                            errors={errors}
                            register={register}
                            watch={watch}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                        />
                    </ModalBody>
                    <ModalFooter mt='32px' p='0'>
                        <Button
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w='332px'
                            h='48px'
                            bg='rgba(0, 0, 0, 0.92)'
                            onClick={handleSubmit(onSubmit)}
                            fontWeight='600'
                            fontSize='18px'
                            lineHeight='156%'
                            color='#fff'
                        >
                            Сохранить пароль
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
