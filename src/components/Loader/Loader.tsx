import { Flex, Spinner } from '@chakra-ui/react';

export const Loader = () => (
    <Flex
        data-test-id='mobile-loader'
        align='center'
        justify='center'
        position='absolute'
        w='calc(100% - 48px)'
        zIndex='10'
    >
        <Flex
            w='134px'
            h='134px'
            bg='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
            align='center'
            justify='center'
        >
            <Spinner size='lg' />
        </Flex>
    </Flex>
);
