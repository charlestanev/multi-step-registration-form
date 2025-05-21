import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod Verification Schema
const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
    interests: z.array(z.string()).min(1, 'At least one interest is required').max(2, 'You can select up to 2 interests'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

// Type form zod
type FormData = z.infer<typeof schema>;

interface Props {
    onNext: (data: FormData) => void;
}

export default function StepOne({ onNext }: Props) {
    const [interestOptions, setInterestOptions] = useState<string[]>([]);

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
        watch,
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        fetch('/interests.json')
            .then((res) => res.json())
            .then((data) => {
                const names = data.map((item: any) => item.name);
                setInterestOptions(names);
            })
            .catch((err) => {
                console.error("Failed to load interests:", err);
            });
    }, []);

    const selectedInterests = watch('interests') || [];

    const onSubmit = (data: FormData) => {
        if (selectedInterests.length > 2) {
            setError('interests',
                {
                    type: 'manual',
                    message: 'You can select up to 2 interests',
                });
            return;
        }
        onNext(data);
    };
    return (
        <Box maxW="400px" mx="auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <FormControl isInvalid={!!errors.name} mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" {...register("name")} />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                {/* Password */}
                <FormControl isInvalid={!!errors.password} mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...register("password")} />
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                {/* Confirm Password */}
                <FormControl isInvalid={!!errors.confirmPassword} mb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...register("confirmPassword")} />
                    <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                </FormControl>

                {/* Interests */}
                <FormControl isInvalid={!!errors.interests} mb={4}>
                    <FormLabel>Select up to 2 interests</FormLabel>
                    <Controller
                        control={control}
                        name="interests"
                        render={({ field }) => (
                            <CheckboxGroup value={field.value} onChange={field.onChange}>
                                <Stack spacing={2}>
                                    {interestOptions.map((interest) => (
                                        <Checkbox
                                            key={interest}
                                            value={interest}
                                            id={`interest-${interest.toLowerCase()}`}
                                            isChecked={field.value?.includes(interest)}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                const value = e.target.value;

                                                if (checked) {
                                                    if (field.value.length < 2) {
                                                        field.onChange([...field.value, value]);
                                                    }
                                                } else {
                                                    field.onChange(field.value.filter((v: string) => v !== value));
                                                }
                                            }}
                                        >
                                            {interest}
                                        </Checkbox>
                                    ))}
                                </Stack>
                            </CheckboxGroup>
                        )}
                    />
                    <FormErrorMessage>{errors.interests?.message}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="teal" width="full">
                    Next
                </Button>
            </form>
        </Box>
    )
}

