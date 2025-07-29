import { Flex, Spinner } from '@chakra-ui/react';

export const FullPageLoader = () => (
    <Flex
        position='fixed'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        align='center'
        justify='center'
        data-test-id='app-loader'
        zIndex='10000'
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
