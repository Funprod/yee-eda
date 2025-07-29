import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

import { Note } from '~/query/services/recipe-api/recipe-api.type';
import { formatDate } from '~/utils/formatDate';

const DEFAULT_VISIBLE_NOTES = 3;
const MAX_NOTE_LENGTH = 160;

type NotesProps = {
    notes: Note[];
};
export const Notes = ({ notes }: NotesProps) => {
    const [showAll, setShowAll] = useState(false);

    const notesRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.hash === '#notes' && notesRef.current) {
            const yOffset = -420;
            const y = notesRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [location.hash]);

    return (
        <Flex
            data-test-id='blog-notes-box'
            ref={notesRef}
            direction='column'
            w='100%'
            p={{ md: '24px 16px 24px 24px', base: '16px' }}
            bg='rgba(0, 0, 0, 0.04)'
            borderRadius='16px'
            mt='40px'
            gap='16px'
        >
            <Flex gap='8px'>
                <Text fontWeight='400' fontSize={{ md: '36px', base: '20px' }} lineHeight='111%'>
                    Заметки
                </Text>
                <Text
                    data-test-id='blogger-user-notes-count'
                    fontWeight='400'
                    fontSize={{ md: '36px', base: '20px' }}
                    lineHeight='111%'
                    color='rgba(0, 0, 0, 0.48)'
                >
                    ({notes.length})
                </Text>
            </Flex>
            <Flex
                data-test-id='blogger-user-notes-grid'
                wrap='wrap'
                gap={{ md: '16px', base: '12px' }}
            >
                {notes.map((note, index) => (
                    <Flex
                        key={note._id}
                        direction='column'
                        maxW={{ lg: '426px', md: '266px', sm: '224px', base: '296px' }}
                        w='100%'
                        h={{ lg: '164px', md: '204px', sm: '244px' }}
                        maxH={{ base: '204px', sm: '100%' }}
                        borderRadius='8px'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        bg='#fff'
                        p='24px'
                        gap={{ md: '16px', base: '12px' }}
                        display={!showAll && index >= DEFAULT_VISIBLE_NOTES ? 'none' : 'flex'}
                    >
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
                ))}
            </Flex>
            {notes.length > DEFAULT_VISIBLE_NOTES && (
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
    );
};
