import { Box, Image, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import uploadImg from '~/assets/newRecipe/uploadImg.svg';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import { FormData } from '../NewRecipe';
import { UploadImageModal } from '../UploadImageModal/UploadImageModal';

type UploadImageProps = {
    setValue: UseFormSetValue<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
    register: UseFormRegister<FormData>;
};

export const UploadImage = ({ setValue, watch, errors, register }: UploadImageProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const imageValue = watch('image');

    useEffect(() => {
        register('image', { required: true });
    }, [register]);

    return (
        <>
            <Box
                data-test-id='recipe-image-block'
                onClick={onOpen}
                cursor='pointer'
                borderRadius='8px'
                width={{ lg: '553px', md: '353px', sm: '232px', base: '328px' }}
                height={{ md: '410px', base: '224px' }}
                display='flex'
                alignItems='center'
                justifyContent='center'
                overflow='hidden'
                bg='rgba(0, 0, 0, 0.08)'
                border={errors.image ? '2px solid #E53E3E' : 'none'}
            >
                {imageValue ? (
                    <Image
                        data-test-id='recipe-image-block-preview-image'
                        src={getFullMediaUrl(imageValue)}
                        alt='uploaded'
                        objectFit='cover'
                        width='100%'
                        height='100%'
                    />
                ) : (
                    <Image src={uploadImg} alt='placeholder' />
                )}
            </Box>
            <UploadImageModal
                imageValue={imageValue}
                isOpen={isOpen}
                onClose={onClose}
                setValue={setValue}
                value='image'
            />
        </>
    );
};
