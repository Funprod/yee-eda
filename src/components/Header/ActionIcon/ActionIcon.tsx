import { Flex, Image, Text } from '@chakra-ui/react';

type ActionIconProps = {
    image: string;
    count: number;
};
export const ActionIcon = ({ image, count }: ActionIconProps) => (
    <Flex gap='8px'>
        <Image src={image} w='10px' h='12px' />
        <Text fontWeight='600' fontSize='12px' lineHeight='133%' color='var(--lime-600)'>
            {count}
        </Text>
    </Flex>
);
