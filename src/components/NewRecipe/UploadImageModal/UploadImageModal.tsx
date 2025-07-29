import {
    Box,
    Button,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import uploadImg from '~/assets/newRecipe/uploadImg.svg';
import { useUploadFileMutation } from '~/query/services/uploadFile-api/uploadFile-api';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import { FormData } from '../NewRecipe';

type UploadImageModalProps = {
    setValue: UseFormSetValue<FormData>;
    value: 'image' | `steps.${number}.image`;
    onClose: () => void;
    isOpen: boolean;
    imageValue: string | null;
    index?: number;
};

export const UploadImageModal = ({
    setValue,
    value,
    onClose,
    isOpen,
    imageValue,
    index,
}: UploadImageModalProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [uploadFile, { data }] = useUploadFileMutation();

    useEffect(() => {
        if (data) {
            setValue(value, data.url, { shouldValidate: true });
            onClose();
        }
    }, [data, onClose, setValue, value]);

    const handleImageUpload = async () => {
        if (file) {
            try {
                await uploadFile(file);
                setPreview(imageValue && getFullMediaUrl(imageValue));
            } catch {
                onClose();
            }
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
            e.target.value = '';
        }
    };
    const handleDeleteButton = () => {
        setFile(null);
        setPreview(null);
        onClose();
        setValue(value, '');
    };

    const getImageSrc = () => {
        if (preview) return preview;
        if (typeof imageValue === 'string') return getFullMediaUrl(imageValue);
        return '';
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0, 0, 0, 0.16)' />
            <ModalContent
                data-test-id='recipe-image-modal'
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
                <Flex direction='column' align='center' m='32px'>
                    <ModalHeader
                        fontWeight='700'
                        fontSize='24px'
                        lineHeight='133%'
                        textAlign='center'
                        m='0 32px'
                        p='0'
                    >
                        Изображение
                    </ModalHeader>
                    <ModalBody m='32px 32px 0 32px' p='0'>
                        <Text
                            fontWeight='400'
                            fontSize='16px'
                            lineHeight='150%'
                            textAlign='center'
                            color='rgba(0, 0, 0, 0.64)'
                        >
                            <Input
                                data-test-id={
                                    value === 'image'
                                        ? 'recipe-image-block-input-file'
                                        : `recipe-steps-image-block-${index}-input-file`
                                }
                                type='file'
                                accept='image/*'
                                style={{ display: 'none' }}
                                ref={inputRef}
                                onChange={handleFileChange}
                            />
                            <Box
                                onClick={() => inputRef.current?.click()}
                                cursor='pointer'
                                borderRadius='8px'
                                width={{ md: '206px', base: '108px' }}
                                height={{ md: '206px', base: '108px' }}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                overflow='hidden'
                                bg='rgba(0, 0, 0, 0.08)'
                            >
                                {preview || imageValue ? (
                                    <Image
                                        data-test-id='recipe-image-modal-preview-image'
                                        src={getImageSrc()}
                                        alt='preview'
                                        objectFit='cover'
                                        width='100%'
                                        height='100%'
                                    />
                                ) : (
                                    <Image src={uploadImg} alt='placeholder' />
                                )}
                            </Box>
                        </Text>
                    </ModalBody>

                    <ModalFooter mt='32px' p='0'>
                        {(file || imageValue) && (
                            <Flex direction='column' gap='16px'>
                                <Button
                                    border='1px solid rgba(0, 0, 0, 0.08)'
                                    borderRadius='6px'
                                    w={{ md: '332px', base: '232px' }}
                                    h={{ md: '48px', base: '36px' }}
                                    bg='rgba(0, 0, 0, 0.92)'
                                    color='#fff'
                                    fontWeight='600'
                                    fontSize='18px'
                                    lineHeight='156%'
                                    onClick={handleImageUpload}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    borderRadius='6px'
                                    w={{ md: '332px', base: '232px' }}
                                    h={{ md: '48px', base: '36px' }}
                                    bg='transparent'
                                    color='#000'
                                    fontWeight='600'
                                    fontSize='18px'
                                    lineHeight='156%'
                                    onClick={handleDeleteButton}
                                >
                                    Удалить
                                </Button>
                            </Flex>
                        )}
                    </ModalFooter>
                </Flex>
            </ModalContent>
        </Modal>
    );
};
