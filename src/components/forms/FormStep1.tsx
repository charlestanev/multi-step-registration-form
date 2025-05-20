import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Text
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import type { refine } from 'zod/v4';
import { path } from 'framer-motion/client';

// Zdo Verification Schema
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

export default function FormStep1({ onNext }: Props) {

}

return (
    <Box maxW="400px" mx="auto" >
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Name */}
            <FormControl></FormControl>

            {/* Password */}
            <FormControl></FormControl>

            {/* Confirm Password */}
            <FormControl></FormControl>

            {/* Interests */}
            <FormControl></FormControl>

        </form>
        <Button type='submit' colorScheme='teal' width="full">
            Next
        </Button>
    </Box>
)
