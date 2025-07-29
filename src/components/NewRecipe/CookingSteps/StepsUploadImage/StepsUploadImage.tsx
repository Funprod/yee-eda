import { Box, Image, useDisclosure } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import uploadImg from '~/assets/newRecipe/uploadImg.svg';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import { FormData } from '../../NewRecipe';
import { UploadImageModal } from '../../UploadImageModal/UploadImageModal';

type UploadImageProps = {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
    setValue: UseFormSetValue<FormData>;
    index: number;
};

export const StepsUploadImage = ({ setValue, index, watch }: UploadImageProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const imageValue = watch(`steps.${index}.image`);

    const onBoxImgClick = () => {
        onOpen();
    };

    return (
        <>
            <Box
                onClick={onBoxImgClick}
                cursor='pointer'
                borderRadius='8px'
                width={{ sm: '346px', base: '328px' }}
                height='160px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                overflow='hidden'
                bg='rgba(0, 0, 0, 0.08)'
            >
                {imageValue ? (
                    <Image
                        data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                        src={getFullMediaUrl(imageValue)}
                        alt='preview'
                        objectFit='cover'
                        width='100%'
                        height='100%'
                    />
                ) : (
                    <Image data-test-id={`recipe-steps-image-block-${index}`} src={uploadImg} />
                )}
            </Box>
            <UploadImageModal
                setValue={setValue}
                value={`steps.${index}.image`}
                onClose={onClose}
                isOpen={isOpen}
                imageValue={imageValue}
                index={index}
            />
        </>
    );
};
