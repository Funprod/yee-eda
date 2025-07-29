import { Button, Flex, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useUpdateInfoMutation } from '~/query/services/users-api/users-api';
import { GetMeResponse } from '~/query/services/users-api/users-api.type';

import { ChangesPassword } from './ChangesPassword/ChangesPassword';
import { ProfileAvatar } from './ProfileAvatar/ProfileAvatar';
import { ProfileForm } from './ProfileForm/ProfileForm';

type MainSettingsProps = {
    profileData: GetMeResponse;
};

export type ProfileFormData = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
};

export const MainSettings = ({ profileData }: MainSettingsProps) => {
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        defaultValues: {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            login: profileData.login,
        },
    });

    const [updateInfo] = useUpdateInfoMutation();

    const onSubmit = (data: ProfileFormData) => {
        updateInfo(data);
    };
    return (
        <Flex direction='column' w='100%' gap={{ md: '24px', base: '16px' }}>
            <Text fontWeight='700' fontSize={{ md: '20px', base: '18px' }} lineHeight='140%'>
                Авторизация и персонализация
            </Text>
            <ProfileAvatar profileData={profileData} />
            <ProfileForm
                onSubmit={onSubmit}
                register={register}
                watch={watch}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
            />
            <ChangesPassword />
            <Button
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='6px'
                w={{ md: '248px', sm: '209px', base: '328px' }}
                h='48px'
                bg='rgba(0, 0, 0, 0.92)'
                onClick={handleSubmit(onSubmit)}
                color='#FFF'
                fontWeight='600'
                fontSize={{ md: '18px', base: '16px' }}
                lineHeight='150%'
            >
                Сохранить изменения
            </Button>
        </Flex>
    );
};
