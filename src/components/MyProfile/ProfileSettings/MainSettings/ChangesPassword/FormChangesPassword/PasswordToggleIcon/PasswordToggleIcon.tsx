import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

type PasswordToggleIconProps = {
    value: boolean;
    setValue: (value: boolean) => void;
};

export const PasswordToggleIcon = ({ value, setValue }: PasswordToggleIconProps) => (
    <IconButton
        aria-label={value ? 'Скрыть пароль' : 'Показать пароль'}
        icon={value ? <ViewIcon w='18px' h='18px' /> : <ViewOffIcon w='18px' h='18px' />}
        onMouseDown={() => setValue(true)}
        onMouseUp={() => setValue(false)}
        onMouseLeave={() => setValue(false)}
        variant='link'
        position='absolute'
        right='10px'
        top='38px'
        transform='translateY(50%)'
        zIndex='1'
        color='#000'
    />
);
