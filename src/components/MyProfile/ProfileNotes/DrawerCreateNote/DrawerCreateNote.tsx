import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Textarea,
} from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';

import { Note } from '~/query/services/bloggers-api/bloggers-api.type';
import { useCreateNoteMutation } from '~/query/services/users-api/users-api';

type DrawerCreateNoteProps = {
    isOpen: boolean;
    onClose: () => void;
    setNotesData: React.Dispatch<React.SetStateAction<Note[]>>;
    refetch: () => void;
};

const MAX_NOTE_LENGTH = 160;
const MIN_NOTE_LENGTH = 10;

export const DrawerCreateNote = ({
    isOpen,
    onClose,
    setNotesData,
    refetch,
}: DrawerCreateNoteProps) => {
    const [value, setValue] = useState('');
    const [createNote] = useCreateNoteMutation();
    const [validated, setValidated] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleCreateNote = async () => {
        if (value.length < MIN_NOTE_LENGTH || value.length > MAX_NOTE_LENGTH) {
            setValidated(true);
            textareaRef.current?.focus();
            return;
        }
        const res = await createNote({ text: value });
        if (res.data) {
            setNotesData((prev) => [...prev, res.data]);
            refetch();
        }
        onClose();
    };

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValidated(false);
        setValue(e.target.value);
    };

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={{ md: 'sm', base: 'xs' }}
            >
                <DrawerOverlay />
                <DrawerContent data-test-id='filter-drawer'>
                    <DrawerCloseButton
                        w='24px'
                        h='24px'
                        mt='12px'
                        mr='12px'
                        bg='#000'
                        borderRadius='50%'
                        color='#fff'
                    />
                    <DrawerHeader fontWeight='700' fontSize='24px' lineHeight='133%'>
                        Новая заметка
                    </DrawerHeader>

                    <DrawerBody mt='24px'>
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => handleOnChange(e)}
                            minLength={MIN_NOTE_LENGTH}
                            placeholder='Максимально 160 символов'
                            _placeholder={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '143%',
                            }}
                            border={validated ? '1px solid rgb(229, 62, 62)' : '1px solid #e2e8f0'}
                        />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w={{ md: '177px', base: '124px' }}
                            h={{ md: '48px', base: '32px' }}
                            bg='rgba(0, 0, 0, 0.92)'
                            mr={3}
                            onClick={handleCreateNote}
                            fontWeight='600'
                            fontSize={{ md: '18px', base: '14px' }}
                            lineHeight='156%'
                            color='#fff'
                        >
                            Опубликовать
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
