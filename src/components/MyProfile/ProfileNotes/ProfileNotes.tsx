import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, Image, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import pen from '~/assets/pen.svg';
import { Note } from '~/query/services/recipe-api/recipe-api.type';
import { useDeleteNoteByIdMutation } from '~/query/services/users-api/users-api';
import { formatDate } from '~/utils/formatDate';

import { DrawerCreateNote } from './DrawerCreateNote/DrawerCreateNote';

const DEFAULT_VISIBLE_NOTES = 3;
const MAX_NOTE_LENGTH = 160;

type ProfileNotesProps = {
    notes: Note[];
    refetch: () => void;
};
export const ProfileNotes = ({ notes, refetch }: ProfileNotesProps) => {
    const [showAll, setShowAll] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [notesData, setNotesData] = useState<Note[]>(notes);
    const [deleteNote] = useDeleteNoteByIdMutation();

    const handleDeleteNote = async (id: string) => {
        refetch();
        const res = await deleteNote(id);
        if (res) {
            setNotesData(notesData.filter((note) => note._id !== id));
            refetch();
        }
    };

    useEffect(() => {
        if (notes) {
            setNotesData(notes);
        }
    }, [notes]);

    return (
        <>
            <Flex
                data-test-id='blog-notes-box'
                direction='column'
                w='100%'
                p={{ md: '24px 16px 24px 24px', base: '16px' }}
                bg='rgba(0, 0, 0, 0.04)'
                borderRadius='16px'
                mt={{ md: '40px', base: '32px' }}
                gap='16px'
            >
                <Flex justify='space-between'>
                    <Flex gap='8px'>
                        <Text
                            fontWeight='400'
                            fontSize={{ md: '36px', base: '20px' }}
                            lineHeight='111%'
                        >
                            Заметки
                        </Text>
                        <Text
                            data-test-id='blogger-user-notes-count'
                            fontWeight='400'
                            fontSize={{ md: '36px', base: '20px' }}
                            lineHeight='111%'
                            color='rgba(0, 0, 0, 0.48)'
                        >
                            ({notesData.length})
                        </Text>
                    </Flex>
                    <Button
                        leftIcon={<Image src={pen} w='14px' h='14px' />}
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        borderRadius='6px'
                        w='150px'
                        h='32px'
                        bg='rgba(255, 255, 255, 0.06)'
                        fontWeight='600'
                        fontSize='14px'
                        lineHeight='143%'
                        color=' rgba(0, 0, 0, 0.8)'
                        onClick={onOpen}
                    >
                        Новая заметка
                    </Button>
                </Flex>
                <Flex
                    data-test-id='blogger-user-notes-grid'
                    wrap='wrap'
                    gap={{ md: '16px', base: '12px' }}
                >
                    {notesData.map((note, index) => (
                        <Flex
                            key={note._id}
                            maxW={{ lg: '426px', md: '266px', sm: '224px', base: '296px' }}
                            w='100%'
                            maxH={{ base: '204px', sm: '100%' }}
                            borderRadius='8px'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            bg='#fff'
                            p='24px'
                            display={!showAll && index >= DEFAULT_VISIBLE_NOTES ? 'none' : 'flex'}
                            justify='space-between'
                        >
                            <Flex direction='column' gap={{ md: '16px', base: '12px' }} w='100%'>
                                <Text
                                    data-test-id='notes-card-date'
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='143%'
                                    color=' #2db100'
                                >
                                    {formatDate(note.date)}
                                </Text>
                                <Text
                                    data-test-id='notes-card-text'
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='143%'
                                >
                                    {note.text.length > MAX_NOTE_LENGTH
                                        ? `${note.text.slice(0, MAX_NOTE_LENGTH)}...`
                                        : note.text}
                                </Text>
                            </Flex>
                            <IconButton
                                data-test-id='note-delete-button'
                                icon={<DeleteIcon w='12px' h='14px' />}
                                aria-label='Удалить заметку'
                                onClick={() => handleDeleteNote(note._id)}
                                minW='0px'
                                w='22px'
                                h='24px'
                                m='0'
                                bg='transparent'
                            />
                        </Flex>
                    ))}
                </Flex>
                {notesData.length > DEFAULT_VISIBLE_NOTES && (
                    <Flex justify='center'>
                        {!showAll ? (
                            <Button
                                data-test-id='blogger-user-notes-button'
                                w='147px'
                                h='32px'
                                borderRadius='6px'
                                bg='transparent'
                                fontWeight='600'
                                fontSize='14px'
                                lineHeight='143%'
                                onClick={() => setShowAll(true)}
                            >
                                Показать больше
                            </Button>
                        ) : (
                            <Button
                                data-test-id='blogger-user-notes-button'
                                w='147px'
                                h='32px'
                                borderRadius='6px'
                                bg='transparent'
                                fontWeight='600'
                                fontSize='14px'
                                lineHeight='143%'
                                onClick={() => setShowAll(false)}
                            >
                                Свернуть
                            </Button>
                        )}
                    </Flex>
                )}
            </Flex>
            <DrawerCreateNote
                isOpen={isOpen}
                onClose={onClose}
                setNotesData={setNotesData}
                refetch={refetch}
            />
        </>
    );
};
