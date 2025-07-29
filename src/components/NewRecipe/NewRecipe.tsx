import { Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import draft from '~/assets/newRecipe/draft.svg';
import { ROUTES } from '~/constants/routes';
import { useFormNavigationBlocker } from '~/hooks/useFormNavigationBlocker';
import { Category } from '~/query/services/category-api/category-api.type';
import {
    useCreateDraftRecipeMutation,
    useCreateRecipeMutation,
    useEditRecipeMutation,
} from '~/query/services/recipe-api/recipe-api';
import { RecipeData } from '~/query/services/recipe-api/recipe-api.type';
import { categoriesSelector, setAppSuccess } from '~/store/app-slice';
import { checkAndNavigate } from '~/utils/checkAndNavigate';

import { CookingSteps } from './CookingSteps/CookingSteps';
import { ExitWithoutSavingModal } from './ExitWithoutSavingModal';
import { Ingredients } from './Ingredients/Ingredients';
import { MainInfo } from './MainInfo/MainInfo';
import { SelectTags } from './SelectTags/SelectTags';
import { UploadImage } from './UploadImage/UploadImage';

export type FormData = {
    image: string;
    title: string;
    description: string | null;
    categoriesIds: string[];
    portions: number;
    time: number;
    ingredients: { title: string | null; count: number | null; measureUnit: string | null }[];
    steps: { stepNumber: number; description: string | null; image: string | null }[];
};

type NewRecipeProps = {
    dataForEditing?: Partial<RecipeData>;
    editMode?: boolean;
    id?: string;
    draftId?: string;
};

export const NewRecipe = ({ dataForEditing, editMode, id, draftId }: NewRecipeProps) => {
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitted },
        getValues,
        trigger,
        reset,
    } = useForm<FormData>({
        mode: 'onChange',
        shouldFocusError: false,
        defaultValues: {
            ingredients: [{ title: null, count: null, measureUnit: null }],
            steps: [{ stepNumber: 1, description: null, image: null }],
            categoriesIds: [],
            description: null,
        },
        criteriaMode: 'all',
    });

    useEffect(() => {
        if (dataForEditing) {
            reset({
                title: dataForEditing.title,
                description: dataForEditing.description,
                categoriesIds: dataForEditing.categoriesIds,
                portions: dataForEditing.portions,
                time: dataForEditing.time,
                ingredients: dataForEditing.ingredients,
                steps: dataForEditing.steps,
                image: dataForEditing.image,
            });
        }
    }, [dataForEditing, reset]);

    const [createDraftRecipe, { data: draftData }] = useCreateDraftRecipeMutation();
    const [createRecipe, { data: recipeData }] = useCreateRecipeMutation();
    const [editRecipe] = useEditRecipeMutation();
    const categoryDataRedux = useSelector(categoriesSelector);

    const subCategory = useMemo(
        () => categoryDataRedux.filter((item: Category) => !item.subCategories?.length),
        [categoryDataRedux],
    );

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { blocker, allowNextNavigation } = useFormNavigationBlocker({ watch, onOpen });
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDraftClick = async () => {
        onClose();
        const isTitleValid = await trigger('title');
        if (!isTitleValid) return;
        allowNextNavigation();
        const data = getValues();
        createDraftRecipe(data);
    };

    const handlePublishClick = handleSubmit(async (data) => {
        const isValid = await trigger();
        if (!isValid) return;
        allowNextNavigation();
        if (editMode && id) {
            if (draftId) {
                createRecipe(data);
                return;
            }
            editRecipe({ id, body: data });
            const newPath = location.pathname.replace(/^\/edit-recipe/, '');
            navigate(newPath);
        } else {
            createRecipe(data);
        }
    });

    useEffect(() => {
        register('categoriesIds', {
            validate: (value) =>
                value && value.length >= 3 ? true : 'Выберите не менее 3-х тегов',
        });
    }, [register]);

    useEffect(() => {
        if (draftData) {
            dispatch(setAppSuccess({ title: '', message: 'Черновик успешно сохранен' }));
            blocker.state === 'blocked' && blocker.proceed();
            navigate(ROUTES.HOME);
        }
    }, [blocker, dispatch, draftData, navigate]);

    useEffect(() => {
        const localDataString = localStorage.getItem('cachedCategories');
        const categoryData = localDataString ? JSON.parse(localDataString) : [];
        if (recipeData) {
            dispatch(setAppSuccess({ title: '', message: 'Рецепт успешно опубликован' }));
            blocker.state === 'blocked' && blocker.proceed();
            const { matchedCategory, matchedSubcategory } = checkAndNavigate({
                categoriesIds: recipeData.categoriesIds,
                categoryData,
            });
            navigate(
                `/${matchedCategory?.category}/${matchedSubcategory?.category}/${recipeData._id}`,
            );
        }
    }, [blocker, dispatch, recipeData, navigate]);

    const handleExitWithoutSaving = () => {
        if (blocker.state === 'blocked') {
            blocker.proceed();
            onClose();
            navigate(blocker.location.pathname);
        }
    };

    return (
        <Flex w='100%' pt={{ md: '32px', base: '16px' }}>
            <form data-test-id='recipe-form'>
                <Flex gap={{ md: '40px', base: '32px' }} direction='column'>
                    <Flex
                        gap={{ md: '24px', base: '16px' }}
                        direction={{ base: 'column', sm: 'row' }}
                    >
                        <UploadImage
                            register={register}
                            watch={watch}
                            errors={errors}
                            setValue={setValue}
                        />
                        <Flex direction='column' gap={{ md: '32px', base: '16px' }}>
                            <SelectTags
                                register={register}
                                watch={watch}
                                errors={errors}
                                setValue={setValue}
                                isSubmitted={isSubmitted}
                                values={dataForEditing?.categoriesIds}
                                subCategory={subCategory}
                            />
                            <MainInfo register={register} watch={watch} errors={errors} />
                        </Flex>
                    </Flex>
                    <Flex direction='column' gap={{ md: '40px', base: '32px' }}>
                        <Ingredients
                            register={register}
                            watch={watch}
                            errors={errors}
                            control={control}
                        />
                        <CookingSteps
                            register={register}
                            watch={watch}
                            errors={errors}
                            setValue={setValue}
                            control={control}
                        />
                    </Flex>
                    <Flex
                        w='100%'
                        justify='center'
                        gap='20px'
                        direction={{ sm: 'row', base: 'column' }}
                    >
                        <Button
                            data-test-id='recipe-save-draft-button'
                            type='button'
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            borderRadius='6px'
                            w={{ sm: '246px', base: '328px' }}
                            h='48px'
                            bg='rgba(255, 255, 255, 0.06)'
                            leftIcon={<Image src={draft} w='11px' h='14px' />}
                            onClick={handleDraftClick}
                        >
                            <Text
                                fontWeight='600'
                                fontSize='18px'
                                lineHeight='156%'
                                color='rgba(0, 0, 0, 0.8)'
                            >
                                Сохранить черновик
                            </Text>
                        </Button>
                        <Button
                            data-test-id='recipe-publish-recipe-button'
                            type='button'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            w={{ sm: '246px', base: '328px' }}
                            h='48px'
                            bg='rgba(0, 0, 0, 0.92)'
                            onClick={handlePublishClick}
                        >
                            <Text fontWeight='600' fontSize='18px' lineHeight='156%' color='#fff'>
                                Опубликовать рецепт
                            </Text>
                        </Button>
                    </Flex>
                </Flex>
            </form>
            <ExitWithoutSavingModal
                handleDraftClick={handleDraftClick}
                isOpen={isOpen}
                onClose={onClose}
                handleExitWithoutSaving={handleExitWithoutSaving}
            />
        </Flex>
    );
};
