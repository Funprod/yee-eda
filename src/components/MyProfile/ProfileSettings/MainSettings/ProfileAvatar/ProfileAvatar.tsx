import {
    Avatar,
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
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import IconUploadAva from '~/assets/IconUploadAva.svg';
import { useUpdatePhotoMutation } from '~/query/services/users-api/users-api';
import { GetMeResponse } from '~/query/services/users-api/users-api.type';
import { getCroppedImg } from '~/utils/cropImage';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

type ProfileAvatarProps = {
    profileData: GetMeResponse;
};

export const ProfileAvatar = ({ profileData }: ProfileAvatarProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [preview, setPreview] = useState<string | null>(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const [updatePhoto] = useUpdatePhotoMutation();

    const showCroppedImage = useCallback(async () => {
        if (!preview || !croppedAreaPixels) return;

        const croppedImageUrl = await getCroppedImg(preview, croppedAreaPixels);
        const response = await fetch(croppedImageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'croppedImage.jpg', { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('file', file);

        await updatePhoto(formData).unwrap();
        setPreview(croppedImageUrl);
        onClose();
    }, [preview, croppedAreaPixels, updatePhoto, onClose]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
            e.target.value = '';
            onOpen();
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setPreview(null);
            setCroppedAreaPixels(null);
        }
    }, [isOpen]);
    const [isDesktop] = useMediaQuery(`(min-width: 1024px)`);

    return (
        <>
            <Flex justify={{ md: 'flex-start', base: 'center' }}>
                <Box
                    position='relative'
                    w={{ md: '128px', base: '96px' }}
                    h={{ md: '128px', base: '96px' }}
                >
                    <Avatar
                        name={`${profileData.firstName} ${profileData.lastName}`}
                        src={getFullMediaUrl(profileData.photoLink)}
                        w={{ md: '128px', base: '96px' }}
                        h={{ md: '128px', base: '96px' }}
                    />
                    <Input
                        type='file'
                        accept='image/*'
                        style={{ display: 'none' }}
                        ref={inputRef}
                        onChange={handleFileChange}
                    />
                    <Box
                        position='absolute'
                        bottom='4px'
                        right='4px'
                        onClick={() => inputRef.current?.click()}
                        cursor='pointer'
                        borderRadius='8px'
                        w='24px'
                        h='24px'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        overflow='hidden'
                        bg='rgba(0, 0, 0, 0.08)'
                    >
                        <Image src={IconUploadAva} alt='placeholder' />
                    </Box>
                </Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent
                    w={{ md: '396px', base: '316px' }}
                    h={{ md: '446px', base: '348px' }}
                    borderRadius='16px'
                    p='0'
                    m='0'
                >
                    <ModalHeader
                        fontWeight='700'
                        fontSize='24px'
                        lineHeight='133%'
                        textAlign='center'
                        p={{ base: '32px 18px 0 18px', md: '32px 32px 0 32px' }}
                    >
                        <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                            Изменить изображение профиля
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton
                        border='2px solid black'
                        borderRadius='50%'
                        w='24px'
                        h='24px'
                        mt='16px'
                        mr='12px'
                    />
                    <ModalBody display='flex' justifyContent='center' mt='32px' p='0'>
                        {preview && (
                            <Box
                                w={{ md: '206px', base: '108px' }}
                                h={{ md: '206px', base: '108px' }}
                                position='relative'
                            >
                                <Cropper
                                    image={preview}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={4 / 5}
                                    cropSize={
                                        isDesktop
                                            ? { width: 200, height: 200 }
                                            : { width: 100, height: 100 }
                                    }
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                    showGrid={false}
                                    style={{
                                        mediaStyle: {
                                            objectFit: 'cover',
                                        },
                                        containerStyle: {
                                            width: '100%',
                                            height: '100%',
                                            position: 'relative',
                                        },
                                        cropAreaStyle: {
                                            borderRadius: '50%',
                                            border: '15px solid rgba(45, 177, 0, 0.5)',
                                            boxShadow: '0 0 0 9999px rgba(45, 177, 0, 0.5)',
                                        },
                                    }}
                                />
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter mt='32px' p='0 32px 32px 32px'>
                        <Button
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w='332px'
                            h='48px'
                            bg='rgba(0, 0, 0, 0.92)'
                            onClick={showCroppedImage}
                            fontWeight='600'
                            fontSize='18px'
                            lineHeight='156%'
                            color='#fff'
                        >
                            Кадрировать и сохранить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
