import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(20, 'First name cannot exceed 20 characters'),
  middleName: z.string().min(1, 'Middle name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required'),
  occupation: z.string().min(1, 'Local guardian occupation is required'),
  contactNo: z.string().min(1, 'Local guardian contact number is required'),
  address: z.string().min(1, 'Local guardian address is required'),
});

const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
          required_error: 'Blood group is required',
        })
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGauardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      // profileImg: z.string(),
    }),
  }),
});

const updateNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(20, 'First name cannot exceed 20 characters')
    .optional(),
  middleName: z.string().min(1, 'Middle name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required').optional(),
  fatherOccupation: z
    .string()
    .min(1, 'Father occupation is required')
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, 'Father contact number is required')
    .optional(),
  motherName: z.string().min(1, 'Mother name is required').optional(),
  motherOccupation: z
    .string()
    .min(1, 'Mother occupation is required')
    .optional(),
  motherContactNo: z
    .string()
    .min(1, 'Mother contact number is required')
    .optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required').optional(),
  occupation: z
    .string()
    .min(1, 'Local guardian occupation is required')
    .optional(),
  contactNo: z
    .string()
    .min(1, 'Local guardian contact number is required')
    .optional(),
  address: z.string().min(1, 'Local guardian address is required').optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateNameValidationSchema.optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          required_error: 'Gender is required',
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format')
        .optional(),
      contactNo: z.string().min(1, 'Contact number is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], {
          required_error: 'Blood group is required',
        })
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required')
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGauardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  CreateStudentValidationSchema,
  updateStudentValidationSchema,
};
